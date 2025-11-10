"use client";

import Link from "next/link";
import { useState } from "react";
import { X, Menu } from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export function MobileMenu({ menuItems }: { menuItems: MenuItem[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (label: string) => {
    setOpenItems((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <header className="md:hidden w-full relative z-50 bg-white border-b">
      <div className="w-full max-w-[1600px] mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold" onClick={() => setMobileOpen(false)}>
          LOGO
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="focus:outline-none"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="w-full bg-white border-t border-gray-300">
          <div className="flex flex-col px-6 py-4 gap-2">
            {menuItems.map((item) => (
              <div key={item.label} className="flex flex-col">
                {item.children ? (
                  <button
                    className="flex justify-between items-center w-full text-left font-medium py-2"
                    onClick={() => toggleItem(item.label)}
                  >
                    {item.label}
                    <span>{openItems[item.label] ? "▲" : "▼"}</span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="w-full text-left font-medium py-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}

                {item.children && openItems[item.label] && (
                  <div className="flex flex-col pl-4 gap-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="text-sm py-1 hover:text-brown-700 transition"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
