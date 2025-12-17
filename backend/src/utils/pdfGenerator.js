// utils/pdfGenerator.js
import PDFDocument from "pdfkit";

export const generatePDF = (res, title, rows) => {
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  doc.pipe(res);

  doc.fontSize(18).text(title, { align: "center" });
  doc.moveDown();

  rows.forEach(r => {
    doc.fontSize(12).text(JSON.stringify(r));
  });

  doc.end();
};
