import React from 'react'

export default function AdminDashboard() {
  const stats = []
  const recent = []

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.length ? stats.map(s => (
          <div key={s.label} className="bg-white p-4 rounded shadow-sm border text-center">
            <div className="text-xl font-bold text-blue-600">{s.value}</div>
            <div className="text-sm text-gray-600">{s.label}</div>
          </div>
        )) : <p className="text-gray-500">No platform statistics are available.</p>}
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
            {recent.length ? recent.map(r => (
              <tr key={r.id} className="border-t">
                <td className="py-2">{r.activity}</td>
                <td className="py-2 text-gray-600">{r.date}</td>
              </tr>
            )) : <tr><td colSpan="2" className="py-4 text-gray-500">No recent activity.</td></tr>}
          </tbody>
        </table>
      </section>
    </div>
  )
}
