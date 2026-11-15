// app/schemas/quote.ts
import { z } from 'zod'

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format attendu : YYYY-MM-DD')

export const lineItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nom requis'),
  description: z.string().optional().default(''),
  quantity: z.number({ error: 'Nombre requis' }).positive('Doit être > 0'),
  unitPrice: z.number({ error: 'Nombre requis' }).min(0, 'Doit être ≥ 0'),
})

export const quoteSchema = z
  .object({
    number: z.string().min(1, 'Numéro requis'),
    createdAt: isoDate,
    validUntil: isoDate,
    deliveryDelay: z.string(),
    currency: z.enum(['EUR', 'USD', 'MAD', 'GBP', 'CHF']),

    client: z.object({
      company: z.string().min(1, 'Société requise'),
      contactName: z.string().min(1, 'Contact requis'),
      email: z.string().email('Email invalide'),
      phone: z.string().optional().default(''),
      address: z.string().min(1, 'Adresse requise'),
    }),

    title: z.string().min(1, 'Objet requis'),
    description: z.string(),

    items: z.array(lineItemSchema),

    discount: z
      .object({
        type: z.enum(['percentage', 'fixed']),
        value: z.number().min(0),
        label: z.string().optional(),
      })
      .optional(),

    taxes: z.array(
      z.object({
        id: z.string(),
        label: z.string().min(1, 'Libellé requis'),
        rate: z.number().min(0).max(100, 'Taux entre 0 et 100'),
      })
    ),

    deposit: z
      .object({
        type: z.enum(['percentage', 'fixed']),
        value: z.number().min(0),
      })
      .optional(),

    paymentTerms: z.string(),

    conditions: z.object({
      included: z.array(z.string()),
      excluded: z.array(z.string()),
      maintenance: z.string(),
      otherNotes: z.string(),
    }),
  })
  .refine((q) => new Date(q.validUntil) >= new Date(q.createdAt), {
    message: 'La date de validité doit être après la date de création',
    path: ['validUntil'],
  })
  .refine(
    (q) => {
      if (!q.discount) return true
      if (q.discount.type === 'percentage') return q.discount.value <= 100
      return true
    },
    { message: 'La remise en % ne peut pas dépasser 100', path: ['discount', 'value'] }
  )

export type QuoteFormValues = z.infer<typeof quoteSchema>