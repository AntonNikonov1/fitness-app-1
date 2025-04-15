"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import { useUser } from "./UserContext"

interface Notification {
  id: string
  message: string
  type: "motivation" | "reminder" | "challenge" | "tip"
  read: boolean
  createdAt: Date
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (message: string, type: Notification["type"]) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    if (typeof window !== "undefined") {
      const savedNotifications = localStorage.getItem("notifications")
      return savedNotifications
        ? JSON.parse(savedNotifications).map((n: any) => ({
            ...n,
            createdAt: new Date(n.createdAt),
          }))
        : []
    }
    return []
  })

  const { user } = useUser()

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications))
  }, [notifications])

  const unreadCount = notifications.filter((n) => !n.read).length

  const addNotification = (message: string, type: Notification["type"]) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      read: false,
      createdAt: new Date(),
    }

    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  // Generate motivational notifications based on user's assistant style
  useEffect(() => {
    if (!user) return

    const motivationalMessages = {
      strict: [
        "Нет оправданий! Пора тренироваться!",
        "Ты действительно хочешь пропустить тренировку сегодня?",
        "Сладкое - это слабость. Будь сильнее!",
        "Каждый пропуск тренировки - шаг назад.",
      ],
      friendly: [
        "Ты справишься! Давай сделаем эту тренировку вместе!",
        "Помни, почему ты начал. Ты на правильном пути!",
        "Даже небольшой прогресс - это всё равно прогресс!",
        "Сегодня новый день, чтобы стать лучше!",
      ],
      expert: [
        "Согласно исследованиям, регулярные тренировки повышают метаболизм на 15%.",
        "Оптимальное время для тренировки - 45-60 минут.",
        "Белок необходим для восстановления мышц после тренировки.",
        "Гидратация критически важна для эффективных тренировок.",
      ],
    }

    const interval = setInterval(() => {
      const style = user.assistantStyle
      const messages = motivationalMessages[style]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]

      addNotification(randomMessage, "motivation")
    }, 3600000) // каждый час

    return () => clearInterval(interval)
  }, [user])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
