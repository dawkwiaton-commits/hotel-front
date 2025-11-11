"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

const reservationSchema = z
  .object({
    name: z.string().min(3, "Imię i nazwisko musi mieć min. 3 znaki"),
    email: z.string().email("Podaj prawidłowy email"),
    phone: z
      .string()
      .min(9, "Numer musi mieć min. 9 cyfr")
      .regex(/^[0-9+\s-]+$/, "Niepoprawny numer telefonu"),
    dateFrom: z.string().nonempty("Wybierz datę"),
    dateTo: z.string().nonempty("Wybierz datę"),
    message: z.string().max(500, "Maksymalnie 500 znaków").optional(),
  })
  .refine(
    (data) => {
      if (!data.dateFrom || !data.dateTo) return true;
      return new Date(data.dateTo) > new Date(data.dateFrom);
    },
    {
      message: "Data zakończenia musi być późniejsza niż rozpoczęcia",
      path: ["dateTo"],
    }
  );

type ReservationFormValues = z.infer<typeof reservationSchema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
  });

  // const onSubmit = (data: ReservationFormValues) => {
  //   console.log("Form submitted:", data);
  //   setSubmitted(true);
  //   reset();
  // };

  const onSubmit = async (data: ReservationFormValues) => {
    if (!executeRecaptcha) {
      alert("Captcha nie jest gotowa, spróbuj ponownie.");
      return;
    }

    try {
      const captcha = await executeRecaptcha("reservation");

      // Wyślij request do NestJS
      const res = await fetch(
        "https://e865410ec537.ngrok-free.app/email/reservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, captcha }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Nie udało się wysłać rezerwacji");
      }

      setSubmitted(true);
      reset();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Coś poszło nie tak!");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-4 md:px-16">
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
        <div className="flex flex-col w-full">
          <label className="mb-1 font-semibold text-brown900">
            Imię i nazwisko
          </label>
          <input
            type="text"
            {...register("name")}
            className={`border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brown700 ${
              errors.name ? "border-red-500" : "border-brown700"
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col w-full">
          <label className="mb-1 font-semibold text-brown900">Email</label>
          <input
            type="email"
            {...register("email")}
            className={`border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brown700 ${
              errors.email ? "border-red-500" : "border-brown700"
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Telefon */}
        <div className="flex flex-col w-full">
          <label className="mb-1 font-semibold text-brown900">
            Nr telefonu
          </label>
          <input
            type="tel"
            {...register("phone")}
            className={`border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brown700 ${
              errors.phone ? "border-red-500" : "border-brown700"
            }`}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm mt-1">
              {errors.phone.message}
            </span>
          )}
        </div>

        {/* Zakres dat */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-semibold text-brown900">Od</label>
            <input
              type="date"
              {...register("dateFrom")}
              className={`border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brown700 ${
                errors.dateFrom ? "border-red-500" : "border-brown700"
              }`}
            />
            {errors.dateFrom && (
              <span className="text-red-500 text-sm mt-1">
                {errors.dateFrom.message}
              </span>
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-semibold text-brown900">Do</label>
            <input
              type="date"
              {...register("dateTo")}
              className={`border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brown700 ${
                errors.dateTo ? "border-red-500" : "border-brown700"
              }`}
            />
            {errors.dateTo && (
              <span className="text-red-500 text-sm mt-1">
                {errors.dateTo.message}
              </span>
            )}
          </div>
        </div>

        {/* Wiadomość */}
        <div className="flex flex-col w-full">
          <label className="mb-1 font-semibold text-brown900">
            Wiadomość (opcjonalnie)
          </label>
          <textarea
            {...register("message")}
            rows={4}
            className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brown700 border-brown700"
          />
          {errors.message && (
            <span className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-brown700 text-brown100 font-semibold py-3 rounded hover:bg-brown900 transition mt-4 w-full"
        >
          Wyślij rezerwację
        </button>
      </form>
    </div>
  );
}
