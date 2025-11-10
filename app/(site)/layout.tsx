import SiteLayoutClientWrapper from "../components/layouts/SiteLayoutClientWrapper";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayoutClientWrapper>{children}</SiteLayoutClientWrapper>;
}
