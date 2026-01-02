import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900">
                PRO<span className="text-indigo-600">NOTE</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Elevating your productivity with a clean and secure note-taking
              experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-slate-600 hover:text-indigo-600 text-sm transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/notes"
                  className="text-slate-600 hover:text-indigo-600 text-sm transition-colors"
                >
                  My Notes
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-600 hover:text-indigo-600 text-sm transition-colors"
                >
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm mb-4 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="text-slate-600 hover:text-indigo-600 text-sm transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-600 hover:text-indigo-600 text-sm transition-colors"
                >
                  About MERN
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/sabbirShaikh"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-600 hover:text-indigo-600 text-sm transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Info */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm mb-4 uppercase tracking-wider">
              Developed By
            </h4>
            <p className="text-slate-700 text-sm font-bold">Sk Sabbir Ali</p>
            <p className="text-slate-500 text-xs mt-1">MERN Stack Developer</p>
            <div className="mt-4">
              <a
                href="https://sk-sabbir-ali-portfolio.netlify.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs font-medium">
            © {new Date().getFullYear()} ProNote. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-300">|</span>
            <p className="text-slate-400 text-xs font-medium">
              Built with <span className="text-red-400">❤</span> using MERN
              Stack
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
