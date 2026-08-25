import React from 'react'
import { jobs } from '../../data/jobs'

export default function CompanyJobs() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Manage Jobs</h1>

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
            {jobs.map(j => (
              <tr key={j.id} className="border-t">
                <td className="py-2">{j.title}</td>
                <td className="py-2 text-gray-600">{j.location}</td>
                <td className="py-2 text-gray-600">{j.salary}</td>
                <td className="py-2 text-gray-600">{j.deadline}</td>
                <td className="py-2">Active</td>
                <td className="py-2">
                  <button className="text-sm text-blue-600 mr-2">Edit</button>
                  <button className="text-sm text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
