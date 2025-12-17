// utils/csvExporter.js
export const toCSV = (data) => {
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map(row => Object.values(row).join(","));
  return [headers, ...rows].join("\n");
};
