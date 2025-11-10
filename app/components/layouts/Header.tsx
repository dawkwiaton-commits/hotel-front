"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Book, Image, Calendar, Mail, Menu, X } from "lucide-react";
import DesktopMenu from "../header/DesktopMenu";
import { MobileMenu } from "../header/MobileMenu";

const menuItems = [
  { label: "Dom z bali", href: "/dom-z-bali", icon: <Home size={20} /> },
  { label: "Nasza Historia", href: "/nasza-historia", icon: <Book size={20} /> },
  {
    label: "Galeria",
    href: "/galeria",
    icon: <Image size={20} />,
    children: [
      { label: "Bystre i okolica", href: "/galeria/bystre-i-okolica" },
      { label: "Dzikie Bieszczady", href: "/galeria/dzikie-bieszczady" },
      { label: "Ludzie Gór", href: "/galeria/ludzie-gor" },
      { label: "Nabokówka", href: "/galeria/nabokowka" },
    ],
  },
  { label: "Cennik", href: "/cennik", icon: <Calendar size={20} /> },
  { label: "Rezerwacje", href: "/rezerwacje", icon: <Calendar size={20} /> },,
  // { label: "Kontakt", href: "/kontakt", icon: <Mail size={20} /> },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full relative z-50">
      <div className="w-full border-b bg-white">
          
          {/* Desktop */}
          <DesktopMenu menuItems={menuItems} />

         
      </div>

      <MobileMenu menuItems={menuItems} />
    </header>
  );
}
