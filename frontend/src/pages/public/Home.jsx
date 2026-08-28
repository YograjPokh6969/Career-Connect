import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../../utils/api'

export default function Home() {
  const [featured, setFeatured] = useState([])
  useEffect(() => {
    apiRequest('/public/jobs').then(({ data }) => setFeatured(data.slice(0, 2))).catch(() => {})
  }, [])

  return (
    <div>
      <section className="bg-white rounded p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-blue-600">Find Your Career. Start Your Future.</h1>
        <p className="mt-2 text-gray-600">Career Connect is a campus placement portal connecting students, companies, and placement officers.</p>
        <div className="mt-4 space-x-3">
          <Link to="/jobs" className="bg-blue-600 text-white px-4 py-2 rounded">Browse Jobs</Link>
          <Link to="/register" className="border px-4 py-2 rounded">Register</Link>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Featured Jobs</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {featured.length ? featured.map(job => (
            <div key={job.id} className="">
              <div className="bg-white p-4 rounded shadow-sm border">
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company_profiles.legal_name} • {job.location || 'Location not provided'}</p>
              </div>
            </div>
          )) : <p className="text-gray-500">No featured jobs are available.</p>}
        </div>
      </section>

      <section className="mt-8 bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold">Featured Companies</h2>
        <p className="mt-4 text-gray-500">Registered companies appear here when available.</p>
      </section>

    </div>
  )
}
