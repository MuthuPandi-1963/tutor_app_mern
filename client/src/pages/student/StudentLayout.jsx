// StudentLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import StudentSidebar from './StudentSidebar';

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden absolute top-4 right-4 z-50 p-2 bg-blue-600 text-white rounded-full shadow-lg"
      >
        <FiMenu className="text-2xl" />
      </button>

      {/* Sidebar */}
      <div className="hidden lg:block  left-0 top-0 min-h-screen w-64 bg-blue-900 shadow-xl">
        <StudentSidebar />

      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <div 
            className="absolute left-0 top-0 w-64 min-h-screen bg-blue-900 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <StudentSidebar closeMobileMenu={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`flex-1  transition-all duration-300 min-h-screen ${sidebarOpen ? 'blur-sm' : ''}`} onClick={()=>setSidebarOpen(prev=>prev==true ? false : prev)}>
        <div className="p-6 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;