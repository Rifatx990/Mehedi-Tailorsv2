// utils/invoiceGenerator.js
import PDFDocument from "pdfkit";

export const generateInvoicePDF = (res, invoice, order, items, payments) => {
  const doc = new PDFDocument({ margin: 40 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice_${invoice.invoice_number}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(18).text("Mehedi Tailors And Fabrics", { align: "center" });
  doc.fontSize(10).text("Professional Tailoring & Fabrics", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Invoice #: ${invoice.invoice_number}`);
  doc.text(`Order ID: ${order.id}`);
  doc.text(`Date: ${new Date(invoice.created_at).toDateString()}`);
  doc.moveDown();

  doc.text("Items:");
  items.forEach(i => {
    doc.text(`• ${i.name} x${i.quantity} — ৳${i.price}`);
  });

  doc.moveDown();
  doc.text(`Order Total: ৳${invoice.total_amount}`);
  doc.text(`Paid Amount: ৳${invoice.paid_amount}`);
  doc.text(`Due Amount: ৳${invoice.total_amount - invoice.paid_amount}`);

  doc.moveDown();
  doc.text("Thank you for your business!", { align: "center" });

  doc.end();
};
