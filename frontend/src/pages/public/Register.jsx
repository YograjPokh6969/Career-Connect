import React, { useState } from 'react'

export default function Register() {
  const [role, setRole] = useState('student')
  const [branch, setBranch] = useState('BE CSE')
  const [graduationYear, setGraduationYear] = useState(new Date().getFullYear())

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app we'd send data to backend. For now show a message and reload the page.
    alert('Register submitted (frontend only)')
    window.location.reload()
  }

  const gradYears = []
  const start = new Date().getFullYear() - 1
  for (let i = 0; i < 8; i++) gradYears.push(start + i)

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <div className="mb-4">
        <label className="mr-4">Role:</label>
        <label className="mr-2"><input type="radio" checked={role==='student'} onChange={()=>setRole('student')} /> Student</label>
        <label><input type="radio" checked={role==='company'} onChange={()=>setRole('company')} /> Company</label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {role === 'student' ? (
          <>
            <div>
              <label className="block text-sm text-gray-700">Name</label>
              <input className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Email</label>
              <input className="w-full border rounded px-3 py-2" type="email" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700">Password</label>
                <input className="w-full border rounded px-3 py-2" type="password" required />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Confirm Password</label>
                <input className="w-full border rounded px-3 py-2" type="password" required />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-700">Branch</label>
                <select value={branch} onChange={e=>setBranch(e.target.value)} className="w-full border rounded px-3 py-2">
                  <option>BE CSE</option>
                  <option>BCA</option>
                  <option>Nursing</option>
                  <option>Pharmacy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700">CGPA</label>
                <input placeholder="CGPA" className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm text-gray-700">Graduation Year</label>
                <select value={graduationYear} onChange={e=>setGraduationYear(e.target.value)} className="w-full border rounded px-3 py-2">
                  {gradYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm text-gray-700">Company Name</label>
              <input className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Email</label>
              <input className="w-full border rounded px-3 py-2" type="email" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Password" className="border rounded px-3 py-2" />
              <input placeholder="Confirm Password" className="border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Website</label>
              <input className="w-full border rounded px-3 py-2" />
            </div>
          </>
        )}

        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
        </div>
      </form>
    </div>
  )
}
