"use client"

import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useUser } from "../contexts/UserContext"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import MobileNav from "./MobileNav"

const Layout: React.FC = () => {
  const { isOnboarded } = useUser()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!isOnboarded) {
      navigate("/onboarding")
    }
  }, [isOnboarded, navigate])

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
        <MobileNav />
      </div>
    </div>
  )
}

export default Layout
