// Calendar.tsx
'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { useEffect, useState } from 'react'
import BookingFormModal from './BookingFormModal'

interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  extendedProps: { status: string; roomId: number }
}

export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [showForm, setShowForm] = useState(false)
  const [range, setRange] = useState<{ start: string; end: string } | null>(null)
  const [selecting, setSelecting] = useState(false)
  const [startDate, setStartDate] = useState('')

  const fetchEvents = async () => {
    const res = await fetch('/api/events')
    const data = await res.json()
    const formatted = data.map((ev: any) => ({ ...ev, id: String(ev.id) }))
    setEvents(formatted)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleDateClick = (arg: DateClickArg) => {
    const clickedDate = arg.dateStr

    // Sprawdzamy zajętość
    const blocked = events.some(ev => {
      const evEnd = new Date(ev.end)
      evEnd.setDate(evEnd.getDate() - 1) // odejmujemy 1 dzień, bo end nie jest wliczany
      const current = new Date(clickedDate)
      return current >= new Date(ev.start) && current <= evEnd
    })
    if (blocked) return

    if (!selecting) {
      setStartDate(clickedDate)
      setSelecting(true)
      setRange({ start: clickedDate, end: clickedDate }) // tymczasowy zakres
    } else {
      setRange({ start: startDate, end: clickedDate })
      setShowForm(true)
      setSelecting(false)
      setStartDate('')
    }
  }

  const handleBookingSuccess = () => {
    setShowForm(false)
    setRange(null)
    fetchEvents()
  }

  // Generujemy wydarzenia dla FullCalendar
  const allEvents = range
    ? [
        ...events,
        {
          id: 'temp',
          title: 'Wybrany zakres',
          start: range.start,
          end: (() => {
            const d = new Date(range.end)
            d.setDate(d.getDate() + 1) // FullCalendar wymaga end = dzień po ostatnim
            return d.toISOString().split('T')[0]
          })(),
          extendedProps: { status: 'selected', roomId: 0 },
        },
      ]
    : events

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={allEvents}
        height="auto"
        dateClick={handleDateClick}
        dayCellDidMount={(arg) => {
          const day = arg.dateStr
          const blocked = events.some(ev => {
            const evEnd = new Date(ev.end)
            evEnd.setDate(evEnd.getDate() - 1)
            const current = new Date(day)
            return current >= new Date(ev.start) && current <= evEnd
          })
          if (blocked) {
            arg.el.classList.add('bg-gray-300', 'pointer-events-none')
          }

          if (range) {
            const start = new Date(range.start)
            const end = new Date(range.end)
            end.setDate(end.getDate() + 1)
            const current = new Date(day)
            if (current >= start && current < end) {
              arg.el.classList.add('bg-blue-200')
            }
          }
        }}
      />

      {showForm && range && (
        <BookingFormModal
          defaultStartDate={range.start}
          defaultEndDate={range.end}
          onSuccess={handleBookingSuccess}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}
