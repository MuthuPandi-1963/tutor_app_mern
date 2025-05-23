// StudentSidebar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HiHome,
  HiAcademicCap,
  HiChat,
  HiStar,
  HiUserCircle,
  HiLogout
} from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import LogoutThunk from '../../store/Thunks/Auth/LogoutThunk';

const links = [
  { path: '/student/dashboard', label: 'Dashboard', icon: <HiHome /> },
  { path: '/student/classes', label: 'My Classes', icon: <HiAcademicCap /> },
  { path: '/student/reviews', label: 'Reviews', icon: <HiStar /> },
  { path: '/student/profile', label: 'Profile', icon: <HiUserCircle /> },
];

const StudentSidebar = ({ closeMobileMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  return (
    <aside className="flex flex-col">
      {/* Header */}
      <div className="p-6 mb-4 border-b border-blue-800">
        <h1 className="text-2xl font-bold text-yellow-400">Student Portal</h1>
        <p className="text-blue-200 text-sm mt-1">Learning Dashboard</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={closeMobileMenu}
            className={`flex items-center space-x-3 p-3 mb-2 rounded-lg transition-all ${
              location.pathname === link.path
                ? 'bg-yellow-400 text-blue-900'
                : 'text-blue-200 hover:bg-blue-800'
            }`}
          >
            <span className="text-xl">{link.icon}</span>
            <span className="font-medium">{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="mt-auto p-4 border-t border-blue-800">
        <button
          onClick={async() => {
            await dispatch(LogoutThunk())
            localStorage.clear()
            navigate('/');
          }}
          className="w-full flex items-center space-x-3 p-3 text-blue-200 hover:bg-blue-800 rounded-lg"
        >
          <HiLogout className="text-xl" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;