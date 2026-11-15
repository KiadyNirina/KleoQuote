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

  function buildDocDefinition(quote: Quote, company: CompanySettings): TDocumentDefinitions {
    const totals = computeQuoteTotals(quote)

    // Lignes du tableau des prestations
    const itemsBody = quote.items.length
      ? quote.items.map((item: LineItem) => [
          { text: item.name || '—', fontSize: 9 },
          { text: String(item.quantity), fontSize: 9, alignment: 'right' as const },
          { text: formatMoney(item.unitPrice, quote.currency), fontSize: 9, alignment: 'right' as const },
          { text: formatMoney(computeLineTotal(item), quote.currency), fontSize: 9, alignment: 'right' as const },
        ])
      : [[{ text: 'Aucune prestation', colSpan: 4, alignment: 'center' as const, italics: true, color: '#999' }, {}, {}, {}]]

    // Récapitulatif financier
    const totalsLines: any[] = [
      { text: `Sous-total : ${formatMoney(totals.subtotal, quote.currency)}`, alignment: 'right' as const, fontSize: 9, margin: [0, 2, 0, 0] },
    ]
    if (totals.discount > 0) {
      totalsLines.push({ text: `Remise : − ${formatMoney(totals.discount, quote.currency)}`, alignment: 'right' as const, fontSize: 9 })
    }
    for (const tax of quote.taxes) {
      const taxAmount = (totals.subtotal - totals.discount) * tax.rate / 100
      totalsLines.push({ text: `${tax.label || 'Taxe'} (${tax.rate}%) : ${formatMoney(taxAmount, quote.currency)}`, alignment: 'right' as const, fontSize: 9 })
    }
    totalsLines.push({ text: `TOTAL : ${formatMoney(totals.total, quote.currency)}`, alignment: 'right' as const, bold: true, fontSize: 11, margin: [0, 4, 0, 0] })
    if (totals.depositAmount > 0) {
      totalsLines.push({ text: `Acompte : ${formatMoney(totals.depositAmount, quote.currency)}`, alignment: 'right' as const, fontSize: 9 })
      totalsLines.push({ text: `Reste à payer : ${formatMoney(totals.remaining, quote.currency)}`, alignment: 'right' as const, bold: true, fontSize: 10 })
    }

    // Conditions
    const conditionsParts: any[] = []
    if (quote.deliveryDelay) {
      conditionsParts.push({ text: `Délai de réalisation : ${quote.deliveryDelay}`, fontSize: 8, margin: [0, 2, 0, 0] })
    }
    if (quote.paymentTerms) {
      conditionsParts.push({ text: `Modalités de paiement : ${quote.paymentTerms}`, fontSize: 8, margin: [0, 2, 0, 0] })
    }
    if (quote.conditions.included.length) {
      conditionsParts.push({ text: 'Inclus :', fontSize: 8, bold: true, margin: [0, 4, 0, 1] })
      conditionsParts.push({ ul: [...quote.conditions.included], fontSize: 8 })
    }
    if (quote.conditions.excluded.length) {
      conditionsParts.push({ text: 'Non inclus :', fontSize: 8, bold: true, margin: [0, 4, 0, 1] })
      conditionsParts.push({ ul: [...quote.conditions.excluded], fontSize: 8 })
    }
    if (quote.conditions.maintenance) {
      conditionsParts.push({ text: `Maintenance : ${quote.conditions.maintenance}`, fontSize: 8, margin: [0, 4, 0, 0] })
    }
    if (quote.conditions.otherNotes) {
      conditionsParts.push({ text: `Remarques : ${quote.conditions.otherNotes}`, fontSize: 8, margin: [0, 4, 0, 0] })
    }

    return {
      pageSize: 'A4',
      pageMargins: [40, 50, 40, 50] as [number, number, number, number],
      content: [
        // En-tête : logo + coordonnées / numéro de devis
        {
          columns: [
            {
              width: '*',
              stack: [
                ...(company.logoDataUrl
                  ? [{ image: company.logoDataUrl, width: 80, margin: [0, 0, 0, 4] as [number, number, number, number] }]
                  : []),
                { text: company.name || 'Kleonix', fontSize: 16, bold: true },
                { text: company.address || '', fontSize: 8, color: '#555' },
                { text: company.email || '', fontSize: 8, color: '#555' },
                { text: company.phone || '', fontSize: 8, color: '#555' },
                { text: company.website || '', fontSize: 8, color: '#555' },
              ],
            },
            {
              width: 'auto',
              alignment: 'right' as const,
              stack: [
                { text: 'DEVIS', fontSize: 10, color: '#888' },
                { text: quote.number || '—', fontSize: 14, bold: true },
                { text: `Émis le ${formatDate(quote.createdAt)}`, fontSize: 8, color: '#555', margin: [0, 4, 0, 0] as [number, number, number, number] },
                { text: `Valide jusqu'au ${formatDate(quote.validUntil)}`, fontSize: 8, color: '#555' },
              ],
            },
          ],
          margin: [0, 0, 0, 20] as [number, number, number, number],
        },

        // Client
        {
          stack: [
            { text: 'CLIENT', fontSize: 8, color: '#888', margin: [0, 0, 0, 2] as [number, number, number, number] },
            { text: quote.client.company || '—', fontSize: 10, bold: true },
            { text: quote.client.contactName || '', fontSize: 8, color: '#555' },
            { text: quote.client.address || '', fontSize: 8, color: '#555' },
            { text: quote.client.email || '', fontSize: 8, color: '#555' },
            { text: quote.client.phone || '', fontSize: 8, color: '#555' },
          ],
          margin: [0, 0, 0, 16] as [number, number, number, number],
        },

        // Objet
        ...(quote.title
          ? [
              { text: 'OBJET', fontSize: 8, color: '#888', margin: [0, 0, 0, 2] as [number, number, number, number] },
              { text: quote.title, fontSize: 10, bold: true },
              ...(quote.description
                ? [{ text: quote.description, fontSize: 8, color: '#555', margin: [0, 2, 0, 0] as [number, number, number, number] }]
                : []),
              { text: '', margin: [0, 0, 0, 12] as [number, number, number, number] },
            ]
          : []),

        // Tableau des prestations
        {
          table: {
            headerRows: 1,
            widths: ['*', 40, 70, 80],
            body: [
              [
                { text: 'Prestation', fontSize: 9, bold: true },
                { text: 'Qté', fontSize: 9, bold: true, alignment: 'right' as const },
                { text: 'PU', fontSize: 9, bold: true, alignment: 'right' as const },
                { text: 'Total', fontSize: 9, bold: true, alignment: 'right' as const },
              ],
              ...itemsBody,
            ],
          },
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 16] as [number, number, number, number],
        },

        // Récapitulatif financier
        { stack: totalsLines, margin: [0, 0, 0, 16] as [number, number, number, number] },

        // Conditions
        ...(conditionsParts.length
          ? [
              { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: '#ddd' }] },
              { text: 'CONDITIONS', fontSize: 8, color: '#888', margin: [0, 8, 0, 4] as [number, number, number, number] },
              ...conditionsParts,
            ]
          : []),

        // Bon pour accord
        {
          margin: [0, 30, 0, 0] as [number, number, number, number],
          stack: [
            { text: 'Bon pour accord', fontSize: 9, bold: true, margin: [0, 0, 0, 8] as [number, number, number, number] },
            {
              columns: [
                {
                  width: '*',
                  stack: [
                    { text: company.name || 'Kleonix', fontSize: 9, bold: true, margin: [0, 0, 0, 6] as [number, number, number, number] },
                    { text: 'Date : ____________________', fontSize: 8, color: '#555', margin: [0, 2, 0, 0] as [number, number, number, number] },
                    { text: 'Signature : ____________________', fontSize: 8, color: '#555', margin: [0, 2, 0, 0] as [number, number, number, number] },
                    ...(company.stampDataUrl
                      ? [{ image: company.stampDataUrl, width: 70, margin: [0, 8, 0, 0] as [number, number, number, number] }]
                      : []),
                  ],
                },
                {
                  width: '*',
                  stack: [
                    { text: quote.client.company || 'Client', fontSize: 9, bold: true, margin: [0, 0, 0, 6] as [number, number, number, number] },
                    { text: 'Date : ____________________', fontSize: 8, color: '#555', margin: [0, 2, 0, 0] as [number, number, number, number] },
                    { text: 'Signature : ____________________', fontSize: 8, color: '#555', margin: [0, 2, 0, 0] as [number, number, number, number] },
                    { text: 'Nom : ____________________', fontSize: 8, color: '#555', margin: [0, 2, 0, 0] as [number, number, number, number] },
                    { text: 'Cachet : ____________________', fontSize: 8, color: '#555', margin: [0, 2, 0, 0] as [number, number, number, number] },
                  ],
                },
              ],
              columnGap: 20,
            },
          ],
        },
      ],
      styles: {},
      defaultStyle: { font: 'Roboto' },
    }
  }

  function exportQuote(quote: Quote, company: CompanySettings) {
    if (!pdfMake) {
      console.error('pdfMake non disponible')
      return
    }
    const docDefinition = buildDocDefinition(quote, company)
    pdfMake.createPdf(docDefinition).download(`Devis-${quote.number || 'brouillon'}.pdf`)
  }

  return { exportQuote, buildDocDefinition }
}