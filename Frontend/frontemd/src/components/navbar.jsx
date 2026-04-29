import "../assets/navbar.css"
import cargolinkLogo from "../assets/cargolink_logo.png"

export default function Navbar({ user, handleLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img className="brand-logo" src={cargolinkLogo} alt="CargoLink logo" />
        <span className="brand-name">Cargo<em>Link</em></span>
      </div>
      <div className="navbar-right">
        <div className="navbar-user">
          <span className="user-avatar">{user?.username?.[0]?.toUpperCase()}</span>
          <div className="user-info">
            <span className="user-name">{user?.username}</span>
            <span className="user-role">{user?.role}</span>
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>Sign out</button>
      </div>
    </nav>
  )
}