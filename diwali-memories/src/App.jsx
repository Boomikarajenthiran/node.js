import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import MyMemories from './pages/MyMemories'
import FriendsFun from './pages/FriendsFun'
import FoodSweets from './pages/FoodSweets'
import Gallery from './pages/Gallery'
import About from './pages/About'

// Auto scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100">
      <ScrollToTop />
      
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Routes */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memories" element={<MyMemories />} />
          <Route path="/friends" element={<FriendsFun />} />
          <Route path="/sweets" element={<FoodSweets />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
