import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiRequest } from '../../utils/api'
import { getUser } from '../../utils/auth'

export default function JobDetails() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    apiRequest('/public/jobs')
      .then(({ data }) => setJob(data.find(item => item.job_id === id)))
      .catch((requestError) => setError(requestError.message))
  }, [id])

  if (error) return <div className="text-red-600">{error}</div>
  if (!job) return <div>Job not found</div>

  return (
    <div className="bg-white p-6 rounded shadow-sm">
      <h1 className="text-2xl font-semibold">{job.title}</h1>
      <p className="text-sm text-gray-600">{job.company_profiles.legal_name} • {job.location || 'Location not provided'}</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded">
          <p><strong>Salary:</strong> {job.salary_min || job.salary_max ? `${job.salary_min || ''} - ${job.salary_max || ''}` : 'Not provided'}</p>
          <p><strong>Type:</strong> {job.job_type}</p>
          <p><strong>Deadline:</strong> {new Date(job.application_deadline).toLocaleDateString()}</p>
        </div>
        <div className="md:col-span-2">
          <h3 className="font-semibold">Description</h3>
          <p className="text-gray-700 mt-2">{job.description}</p>

          <h3 className="font-semibold mt-4">Requirements</h3>
          <ul className="list-disc ml-6 text-gray-700 mt-2">
            <li>No requirements provided.</li>
          </ul>

          <h3 className="font-semibold mt-4">Eligibility</h3>
          <p className="text-gray-700">Minimum CGPA: {job.min_cgpa || 'Not specified'}</p>
          <p className="text-gray-700">Eligible Department: {job.eligible_department || 'Not specified'}</p>

          <div className="mt-6">
            {getUser()?.role === 'student' && <button onClick={async () => {
              setError('')
              setMessage('')
              try {
                await apiRequest(`/students/jobs/${job.job_id}/apply`, { method: 'POST', body: JSON.stringify({}) })
                setMessage('Application submitted successfully.')
              } catch (requestError) {
                setError(requestError.message)
              }
            }} className="bg-blue-600 text-white px-4 py-2 rounded">Apply</button>}
            {getUser()?.role !== 'student' && <p className="text-gray-500">Log in as a student to apply.</p>}
            {message && <p className="mt-2 text-green-600">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
