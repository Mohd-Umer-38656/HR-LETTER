"use client";
import { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./dashboard/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="absolute top-18 left-4 md:hidden p-2 bg-gray-800 text-white rounded-md z-50"
        onClick={() => setSidebarOpen(true)}
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      {/* Sidebar - Shows as a drawer in mobile */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-100 border-r border-gray-300 p-4 z-40 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:w-1/5`}
      >
        {/* Close Button for Mobile */}
        <button
          className="absolute top-4 right-4 md:hidden text-gray-800"
          onClick={() => setSidebarOpen(false)}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <Sidebar />
      </div>

      {/* Overlay when sidebar opens on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Dashboard />
      </div>
    </div>
  );
}
