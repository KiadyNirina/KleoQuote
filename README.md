# KleoQuote

Quote and invoice generator. Nuxt 4 web application to create, preview in real time, and export professional documents as PDF.

---

## Features

- Create and edit quotes and invoices (number, dates, client, subject, description)
- Manage line items (add, edit, delete, drag and drop reorder, per-line total calculated)
- Automatic amount calculations: subtotal, discount, taxes, total, deposit, remaining balance
- Currency selection (EUR, USD, MAD, GBP, CHF, MGA)
- Real-time document preview (updates on every keystroke)
- A4 PDF export (logo, stamp, contact details, conditions, signature block for quotes)
- Company settings (name, logo, stamp, contact details, legal information, default currency)
- Local history of saved documents (save, open, duplicate, delete)
- Local persistence of drafts, settings and history
- Clean landing page, terms of use, custom confirmation dialogs and toast notifications

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 4 + Vue 3 |
| Language | TypeScript (strict) |
| State management | Pinia + `pinia-plugin-persistedstate` |
| Styling | Tailwind CSS v4 + shadcn-vue (Reka UI) |
| Validation | Zod |
| PDF export | `pdfmake` via `nuxt-pdfmake` |
| Testing | Vitest |

---

## Project structure

```
app/
├─ components/
│  ├─ company/          # Company settings form
│  ├─ form/             # Reusable fields (Input, Textarea, Select, Field)
│  ├─ quote/            # Quote form, line items editor, preview
│  └─ ui/               # Confirm dialog, toast
├─ composables/
│  ├─ useQuoteCalculations.ts   # Calculation engine (pure functions)
│  └─ usePdfExport.ts           # PDF generation
├─ pages/
│  ├─ index.vue         # Landing page
│  ├─ devis.vue         # Quote and invoice editor
│  ├─ history.vue       # Saved documents history
│  ├─ settings.vue      # Company settings
│  └─ terms.vue         # Terms of use
├─ stores/
│  ├─ quote.ts          # Current document (persisted)
│  ├─ company.ts        # Company settings (persisted)
│  └─ history.ts        # Saved documents (persisted)
└─ utils/
   └─ format.ts         # Currency formatting

shared/
├─ types/               # Shared types (Quote, LineItem, CompanySettings…)
└─ constants/           # Default values
```

---

## License

Internal Kleonix project. All rights reserved.