export interface Booking {
    id: number
    room_id: number
    start_date: string
    end_date: string
    guest_name: string
    guest_email?: string
    status: string
    source: string
  }
  