import React, { useEffect, useState } from 'react'
import { getUser } from '../../utils/auth'
import { getResumeFor, setResumeFor, removeResumeFor } from '../../utils/storage'

export default function StudentProfile() {
  const [student, setStudent] = useState(null)
  const [resume, setResume] = useState(null)
  const [error, setError] = useState('')

  useEffect(()=>{
    const u = getUser()
    if (u) {
      setStudent({ name: u.name, email: u.email || u.email || 'student@example.com', branch: 'CSE', cgpa: 8.2, graduation: 2026, skills: ['React','JavaScript'] })
      const r = getResumeFor(u.email || 'student@example.com')
      setResume(r)
    } else {
      setStudent({ name: 'Alex Student', email: 'alex@student.edu', phone: '999-999-9999', branch: 'CSE', cgpa: 8.2, graduation: 2026, skills: ['React','JavaScript'] })
    }
  }, [])

  const onFile = async (e) => {
    setError('')
    const f = e.target.files[0]
    if (!f) return
    const allowed = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowed.includes(f.type)) { setError('Only PDF/DOC/DOCX allowed'); return }
    const max = 2 * 1024 * 1024
    if (f.size > max) { setError('File too large (max 2MB)'); return }
    const meta = { name: f.name, size: f.size, type: f.type, uploadedAt: new Date().toISOString() }
    const email = (student && student.email) || 'student@example.com'
    setResumeFor(email, meta)
    setResume(meta)
  }

  const handleRemove = () => {
    const email = (student && student.email) || 'student@example.com'
    removeResumeFor(email)
    setResume(null)
  }

  if (!student) return null

  return (
    <div className="bg-white p-6 rounded shadow-sm border">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><strong>Name:</strong> {student.name}</p>
          <p className="text-gray-600"><strong>Email:</strong> {student.email}</p>
          <p className="text-gray-600"><strong>Phone:</strong> {student.phone}</p>
        </div>
        <div>
          <p><strong>Branch:</strong> {student.branch}</p>
          <p className="text-gray-600"><strong>CGPA:</strong> {student.cgpa}</p>
          <p className="text-gray-600"><strong>Graduation Year:</strong> {student.graduation}</p>
        </div>
      </div>

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
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Edit Profile</button>
      </div>
    </div>
  )
}
