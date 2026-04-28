import { useState } from "react"
import { FiMail, FiLock, FiUser, FiPhone, FiEye, FiEyeOff, FiTruck, FiCheckCircle } from "react-icons/fi"
import "../assets/register.css"
import cargolinkLogo from "../assets/cargolink_logo.png"

export default function Register({ handleRegister, error }) {
  const [username, setUsername] = useState("")
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [phone_number, setPhone]= useState("")
  const [role, setRole]         = useState("user")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !email || !password || !phone_number) return
    setLoading(true)
    await handleRegister(username, email, password, phone_number, role)
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
            <h2 className="form-title">Create account</h2>
            <p className="form-subtitle">Join as a user or transporter</p>
          </div>

          {error && (
            <div className="alert alert-error">
              <span className="alert-icon">!</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            <div className="field">
              <label className="field-label">I am a</label>
              <div className="role-group">
                <button
                  type="button"
                  className={`role-card ${role === "user" ? "selected" : ""}`}
                  onClick={() => setRole("user")}
                >
                  <FiUser className="role-icon" />
                  <span className="role-label">User</span>
                  <span className="role-desc">Post & manage offers</span>
                  {role === "user" && <FiCheckCircle className="role-check-icon" />}
                </button>
                <button
                  type="button"
                  className={`role-card ${role === "transporter" ? "selected" : ""}`}
                  onClick={() => setRole("transporter")}
                >
                  <FiTruck className="role-icon" />
                  <span className="role-label">Transporter</span>
                  <span className="role-desc">Browse & apply to offers</span>
                  {role === "transporter" && <FiCheckCircle className="role-check-icon" />}
                </button>
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label className="field-label" htmlFor="reg-username">Username</label>
                <div className="input-wrap">
                  <FiUser className="input-icon" />
                  <input
                    id="reg-username"
                    type="text"
                    className="input"
                    placeholder="john_doe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="field">
                <label className="field-label" htmlFor="reg-phone">Phone number</label>
                <div className="input-wrap">
                  <FiPhone className="input-icon" />
                  <input
                    id="reg-phone"
                    type="tel"
                    className="input"
                    placeholder="+216 XX XXX XXX"
                    value={phone_number}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="reg-email">Email address</label>
              <div className="input-wrap">
                <FiMail className="input-icon" />
                <input
                  id="reg-email"
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
              <label className="field-label" htmlFor="reg-password">Password</label>
              <div className="input-wrap">
                <FiLock className="input-icon" />
                <input
                  id="reg-password"
                  type={showPass ? "text" : "password"}
                  className="input"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {password.length > 0 && (
                <div className="strength-wrap">
                  <div className="strength-bar">
                    <div
                      className={`strength-fill str-${password.length < 4 ? "weak" : password.length < 8 ? "fair" : "strong"}`}
                      style={{ width: `${Math.min(100, (password.length / 12) * 100)}%` }}
                    />
                  </div>
                  <span className="strength-label">
                    {password.length < 4 ? "Weak" : password.length < 8 ? "Fair" : "Strong"}
                  </span>
                </div>
              )}
            </div>

            <button type="submit" className={`submit-btn ${loading ? "loading" : ""}`} disabled={loading}>
              {loading ? <span className="spinner" /> : "Create account"}
            </button>
          </form>

          <p className="form-switch">
            Already have an account? <a href="/login" className="switch-link">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  )
}