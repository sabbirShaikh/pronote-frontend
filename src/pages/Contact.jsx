import React, { useState } from "react";
import authFetch from "../apis/fetch";
import { toast, ToastContainer } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const details = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };
    try {
      const data = await authFetch("/api/v1/contact", {
        method: "post",
        body: JSON.stringify(details),
      });
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />

      <div className="min-h-screen bg-white pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Get in <span className="text-indigo-600">Touch</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto font-medium">
              Have questions or want to collaborate? Send a message below or
              check out my work on GitHub.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* GitHub Highlight Card */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 rounded-4xl p-8 h-full flex flex-col justify-between text-white shadow-2xl shadow-slate-200">
                <div>
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">View My Work</h2>
                  <p className="text-slate-400 leading-relaxed mb-8">
                    I'm passionate about building clean, functional, and
                    user-centric web applications. You can explore all my
                    repositories and contributions on GitHub.
                  </p>
                </div>
                <a
                  href="https://github.com/sabbirShaikh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all group"
                >
                  Go to GitHub
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-4xl border border-slate-200 p-8 md:p-10 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">
                        Full Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="Enter your name"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">
                        Email Address
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="Enter your email"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Subject
                    </label>
                    <input
                      name="subject"
                      type="text"
                      value={formData.subject}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="Project Inquiry / Feedback"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      rows="4"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                      placeholder="Tell me more..."
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
