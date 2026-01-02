import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                PRO<span className="text-indigo-600">NOTE</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {["Home", "About", "Contact", "Notes"].map((item) => (
                <Link
                  key={item}
                  to={`/${
                    item.toLowerCase() === "home" ? "" : item.toLowerCase()
                  }`}
                  className="px-4 py-2 rounded-full text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-100 bg-slate-50 hover:border-indigo-200 hover:bg-indigo-50 transition-all focus:outline-none"
              >
                <svg
                  className="w-6 h-6 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 transform origin-top-right transition-all">
                  {token ? (
                    <>
                      <div className="px-4 py-3 border-b border-slate-50">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Account
                        </p>
                        <p className="text-sm font-bold text-slate-900 truncate">
                          User Account
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <span>Your Profile</span>
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <span>Change Password</span>
                      </Link>
                      <hr className="my-1 border-slate-100" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 font-semibold hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="p-2 space-y-1">
                      <Link
                        to="/login"
                        onClick={() => setIsProfileOpen(false)}
                        className="block w-full text-center px-4 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-100"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsProfileOpen(false)}
                        className="block w-full text-center px-4 py-2.5 text-sm font-bold text-slate-700 bg-slate-50 rounded-xl hover:bg-slate-100"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {["Home", "About", "Contact", "Notes"].map((item) => (
              <Link
                key={item}
                to={`/${
                  item.toLowerCase() === "home" ? "" : item.toLowerCase()
                }`}
                className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
