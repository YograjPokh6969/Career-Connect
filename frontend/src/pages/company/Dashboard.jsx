import React, { useEffect, useState } from 'react'
import { apiRequest } from '../../utils/api'

export default function CompanyDashboard() {
  const [dashboard, setDashboard] = useState({ jobs: [], applicants: [] })
  const [error, setError] = useState('')

  useEffect(() => {
    apiRequest('/company/dashboard')
      .then(({ data }) => setDashboard(data))
      .catch((requestError) => setError(requestError.message))
  }, [])

  const { jobs, applicants } = dashboard
  const stats = [
    { label: 'Jobs Posted', value: jobs.length },
    { label: 'Applicants', value: applicants.length },
    { label: 'Shortlisted', value: applicants.filter(a => a.status === 'shortlisted').length },
    { label: 'Interviews', value: 0 },
  ]
  const recent = applicants.slice(0, 5)

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Company Dashboard</h1>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white p-4 rounded shadow-sm border text-center">
            <div className="text-xl font-bold text-blue-600">{s.value}</div>
            <div className="text-sm text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>

      <section className="mt-6 bg-white p-4 rounded shadow-sm border">
        <h2 className="font-semibold mb-2">Recent Applicants</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-600">
              <th>Name</th>
              <th>Applied For</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recent.length ? recent.map(r => (
              <tr key={r.application_id} className="border-t">
                <td className="py-2">{r.student_profiles.users.full_name}</td>
                <td className="py-2 text-gray-600">{r.job_postings.title}</td>
                <td className="py-2 text-gray-600">{new Date(r.applied_at).toLocaleDateString()}</td>
              </tr>
            )) : <tr><td colSpan="3" className="py-4 text-gray-500">No applicants yet.</td></tr>}
          </tbody>
        </table>
      </section>
    </div>
  )
}
