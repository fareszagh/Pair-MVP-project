import { FiPhone, FiMapPin, FiCheck, FiX } from "react-icons/fi";
import "../assets/ApplicantList.css";

const statusColors = {
  pending: "status-pending",
  accepted: "status-accepted",
  rejected: "status-rejected",
};

export default function MyApplications({applications,loading }) {

  if (loading) {
    return (
      <div className="panel panel-right">
        <h2 className="panel-title">My Applications</h2>
        <div className="skeleton-list">
          {[1, 2].map(i => <div key={i} className="skeleton-card tall" />)}
        </div>
      </div>
    );
  }

  if (!applications.length) {
    return (
      <div className="panel panel-right">
        <h2 className="panel-title">My Applications</h2>
        <div className="empty-state">
          <p>No applications yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panel panel-right">
      <h2 className="panel-title">
        My Applications
        <span className="panel-count">{applications.length}</span>
      </h2>

      <div className="applicant-list">
        {applications.map((app) => (
          <div key={app.id} className="applicant-card">

            {/* TOP */}
            <div className="applicant-top">
              <div>
                <p className="applicant-name">{app.Offer.title}</p>

                <span className={`status-badge ${statusColors[app.status]}`}>
                  {app.status}
                </span>
              </div>
            </div>

            {/* ROUTE */}
            <div className="applicant-message">
              <FiMapPin className="msg-icon" />
              <p>
                {app.Offer.start_point} → {app.Offer.end_point}
              </p>
            </div>

            {/* PHONE (only if accepted) */}
            {app.Offer.status === "accepted" && app.Offer.phone_number && (
              <div className="applicant-contact">
                <a
                  href={`tel:${app.Offer.phone_number}`}
                  className="contact-link"
                >
                  <FiPhone /> {app.Offer.phone_number}
                </a>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}