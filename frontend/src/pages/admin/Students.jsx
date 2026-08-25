import React from 'react'

const students = [
  { id: '1', name: 'Alex Student', email: 'alex@student.edu', branch: 'CSE' },
  { id: '2', name: 'Priya Learner', email: 'priya@student.edu', branch: 'IT' },
]

export default function AdminStudents() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Manage Students</h1>
      <div className="bg-white p-4 rounded shadow-sm border">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-600">
              <th>Name</th>
              <th>Email</th>
              <th>Branch</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-t">
                <td className="py-2">{s.name}</td>
                <td className="py-2 text-gray-600">{s.email}</td>
                <td className="py-2 text-gray-600">{s.branch}</td>
                <td className="py-2">
                  <button className="text-sm text-blue-600 mr-2">View</button>
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
