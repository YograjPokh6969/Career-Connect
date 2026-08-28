import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../../utils/api'

export default function Register() {
  const [role, setRole] = useState('student')
  const [branch, setBranch] = useState('BE CSE')
  const [graduationYear, setGraduationYear] = useState(new Date().getFullYear())
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    if (formData.get('password') !== formData.get('confirmPassword')) {
      setError('Passwords do not match')
      return
    }
    setError('')
    setLoading(true)
    const payload = Object.fromEntries(formData.entries())
    delete payload.confirmPassword
    try {
      await apiRequest(`/auth/register/${role}`, {
        method: 'POST',
        body: JSON.stringify({
          ...payload,
          full_name: payload.full_name || payload.legal_name,
          department: payload.department || payload.branch,
          degree: payload.degree || payload.branch,
        }),
      })
      navigate('/login')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  const gradYears = []
  const start = new Date().getFullYear() - 1
  for (let i = 0; i < 8; i++) gradYears.push(start + i)

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
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
              <input name="full_name" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Email</label>
              <input name="email" className="w-full border rounded px-3 py-2" type="email" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700">Password</label>
                <input name="password" className="w-full border rounded px-3 py-2" type="password" required />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Confirm Password</label>
                <input name="confirmPassword" className="w-full border rounded px-3 py-2" type="password" required />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-700">University Roll No.</label>
                <input name="university_roll_no" className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Branch</label>
                <select name="branch" value={branch} onChange={e=>setBranch(e.target.value)} className="w-full border rounded px-3 py-2">
                  <option>BE CSE</option>
                  <option>BCA</option>
                  <option>Nursing</option>
                  <option>Pharmacy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700">CGPA</label>
                <input name="cgpa" placeholder="CGPA" className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm text-gray-700">Graduation Year</label>
                <select name="graduation_year" value={graduationYear} onChange={e=>setGraduationYear(e.target.value)} className="w-full border rounded px-3 py-2">
                  {gradYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm text-gray-700">Company Name</label>
              <input name="legal_name" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Email</label>
              <input name="email" className="w-full border rounded px-3 py-2" type="email" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input name="password" placeholder="Password" className="border rounded px-3 py-2" required type="password" />
              <input name="confirmPassword" placeholder="Confirm Password" className="border rounded px-3 py-2" required type="password" />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Website</label>
              <input name="website" className="w-full border rounded px-3 py-2" />
            </div>
          </>
        )}

        <div>
          <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">{loading ? 'Registering...' : 'Register'}</button>
        </div>
      </form>
    </div>
  )
}
