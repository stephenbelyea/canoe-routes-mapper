import type { ReactNode } from "react";

export const Layout = ({
  className = "",
  heading,
  children,
}: {
  className?: string;
  heading: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className={`view ${className}`}>
      <div className="wrap">
        <header>
          <h1>{heading}</h1>
        </header>
        <main>{children}</main>
        <footer>&copy;2026 Belwerks & Canoe Routes Ontario</footer>
      </div>
    </div>
  );
};
