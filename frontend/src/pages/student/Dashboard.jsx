import React, { useEffect, useState } from 'react'
import { apiRequest } from '../../utils/api'

export default function StudentDashboard() {
  const [applications, setApplications] = useState([])
  const [availableJobs, setAvailableJobs] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    apiRequest('/students/dashboard')
      .then(({ data }) => {
        setApplications(data.applications || [])
        setAvailableJobs(data.availableJobs || [])
      })
      .catch((requestError) => setError(requestError.message))
  }, [])

  const stats = [
    { label: 'Jobs Applied', value: applications.length },
    { label: 'Shortlisted', value: applications.filter(a => a.status === 'shortlisted').length },
    { label: 'Upcoming Interviews', value: 0 },
    { label: 'Offers', value: applications.filter(a => a.status === 'selected').length },
  ]
  const recent = applications.slice(0, 5)

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Student Dashboard</h1>
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
            {recent.length ? recent.map(r => (
              <tr key={r.application_id} className="border-t">
                <td className="py-2">{r.job_postings.title}</td>
                <td className="py-2 text-gray-600">{r.job_postings.company_id}</td>
                <td className="py-2 text-gray-600">{new Date(r.applied_at).toLocaleDateString()}</td>
                <td className="py-2">{r.status}</td>
              </tr>
            )) : <tr><td colSpan="4" className="py-4 text-gray-500">No applications yet.</td></tr>}
          </tbody>
        </table>
      </section>

      <section className="mt-6 bg-white p-4 rounded shadow-sm border">
        <h2 className="font-semibold mb-2">Available Jobs</h2>
        {availableJobs.length ? <div className="space-y-3">
          {availableJobs.map(job => <div key={job.job_id} className="border-t pt-3">
            <div className="font-medium">{job.title}</div>
            <div className="text-sm text-gray-600">{job.company_profiles?.legal_name || 'Company'} · {job.location || 'Location not provided'}</div>
            <div className="text-sm text-gray-500">Apply by {new Date(job.application_deadline).toLocaleDateString()}</div>
          </div>)}
        </div> : <p className="text-gray-500">No open jobs are available.</p>}
      </section>
    </div>
  )
}
