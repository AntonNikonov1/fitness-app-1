"use client"

import type React from "react"
import { useNotifications } from "../contexts/NotificationContext"
import { X, Check } from "lucide-react"

interface NotificationPanelProps {
  onClose: () => void
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useNotifications()

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    }).format(date)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "motivation":
        return "🔥"
      case "reminder":
        return "⏰"
      case "challenge":
        return "🏆"
      case "tip":
        return "💡"
      default:
        return "📌"
    }
  }

  return (
    <div className="absolute right-0 mt-2 w-80 bg-zinc-900 rounded-xl shadow-lg overflow-hidden z-20 border border-zinc-800">
      <div className="p-3 border-b border-zinc-800 flex justify-between items-center">
        <h3 className="text-sm font-medium text-white">Уведомления</h3>
        <div className="flex space-x-2">
          <button onClick={markAllAsRead} className="text-xs text-blue-400 hover:text-blue-300">
            Прочитать все
          </button>
          <button onClick={clearNotifications} className="text-xs text-red-400 hover:text-red-300">
            Очистить
          </button>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-zinc-500">Нет уведомлений</div>
        ) : (
          <ul className="divide-y divide-zinc-800">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-4 hover:bg-zinc-800 ${!notification.read ? "bg-zinc-800/50" : ""}`}
              >
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <span className="mr-2">{getTypeIcon(notification.type)}</span>
                    <div>
                      <p className="text-sm text-zinc-200">{notification.message}</p>
                      <p className="text-xs text-zinc-500 mt-1">{formatDate(notification.createdAt)}</p>
                    </div>
                  </div>
                  {!notification.read && (
                    <button onClick={() => markAsRead(notification.id)} className="text-blue-400 hover:text-blue-300">
                      <Check size={16} />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default NotificationPanel
