import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../../utils/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Demo login: save user to localStorage
    const user = { email, role, name: role === 'student' ? 'Demo Student' : role === 'company' ? 'Demo Company' : 'Admin' }
    setUser(user)
    // navigate to role dashboard
    if (role === 'student') navigate('/student/dashboard')
    else if (role === 'company') navigate('/company/dashboard')
    else navigate('/admin/dashboard')
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded px-3 py-2" type="email" required />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} className="w-full border rounded px-3 py-2" type="password" required />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Login as</label>
          <select value={role} onChange={e=>setRole(e.target.value)} className="w-full border rounded px-3 py-2">
            <option value="student">Student</option>
            <option value="company">Company</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
          <Link to="/register" className="text-sm text-blue-600">Register</Link>
        </div>
      </form>
    </div>
  )
}
