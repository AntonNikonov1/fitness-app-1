import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import { UserProvider } from "./contexts/UserContext"
import { NotificationProvider } from "./contexts/NotificationContext"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Nutrition from "./pages/Nutrition"
import Workouts from "./pages/Workouts"
import Progress from "./pages/Progress"
import Chat from "./pages/Chat"
import Onboarding from "./pages/Onboarding"
import "./styles/globals.css"

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="nutrition" element={<Nutrition />} />
              <Route path="workouts" element={<Workouts />} />
              <Route path="progress" element={<Progress />} />
              <Route path="chat" element={<Chat />} />
            </Route>
          </Routes>
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
