"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuItem } from "../layouts/Header";

interface DesktopMenuProps {
  menuItems: MenuItem[];
}

export default function DesktopMenu({ menuItems }: DesktopMenuProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [submenuHovered, setSubmenuHovered] = useState(false);
  let timeout: NodeJS.Timeout;

  const handleMouseEnter = (item: any) => {
    timeout = setTimeout(() => {
      setHovered(item);
      // setSubmenuHovered(false);
    }, 150);
  };

  const handleMouseLeave = () => {
    timeout = setTimeout(() => {
      setHovered(null);
      setSubmenuHovered(false);
    }, 50); // delay, żeby nie znikało przy szybkim ruchu w dół
  };

  // const handleMouseEnter = () => {
  //   clearTimeout(timeout);
  // };

  return (
    <nav className="hidden md:flex w-full relative bg-white border-b z-50">
      <div className="w-full max-w-[1600px] mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          LOGO
        </Link>

        {/* Menu items */}
        <div className="flex gap-6">
          {menuItems.map((item) => {
            const hasChildren = !!item.children;

            // Mega-menu jest otwarte jeśli hover nad przyciskiem lub nad submenu
            const isOpen = hovered === item.label || submenuHovered;

            return (
              <div key={item.label} className=" flex flex-col">
                <Link
                  href={item.href}
                  onClick={(e) => {
                    if (item.children) e.preventDefault(); // blokuje kliknięcie jeśli są podmenu
                  }}
                  className="px-3 py-2 flex justify-center items-center relative w-32 h-8 text-sm font-medium"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Kontener, który zawsze zajmuje całą przestrzeń */}
                  <span className="flex justify-center items-center w-full h-full relative">
                    {/* Tekst */}
                    <span
                      className={`absolute inset-0 flex justify-center items-center transition-opacity duration-300 ${
                        hovered === item.label
                          ? "opacity-0 pointer-events-none"
                          : "opacity-100"
                      }`}
                    >
                      {item.label}
                    </span>
                    {/* Ikona */}
                    <span
                      className={`absolute inset-0 flex justify-center items-center transition-opacity duration-300 ${
                        hovered === item.label
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
                    >
                      {item.icon}
                    </span>
                  </span>
                </Link>

                {/* Mega-menu - zawsze w DOM */}
                {hasChildren && (
                  <div
                    className={`absolute top-full left-0 w-screen bg-white border-t border-gray-300 z-40 shadow-lg transition-all ${
                      isOpen ? "block" : "hidden"
                    }`}
                    onMouseEnter={() => {
                      clearTimeout(timeout);
                      setSubmenuHovered(true);
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="max-w-[1600px] mx-auto px-6">
                      <div className="border-b border-gray-300"></div>
                      <div className="flex justify-center gap-8 py-4">
                        {item.children?.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="text-sm font-medium hover:text-brown-700 transition"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
