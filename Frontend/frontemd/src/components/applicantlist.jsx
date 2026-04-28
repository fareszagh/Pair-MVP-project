import { FiUser, FiPhone, FiMail, FiMessageSquare, FiCheck, FiX } from "react-icons/fi"
import "../assets/ApplicantList.css"

const statusColors = {
  pending:  "status-pending",
  accepted: "status-accepted",
  rejected: "status-rejected",
}

export default function ApplicantsList({ offer, applicants, loading, onUpdateStatus }) {

  if (!offer) {
    return (
      <div className="panel panel-right">
        <h2 className="panel-title">Applicants</h2>
        <div className="empty-state">
          <FiUser className="empty-icon" />
          <p>No offer selected</p>
          <span>Click an offer to see its applicants</span>
        </div>
      </div>
    )
  }

  return (
    <div className="panel panel-right">
      <div className="apps-header">
        <div>
          <h2 className="panel-title">
            Applicants
            <span className="panel-count">{applicants.length}</span>
          </h2>
          <p className="apps-subtitle">
            {offer.start_point} → {offer.end_point}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="skeleton-list">
          {[1, 2].map(i => <div key={i} className="skeleton-card tall" />)}
        </div>
      ) : applicants.length === 0 ? (
        <div className="empty-state">
          <FiUser className="empty-icon" />
          <p>No applicants yet</p>
          <span>Transporters will appear here once they apply</span>
        </div>
      ) : (
        <div className="applicant-list">
          {applicants.map(app => (
            <div key={app.id} className="applicant-card">
              <div className="applicant-top">
                <div className="applicant-identity">
                  <div className="applicant-avatar">
                    {app.transporter?.username?.[0]?.toUpperCase() || "T"}
                  </div>
                  <div>
                    <p className="applicant-name">{app.transporter?.username || "Transporter"}</p>
                    <span className={`status-badge ${statusColors[app.status]}`}>
                      {app.status}
                    </span>
                  </div>
                </div>

                {app.status === "pending" && (
                  <div className="action-btns">
                    <button
                      className="btn-accept"
                      onClick={() => onUpdateStatus(app.id, "accepted")}
                      title="Accept"
                    >
                      <FiCheck /> Accept
                    </button>
                    <button
                      className="btn-reject"
                      onClick={() => onUpdateStatus(app.id, "rejected")}
                      title="Reject"
                    >
                      <FiX /> Reject
                    </button>
                  </div>
                )}
              </div>

              <div className="applicant-message">
                <FiMessageSquare className="msg-icon" />
                <p>"{app.message}"</p>
              </div>

              {app.status === "accepted" && app.transporter && (
                <div className="applicant-contact">
                  <a href={`tel:${app.transporter.phone_number}`} className="contact-link">
                    <FiPhone /> {app.transporter.phone_number}
                  </a>
                  <a href={`mailto:${app.transporter.email}`} className="contact-link">
                    <FiMail /> {app.transporter.email}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}