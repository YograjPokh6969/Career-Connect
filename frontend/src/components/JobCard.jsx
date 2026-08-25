import React from 'react'
import { Link } from 'react-router-dom'

export default function JobCard({ job }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow hover:shadow-md border border-gray-200 transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
        </div>
        <div className="text-right">
          <p className="text-blue-600 font-medium">{job.salary}</p>
          <p className="text-sm text-gray-500">{job.type}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">Deadline: {job.deadline}</p>
        <Link to={`/jobs/${job.id}`} className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md">View Details</Link>
      </div>
    </div>
  )
}
