import React from 'react'

export default function StudentApplications() {
  const apps = [
    { id: '1', job: 'Frontend Developer', company: 'TechCorp', date: '2026-08-01', status: 'Applied' },
    { id: '2', job: 'Data Analyst Intern', company: 'DataWorks', date: '2026-07-20', status: 'Shortlisted' },
    { id: '3', job: 'Backend Engineer', company: 'FinServe', date: '2026-06-10', status: 'Rejected' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My Applications</h1>

      <div className="bg-white p-4 rounded shadow-sm border">
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
            {apps.map(a => (
              <tr key={a.id} className="border-t">
                <td className="py-2">{a.job}</td>
                <td className="py-2 text-gray-600">{a.company}</td>
                <td className="py-2 text-gray-600">{a.date}</td>
                <td className="py-2">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
