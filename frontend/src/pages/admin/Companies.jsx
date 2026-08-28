import React from 'react'

const companies = []

export default function AdminCompanies() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Manage Companies</h1>
      <div className="bg-white p-4 rounded shadow-sm border">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-600">
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.length ? companies.map(c => (
              <tr key={c.id} className="border-t">
                <td className="py-2">{c.name}</td>
                <td className="py-2 text-gray-600">{c.email}</td>
                <td className="py-2">
                  <button className="text-sm text-blue-600 mr-2">View</button>
                  <button className="text-sm text-green-600 mr-2">Approve</button>
                  <button className="text-sm text-red-600">Reject</button>
                </td>
              </tr>
            )) : <tr><td colSpan="3" className="py-4 text-gray-500">No company data is available.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
