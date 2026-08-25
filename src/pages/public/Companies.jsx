import React, { useMemo, useState } from 'react'
import { jobs } from '../../data/jobs'

export default function Companies() {
  const [q, setQ] = useState('')
  const companies = useMemo(() => Array.from(new Set(jobs.map(j=>j.company))), [])
  const filtered = companies.filter(c => c.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Companies</h1>
      <div className="mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search companies" className="w-full md:w-64 border rounded px-3 py-2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map(c => (
          <div key={c} className="bg-white p-4 rounded shadow-sm border">{c}</div>
        ))}
      </div>
    </div>
  )
}
