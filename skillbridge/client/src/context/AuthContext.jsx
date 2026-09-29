import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("skillbridge_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [demoUsers, setDemoUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchDemoUsers = async () => {
    try {
      const res = await fetch("/api/auth/demo-users");
      if (res.ok) {
        const data = await res.json();
        setDemoUsers(data);
      }
    } catch (err) {
      console.error("Failed to load demo users:", err);
    }
  };

  useEffect(() => {
    fetchDemoUsers();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("skillbridge_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("skillbridge_user");
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      setUser(data.user);
      addToast(`Welcome back, ${data.user.name}!`, "success");
      return { success: true };
    } catch (err) {
      addToast(err.message, "error");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setUser(data.user);
      addToast(`Account created! Welcome, ${data.user.name}`, "success");
      return { success: true };
    } catch (err) {
      addToast(err.message, "error");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const quickSwitchUser = (userId) => {
    const target = demoUsers.find((u) => u.id === userId);
    if (target) {
      setUser(target);
      addToast(`Switched account to ${target.name} (${target.role.toUpperCase()})`, "info");
    }
  };

  const refreshUser = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/users/${user.id}`);
      if (res.ok) {
        const updated = await res.json();
        setUser(updated);
      }
    } catch (err) {
      console.error("Error refreshing user:", err);
    }
  };

  const logout = () => {
    setUser(null);
    addToast("Logged out successfully", "info");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || "guest",
        demoUsers,
        loading,
        login,
        register,
        quickSwitchUser,
        refreshUser,
        logout,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all transform translate-y-0 ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : toast.type === "error"
                ? "bg-rose-50 border-rose-200 text-rose-900"
                : "bg-indigo-50 border-indigo-200 text-indigo-900"
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 ml-2"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
