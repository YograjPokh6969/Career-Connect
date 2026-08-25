import React from 'react'

export default function StudentDashboard() {
  // Dummy stats
  const stats = [
    { label: 'Jobs Applied', value: 5 },
    { label: 'Shortlisted', value: 1 },
    { label: 'Upcoming Interviews', value: 2 },
    { label: 'Offers', value: 0 },
  ]

  const recent = [
    { id: '1', title: 'Frontend Developer', company: 'TechCorp', date: '2026-08-01', status: 'Applied' },
    { id: '2', title: 'Data Analyst Intern', company: 'DataWorks', date: '2026-07-20', status: 'Shortlisted' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Student Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white p-4 rounded shadow-sm border text-center">
            <div className="text-xl font-bold text-blue-600">{s.value}</div>
            <div className="text-sm text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>

      <section className="mt-6 bg-white p-4 rounded shadow-sm border">
        <h2 className="font-semibold mb-2">Recent Applications</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-600">
              <th>Job</th>
              <th>Company</th>
              <th>Applied</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recent.map(r => (
              <tr key={r.id} className="border-t">
                <td className="py-2">{r.title}</td>
                <td className="py-2 text-gray-600">{r.company}</td>
                <td className="py-2 text-gray-600">{r.date}</td>
                <td className="py-2">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
