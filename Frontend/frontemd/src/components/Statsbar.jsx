import "../assets/statsbar.css"

export default function StatsBar({ totalOffers, totalApplicants, accepted }) {
  const stats = [
    { label: "My Offers",       value: totalOffers,      accent: false },
    { label: "Total Applicants", value: totalApplicants,  accent: false },
    { label: "Accepted",         value: accepted,         accent: true  },
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