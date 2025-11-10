"use client";
import Footer from "./Footer";
import Header from "./Header";

 // <- sprawia, że cały wrapper renderuje się po stronie klienta


export default function SiteLayoutClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
