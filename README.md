# KleoQuote

Quote generator. Nuxt 4 web application to create, preview in real time, and export professional quotes as PDF.

---

## Features

- Create and edit quotes (number, dates, client, subject, description)
- Manage line items (add, edit, delete, per-line total calculated)
- Automatic amount calculations: subtotal, discount, taxes, total, deposit, remaining balance
- Currency selection (EUR, USD, MAD, GBP, CHF, MGA)
- Real-time quote preview (updates on every keystroke)
- A4 PDF export (logo, stamp, contact details, conditions, "Bon pour accord" signature block)
- Company settings (name, logo, stamp, contact details, legal information, default currency)
- Local persistence of drafts and settings

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
│  └─ quote/            # Quote form, line items editor, preview
├─ composables/
│  ├─ useQuoteCalculations.ts   # Calculation engine (pure functions)
│  └─ usePdfExport.ts           # PDF generation
├─ pages/
│  ├─ index.vue         # Quote editor
│  └─ settings.vue      # Company settings
├─ stores/
│  ├─ quote.ts          # Current quote (persisted)
│  └─ company.ts        # Company settings (persisted)
└─ utils/
   └─ format.ts         # Currency formatting

shared/
├─ types/               # Shared types (Quote, LineItem, CompanySettings…)
└─ constants/           # Default values
```

---

## License

Internal Kleonix project. All rights reserved.