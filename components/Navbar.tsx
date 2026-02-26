"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Citiory
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-1">
            <li>
              <Link 
                href="/cities" 
                className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium"
              >
                Cities
              </Link>
            </li>
            <li>
              <Link 
                href="/best" 
                className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium"
              >
                Best
              </Link>
            </li>
            <li>
              <Link 
                href="/rankings" 
                className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium"
              >
                Rankings
              </Link>
            </li>
            <li>
              <Link 
                href="/nomads" 
                className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium"
              >
                Nomads
              </Link>
            </li>
            <li>
              <Link 
                href="/compare" 
                className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium"
              >
                Compare
              </Link>
            </li>
            <li>
              <Link 
                href="/blog" 
                className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                href="/guides" 
                className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium"
              >
                Guides
              </Link>
            </li>
            <li>
              <Link 
                href="/topics" 
                className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium"
              >
                Topics
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <ul className="px-4 py-2 space-y-1">
            <li>
              <Link 
                href="/cities"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cities
              </Link>
            </li>
            <li>
              <Link 
                href="/best"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Best
              </Link>
            </li>
            <li>
              <Link 
                href="/rankings"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rankings
              </Link>
            </li>
            <li>
              <Link 
                href="/nomads"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Nomads
              </Link>
            </li>
            <li>
              <Link 
                href="/compare"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Compare
              </Link>
            </li>
            <li>
              <Link 
                href="/blog"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                href="/guides"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Guides
              </Link>
            </li>
            <li>
              <Link 
                href="/topics"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Topics
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}