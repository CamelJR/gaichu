// src/components/Layout.tsx
import React from "react";
import Breadcrumbs from "./Breadcrumbs";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-mainBg">
      {/* Optional: Header goes here */}
      {/* ... */}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Main page content */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
