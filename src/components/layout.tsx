import type { ReactNode } from "react";

export type LayoutProps = {
  className?: string;
  heading: ReactNode;
  children: ReactNode;
  above?: ReactNode;
};

export const Layout = ({
  className = "",
  heading,
  children,
  above,
}: LayoutProps) => {
  return (
    <div className={`view ${className}`}>
      <div className="wrap">
        <header>
          <h1>{heading}</h1>
        </header>
        {above && <aside className="above">{above}</aside>}
        <main>{children}</main>
        <footer>&copy;2026 Belwerks & Canoe Routes Ontario</footer>
      </div>
    </div>
  );
};
