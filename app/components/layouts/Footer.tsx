import Link from "next/link";

// Wszystkie teksty i dane kontaktowe
const FOOTER_DATA = {
  hotelName: "Hotel Rustykalny",
  address: "ul. Bieszczadzka 12",
  city: "38-700 Bieszczady",
  phone: "+48 123 456 789",
  email: "kontakt@hotel.pl",
  reservationLabel: "Zarezerwuj pokój",
  reservationLink: "/rezerwacje",
  copyright: `© 2025 Hotel Rustykalny. Wszelkie prawa zastrzeżone.`,
};

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-8">
        
        {/* Dane kontaktowe */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Kontakt</h3>
          <p>{FOOTER_DATA.hotelName}</p>
          <p>{FOOTER_DATA.address}</p>
          <p>{FOOTER_DATA.city}</p>
          <p>
            Tel:{" "}
            <a href={`tel:${FOOTER_DATA.phone}`} className="hover:text-brown-700 transition">
              {FOOTER_DATA.phone}
            </a>
          </p>
          <p>
            Email:{" "}
            <a href={`mailto:${FOOTER_DATA.email}`} className="hover:text-brown-700 transition">
              {FOOTER_DATA.email}
            </a>
          </p>
        </div>

        {/* Link do rezerwacji */}
        <div className="flex-1 flex flex-col justify-start">
          <h3 className="text-lg font-semibold mb-2">Rezerwacje</h3>
          <Link
            href={FOOTER_DATA.reservationLink}
            className="bg-brown-700 text-white px-4 py-2 rounded hover:bg-brown-800 transition w-max"
          >
            {FOOTER_DATA.reservationLabel}
          </Link>
        </div>

        {/* Prawa autorskie */}
        <div className="flex-1 flex flex-col justify-start md:items-end text-gray-500 text-sm">
          <p>{FOOTER_DATA.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
