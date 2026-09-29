import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Award, 
  Briefcase, 
  Sparkles, 
  BookOpen, 
  FileText,
  Server,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import { useRouter } from "../routes/Router";
import { apiClient } from "../api/client";
import { API_BASE_URL } from "../api/config";

export default function Navbar() {
  const { currentRoute, navigate } = useRouter();
  const [mockActive, setMockActive] = useState(apiClient.isMockActive);

  const toggleMock = () => {
    const next = !mockActive;
    apiClient.setMockMode(next);
    setMockActive(next);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "students", label: "Employees / Students", icon: Users },
    { id: "skills", label: "Skills", icon: Award },
    { id: "jobs", label: "Jobs", icon: Briefcase },
    { id: "skill-gap", label: "Skill Gap Analyzer", icon: Sparkles },
    { id: "recommendations", label: "Recommendations", icon: BookOpen },
    { id: "applications", label: "Applications", icon: FileText }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Name */}
          <div 
            onClick={() => navigate("dashboard")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-indigo-100" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900 block leading-tight">
                Employee Skill Gap Analyzer
              </span>
              <span className="text-[11px] font-semibold text-indigo-600 tracking-wide uppercase">
                Pure Java REST API Compatible
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.id || 
                (item.id === "students" && (currentRoute === "add-student" || currentRoute === "student-profile")) ||
                (item.id === "jobs" && currentRoute === "job-details");
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-2xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* API Status Badge */}
          <div className="flex items-center gap-3">
            <div 
              onClick={toggleMock}
              title="Click to toggle between Mock Store and Pure Java REST API"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                mockActive
                  ? "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100"
                  : "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              <Server className="w-3.5 h-3.5 shrink-0" />
              <div className="text-left leading-tight hidden sm:block">
                <span className="block font-bold text-[10px] uppercase">
                  {mockActive ? "Offline Mock Mode" : "Live REST API"}
                </span>
                <span className="text-[10px] opacity-75 font-mono">
                  {mockActive ? "In-Memory Store" : API_BASE_URL}
                </span>
              </div>
              {mockActive ? (
                <ToggleLeft className="w-5 h-5 text-amber-600" />
              ) : (
                <ToggleRight className="w-5 h-5 text-emerald-600" />
              )}
            </div>
          </div>
        </div>

        {/* Secondary / Mobile Subnav */}
        <div className="flex xl:hidden items-center gap-1 py-2 border-t border-slate-100 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id || 
              (item.id === "students" && (currentRoute === "add-student" || currentRoute === "student-profile")) ||
              (item.id === "jobs" && currentRoute === "job-details");
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}