import { useState } from "react"
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import "../assets/login.css"
import cargolinkLogo from "../assets/cargolink_logo.png"

export default function Login({ handleLogin, error }) {
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)
    await handleLogin(email, password)
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="app-bg">
        <div className="bg-circle c1" />
        <div className="bg-circle c2" />
        <div className="bg-grid" />
      </div>

      <div className="auth-shell">
        <div className="auth-brand">
          <img className="brand-logo" src={cargolinkLogo} alt="CargoLink logo" />
          <span className="brand-name">Cargo<em>Link</em></span>
        </div>

        <div className="auth-card">
          <div className="form-header">
            <h2 className="form-title">Sign in</h2>
            <p className="form-subtitle">Access your offers and applications</p>
          </div>

          {error && (
            <div className="alert alert-error">
              <span className="alert-icon">!</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label className="field-label" htmlFor="login-email">Email address</label>
              <div className="input-wrap">
                <FiMail className="input-icon" />
                <input
                  id="login-email"
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="login-password">Password</label>
              <div className="input-wrap">
                <FiLock className="input-icon" />
                <input
                  id="login-password"
                  type={showPass ? "text" : "password"}
                  className="input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" className={`submit-btn ${loading ? "loading" : ""}`} disabled={loading}>
              {loading ? <span className="spinner" /> : "Sign in"}
            </button>
          </form>

          <p className="form-switch">
            No account? <a href="/register" className="switch-link">Create one</a>
          </p>
        </div>
      </div>
    </div>
  )
}