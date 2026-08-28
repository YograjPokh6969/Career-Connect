import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setAuth } from '../../utils/auth'
import { apiRequest } from '../../utils/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      if (data.user.role !== role) throw new Error(`This account is registered as ${data.user.role}`)
      setAuth(data.user, data.token)
      navigate(`/${data.user.role}/dashboard`)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
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
          <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">{loading ? 'Logging in...' : 'Login'}</button>
          <Link to="/register" className="text-sm text-blue-600">Register</Link>
        </div>
      </form>
    </div>
  )
}
