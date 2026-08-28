import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../../utils/api'

export default function CompanyPostJob() {
  const [form, setForm] = useState({
    title: '', description: '', location: '', salary_min: '', salary_max: '', job_type: 'full_time', min_cgpa: '', eligible_department: '', eligible_degree: '', openings: '1', application_deadline: '', status: 'open'
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value})
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    try {
      await apiRequest('/company/jobs', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          salary_min: form.salary_min || undefined,
          salary_max: form.salary_max || undefined,
          min_cgpa: form.min_cgpa || undefined,
          openings: Number(form.openings),
        }),
      })
      setMessage('Job posted successfully.')
      setForm({ title: '', description: '', location: '', salary_min: '', salary_max: '', job_type: 'full_time', min_cgpa: '', eligible_department: '', eligible_degree: '', openings: '1', application_deadline: '', status: 'open' })
      setTimeout(() => navigate('/company/jobs'), 500)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow-sm border">
      <h1 className="text-2xl font-semibold mb-4">Post Job</h1>
      {message && <p className="mb-3 text-sm text-green-600">{message}</p>}
      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" onChange={handleChange} placeholder="Job Title" className="w-full border rounded px-3 py-2" required />
        <textarea name="description" onChange={handleChange} placeholder="Description" className="w-full border rounded px-3 py-2" rows={4} required />
        <div className="grid grid-cols-2 gap-3">
          <input name="location" onChange={handleChange} placeholder="Location" className="border rounded px-3 py-2" />
          <input name="salary_min" value={form.salary_min} onChange={handleChange} placeholder="Minimum Salary" type="number" className="border rounded px-3 py-2" />
          <input name="salary_max" value={form.salary_max} onChange={handleChange} placeholder="Maximum Salary" type="number" className="border rounded px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <select name="job_type" value={form.job_type} onChange={handleChange} className="border rounded px-3 py-2">
            <option value="full_time">Full-time</option>
            <option value="part_time">Part-time</option>
            <option value="internship">Internship</option>
          </select>
          <input name="min_cgpa" value={form.min_cgpa} onChange={handleChange} placeholder="Required CGPA" type="number" step="0.01" className="border rounded px-3 py-2" />
          <input name="eligible_department" value={form.eligible_department} onChange={handleChange} placeholder="Eligible Department" className="border rounded px-3 py-2" />
          <input name="eligible_degree" value={form.eligible_degree} onChange={handleChange} placeholder="Eligible Degree" className="border rounded px-3 py-2" />
          <input name="openings" value={form.openings} onChange={handleChange} placeholder="Openings" type="number" min="1" className="border rounded px-3 py-2" />
        </div>
        <input name="application_deadline" value={form.application_deadline} onChange={handleChange} type="date" className="border rounded px-3 py-2" required />
        <select name="status" value={form.status} onChange={handleChange} className="border rounded px-3 py-2">
          <option value="open">Publish job</option>
          <option value="draft">Save as draft</option>
        </select>
        <div>
          <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50">{loading ? 'Saving...' : 'Save Job'}</button>
        </div>
      </form>
    </div>
  )
}
