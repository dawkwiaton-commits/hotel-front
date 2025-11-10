"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

interface ReservationFormValues {
  name: string;
  email: string;
  phone: string;
  dateFrom: string;
  dateTo: string;
  message: string;
}

export default function RezerwacjePage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationFormValues>();

  const onSubmit = (data: ReservationFormValues) => {
    console.log("Form submitted:", data);
    setSubmitted(true);
    reset();
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-6 md:px-16">
      <h1 className="text-3xl md:text-4xl font-bold text-brown900 mb-8 text-center">
        Rezerwacje
      </h1>

      {submitted && (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded mb-6 text-center">
          Dziękujemy! Twoja rezerwacja została wysłana.
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-brown100 shadow-md rounded-lg p-6 flex flex-col gap-6"
      >
        {/* Imię i nazwisko */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-brown900">
            Imię i nazwisko
          </label>
          <input
            type="text"
            {...register("name", { required: "To pole jest wymagane" })}
            className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brown700 ${
              errors.name ? "border-red-500" : "border-brown700"
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-brown900">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "To pole jest wymagane",
              pattern: { value: /^\S+@\S+$/i, message: "Niepoprawny email" },
            })}
            className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brown700 ${
              errors.email ? "border-red-500" : "border-brown700"
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
          )}
        </div>

        {/* Telefon */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-brown900">Nr telefonu</label>
          <input
            type="tel"
            {...register("phone", { required: "To pole jest wymagane" })}
            className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brown700 ${
              errors.phone ? "border-red-500" : "border-brown700"
            }`}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm mt-1">{errors.phone.message}</span>
          )}
        </div>

        {/* Zakres dat */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-semibold text-brown900">Od</label>
            <input
              type="date"
              {...register("dateFrom", { required: "Wybierz datę" })}
              className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brown700 ${
                errors.dateFrom ? "border-red-500" : "border-brown700"
              }`}
            />
            {errors.dateFrom && (
              <span className="text-red-500 text-sm mt-1">{errors.dateFrom.message}</span>
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-semibold text-brown900">Do</label>
            <input
              type="date"
              {...register("dateTo", { required: "Wybierz datę" })}
              className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brown700 ${
                errors.dateTo ? "border-red-500" : "border-brown700"
              }`}
            />
            {errors.dateTo && (
              <span className="text-red-500 text-sm mt-1">{errors.dateTo.message}</span>
            )}
          </div>
        </div>

        {/* Wiadomość */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-brown900">Wiadomość</label>
          <textarea
            {...register("message")}
            rows={4}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brown700 border-brown700"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-brown700 text-brown100 font-semibold py-3 rounded hover:bg-brown900 transition mt-4"
        >
          Wyślij rezerwację
        </button>
      </form>
    </div>
  );
}
