import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ProfileCircle() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const {data} = useSelector(state=>state.auth)

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Profile image click */}
      <img
      src={data.profileImg}
        className="h-12 w-12 cursor-pointer rounded-full object-cover object-center"
        onClick={toggleMenu}
      />

      {/* Dropdown menu */}
      {/* {isOpen && (
        <ul
          role="menu"
          className="absolute right-0 z-10 mt-2 min-w-[180px] flex flex-col gap-2 rounded-md border border-blue-gray-50 bg-white p-3 shadow-lg"
        >
          {[
            { icon: "👤", label: "My Profile", link :"profile" },
            { icon: "⚙️", label: "Edit Profile" },
            { icon: "📥", label: "Inbox" },
            { icon: "❓", label: "Help" },
          ].map((item) => (
            <Link
                to={item.link}
              key={item.label}
              role="menuitem"
              className="flex w-full z-50 items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-blue-gray-50"
              onClick={() => alert(`${item.label} clicked`)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          <hr className="my-2 border-blue-gray-100" />
          <button
            role="menuitem"
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-red-100 text-red-600"
            onClick={() => alert("Signed out")}
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </ul>
      )} */}
    </div>
  );
}
