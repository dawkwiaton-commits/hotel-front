import Link from "next/link";

interface BaseLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function BaseLink({ href, children, className = "" }: BaseLinkProps) {
  return (
    <Link
      href={href}
      className={`underline hover:text-brown700 transition ${className}`}
    >
      {children}
    </Link>
  );
}
