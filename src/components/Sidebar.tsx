import type React from "react"
import { NavLink } from "react-router-dom"
import { Home, Utensils, Dumbbell, LineChart, MessageCircle, Settings } from "lucide-react"

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-zinc-900 hidden md:block">
      <div className="h-full flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-zinc-800">
          <h2 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            FitLife
          </h2>
        </div>
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-2 px-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-400"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`
                }
              >
                <Home className="w-5 h-5 mr-3" />
                <span>Главная</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/nutrition"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-purple-400/20 to-pink-500/20 text-purple-400"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`
                }
              >
                <Utensils className="w-5 h-5 mr-3" />
                <span>Питание</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/workouts"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-blue-400/20 to-cyan-500/20 text-blue-400"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`
                }
              >
                <Dumbbell className="w-5 h-5 mr-3" />
                <span>Тренировки</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/progress"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-amber-400/20 to-yellow-500/20 text-amber-400"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`
                }
              >
                <LineChart className="w-5 h-5 mr-3" />
                <span>Прогресс</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-400"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`
                }
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                <span>Чат с ИИ</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-gradient-to-r from-zinc-400/20 to-zinc-500/20 text-zinc-300"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`
            }
          >
            <Settings className="w-5 h-5 mr-3" />
            <span>Настройки</span>
          </NavLink>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
