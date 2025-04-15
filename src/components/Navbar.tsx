"use client"

import React from "react"
import { Bell, User } from "lucide-react"
import { useNotifications } from "../contexts/NotificationContext"
import NotificationPanel from "./NotificationPanel"

const Navbar: React.FC = () => {
  const { unreadCount } = useNotifications()
  const [showNotifications, setShowNotifications] = React.useState(false)

  return (
    <header className="bg-black border-b border-zinc-800 z-10 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            FitLife
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              <Bell size={20} className="text-white" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-purple-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
          </div>

          <button className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors">
            <User size={20} className="text-white" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
