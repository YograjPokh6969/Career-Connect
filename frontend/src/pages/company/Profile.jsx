import React from 'react'

export default function CompanyProfile() {
  const company = {
    name: 'TechCorp',
    email: 'hr@techcorp.com',
    website: 'https://techcorp.example',
    description: 'Innovative tech company focused on web products.'
  }

  return (
    <div className="bg-white p-6 rounded shadow-sm border">
      <h1 className="text-2xl font-semibold mb-4">Company Profile</h1>
      <p><strong>Name:</strong> {company.name}</p>
      <p className="text-gray-600"><strong>Email:</strong> {company.email}</p>
      <p className="text-gray-600"><strong>Website:</strong> {company.website}</p>
      <p className="mt-3">{company.description}</p>

      <div className="mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Edit Profile</button>
      </div>
    </div>
  )
}
