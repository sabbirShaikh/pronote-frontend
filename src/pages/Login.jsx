import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authFetch from "../apis/fetch";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { setToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { email: formData.email, password: formData.password };
      const data = await authFetch("/api/v1/user/login", {
        method: "post",
        body: JSON.stringify(user),
      });
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setTimeout(() => {
          navigate("/");
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
            <h2 className="text-3xl font-bold leading-tight">Welcome Back.</h2>
            <p className="mt-4 text-indigo-100">
              Pick up right where you left off. Your notes are waiting.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs">
                  ✓
                </div>
                <span className="text-sm font-medium text-indigo-50">
                  Secure Access
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs">
                  ✓
                </div>
                <span className="text-sm font-medium text-indigo-50">
                  Instant Sync
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-slate-900">Log In</h2>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Enter your credentials
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  size="sm"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
              >
                Sign In
              </button>
            </form>

            <p className="text-center mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
              New here?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
