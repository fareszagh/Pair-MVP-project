import "../assets/statsbar.css"

export default function StatsBar({ Applied,Accepted,Rejected }) {
  const stats = [
    { label: "Applied",       value: Applied,      accent: false },
    { label: "Accepted", value: Accepted,  accent: false },
    { label: "Rejected",         value: Rejected,         accent: false  },
  ]

  return (
    <div className="stats-bar">
      {stats.map((s) => (
        <div key={s.label} className={`stat-card ${s.accent ? "accent" : ""}`}>
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}