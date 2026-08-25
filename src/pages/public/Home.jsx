import React from 'react'
import { Link } from 'react-router-dom'
import { jobs } from '../../data/jobs'

export default function Home() {
  const featured = jobs.slice(0, 2)

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
          {featured.map(job => (
            <div key={job.id} className="">
              <div className="bg-white p-4 rounded shadow-sm border">
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold">Featured Companies</h2>
        <div className="mt-4 flex gap-4">
          <div className="p-4 bg-gray-50 rounded">TechCorp</div>
          <div className="p-4 bg-gray-50 rounded">DataWorks</div>
          <div className="p-4 bg-gray-50 rounded">FinServe</div>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded shadow-sm text-center">
          <div className="text-2xl font-bold">1000+</div>
          <div className="text-gray-600">Students</div>
        </div>
        <div className="bg-white p-6 rounded shadow-sm text-center">
          <div className="text-2xl font-bold">50+</div>
          <div className="text-gray-600">Companies</div>
        </div>
        <div className="bg-white p-6 rounded shadow-sm text-center">
          <div className="text-2xl font-bold">200+</div>
          <div className="text-gray-600">Jobs</div>
        </div>
      </section>
    </div>
  )
}
