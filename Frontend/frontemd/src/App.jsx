import { useState } from 'react'
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from "./pages/dashboard"


function App() {

  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(null)
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
      navigate("/dashboard")
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

          <Route path="/dashboard" element={<Dashboard user={user} handleLogout={handleLogout} />} />
          <Route path="/login" element={<Navigate to="/dashboard" />} />
          <Route path="/register" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  )
}

export default App