import React from 'react'
import { Link } from 'react-router-dom'

export default function JobCard({ job }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow hover:shadow-md border border-gray-200 transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.company_profiles.legal_name} • {job.location || 'Location not provided'}</p>
        </div>
        <div className="text-right">
          <p className="text-blue-600 font-medium">{job.salary_min || job.salary_max ? `${job.salary_min || ''} - ${job.salary_max || ''}` : 'Salary not provided'}</p>
          <p className="text-sm text-gray-500">{job.job_type.replace('_', ' ')}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">Deadline: {new Date(job.application_deadline).toLocaleDateString()}</p>
        <Link to={`/jobs/${job.job_id}`} className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md">View Details</Link>
      </div>
    </div>
  )
}
