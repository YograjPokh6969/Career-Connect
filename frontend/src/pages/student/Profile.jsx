import React, { useEffect, useState } from 'react'
import { getUser } from '../../utils/auth'
import { getResumeFor, setResumeFor, removeResumeFor } from '../../utils/storage'
import { apiRequest } from '../../utils/api'

export default function StudentProfile() {
  const [student, setStudent] = useState(null)
  const [resume, setResume] = useState(null)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(()=>{
    const u = getUser()
    if (!u) return
    const email = u.email
    getResumeFor(email)
    setResume(getResumeFor(email))
    apiRequest('/students/profile')
      .then(({ data }) => setStudent({
        name: data.users.full_name,
        email: data.users.email,
        phone: data.users.phone,
        university_roll_no: data.university_roll_no,
        branch: data.department,
        degree: data.degree,
        cgpa: data.cgpa,
        graduation: data.graduation_year,
        skills: [],
      }))
      .catch((requestError) => setError(requestError.message))
  }, [])

  const handleChange = (event) => setStudent({ ...student, [event.target.name]: event.target.value })

  const handleSave = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setSaving(true)
    try {
      await apiRequest('/students/profile', {
        method: 'PUT',
        body: JSON.stringify({
          full_name: student.name,
          phone: student.phone || null,
          university_roll_no: student.university_roll_no,
          department: student.branch,
          degree: student.degree,
          graduation_year: Number(student.graduation),
          cgpa: student.cgpa === '' ? null : Number(student.cgpa),
        }),
      })
      setEditing(false)
      setMessage('Profile updated. Check Notifications for confirmation.')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  const onFile = async (e) => {
    setError('')
    const f = e.target.files[0]
    if (!f) return
    const allowed = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowed.includes(f.type)) { setError('Only PDF/DOC/DOCX allowed'); return }
    const max = 2 * 1024 * 1024
    if (f.size > max) { setError('File too large (max 2MB)'); return }
    const meta = { name: f.name, size: f.size, type: f.type, uploadedAt: new Date().toISOString() }
    const email = student && student.email
    if (!email) return
    setResumeFor(email, meta)
    setResume(meta)
  }

  const handleRemove = () => {
    const email = student && student.email
    if (!email) return
    removeResumeFor(email)
    setResume(null)
  }

  if (!student) return null

  return (
    <div className="bg-white p-6 rounded shadow-sm border">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
      {message && <p className="mb-3 text-sm text-green-600">{message}</p>}

      {editing ? <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={student.name || ''} onChange={handleChange} placeholder="Full name" className="border rounded px-3 py-2" required />
        <input value={student.email} className="border rounded px-3 py-2 bg-gray-100" disabled />
        <input name="phone" value={student.phone || ''} onChange={handleChange} placeholder="Phone" className="border rounded px-3 py-2" />
        <input name="university_roll_no" value={student.university_roll_no || ''} onChange={handleChange} placeholder="University roll number" className="border rounded px-3 py-2" required />
        <input name="branch" value={student.branch || ''} onChange={handleChange} placeholder="Department" className="border rounded px-3 py-2" required />
        <input name="degree" value={student.degree || ''} onChange={handleChange} placeholder="Degree" className="border rounded px-3 py-2" required />
        <input name="cgpa" value={student.cgpa ?? ''} onChange={handleChange} placeholder="CGPA" type="number" step="0.01" min="0" max="9.99" className="border rounded px-3 py-2" />
        <input name="graduation" value={student.graduation || ''} onChange={handleChange} placeholder="Graduation year" type="number" className="border rounded px-3 py-2" required />
        <div className="md:col-span-2 flex gap-3">
          <button disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50">{saving ? 'Saving...' : 'Save Profile'}</button>
          <button type="button" onClick={() => setEditing(false)} className="border px-4 py-2 rounded-md">Cancel</button>
        </div>
      </form> : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><strong>Name:</strong> {student.name}</p>
          <p className="text-gray-600"><strong>Email:</strong> {student.email}</p>
          <p className="text-gray-600"><strong>Phone:</strong> {student.phone || 'Not provided'}</p>
        </div>
        <div>
          <p><strong>Branch:</strong> {student.branch}</p>
          <p className="text-gray-600"><strong>Degree:</strong> {student.degree}</p>
          <p className="text-gray-600"><strong>CGPA:</strong> {student.cgpa}</p>
          <p className="text-gray-600"><strong>Graduation Year:</strong> {student.graduation}</p>
        </div>
      </div>}

      <div className="mt-4">
        <h3 className="font-semibold">Skills</h3>
        <div className="mt-2 flex gap-2 flex-wrap">
          {student.skills.map(s => (
            <span key={s} className="text-sm bg-gray-100 px-3 py-1 rounded">{s}</span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm text-gray-700 mb-2">Resume</label>
        {resume ? (
          <div className="flex items-center gap-4">
            <div className="text-sm">{resume.name} · {(resume.size/1024).toFixed(1)} KB</div>
            <button onClick={handleRemove} className="text-sm text-red-600">Remove</button>
          </div>
        ) : (
          <>
            <input type="file" accept=".pdf,.doc,.docx" onChange={onFile} />
            {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
          </>
        )}
      </div>

      <div className="mt-6">
        {!editing && <button onClick={() => { setMessage(''); setEditing(true) }} className="bg-blue-600 text-white px-4 py-2 rounded-md">Edit Profile</button>}
      </div>
    </div>
  )
}
