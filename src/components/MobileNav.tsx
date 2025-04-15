import type React from "react"
import { NavLink } from "react-router-dom"
import { Home, Utensils, Dumbbell, LineChart, MessageCircle } from "lucide-react"

const MobileNav: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 z-50">
      <div className="flex justify-around">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center py-3 px-5 ${isActive ? "text-green-400" : "text-zinc-400"}`
          }
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Главная</span>
        </NavLink>
        <NavLink
          to="/nutrition"
          className={({ isActive }) =>
            `flex flex-col items-center py-3 px-5 ${isActive ? "text-purple-400" : "text-zinc-400"}`
          }
        >
          <Utensils className="w-6 h-6" />
          <span className="text-xs mt-1">Питание</span>
        </NavLink>
        <NavLink
          to="/workouts"
          className={({ isActive }) =>
            `flex flex-col items-center py-3 px-5 ${isActive ? "text-blue-400" : "text-zinc-400"}`
          }
        >
          <Dumbbell className="w-6 h-6" />
          <span className="text-xs mt-1">Тренировки</span>
        </NavLink>
        <NavLink
          to="/progress"
          className={({ isActive }) =>
            `flex flex-col items-center py-3 px-5 ${isActive ? "text-amber-400" : "text-zinc-400"}`
          }
        >
          <LineChart className="w-6 h-6" />
          <span className="text-xs mt-1">Прогресс</span>
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `flex flex-col items-center py-3 px-5 ${isActive ? "text-green-400" : "text-zinc-400"}`
          }
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs mt-1">Чат</span>
        </NavLink>
      </div>
    </div>
  )
}

export default MobileNav
