import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import CompanySidebar from '../components/CompanySidebar'

export default function CompanyLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">Career Connect</Link>
          <div className="text-sm text-gray-600">Company Portal</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <CompanySidebar />
        </aside>
        <main className="md:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
