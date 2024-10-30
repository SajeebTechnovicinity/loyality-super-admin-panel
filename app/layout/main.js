"use client";
import { usePathname } from "next/navigation";
import Header from "../partial/header/header";
import Sidebar from "../partial/sidebar/sidebar";
import "../assets/css/form.css";

export default function Main({ children }) {
  const pathname = usePathname();

  if (pathname !== "/login") {
    return (
      <>
        <Header />

        <section className="dashboard-body account-body">
          <Sidebar />
          {children}
        </section>
      </>
    );
  } else {
    return <>{children}</>;
  }
}
