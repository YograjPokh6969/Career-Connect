import React, { useState, useMemo } from 'react'
import JobCard from '../../components/JobCard'
import { jobs as allJobs } from '../../data/jobs'

export default function Jobs() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [company, setCompany] = useState('')

  const companies = useMemo(() => Array.from(new Set(allJobs.map(j=>j.company))), [])

  const filtered = allJobs.filter(j => {
    return (
      j.title.toLowerCase().includes(query.toLowerCase()) &&
      (location ? j.location.toLowerCase().includes(location.toLowerCase()) : true) &&
      (type ? j.type === type : true) &&
      (company ? j.company === company : true)
    )
  })

  const clear = () => { setQuery(''); setLocation(''); setType(''); setCompany('') }

  return (
    <div>
      <div className="bg-white p-4 rounded shadow-sm flex flex-wrap gap-3 items-center">
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search jobs" className="flex-1 min-w-[160px] border rounded px-3 py-2" />
        <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location" className="w-48 border rounded px-3 py-2" />
        <select value={type} onChange={e=>setType(e.target.value)} className="w-48 border rounded px-3 py-2">
          <option value="">All Types</option>
          <option>Full-time</option>
          <option>Internship</option>
        </select>
        <select value={company} onChange={e=>setCompany(e.target.value)} className="w-48 border rounded px-3 py-2">
          <option value="">All Companies</option>
          {companies.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={clear} className="ml-auto text-sm bg-gray-100 px-3 py-2 rounded">Clear Filters</button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(job => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </div>
  )
}
