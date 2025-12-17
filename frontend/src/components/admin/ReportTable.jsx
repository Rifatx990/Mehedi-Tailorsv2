// components/admin/ReportTable.jsx
export default function ReportTable({ columns, data }) {
  return (
    <table className="w-full bg-white shadow">
      <thead>
        <tr className="bg-gray-200">
          {columns.map(c => (
            <th key={c} className="p-2">{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-t">
            {columns.map(c => (
              <td key={c} className="p-2">{row[c]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
