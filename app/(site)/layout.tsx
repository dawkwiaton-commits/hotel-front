import SiteLayoutClientWrapper from "../components/layouts/SiteLayoutClientWrapper";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server Component – nie dodajemy <html> ani <body>!
  return <SiteLayoutClientWrapper>{children}</SiteLayoutClientWrapper>;
}
