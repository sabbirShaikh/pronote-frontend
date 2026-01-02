import React, { useState, useContext, useEffect } from "react";
import authFetch from "../apis/fetch";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const [user, setUser] = useState("");
  const [activeSection, setActiveSection] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [updateDet, setUpdateDet] = useState({
    email: "",
    password: "",
    newPassword: "",
    confNewPassword: "",
  });

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const data = await authFetch("/api/v1/user/");
      setUser(data.user);
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleChange(e) {
    setUpdateDet({ ...updateDet, [e.target.name]: e.target.value });
  }

  async function updateEmail(e) {
    e.preventDefault();
    const email = updateDet.email;
    try {
      const data = await authFetch(
        "/api/v1/user/emailchange",
        {
          method: "put",
          body: JSON.stringify({ email }),
        }
      );
      if (data.success) {
        toast.success(data.message);
        getUser();
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }
  async function updatePassword(e) {
    e.preventDefault();
    if (updateDet.confNewPassword != updateDet.newPassword) {
      return toast.error("New password and confirm password are not same!");
    }
    const details = {
      password: updateDet.password,
      newPassword: updateDet.newPassword,
    };
    try {
      const data = await authFetch(
        "/api/v1/user/pschange",
        {
          method: "put",
          body: JSON.stringify(details),
        }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  const handleDeleteAccount = async () => {
    try {
      const data = await authFetch(
        "/api/v1/user/deleteacc",
        {
          method: "delete",
        }
      );
      if (data.success) {
        toast.success(data.message);
        logout();
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
      <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-xl font-bold text-gray-800">
              Profile Settings
            </h1>
            <p className="text-sm text-gray-500">
              You can update your account information
            </p>
          </div>

          <div className="p-6 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {user?.name || "Username"}
                </h2>
                <p className="text-sm text-gray-500">Personal Account</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">
                    Email Address
                  </label>
                  <p className="text-gray-700 font-medium">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
                <button
                  onClick={() => toggleSection("email")}
                  className="text-sm font-semibold text-indigo-600 hover:underline"
                >
                  {activeSection === "email" ? "Cancel" : "Change"}
                </button>
              </div>

              {activeSection === "email" && (
                <form onSubmit={updateEmail}>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <input
                      type="email"
                      onChange={handleChange}
                      name="email"
                      required
                      placeholder="Enter new email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                    <button
                      type="submit"
                      className="mt-3 w-full bg-indigo-600 text-white text-sm py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Update Email
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">
                    Password
                  </label>
                  <p className="text-gray-700 font-medium">••••••••••••</p>
                </div>
                <button
                  onClick={() => toggleSection("password")}
                  className="text-sm font-semibold text-indigo-600 hover:underline"
                >
                  {activeSection === "password" ? "Cancel" : "Change"}
                </button>
              </div>

              {activeSection === "password" && (
                <form onSubmit={updatePassword}>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      required
                      placeholder="Current Password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                    <input
                      type="password"
                      name="newPassword"
                      required
                      onChange={handleChange}
                      placeholder="New Password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                    <input
                      type="password"
                      name="confNewPassword"
                      required
                      onChange={handleChange}
                      placeholder="Confirm New Password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white text-sm py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center rounded-b-xl">
            <span className="text-xs text-gray-500">Member since 2025</span>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-center text-gray-900">
                Delete Account?
              </h3>
              <p className="mt-2 text-sm text-center text-gray-500">
                This action is permanent and cannot be undone. All your notes
                and data will be lost forever.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <button
                  onClick={handleDeleteAccount}
                  className="w-full py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-colors"
                >
                  Yes, delete my account
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full py-2.5 bg-gray-100 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  No, keep it
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
