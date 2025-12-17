// utils/invoiceGenerator.js
import PDFDocument from "pdfkit";

export const generateInvoice = (res, order, items, payments) => {
  const doc = new PDFDocument({ margin: 40 });
  res.setHeader("Content-Type", "application/pdf");
  doc.pipe(res);

  doc.fontSize(18).text("Mehedi Tailors And Fabrics", { align: "center" });
  doc.fontSize(12).text(`Invoice #${order.id}`);
  doc.moveDown();

  items.forEach(i => {
    doc.text(`${i.name} x${i.quantity} - ৳${i.price}`);
  });

  doc.moveDown();
  payments.forEach(p => {
    doc.text(`${p.type}: ৳${p.amount}`);
  });

  doc.text(`Total: ৳${order.total_amount}`, { bold: true });
  doc.end();
};
