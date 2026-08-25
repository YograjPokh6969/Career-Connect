import React, { useState } from 'react'

export default function CompanyPostJob() {
  const [form, setForm] = useState({
    title: '', description: '', location: '', salary: '', type: '', cgpa: '', branches: '', skills: '', deadline: ''
  })

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value})
  const handleSubmit = (e) => { e.preventDefault(); alert('Job posted (frontend only)') }

  return (
    <div className="bg-white p-6 rounded shadow-sm border">
      <h1 className="text-2xl font-semibold mb-4">Post Job</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" onChange={handleChange} placeholder="Job Title" className="w-full border rounded px-3 py-2" required />
        <textarea name="description" onChange={handleChange} placeholder="Description" className="w-full border rounded px-3 py-2" rows={4} required />
        <div className="grid grid-cols-2 gap-3">
          <input name="location" onChange={handleChange} placeholder="Location" className="border rounded px-3 py-2" />
          <input name="salary" onChange={handleChange} placeholder="Salary" className="border rounded px-3 py-2" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <input name="type" onChange={handleChange} placeholder="Job Type" className="border rounded px-3 py-2" />
          <input name="cgpa" onChange={handleChange} placeholder="Required CGPA" className="border rounded px-3 py-2" />
          <input name="branches" onChange={handleChange} placeholder="Eligible Branches (comma)" className="border rounded px-3 py-2" />
        </div>
        <input name="skills" onChange={handleChange} placeholder="Required Skills (comma)" className="w-full border rounded px-3 py-2" />
        <input name="deadline" onChange={handleChange} type="date" className="border rounded px-3 py-2" />
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Post Job</button>
        </div>
      </form>
    </div>
  )
}
