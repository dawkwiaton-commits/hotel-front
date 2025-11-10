import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function POST(req: Request) {
  const data = await req.json()
  const { guest_name, guest_email, start_date, end_date, room_id, source = 'web' } = data

  const res = await pool.query(
    `INSERT INTO bookings 
      (room_id, start_date, end_date, guest_name, guest_email, status, source, created_at) 
     VALUES ($1,$2,$3,$4,$5,$6,$7,NOW()) 
     RETURNING id`,
    [room_id, start_date, end_date, guest_name, guest_email, 'confirmed', source]
  )

  return NextResponse.json({ id: res.rows[0].id })
}
