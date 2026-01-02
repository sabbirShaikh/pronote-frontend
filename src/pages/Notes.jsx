import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import authFetch from "../apis/fetch";
import { NoteCard } from "./NoteCard";
import { GiArchiveRegister, GiFiles } from "react-icons/gi";
import { TbPasswordFingerprint } from "react-icons/tb";
import { RiAddLargeLine } from "react-icons/ri";

const Notes = () => {
  const { token } = useContext(AuthContext);
  const [view, setView] = useState("menu");
  const [isVerified, setIsVerified] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const data = await authFetch("/api/v1/notes/");
      if (data.success) {
        setNotes(data.notes);
      }
    } catch (err) {
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVerified && view === "viewAll") {
      fetchNotes();
    }
  }, [isVerified, view]);

  const handleAction = (targetView) => {
    if (!token) {
      setShowAuthModal(true);
    } else {
      setView(targetView);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const data = await authFetch(
        "/api/v1/notes/verify",
        {
          method: "POST",
          body: JSON.stringify({ password }),
        }
      );
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          setIsVerified(true);
        }, 1000);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSaveNote = async (e) => {
    e.preventDefault();
    const url = editingId
      ? `/api/v1/notes/update/${editingId}`
      : "/api/v1/notes/add";
    const method = editingId ? "PUT" : "POST";

    try {
      const data = await authFetch(url, {
        method,
        body: JSON.stringify(noteData),
      });
      if (data.success) {
        toast.success(editingId ? "Note updated" : "Note created successfully");
        setNoteData({ title: "", description: "", category: "" });
        setEditingId(null);
        setView(isVerified ? "viewAll" : "menu");
        if (isVerified) fetchNotes();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onEdit = (note) => {
    setEditingId(note._id);
    setNoteData({
      title: note.title,
      description: note.description,
      category: note.category,
    });
    setView("create");
  };

  const onDelete = async (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        const data = await authFetch(
          `/api/v1/notes/delete/${noteId}`,
          {
            method: "DELETE",
          }
        );
        if (data.success) {
          toast.success(data.message);
          setNotes(notes.filter((n) => n._id !== noteId));
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          {view === "menu" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <button
                onClick={() => handleAction("viewAll")}
                className="group p-10 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all text-left"
              >
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GiFiles className="text-3xl" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  View Your Notes
                </h2>
                <p className="text-slate-500 text-sm">
                  Access and manage all your saved thoughts securely.
                </p>
              </button>

              <button
                onClick={() => handleAction("create")}
                className="group p-10 bg-indigo-600 rounded-[2.5rem] shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all text-left"
              >
                <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <RiAddLargeLine className="text-3xl" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Create New Note
                </h2>
                <p className="text-indigo-100 text-sm">
                  Capture a new idea or task instantly.
                </p>
              </button>
            </div>
          )}

          {view === "create" && (
            <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-sm">
              <button
                onClick={() => {
                  setView(isVerified ? "viewAll" : "menu");
                  setEditingId(null);
                  setNoteData({ title: "", description: "", category: "" });
                }}
                className="text-sm font-bold text-indigo-600 mb-6 flex items-center gap-2"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
                {editingId ? "Edit Note" : "Add New Note"}
              </h2>
              <form onSubmit={handleSaveNote} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Note title"
                    value={noteData.title}
                    onChange={(e) =>
                      setNoteData({ ...noteData, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    Category
                  </label>
                  <input
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Work, Personal, etc."
                    value={noteData.category}
                    onChange={(e) =>
                      setNoteData({ ...noteData, category: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows="5"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    placeholder="Write your content here..."
                    value={noteData.description}
                    onChange={(e) =>
                      setNoteData({ ...noteData, description: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 active:scale-95 transition-all"
                >
                  {editingId ? "Update Note" : "Save Note"}
                </button>
              </form>
            </div>
          )}

          {view === "viewAll" && (
            <div className="w-full">
              {!isVerified ? (
                <div className="max-w-md mx-auto bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TbPasswordFingerprint className="text-3xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Verification Required
                  </h2>
                  <p className="text-slate-500 mb-8">
                    Please enter your password to view your private notes.
                  </p>
                  <form onSubmit={handleVerify} className="space-y-4">
                    <input
                      type="password"
                      required
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setView("menu")}
                        className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 transition-all"
                      >
                        Verify
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <button
                        onClick={() => {
                          setView("menu");
                          setIsVerified(false);
                        }}
                        className="text-sm font-bold text-indigo-600 mb-2 flex items-center gap-2"
                      >
                        ← Back to Menu
                      </button>
                      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Your Private Vault
                      </h2>
                    </div>
                    <button
                      onClick={() => setView("create")}
                      className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl text-sm shadow-lg hover:bg-indigo-700 transition-all"
                    >
                      + New Note
                    </button>
                  </div>
                  {loading ? (
                    <div className="flex justify-center py-20">
                      <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : notes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
                      {notes.map((note) => (
                        <NoteCard
                          key={note._id}
                          note={note}
                          onEdit={onEdit}
                          onDelete={onDelete}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-300">
                      <p className="text-slate-400 font-medium italic">
                        No notes found. Start by creating one!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {showAuthModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-4xl max-w-sm w-full p-8 shadow-2xl animate-in zoom-in-95">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <GiArchiveRegister className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-center text-slate-900 mb-2">
                Join ProNote
              </h3>
              <p className="text-slate-500 text-center text-sm mb-8 leading-relaxed">
                To use this feature and keep your notes safe, you need to be
                signed in to your account.
              </p>
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="block w-full py-4 bg-indigo-600 text-white text-center font-bold rounded-2xl shadow-lg hover:bg-indigo-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full py-4 bg-slate-100 text-slate-700 text-center font-bold rounded-2xl hover:bg-slate-200"
                >
                  Sign Up
                </Link>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="block w-full py-2 text-slate-400 text-sm font-semibold"
                >
                  Not now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notes;
