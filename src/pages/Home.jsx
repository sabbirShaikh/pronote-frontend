import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { token } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-50 rounded-full">
            Smart Note Taking
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Organize your thoughts, <br />
            <span className="text-indigo-600">anywhere, anytime.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed">
            ProNote helps you capture and organize your ideas with ease. A
            clean, secure, and focused environment for your daily productivity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {token ? (
              <Link
                to="/notes"
                className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
              >
                Go to My Notes
              </Link>
            ) : (
              <Link
                to="/signup"
                className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
              >
                Get Started for Free
              </Link>
            )}
            <Link
              to="/about"
              className="px-8 py-4 bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-100 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Rich Editing
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Format your notes exactly how you want with our intuitive and
                powerful editor.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Secure Storage
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Your data is encrypted and private. Only you have access to your
                personal information.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Real-time Sync
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Access your notes from any device. We keep everything in sync
                instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-indigo-600 rounded-[2.5rem] p-10 md:p-16 shadow-2xl shadow-indigo-200">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to boost your productivity?
            </h2>
            <p className="text-indigo-100 mb-8 text-lg">
              Join thousands of users who are already using ProNote to manage
              their daily workflow.
            </p>
            {token ? (
              <Link
                to="/notes"
                className="inline-block px-10 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors"
              >
                Go to Notes
              </Link>
            ) : (
              <Link
                to="/signup"
                className="inline-block px-10 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors"
              >
                Sign Up Now
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;