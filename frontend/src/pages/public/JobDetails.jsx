import React from 'react'
import { useParams } from 'react-router-dom'
import { jobs } from '../../data/jobs'

export default function JobDetails() {
  const { id } = useParams()
  const job = jobs.find(j => j.id === id)

  if (!job) return <div>Job not found</div>

  return (
    <div className="bg-white p-6 rounded shadow-sm">
      <h1 className="text-2xl font-semibold">{job.title}</h1>
      <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded">
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Type:</strong> {job.type}</p>
          <p><strong>Deadline:</strong> {job.deadline}</p>
        </div>
        <div className="md:col-span-2">
          <h3 className="font-semibold">Description</h3>
          <p className="text-gray-700 mt-2">{job.description}</p>

          <h3 className="font-semibold mt-4">Requirements</h3>
          <ul className="list-disc ml-6 text-gray-700 mt-2">
            {job.requirements.map((r, i)=> <li key={i}>{r}</li>)}
          </ul>

          <h3 className="font-semibold mt-4">Eligibility</h3>
          <p className="text-gray-700">Minimum CGPA: {job.eligibility.cgpa}</p>
          <p className="text-gray-700">Eligible Branches: {job.eligibility.branches.join(', ')}</p>

          <div className="mt-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Apply</button>
          </div>
        </div>
      </div>
    </div>
  )
}
