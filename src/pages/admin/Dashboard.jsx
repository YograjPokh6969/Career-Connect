import React from 'react'

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Students', value: 1200 },
    { label: 'Total Companies', value: 65 },
    { label: 'Active Jobs', value: 210 },
    { label: 'Total Applications', value: 5400 },
  ]

  const recent = [
    { id: '1', activity: 'Company FinServe registered', date: '2026-08-05' },
    { id: '2', activity: 'Job posted: Frontend Developer', date: '2026-08-04' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white p-4 rounded shadow-sm border text-center">
            <div className="text-xl font-bold text-blue-600">{s.value}</div>
            <div className="text-sm text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>

      <section className="mt-6 bg-white p-4 rounded shadow-sm border">
        <h2 className="font-semibold mb-2">Recent Activity</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-600">
              <th>Activity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recent.map(r => (
              <tr key={r.id} className="border-t">
                <td className="py-2">{r.activity}</td>
                <td className="py-2 text-gray-600">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
