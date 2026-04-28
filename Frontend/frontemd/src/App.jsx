import { useState } from 'react'
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from "./pages/dashboard"
import Transporterdashboard from './pages/Transporterdashboard'

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleRegister = async (username, email, password, phone_number, role) => {
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
        phone_number,
        role,
      })
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
    }
  }

  const handleLogin = async (email, password) => {
    try {
      const { data } = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      })

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      setToken(data.token)
      setUser(data.user)

      if (data.user.role === "transporter") {
        navigate("/transporter")
      } else {
        navigate("/dashboard")
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
    navigate("/login")
  }

  function RoleRoute({ children, allowedRole, user }) {
    if (!user) return <Navigate to="/login" />

    if (user.role !== allowedRole) {
      return (
        <Navigate
          to={user.role === "transporter" ? "/transporter" : "/dashboard"}
        />
      )
    }

    return children
  }

  return (
    <Routes>
      {!token && (
        <>
          <Route path="/login" element={<Login handleLogin={handleLogin} error={error} />} />
          <Route path="/register" element={<Register handleRegister={handleRegister} error={error} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}

      {token && (
        <>
          <Route
            path="/dashboard"
            element={
              <RoleRoute user={user} allowedRole="user">
                <Dashboard user={user} token={token} handleLogout={handleLogout} />
              </RoleRoute>
            }
          />

          <Route
            path="/transporter"
            element={
              <RoleRoute user={user} allowedRole="transporter">
                <Transporterdashboard user={user} token={token} handleLogout={handleLogout} />
              </RoleRoute>
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  )
}

export default App