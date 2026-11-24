// app/composables/usePdfExport.ts
import type { Quote, CompanySettings, LineItem } from '#shared/types/quote'
import { useQuoteCalculations } from '~/composables/useQuoteCalculations'
import { formatMoney } from '~/utils/format'
import type { TDocumentDefinitions } from 'pdfmake/interfaces'

export function usePdfExport() {
  const pdfMake = usePDFMake()
  const { computeLineTotal, computeQuoteTotals } = useQuoteCalculations()

  function formatDate(iso: string): string {
    if (!iso) return '—'
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  // Nettoie le texte pour pdfmake : remplace les espaces insécables par des espaces standards
  function cleanText(text: string): string {
    return text.replace(/[\u00A0\u202F\u2009]/g, ' ')
  }

  function divider(margin: [number, number, number, number] = [0, 12, 0, 12]) {
    return {
      canvas: [
        {
          type: 'line',
          x1: 0,
          y1: 0,
          x2: 515,
          y2: 0,
          lineWidth: 0.75,
          lineColor: '#e2e8f0',
        },
      ],
      margin,
    }
  }

  function sectionLabel(label: string, marginBottom = 4) {
    return {
      text: label.toUpperCase(),
      fontSize: 8.5,
      bold: true,
      color: '#64748b',
      characterSpacing: 0.5,
      margin: [0, 0, 0, marginBottom] as [number, number, number, number],
    }
  }

  function buildDocDefinition(quote: Quote, company: CompanySettings): TDocumentDefinitions {
    const totals = computeQuoteTotals(quote)

    // Lignes du tableau des prestations (titre + description éventuelle)
    const itemsBody = quote.items.length
      ? quote.items.map((item: LineItem) => {
          const nameStack: any[] = [
            { text: cleanText(item.name || '—'), fontSize: 9.5, bold: true, color: '#0f172a' },
          ]
          if (item.description) {
            nameStack.push({
              text: cleanText(item.description),
              fontSize: 8.5,
              color: '#64748b',
              margin: [0, 1.5, 0, 0] as [number, number, number, number],
            })
          }

          return [
            { stack: nameStack, border: [false, false, false, true], borderColor: ['', '', '', '#f1f5f9'], margin: [0, 4, 4, 4] },
            {
              text: String(item.quantity),
              fontSize: 9,
              color: '#334155',
              alignment: 'right' as const,
              border: [false, false, false, true],
              borderColor: ['', '', '', '#f1f5f9'],
              margin: [2, 4, 2, 4],
            },
            {
              text: cleanText(formatMoney(item.unitPrice, quote.currency)),
              fontSize: 9,
              color: '#334155',
              alignment: 'right' as const,
              border: [false, false, false, true],
              borderColor: ['', '', '', '#f1f5f9'],
              margin: [2, 4, 2, 4],
            },
            {
              text: cleanText(formatMoney(computeLineTotal(item), quote.currency)),
              fontSize: 9,
              bold: true,
              color: '#0f172a',
              alignment: 'right' as const,
              border: [false, false, false, true],
              borderColor: ['', '', '', '#f1f5f9'],
              margin: [4, 4, 0, 4],
            },
          ]
        })
      : [
          [
            {
              text: 'Aucune prestation',
              colSpan: 4,
              alignment: 'center' as const,
              italics: true,
              color: '#94a3b8',
              fontSize: 9,
              margin: [0, 8, 0, 8],
            },
            {},
            {},
            {},
          ],
        ]

    // Récapitulatif financier (2 colonnes alignées à droite comme dans Preview.vue)
    const summaryRows: any[][] = [
      [
        { text: 'Sous-total', fontSize: 9, color: '#475569', lineHeight: 1.15, margin: [0, 0.5, 8, 0.5] },
        { text: cleanText(formatMoney(totals.subtotal, quote.currency)), fontSize: 9, color: '#0f172a', alignment: 'right' as const, lineHeight: 1.15, margin: [0, 0.5, 0, 0.5] },
      ],
    ]

    if (totals.discount > 0) {
      summaryRows.push([
        { text: 'Remise', fontSize: 9, color: '#475569', lineHeight: 1.15, margin: [0, 0.5, 8, 0.5] },
        { text: cleanText(`− ${formatMoney(totals.discount, quote.currency)}`), fontSize: 9, color: '#475569', alignment: 'right' as const, lineHeight: 1.15, margin: [0, 0.5, 0, 0.5] },
      ])
    }

    for (const tax of quote.taxes) {
      const taxAmount = ((totals.subtotal - totals.discount) * tax.rate) / 100
      summaryRows.push([
        { text: cleanText(`${tax.label || 'Taxe'} (${tax.rate}%)`), fontSize: 9, color: '#475569', lineHeight: 1.15, margin: [0, 0.5, 8, 0.5] },
        { text: cleanText(formatMoney(taxAmount, quote.currency)), fontSize: 9, color: '#475569', alignment: 'right' as const, lineHeight: 1.15, margin: [0, 0.5, 0, 0.5] },
      ])
    }

    summaryRows.push([
      {
        text: 'Total',
        fontSize: 10.5,
        bold: true,
        color: '#0f172a',
        lineHeight: 1.2,
        border: [false, true, false, false],
        borderColor: ['', '#e2e8f0', '', ''],
        margin: [0, 3, 8, 1],
      },
      {
        text: cleanText(formatMoney(totals.total, quote.currency)),
        fontSize: 10.5,
        bold: true,
        color: '#0f172a',
        alignment: 'right' as const,
        lineHeight: 1.2,
        border: [false, true, false, false],
        borderColor: ['', '#e2e8f0', '', ''],
        margin: [0, 3, 0, 1],
      },
    ])

    if (totals.depositAmount > 0) {
      summaryRows.push([
        { text: 'Acompte', fontSize: 9, color: '#475569', lineHeight: 1.15, margin: [0, 0.5, 8, 0.5] },
        { text: cleanText(formatMoney(totals.depositAmount, quote.currency)), fontSize: 9, color: '#475569', alignment: 'right' as const, lineHeight: 1.15, margin: [0, 0.5, 0, 0.5] },
      ])
      summaryRows.push([
        { text: 'Reste à payer', fontSize: 9.5, bold: true, color: '#0f172a', lineHeight: 1.15, margin: [0, 0.5, 8, 0.5] },
        { text: cleanText(formatMoney(totals.remaining, quote.currency)), fontSize: 9.5, bold: true, color: '#0f172a', alignment: 'right' as const, lineHeight: 1.15, margin: [0, 0.5, 0, 0.5] },
      ])
    }

    // Conditions
    const conditionsBlocks: any[] = []
    if (quote.deliveryDelay) {
      conditionsBlocks.push({
        stack: [
          sectionLabel('Délai de réalisation', 2),
          { text: cleanText(quote.deliveryDelay), fontSize: 9, color: '#334155' },
        ],
        margin: [0, 0, 0, 8] as [number, number, number, number],
      })
    }
    if (quote.paymentTerms && quote.type !== 'invoice') {
      conditionsBlocks.push({
        stack: [
          sectionLabel('Modalités de paiement', 2),
          { text: cleanText(quote.paymentTerms), fontSize: 9, color: '#334155' },
        ],
        margin: [0, 0, 0, 8] as [number, number, number, number],
      })
    }
    if (quote.type !== 'invoice' && quote.conditions.included.length) {
      conditionsBlocks.push({
        stack: [
          sectionLabel('Inclus', 2),
          { ul: quote.conditions.included.map((line) => cleanText(line)), fontSize: 9, color: '#334155' },
        ],
        margin: [0, 0, 0, 8] as [number, number, number, number],
      })
    }
    if (quote.type !== 'invoice' && quote.conditions.excluded.length) {
      conditionsBlocks.push({
        stack: [
          sectionLabel('Non inclus', 2),
          { ul: quote.conditions.excluded.map((line) => cleanText(line)), fontSize: 9, color: '#334155' },
        ],
        margin: [0, 0, 0, 8] as [number, number, number, number],
      })
    }
    if (quote.type !== 'invoice' && quote.conditions.maintenance) {
      conditionsBlocks.push({
        stack: [
          sectionLabel('Maintenance', 2),
          { text: cleanText(quote.conditions.maintenance), fontSize: 9, color: '#334155' },
        ],
        margin: [0, 0, 0, 8] as [number, number, number, number],
      })
    }
    if (quote.conditions.otherNotes) {
      conditionsBlocks.push({
        stack: [
          sectionLabel('Remarques', 2),
          { text: cleanText(quote.conditions.otherNotes), fontSize: 9, color: '#334155' },
        ],
        margin: [0, 0, 0, 4] as [number, number, number, number],
      })
    }

    const companyMeta: any[] = []
    if (company.address) companyMeta.push({ text: cleanText(company.address), fontSize: 8.5, color: '#475569' })
    if (company.email) companyMeta.push({ text: cleanText(company.email), fontSize: 8.5, color: '#475569' })
    if (company.phone) companyMeta.push({ text: cleanText(company.phone), fontSize: 8.5, color: '#475569' })
    if (company.website) companyMeta.push({ text: cleanText(company.website), fontSize: 8.5, color: '#475569' })

    const clientMeta: any[] = []
    if (quote.client.contactName) clientMeta.push({ text: cleanText(quote.client.contactName), fontSize: 8.5, color: '#475569' })
    if (quote.client.address) clientMeta.push({ text: cleanText(quote.client.address), fontSize: 8.5, color: '#475569' })
    if (quote.client.email) clientMeta.push({ text: cleanText(quote.client.email), fontSize: 8.5, color: '#475569' })
    if (quote.client.phone) clientMeta.push({ text: cleanText(quote.client.phone), fontSize: 8.5, color: '#475569' })

    return {
      pageSize: 'A4',
      pageMargins: [40, 44, 40, 44] as [number, number, number, number],
      content: [
        // En-tête entreprise / document
        {
          columns: [
            {
              width: '*',
              stack: [
                {
                  columns: [
                    ...(company.logoDataUrl
                      ? [
                          {
                            image: company.logoDataUrl,
                            width: 36,
                            margin: [0, 0, 8, 0] as [number, number, number, number],
                          },
                        ]
                      : []),
                    {
                      width: '*',
                      text: cleanText(company.name || 'Kleonix'),
                      fontSize: 13,
                      bold: true,
                      color: '#0f172a',
                      margin: [0, company.logoDataUrl ? 6 : 0, 0, 0] as [number, number, number, number],
                    },
                  ],
                  margin: [0, 0, 0, 6] as [number, number, number, number],
                },
                ...companyMeta,
              ],
            },
            {
              width: 'auto',
              alignment: 'right' as const,
              stack: [
                {
                  text: quote.type === 'invoice' ? 'FACTURE' : 'DEVIS',
                  fontSize: 8.5,
                  bold: true,
                  color: '#64748b',
                  characterSpacing: 0.5,
                },
                {
                  text: cleanText(quote.number || '—'),
                  fontSize: 11.5,
                  bold: true,
                  color: '#0f172a',
                  margin: [0, 2, 0, 4] as [number, number, number, number],
                },
                {
                  text: cleanText(`Émis le ${formatDate(quote.createdAt)}`),
                  fontSize: 8.5,
                  color: '#475569',
                },
                {
                  text:
                    quote.type === 'invoice'
                      ? cleanText(`Échéance : ${formatDate(quote.dueDate || '')}`)
                      : cleanText(`Valide jusqu'au ${formatDate(quote.validUntil)}`),
                  fontSize: 8.5,
                  color: '#475569',
                  margin: [0, 1, 0, 0] as [number, number, number, number],
                },
              ],
            },
          ],
          columnGap: 16,
        },

        divider([0, 14, 0, 14]),

        // Client
        {
          stack: [
            sectionLabel('Client', 3),
            { text: cleanText(quote.client.company || '—'), fontSize: 10, bold: true, color: '#0f172a', margin: [0, 0, 0, 2] as [number, number, number, number] },
            ...clientMeta,
          ],
          margin: [0, 0, 0, 14] as [number, number, number, number],
        },

        // Objet
        ...(quote.title || quote.description
          ? [
              {
                stack: [
                  sectionLabel('Objet', 3),
                  { text: cleanText(quote.title || '—'), fontSize: 10, bold: true, color: '#0f172a' },
                  ...(quote.description
                    ? [
                        {
                          text: cleanText(quote.description),
                          fontSize: 8.5,
                          color: '#475569',
                          margin: [0, 3, 0, 0] as [number, number, number, number],
                        },
                      ]
                    : []),
                ],
                margin: [0, 0, 0, 14] as [number, number, number, number],
              },
            ]
          : []),

        // Prestations
        {
          stack: [
            sectionLabel('Prestations', 6),
            {
              table: {
                headerRows: 1,
                widths: ['*', 40, 74, 78],
                body: [
                  [
                    {
                      text: 'Prestation',
                      fontSize: 8.5,
                      bold: true,
                      color: '#64748b',
                      border: [false, false, false, true],
                      borderColor: ['', '', '', '#e2e8f0'],
                      margin: [0, 2, 4, 4],
                    },
                    {
                      text: 'Qté',
                      fontSize: 8.5,
                      bold: true,
                      color: '#64748b',
                      alignment: 'right' as const,
                      border: [false, false, false, true],
                      borderColor: ['', '', '', '#e2e8f0'],
                      margin: [2, 2, 2, 4],
                    },
                    {
                      text: 'PU',
                      fontSize: 8.5,
                      bold: true,
                      color: '#64748b',
                      alignment: 'right' as const,
                      border: [false, false, false, true],
                      borderColor: ['', '', '', '#e2e8f0'],
                      margin: [2, 2, 2, 4],
                    },
                    {
                      text: 'Total',
                      fontSize: 8.5,
                      bold: true,
                      color: '#64748b',
                      alignment: 'right' as const,
                      border: [false, false, false, true],
                      borderColor: ['', '', '', '#e2e8f0'],
                      margin: [4, 2, 0, 4],
                    },
                  ],
                  ...itemsBody,
                ],
              },
            },
          ],
          margin: [0, 0, 0, 14] as [number, number, number, number],
        },

        // Récapitulatif financier
        {
          columns: [
            { width: '*', text: '' },
            {
              width: 220,
              table: {
                widths: ['*', 'auto'],
                body: summaryRows,
              },
              layout: 'noBorders',
            },
          ],
          margin: [0, 0, 0, 14] as [number, number, number, number],
        },

        // Conditions
        ...(conditionsBlocks.length
          ? [
              divider([0, 2, 0, 12]),
              ...conditionsBlocks,
            ]
          : []),

        // Bloc final : modalités (facture) ou signature (devis)
        ...(quote.type === 'invoice'
          ? [
              divider([0, 10, 0, 12]),
              sectionLabel('Modalités de paiement', 4),
              {
                text: cleanText(quote.paymentTerms || 'À réception de facture'),
                fontSize: 9,
                color: '#334155',
              },
            ]
          : quote.signature?.show !== false
            ? [
                divider([0, 10, 0, 12]),
                sectionLabel('Bon pour accord', 8),
                {
                  columns: [
                    {
                      width: '*',
                      stack: [
                        { text: cleanText(company.name || 'Kleonix'), fontSize: 9, bold: true, color: '#334155', margin: [0, 0, 0, 6] as [number, number, number, number] },
                        {
                          text: quote.signature?.issuerSignedAt
                            ? cleanText(`Date : ${formatDate(quote.signature.issuerSignedAt)}`)
                            : 'Date : ',
                          fontSize: 8.5,
                          color: '#475569',
                        },
                        ...(quote.signature?.issuerSignatureDataUrl
                          ? [
                              {
                                image: quote.signature.issuerSignatureDataUrl,
                                fit: [120, 36] as [number, number],
                                margin: [0, 8, 0, 0] as [number, number, number, number],
                              },
                            ]
                          : []),
                        ...(company.stampDataUrl
                          ? [
                              {
                                image: company.stampDataUrl,
                                fit: [90, 60] as [number, number],
                                margin: [0, 8, 0, 0] as [number, number, number, number],
                              },
                            ]
                          : []),
                      ],
                    },
                    {
                      width: '*',
                      stack: [
                        {
                          text: cleanText(quote.signature?.signerName || quote.client.company || 'Client'),
                          fontSize: 9,
                          bold: true,
                          color: '#334155',
                          margin: [0, 0, 0, 6] as [number, number, number, number],
                        },
                        {
                          text: quote.signature?.signedAt
                            ? cleanText(`Date : ${formatDate(quote.signature.signedAt)}`)
                            : 'Date : ',
                          fontSize: 8.5,
                          color: '#475569',
                        },
                        ...(quote.signature?.location
                          ? [
                              {
                                text: cleanText(`Lieu : ${quote.signature.location}`),
                                fontSize: 8.5,
                                color: '#475569',
                                margin: [0, 6, 0, 0] as [number, number, number, number],
                              },
                            ]
                          : []),
                        ...(quote.signature?.clientSignatureDataUrl
                          ? [
                              {
                                image: quote.signature.clientSignatureDataUrl,
                                fit: [120, 36] as [number, number],
                                margin: [0, 8, 0, 0] as [number, number, number, number],
                              },
                            ]
                          : quote.signature?.clientStampDataUrl
                            ? [
                                {
                                  image: quote.signature.clientStampDataUrl,
                                  fit: [90, 60] as [number, number],
                                  margin: [0, 8, 0, 0] as [number, number, number, number],
                                },
                              ]
                            : []),
                      ],
                    },
                  ],
                  columnGap: 24,
                },
              ]
            : []),
      ],
      styles: {},
      defaultStyle: { font: 'Poppins', lineHeight: 1.35 },
    }
  }

  function exportQuote(quote: Quote, company: CompanySettings) {
    if (!pdfMake) {
      console.error('pdfMake non disponible')
      return
    }
    const docDefinition = buildDocDefinition(quote, company)
    const prefix = quote.type === 'invoice' ? 'Facture' : 'Devis'
    pdfMake.createPdf(docDefinition).download(`${prefix}-${quote.number || 'brouillon'}.pdf`)
  }

  return { exportQuote, buildDocDefinition }
}