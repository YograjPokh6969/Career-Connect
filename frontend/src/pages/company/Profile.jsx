import React, { useEffect, useState } from 'react'
import { apiRequest } from '../../utils/api'

export default function CompanyProfile() {
  const [company, setCompany] = useState(null)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    apiRequest('/company/profile')
      .then(({ data }) => setCompany({
        name: data.legal_name,
        email: data.users_company_profiles_company_idTousers.email,
        contactName: data.users_company_profiles_company_idTousers.full_name,
        phone: data.users_company_profiles_company_idTousers.phone,
        website: data.website,
        industry: data.industry,
        description: data.description,
        officeAddress: data.office_address,
      }))
      .catch((requestError) => setError(requestError.message))
  }, [])

  const handleChange = (event) => setCompany({ ...company, [event.target.name]: event.target.value })
  const handleSave = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setSaving(true)
    try {
      await apiRequest('/company/profile', {
        method: 'PUT',
        body: JSON.stringify({
          full_name: company.contactName,
          phone: company.phone || null,
          legal_name: company.name,
          website: company.website,
          industry: company.industry,
          description: company.description,
          office_address: company.officeAddress,
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

  if (error) return <p className="text-red-600">{error}</p>
  if (!company) return <p>Loading profile...</p>

  return (
    <div className="bg-white p-6 rounded shadow-sm border">
      <h1 className="text-2xl font-semibold mb-4">Company Profile</h1>
      {message && <p className="mb-3 text-sm text-green-600">{message}</p>}
      {editing ? <form onSubmit={handleSave} className="space-y-3">
        <input name="name" value={company.name || ''} onChange={handleChange} placeholder="Company name" className="w-full border rounded px-3 py-2" required />
        <input name="contactName" value={company.contactName || ''} onChange={handleChange} placeholder="Contact name" className="w-full border rounded px-3 py-2" required />
        <input value={company.email} className="w-full border rounded px-3 py-2 bg-gray-100" disabled />
        <input name="phone" value={company.phone || ''} onChange={handleChange} placeholder="Phone" className="w-full border rounded px-3 py-2" />
        <input name="website" value={company.website || ''} onChange={handleChange} placeholder="Website" className="w-full border rounded px-3 py-2" />
        <input name="industry" value={company.industry || ''} onChange={handleChange} placeholder="Industry" className="w-full border rounded px-3 py-2" />
        <textarea name="description" value={company.description || ''} onChange={handleChange} placeholder="Description" className="w-full border rounded px-3 py-2" rows={4} />
        <input name="officeAddress" value={company.officeAddress || ''} onChange={handleChange} placeholder="Office address" className="w-full border rounded px-3 py-2" />
        <button disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50">{saving ? 'Saving...' : 'Save Profile'}</button>
        <button type="button" onClick={() => setEditing(false)} className="ml-3 border px-4 py-2 rounded-md">Cancel</button>
      </form> : <>
      <p><strong>Name:</strong> {company.name}</p>
      <p className="text-gray-600"><strong>Email:</strong> {company.email}</p>
      <p className="text-gray-600"><strong>Website:</strong> {company.website || 'Not provided'}</p>
      <p className="mt-3">{company.description || 'No description provided.'}</p>
      </>}

      <div className="mt-6">
        {!editing && <button onClick={() => { setMessage(''); setEditing(true) }} className="bg-blue-600 text-white px-4 py-2 rounded-md">Edit Profile</button>}
      </div>
    </div>
  )
}
