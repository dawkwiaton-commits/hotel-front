"use client";

import { useState } from "react";
import Calendar from "./components/Calendar";
import BookingForm from "./components/BookingForm";

export default function Page() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleBookingSuccess = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Kalendarz rezerwacji</h1>
      {/* <div className="w-full max-w-2xl">
        <BookingForm onSuccess={handleBookingSuccess} />
      </div> */}
      <div className="w-full max-w-5xl bg-white p-4 rounded shadow">
        <Calendar key={refreshKey} />
      </div>
    </div>
  );
}
