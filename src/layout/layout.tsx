import React, { FunctionComponent, ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "@/auth/useAuth";
import Navbar from "src/components/navbar";

interface IProps {
  main: ReactNode;
}

const Layout: FunctionComponent<IProps> = ({ main }) => {
  const { logout, authenticated } = useAuth();

  return (
    <div className="bg-blue-900 max-w-screen-2xl mx-auto text-white">
     <Navbar authenticated={authenticated} logout={logout} />
      <main style={{ minHeight: "calc(100vh - 64px)" }}>{main}</main>
    </div>
  );
};

export default Layout;
