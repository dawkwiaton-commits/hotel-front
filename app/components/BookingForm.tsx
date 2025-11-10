'use client'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

import { useState } from 'react'

interface BookingFormInputs {
  guestName: string
  guestEmail?: string
  startDate: Date
  endDate: Date
  roomId: number
}

interface BookingFormProps {
  onSuccess?: () => void
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<BookingFormInputs>({
    defaultValues: { roomId: 1, startDate: new Date(), endDate: new Date() }
  })

  const onSubmit: SubmitHandler<BookingFormInputs> = async (data) => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        room_id: data.roomId,
        guest_name: data.guestName,
        guest_email: data.guestEmail,
        start_date: data.startDate.toISOString().split('T')[0],
        end_date: data.endDate.toISOString().split('T')[0]
      })
    })

    const response = await res.json()
    if (res.ok) {
      reset({ guestName: '', guestEmail: '', startDate: new Date(), endDate: new Date(), roomId: 1 })
      if (onSuccess) onSuccess()
      alert('Rezerwacja dodana!')
    } else {
      alert(response.message || 'Błąd przy dodawaniu rezerwacji')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md p-4 border rounded space-y-3">
      <h2 className="text-xl font-bold">Dodaj rezerwację</h2>

      <label className="block">
        Imię i nazwisko
        <input
          {...register('guestName', { required: true })}
          className="border p-1 w-full"
        />
        {errors.guestName && <span className="text-red-600">To pole jest wymagane</span>}
      </label>

      <label className="block">
        Email
        <input
          type="email"
          {...register('guestEmail')}
          className="border p-1 w-full"
        />
      </label>

      <label className="block">
        Data startu
        <Controller
          control={control}
          name="startDate"
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
              className="border p-1 w-full"
              dateFormat="yyyy-MM-dd"
            />
          )}
        />
        {errors.startDate && <span className="text-red-600">To pole jest wymagane</span>}
      </label>

      <label className="block">
        Data końca
        <Controller
          control={control}
          name="endDate"
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
              className="border p-1 w-full"
              dateFormat="yyyy-MM-dd"
            />
          )}
        />
        {errors.endDate && <span className="text-red-600">To pole jest wymagane</span>}
      </label>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Dodaj rezerwację</button>
    </form>
  )
}
