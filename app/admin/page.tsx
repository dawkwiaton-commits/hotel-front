'use client'

import { useEffect, useState } from 'react'

interface AdminEvent {
  id: string
  guest_name: string
  guest_email: string | null
  room_id: number
  start_date: string
  end_date: string
  status: string
  source: string
  created_at: string
}

export default function Admin() {
  const [events, setEvents] = useState<AdminEvent[]>([])

  const fetchEvents = async () => {
    const res = await fetch('/api/events')
    const data = await res.json()
    const formatted = data.map((ev: any) => ({
      ...ev,
      id: String(ev.id),
    }))
    setEvents(formatted)
  }

  useEffect(() => {
    fetchEvents()
  }, [])


  console.log("E", events)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Panel Admina</h1>
      <table className="w-full border">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2">ID</th>
            <th className="p-2">Imię i nazwisko</th>
            <th className="p-2">Email</th>
            <th className="p-2">Pokój</th>
            <th className="p-2">Start</th>
            <th className="p-2">Koniec</th>
            <th className="p-2">Status</th>
            <th className="p-2">Źródło</th>
            <th className="p-2">Utworzono</th>
          </tr>
        </thead>
        <tbody>
          {events.map(ev => (
            <tr key={ev.id} className="border-b">
              <td className="p-2">{ev.id}</td>
              <td className="p-2">{ev.guest_name}</td>
              <td className="p-2">{ev.guest_email || '-'}</td>
              <td className="p-2">{ev.room_id}</td>
              <td className="p-2">{ev.start_date}</td>
              <td className="p-2">{ev.end_date}</td>
              <td className="p-2">{ev.status}</td>
              <td className="p-2">{ev.source}</td>
              {/* <td className="p-2">{new Date(ev.created_at).toLocaleString()}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
