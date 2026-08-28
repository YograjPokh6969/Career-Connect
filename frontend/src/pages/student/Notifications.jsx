import React, { useEffect, useState } from 'react'
import { apiRequest } from '../../utils/api'

export default function StudentNotifications() {
  const [notes, setNotes] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    apiRequest('/students/notifications')
      .then(({ data }) => setNotes(data || []))
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="space-y-3">
        {notes.length ? notes.map(n => (
          <div key={n.notification_id} className="bg-white p-3 rounded shadow-sm border">
            <div className="text-sm text-gray-700">{n.title}: {n.message}</div>
            <div className="text-xs text-gray-500 mt-1">{new Date(n.created_at).toLocaleDateString()}</div>
          </div>
        )) : <p className="text-gray-500">No notifications yet.</p>}
      </div>
    </div>
  )
}
