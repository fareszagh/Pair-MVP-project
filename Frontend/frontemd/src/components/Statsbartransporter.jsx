import "../assets/statsbar.css"

export default function StatsBar({ applied=0,accepted=0,rejected=0 }) {
  const stats = [
    { label: "Applied",       value: applied,      accent: false },
    { label: "Accepted", value: accepted,  accent: false },
    { label: "Rejected",         value: rejected,         accent: false  },
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