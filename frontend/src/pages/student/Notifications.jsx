import React from 'react'

export default function StudentNotifications() {
  const notes = [
    { id: '1', text: 'Your application for Frontend Developer has been received.', date: '2026-08-01' },
    { id: '2', text: 'Interview scheduled with DataWorks on 2026-09-02.', date: '2026-08-10' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Notifications</h1>

      <div className="space-y-3">
        {notes.map(n => (
          <div key={n.id} className="bg-white p-3 rounded shadow-sm border">
            <div className="text-sm text-gray-700">{n.text}</div>
            <div className="text-xs text-gray-500 mt-1">{n.date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
