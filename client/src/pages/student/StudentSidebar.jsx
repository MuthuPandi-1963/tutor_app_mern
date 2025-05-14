import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { path: '/student/dashboard', label: 'Dashboard' },
  { path: '/student/classes', label: 'My Classes' },
//   { path: '/student/chat', label: 'Messages' },
  { path: '/student/reviews', label: 'My Reviews' },
  { path: '/student/profile', label: 'My Profile' },
];

const StudentSidebar = () => {
  const location = useLocation();

  return (
    <aside className="bg-white h-full p-4 border-r shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Student Panel</h2>
      <ul className="space-y-4">
        {links.map(link => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`block px-3 py-2 rounded-md hover:bg-blue-100 ${
                location.pathname === link.path ? 'bg-blue-500 text-white' : 'text-gray-700'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default StudentSidebar;
