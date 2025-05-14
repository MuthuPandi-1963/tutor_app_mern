import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutThunk from '../../store/Thunks/Auth/LogoutThunk';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/tutor' },
    { name: 'Edit Profile', path: '/tutor/edit-profile' },
    { name: 'My Students', path: '/tutor/students' },
    { name: 'Bookings', path: '/tutor/bookings' },
    { name: 'Earnings', path: '/tutor/earnings' },
  ];
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    localStorage.clear();
    dispatch(LogoutThunk())
    navigate("/")
    
  }

  return (
    <aside className=" top-[70px] min-h-[600px] left-0  w-64  border-gray-900  bg-blue-800  z-40 flex flex-col justify-between p-6">
      <div>
        <h2 className="text-2xl font-bold text-yellow-500 mb-6 z-10">Tutor Panel</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-yellow-400 text-blue-900'
                : 'text-blue-200 hover:bg-blue-400'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 my-2 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition duration-200"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
