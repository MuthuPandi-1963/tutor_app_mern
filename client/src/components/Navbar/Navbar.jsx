import React from "react";
import { MdComputer, MdMenu } from "react-icons/md";
import { motion } from "framer-motion";
import ResponsiveMenu from "./ResponsiveMenu";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileCircle from "../Profile/ProfileCircle";
import getNavbarMenu  from "../../mockData/navData";

const Navbar = () => {
  const navigate = useNavigate();
  const handleRegister = () => navigate("/register");
  const handleLogin = () => navigate("/login");
  const [isOpen, setIsOpen] = React.useState(false);

  const authState = useSelector((state) => state.auth);
  const user = authState?.data;
  const isAuthenticated = authState?.isAuthenticated;
  console.log(authState);
  
  const role = user?.role || null; // student | parent | tutor | null
  const menuItems = getNavbarMenu(role);
  console.log(menuItems);
  

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex w-full mx-auto px-6 justify-between items-center py-2 bg-white/100 shadow-lg shadow-blue-500 fixed z-50  top-0">
          {/* Logo */}
          <div className="text-2xl flex items-center gap-2 font-bold">
            <MdComputer className="text-3xl text-secondary" />
            <p>E-Tutor</p>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className="inline-block text-gray-600 text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-secondary transition-all duration-300 font-semibold"
                >
                  <Link to={item.url}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Auth Controls */}
          {isAuthenticated ? (
            <Link to={`/${role}`}>
              <ProfileCircle />
            </Link>
          ) : (
            <div className="hidden lg:block space-x-6">
              <button onClick={handleLogin} className="font-semibold hover:!scale-110 hover:!shadow-xl duration-300">
                Sign in
              </button>
              <button
                onClick={handleRegister}
                className="text-white bg-secondary font-semibold rounded-full px-6 py-2 hover:!scale-110 hover:!shadow-xl duration-300"
              >
                Register
              </button>
            </div>
          )}

          {/* Hamburger Menu (Mobile) */}
          <div className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            <MdMenu className="text-4xl" />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <ResponsiveMenu isOpen={isOpen} menuItems={menuItems} isAuthenticated={isAuthenticated} role={role} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;
