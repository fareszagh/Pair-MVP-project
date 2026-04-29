import { FiPackage, FiTrash2, FiBox } from "react-icons/fi"
import "../assets/myoffers.css"
export default function AvailableOffers({ offers,loading,selectedOffer,onSelect,onApply,appliedOffers }) {


  if (loading) {
    return (
      <div className="panel">
        <h2 className="panel-title">My Offers</h2>
        <div className="skeleton-list">
          {[1, 2, 3].map(i => <div key={i} className="skeleton-card" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="panel">
      <h2 className="panel-title">Available Offers
        <span className="panel-count">{offers.length}</span>
      </h2>

      {offers.length === 0 ? (
        <div className="empty-state">
          <FiPackage className="empty-icon" />
          <p>No offers yet</p>
        </div>
      ) : (
        <div className="offer-list">
          {offers.map(offer => (
            <div
              key={offer.id}
              className={`offer-card ${selectedOffer?.id === offer.id ? "selected" : ""}`}
              onClick={() => onSelect(offer)}
            >
              <div className="offer-card-top">
                <div className="offer-route">
                  <span className="route-from">{offer.start_point}</span>
                  <span className="route-arrow">→</span>
                  <span className="route-to">{offer.end_point}</span>
                </div>
                <button
                  className="btn-delete"
                  onClick={(e) => { e.stopPropagation(); onDelete(offer.id) }}
                  title="Delete offer"
                >
                  <FiTrash2 />
                </button>
              </div>

              <p className="offer-title">{offer.title}</p>

              <div className="offer-meta">
                <span className="meta-tag">
                  <FiBox /> {offer.weight} kg
                </span>
                <span className="meta-tag">
                  {offer.height} cm
                </span>
                <span className={`applicant-badge ${offer.OfferApps?.length > 0 ? "has-apps" : ""}`}>
                  {offer.OfferApps?.length || 0} applicant{offer.OfferApps?.length !== 1 ? "s" : ""}
                </span>
                {onApply && (
                <button className="btn-accept" onClick={(e)=>{e.stopPropagation();onApply(offer.id)}}
                > {appliedOffers.includes(offer.id)? "Applied":"Apply"}</button>
                ) }
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}