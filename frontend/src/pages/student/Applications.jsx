import React, { useEffect, useState } from 'react'
import { apiRequest } from '../../utils/api'

export default function StudentApplications() {
  const [apps, setApps] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    apiRequest('/students/applications')
      .then(({ data }) => setApps(data || []))
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My Applications</h1>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

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
            {apps.length ? apps.map(a => (
              <tr key={a.application_id} className="border-t">
                <td className="py-2">{a.job_postings.title}</td>
                <td className="py-2 text-gray-600">{a.job_postings.company_id}</td>
                <td className="py-2 text-gray-600">{new Date(a.applied_at).toLocaleDateString()}</td>
                <td className="py-2">{a.status}</td>
              </tr>
            )) : <tr><td colSpan="4" className="py-4 text-gray-500">No applications yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
