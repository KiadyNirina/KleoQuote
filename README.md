# KleoQuote

Générateur de devis. Application web Nuxt 4 permettant de créer, prévisualiser en temps réel et exporter en PDF des devis professionnels.

---

## Fonctionnalités

- Création et édition de devis (numéro, dates, client, objet, description)
- Gestion des prestations (ajout, modification, suppression, total par ligne calculé)
- Calcul automatique des montants : sous-total, remise, taxes, total, acompte, reste à payer
- Choix de la devise (EUR, USD, MAD, GBP, CHF, MGA)
- Aperçu du devis en temps réel (mise à jour à chaque saisie)
- Export PDF A4 (logo, cachet, coordonnées, conditions, bloc « Bon pour accord »)
- Paramètres entreprise (nom, logo, cachet, coordonnées, mentions légales, devise par défaut)
- Persistance locale des brouillons et des paramètres

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Nuxt 4 + Vue 3 |
| Langage | TypeScript (strict) |
| Gestion d'état | Pinia + `pinia-plugin-persistedstate` |
| Styles | Tailwind CSS v4 + shadcn-vue (Reka UI) |
| Validation | Zod |
| Export PDF | `pdfmake` via `nuxt-pdfmake` |
| Tests | Vitest |

---

## Structure du projet

```
app/
├─ components/
│  ├─ company/          # Formulaire paramètres entreprise
│  ├─ form/             # Champs réutilisables (Input, Textarea, Select, Field)
│  └─ quote/            # Formulaire devis, éditeur de prestations, aperçu
├─ composables/
│  ├─ useQuoteCalculations.ts   # Moteur de calcul (fonctions pures)
│  └─ usePdfExport.ts           # Génération PDF
├─ pages/
│  ├─ index.vue         # Éditeur de devis
│  └─ settings.vue      # Paramètres entreprise
├─ stores/
│  ├─ quote.ts          # Devis courant (persisté)
│  └─ company.ts        # Paramètres entreprise (persisté)
└─ utils/
   └─ format.ts         # Formatage monétaire

shared/
├─ types/               # Types partagés (Quote, LineItem, CompanySettings…)
└─ constants/           # Valeurs par défaut
```

---

## Licence

Projet interne Kleonix. Tous droits réservés.