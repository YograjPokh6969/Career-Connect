import React, { useEffect, useState } from 'react'
import { apiRequest } from '../../utils/api'

export default function CompanyApplicants() {
  const [applicants, setApplicants] = useState([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    apiRequest('/company/dashboard')
      .then(({ data }) => setApplicants(data.applicants || []))
      .catch((requestError) => setError(requestError.message))
  }, [])

  const updateStatus = async (applicationId, status) => {
    setError('')
    setMessage('')
    try {
      const { data } = await apiRequest(`/company/applications/${applicationId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
      setApplicants(current => current.map(app => app.application_id === applicationId ? { ...app, status: data.status } : app))
      setMessage('Application status updated.')
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Applicants</h1>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

      <div className="bg-white p-4 rounded shadow-sm border">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-600">
              <th>Student Name</th>
              <th>Branch</th>
              <th>CGPA</th>
              <th>Applied</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.length ? applicants.map(a => (
              <tr key={a.application_id} className="border-t">
                <td className="py-2">{a.student_profiles.users.full_name}</td>
                <td className="py-2 text-gray-600">{a.student_profiles.department}</td>
                <td className="py-2 text-gray-600">{a.student_profiles.cgpa || 'Not provided'}</td>
                <td className="py-2 text-gray-600">{new Date(a.applied_at).toLocaleDateString()}</td>
                <td className="py-2">{a.status}</td>
                <td className="py-2">
                  <button onClick={() => updateStatus(a.application_id, 'shortlisted')} className="text-sm text-green-600 mr-2">Shortlist</button>
                  <button onClick={() => updateStatus(a.application_id, 'rejected')} className="text-sm text-red-600">Reject</button>
                </td>
              </tr>
            )) : <tr><td colSpan="6" className="py-4 text-gray-500">No applicants yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
