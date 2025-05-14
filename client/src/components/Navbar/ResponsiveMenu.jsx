import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const ResponsiveMenu = ({ isOpen, menuItems, isAuthenticated, role }) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full h-screen z-20 lg:hidden bg-primary text-white"
        >
          <div className="text-xl font-semibold uppercase py-6 m-6 rounded-3xl">
            <ul className="flex flex-col items-center justify-center gap-5">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link to={item.url} className="hover:underline">
                    {item.title}
                  </Link>
                </li>
              ))}

              {isAuthenticated ? (
                <li>
                  <Link to={`/${role}`} className="hover:underline">
                    My Profile
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="hover:underline">Sign In</Link>
                  </li>
                  <li>
                    <Link to="/register" className="hover:underline">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
