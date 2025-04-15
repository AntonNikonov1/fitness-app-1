"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"

interface UserProfile {
  height: number
  weight: number
  age: number
  gender: "male" | "female" | "other"
  allergies: string[]
  medicalConditions: string[]
  goal: "weightLoss" | "muscleGain" | "maintenance"
  assistantStyle: "strict" | "friendly" | "expert"
  fitnessLevel: "beginner" | "intermediate" | "advanced"
}

interface UserContextType {
  user: UserProfile | null
  isOnboarded: boolean
  updateUser: (data: Partial<UserProfile>) => void
  completeOnboarding: (data: UserProfile) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user")
      return savedUser ? JSON.parse(savedUser) : null
    }
    return null
  })

  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isOnboarded") === "true"
    }
    return false
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem("isOnboarded", String(isOnboarded))
  }, [isOnboarded])

  const updateUser = (data: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null))
  }

  const completeOnboarding = (data: UserProfile) => {
    setUser(data)
    setIsOnboarded(true)
  }

  const logout = () => {
    setUser(null)
    setIsOnboarded(false)
    localStorage.removeItem("user")
    localStorage.removeItem("isOnboarded")
  }

  return (
    <UserContext.Provider value={{ user, isOnboarded, updateUser, completeOnboarding, logout }}>
      {children}
    </UserContext.Provider>
  )
}
