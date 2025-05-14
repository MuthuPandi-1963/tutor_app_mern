import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HiHome,
  HiUserGroup,
  HiCalendar,
  HiStar,
  HiUserCircle,
  HiLogout
} from 'react-icons/hi';
import LogoutThunk from '../../store/Thunks/Auth/LogoutThunk';
import { useDispatch } from 'react-redux';

const links = [
  { path: '/parent/dashboard', label: 'Dashboard', icon: <HiHome /> },
  { path: '/parent/children', label: 'My Children', icon: <HiUserGroup /> },
  { path: '/parent/bookings', label: 'Bookings', icon: <HiCalendar /> },
  { path: '/parent/reviews', label: 'Reviews', icon: <HiStar /> },
  { path: '/parent/profile', label: 'Profile', icon: <HiUserCircle /> },
];

const ParentSidebar = ({ closeMobileMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  return (
    <aside className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 mb-4 border-b border-blue-800">
        <h1 className="text-2xl font-bold text-yellow-400">Parent Portal</h1>
        <p className="text-blue-200 text-sm mt-1">Family Dashboard</p>
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
      <div className=" p-4 border-t border-blue-800">
        <button
          onClick={async() => {
            await dispatch(LogoutThunk())
            localStorage.clear()
            navigate('/');
          }}
          className="w-full flex items-center bg-red-700 space-x-3 p-3 text-white hover:bg-red-500 rounded-lg"
        >
          <HiLogout className="text-xl" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default ParentSidebar;