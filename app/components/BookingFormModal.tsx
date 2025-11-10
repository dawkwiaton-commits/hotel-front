// BookingFormModal.tsx
'use client'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface BookingFormInputs {
  guestName: string
  guestEmail?: string
  startDate: Date
  endDate: Date
  roomId: number
}

interface BookingFormProps {
  defaultStartDate: string
  defaultEndDate: string
  onSuccess?: () => void
  onClose: () => void
}

export default function BookingFormModal({ defaultStartDate, defaultEndDate, onSuccess, onClose }: BookingFormProps) {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<BookingFormInputs>({
    defaultValues: {
      guestName: '',
      guestEmail: '',
      startDate: new Date(defaultStartDate),
      endDate: new Date(defaultEndDate),
      roomId: 1
    }
  })

  const onSubmit: SubmitHandler<BookingFormInputs> = async (data) => {
    if (data.endDate < data.startDate) {
      alert('Data końca nie może być wcześniejsza niż data startu')
      return
    }

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        room_id: data.roomId,
        guest_name: data.guestName,
        guest_email: data.guestEmail,
        start_date: data.startDate.toISOString().split('T')[0],
        end_date: (() => {
          const d = new Date(data.endDate)
          d.setDate(d.getDate() + 1) // dodajemy 1 dzień, żeby blokować pełny dzień
          return d.toISOString().split('T')[0]
        })()
      })
    })

    const response = await res.json()
    if (res.ok) {
      reset({
        guestName: '',
        guestEmail: '',
        startDate: new Date(),
        endDate: new Date(),
        roomId: 1
      })
      if (onSuccess) onSuccess()
      alert('Rezerwacja dodana!')
    } else {
      alert(response.message || 'Błąd przy dodawaniu rezerwacji')
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow space-y-3 w-80">
        <h2 className="text-xl font-bold">Dodaj rezerwację</h2>

        <label className="block">
          Imię i nazwisko
          <input {...register('guestName', { required: true })} className="border p-1 w-full" />
          {errors.guestName && <span className="text-red-600">To pole jest wymagane</span>}
        </label>

        <label className="block">
          Email
          <input type="email" {...register('guestEmail')} className="border p-1 w-full" />
        </label>

        <label className="block">
          Data startu
          <Controller
            control={control}
            name="startDate"
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker selected={field.value} onChange={field.onChange} className="border p-1 w-full" dateFormat="yyyy-MM-dd" />
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
              <DatePicker selected={field.value} onChange={field.onChange} className="border p-1 w-full" dateFormat="yyyy-MM-dd" />
            )}
          />
          {errors.endDate && <span className="text-red-600">To pole jest wymagane</span>}
        </label>

        <div className="flex justify-between mt-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Dodaj</button>
          <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400">Anuluj</button>
        </div>
      </form>
    </div>
  )
}
