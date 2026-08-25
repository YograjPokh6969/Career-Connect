import React from 'react'

const applicants = [
  { id: '1', name: 'Alex Student', branch: 'CSE', cgpa: 8.2, date: '2026-08-05', status: 'Applied' },
  { id: '2', name: 'Riya Candidate', branch: 'IT', cgpa: 7.8, date: '2026-07-28', status: 'Shortlisted' },
]

export default function CompanyApplicants() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Applicants</h1>

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
            {applicants.map(a => (
              <tr key={a.id} className="border-t">
                <td className="py-2">{a.name}</td>
                <td className="py-2 text-gray-600">{a.branch}</td>
                <td className="py-2 text-gray-600">{a.cgpa}</td>
                <td className="py-2 text-gray-600">{a.date}</td>
                <td className="py-2">{a.status}</td>
                <td className="py-2">
                  <button className="text-sm text-blue-600 mr-2">View</button>
                  <button className="text-sm text-green-600 mr-2">Shortlist</button>
                  <button className="text-sm text-red-600">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
