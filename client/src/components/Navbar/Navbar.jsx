import React from "react";
import { NavbarMenu } from "../../mockData/navData";
import { MdComputer, MdMenu } from "react-icons/md";
import { motion } from "framer-motion";
import ResponsiveMenu from "./ResponsiveMenu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const handleRegister = ()=>navigate("/register")
  const handleLogin = ()=>navigate("/login")
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="container flex justify-between items-center py-6 bg-primary/10">
          {/* Logo section */}
          <div className="text-2xl flex items-center gap-2 font-bold">
            <MdComputer className="text-3xl text-secondary" />
            <p>E-Tutor</p>
          </div>

          {/* Menu section */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {NavbarMenu.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="inline-block text-gray-600 text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-secondary transition-all duration-300 font-semibold "
                  >
                    <a href={item.url}>{item.title}</a>
                  </li>
                );
              })}
            </ul>
          </div>


          {/* CTA Button section */}
          <div className="hidden lg:block space-x-6">
            <button onClick={handleLogin} className="font-semibold hover:!scale-110 hover:!shadow-xl duration-300">Sign in</button>
            <button onClick={handleRegister} className="text-white bg-secondary font-semibold rounded-full px-6 py-2 hover:!scale-110 hover:!shadow-xl duration-300">Register</button>
          </div> 


          {/* Mobile Hamburger menu */}
          <div className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            <MdMenu className="text-4xl " />
          </div>
        </div>
      </motion.nav>

      {/* Mobile sidebar section */}
      <ResponsiveMenu  isOpen={isOpen}/>

    </>
  );
};

export default Navbar;
