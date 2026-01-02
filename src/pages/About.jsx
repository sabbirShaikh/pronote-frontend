import React from "react";

const About = () => {
  const techStack = [
    {
      name: "MongoDB",
      role: "Database",
      icon: "🍃",
      color: "bg-green-50 text-green-700",
    },
    {
      name: "Express.js",
      role: "Backend Framework",
      icon: "🚂",
      color: "bg-gray-50 text-gray-700",
    },
    {
      name: "React.js",
      role: "Frontend Library",
      icon: "⚛️",
      color: "bg-blue-50 text-blue-700",
    },
    {
      name: "Node.js",
      role: "Runtime Environment",
      icon: "🟢",
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      name: "Tailwind CSS",
      role: "Styling",
      icon: "🎨",
      color: "bg-cyan-50 text-cyan-700",
    },
    {
      name: "Context API",
      role: "State Management",
      icon: "🔗",
      color: "bg-indigo-50 text-indigo-700",
    },
  ];

  const features = [
    {
      title: "JWT Auth",
      desc: "Secure authentication using JSON Web Tokens.",
      icon: "🔑",
    },
    {
      title: "Private Vault",
      desc: "Password-protected note access for extra security.",
      icon: "🔐",
    },
    {
      title: "Full CRUD",
      desc: "Create, Read, Update, and Delete notes seamlessly.",
      icon: "📝",
    },
    {
      title: "Email Service",
      desc: "Professional contact forms powered by Nodemailer.",
      icon: "📧",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            About <span className="text-indigo-600">ProNote</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            ProNote is a full-stack MERN application designed for users who
            value privacy and speed in their digital workflow.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-200 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm">
              ✓
            </span>
            Key Features Implemented
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100 transition-hover hover:border-indigo-200 group"
              >
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">
                  {f.icon}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900">{f.title}</h4>
                  <p className="text-sm text-slate-500 leading-snug">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              MERN Stack Architecture
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium uppercase tracking-widest">
              Powering ProNote
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="relative bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300 group overflow-hidden"
              >
                <div
                  className={`absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10 transition-transform group-hover:scale-150 ${
                    tech.color.split(" ")[0]
                  }`}
                />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className={`w-14 h-14 ${tech.color} rounded-2xl flex items-center justify-center text-2xl shadow-inner mb-4 transform transition-transform group-hover:rotate-12`}
                  >
                    {tech.icon}
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-lg tracking-tight">
                    {tech.name}
                  </h3>
                  <div className="mt-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {tech.role}
                    </p>
                  </div>
                </div>
                <div
                  className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ${
                    tech.color.split(" ")[0]
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center border-t border-slate-200 pt-10">
          <p className="text-slate-500 text-sm font-medium">
            Designed and Developed by{" "}
            <span className="text-indigo-600 font-bold hover:underline cursor-pointer">
              Sk Sabbir Ali
            </span>
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="https://github.com/sabbirShaikh"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-indigo-600 transition-colors font-semibold text-sm"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sk-sabbir-ali/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-indigo-600 transition-colors font-semibold text-sm"
            >
              LinkedIn
            </a>
            <a
              href="https://sk-sabbir-ali-portfolio.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-indigo-600 transition-colors font-semibold text-sm"
            >
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
