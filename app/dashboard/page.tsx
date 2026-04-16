"use client";

import { useEffect, useState } from "react";
import { Close } from "@finity/design-system";
import Sidebar from "../components/Sidebar";

function SuccessIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="10" fill="#22C55E" />
      <path d="M6 10L8.5 12.5L14 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DashboardPage() {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-white flex items-center justify-center relative">
        <p className="text-xl font-bold text-black">Dashboard</p>

        {/* Toast */}
        {showToast && (
          <div className="absolute top-8 right-8 flex items-center gap-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl px-4 py-3 shadow-sm">
            <SuccessIcon />
            <span className="text-sm font-medium text-black">
              Account created successfully
            </span>
            <button
              onClick={() => setShowToast(false)}
              className="ml-1 text-[#A3A3A3] hover:text-[#404040] transition-colors"
            >
              <Close size={16} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
