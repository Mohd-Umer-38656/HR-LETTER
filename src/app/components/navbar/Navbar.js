"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center justify-between">
      {/* Left Side - Logo */}
      <div className="text-lg font-semibold">
        <Link href="/">
          <span className="cursor-pointer">HR Docs</span>
        </Link>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
      </button>

      {/* Middle Links - Hidden on Mobile, Visible on Desktop */}
      <div className="hidden md:flex gap-6 text-sm">
        <Link href="/" className="hover:text-gray-400">
          Dashboard
        </Link>
        <Link href="/dashboard" className="hover:text-gray-400">
          Templates
        </Link>
        <Link href="/admin" className="hover:text-gray-400">
          Admin
        </Link>
      </div>

      {/* Right Side - Always Visible */}
      <div className="hidden md:block">
        <Link href="/signin">
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm">
            Sign In
          </button>
        </Link>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center py-4 space-y-4 md:hidden">
          <Link href="/" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
          <Link href="/dashboard" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>
            Templates
          </Link>
          <Link href="/admin" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>
            Admin
          </Link>
          <Link href="/signin">
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm">
              Sign In
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
