import React, { useState } from "react";
import Sidebar from './TutorSideBar';
import { Outlet } from 'react-router-dom';
import { MdMenu } from "react-icons/md";

const TutorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed or sticky Navbar placeholder */}
      <header className="w-full bg-white shadow-md z-10 sticky top-0">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold">Tutor Panel</h1>
          {/* Hamburger menu for mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-2xl text-gray-700"
          >
            <MdMenu />
          </button>
        </div>
      </header>

      {/* Main content area (Sidebar + Outlet) */}
      <div className="flex flex-1 bg-gray-50">
        {/* Sidebar for large screens */}
        <div className="hidden lg:block w-64 border-r border-gray-200 bg-white shadow-sm">
          <Sidebar />
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="absolute left-0 top-0 w-64 h-full bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar  />
            </div>
          </div>
        )}

        {/* Outlet content */}
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} E-Tutor. All rights reserved.
      </footer>
    </div>
  );
};

export default TutorLayout;
