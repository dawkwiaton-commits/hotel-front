import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { Booking } from '@/types/Booking'

export async function GET() {
  try {
    const res = await pool.query(
      'SELECT id, room_id, start_date, end_date, guest_name, guest_email, status, source, created_at FROM bookings ORDER BY start_date'
    )
    return NextResponse.json(res.rows)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

