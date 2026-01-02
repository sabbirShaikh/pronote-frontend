import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import authFetch from "../apis/fetch";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    const user = {
      email: formData.email,
      name: formData.username,
      password: formData.password,
    };
    try {
      const data = await authFetch("/api/v1/user/signup", {
        method: "post",
        body: JSON.stringify(user),
      });
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />

      <div className="flex items-center justify-center pt-24 pb-12 px-4 bg-slate-50 min-h-fit">
        <div className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100">
          <div className="hidden md:flex flex-col justify-center p-10 bg-indigo-600 text-white">
            <h2 className="text-3xl font-bold leading-tight">
              Join our community.
            </h2>
            <p className="mt-4 text-indigo-100">
              Start organizing your thoughts and tasks in one beautiful place.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs">
                  ✓
                </div>
                <span className="text-sm font-medium text-indigo-50">
                  Unlimited Notes
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs">
                  ✓
                </div>
                <span className="text-sm font-medium text-indigo-50">
                  Cloud Sync
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900">
                Sign Up
              </h2>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Get started for free
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Username"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Confirm"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
              >
                Create Account
              </button>
            </form>

            <p className="text-center mt-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Already have an account?
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
