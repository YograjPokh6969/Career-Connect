import React, { useEffect, useState } from 'react'
import { apiRequest } from '../../utils/api'

export default function CompanyJobs() {
  const [jobs, setJobs] = useState([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    apiRequest('/company/jobs')
      .then(({ data }) => setJobs(data))
      .catch((requestError) => setError(requestError.message))
  }, [])

  const publishJob = async (jobId) => {
    setError('')
    setMessage('')
    try {
      await apiRequest(`/company/jobs/${jobId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'open' }),
      })
      setJobs(current => current.map(job => job.job_id === jobId ? { ...job, status: 'open' } : job))
      setMessage('Job published and visible to students.')
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const removeJob = async (jobId) => {
    if (!window.confirm('Remove this job from student listings? Existing applications will be kept.')) return
    setError('')
    setMessage('')
    try {
      await apiRequest(`/company/jobs/${jobId}`, { method: 'DELETE' })
      setJobs(current => current.filter(job => job.job_id !== jobId))
      setMessage('Job removed successfully.')
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Manage Jobs</h1>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

      <div className="bg-white p-4 rounded shadow-sm border">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-600">
              <th>Job Title</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length ? jobs.map(j => (
              <tr key={j.job_id} className="border-t">
                <td className="py-2">{j.title}</td>
                <td className="py-2 text-gray-600">{j.location || 'Not provided'}</td>
                <td className="py-2 text-gray-600">{j.salary_min || j.salary_max ? `${j.salary_min || ''} - ${j.salary_max || ''}` : 'Not provided'}</td>
                <td className="py-2 text-gray-600">{new Date(j.application_deadline).toLocaleDateString()}</td>
                <td className="py-2">{j.status}</td>
                <td className="py-2">
                  {j.status === 'draft' && <button onClick={() => publishJob(j.job_id)} className="text-sm text-green-600 mr-3">Publish</button>}
                  <button onClick={() => removeJob(j.job_id)} className="text-sm text-red-600">Remove</button>
                </td>
              </tr>
            )) : <tr><td colSpan="6" className="py-4 text-gray-500">No jobs posted yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
