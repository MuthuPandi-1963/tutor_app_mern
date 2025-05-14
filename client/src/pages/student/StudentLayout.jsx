import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import StudentSidebar from './StudentSidebar';

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full bg-white shadow-md z-10 sticky top-0">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold">Student Panel</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-2xl text-gray-700"
          >
            <MdMenu />
          </button>
        </div>
      </header>

      <div className="flex flex-1 bg-gray-50">
        <div className="hidden lg:block w-64 border-r border-gray-200 bg-white shadow-sm">
          <StudentSidebar />
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="absolute left-0 top-0 w-64 h-full bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <StudentSidebar />
            </div>
          </div>
        )}

        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>

      <footer className="bg-white shadow-md py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} E-Tutor. All rights reserved.
      </footer>
    </div>
  );
};

export default StudentLayout;
