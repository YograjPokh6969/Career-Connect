import React, { useEffect, useState } from 'react'
import { apiRequest } from '../../utils/api'

export default function Companies() {
  const [q, setQ] = useState('')
  const [companies, setCompanies] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    apiRequest('/public/companies')
      .then(({ data }) => setCompanies(data))
      .catch((requestError) => setError(requestError.message))
  }, [])
  const filtered = companies.filter(c => c.legal_name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Companies</h1>
      <div className="mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search companies" className="w-full md:w-64 border rounded px-3 py-2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {error && <p className="text-red-600">{error}</p>}
        {!error && !filtered.length && <p className="text-gray-500">No companies are registered yet.</p>}
        {filtered.map(c => <div key={c.company_id} className="bg-white p-4 rounded shadow-sm border">{c.legal_name}</div>)}
      </div>
    </div>
  )
}
