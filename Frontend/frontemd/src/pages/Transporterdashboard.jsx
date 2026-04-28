import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar.jsx";
import Statsbartransporter from "../components/Statsbartransporter.jsx";
import AvailableOffer from "../components/AvailableOffers.jsx";
import ApplicantsList from "../components/applicantlist.jsx";
import "../assets/dashboard.css";

export default function Dashboard({ user, token, handleLogout }) {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [loadingApps, setLoadingApps] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchOffers = async () => {
      setLoadingOffers(true);
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/offer/getAll",
          authHeader,
        );

        setOffers(data);
        if (data.length > 0 && !selectedOffer) setSelectedOffer(data[0]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingOffers(false);
      }
    };
    fetchOffers();
  }, [refresh]);

  useEffect(() => {
    if (!selectedOffer) return;
    const fetchApplicants = async () => {
      setLoadingApps(true);
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/offer/${selectedOffer.id}/applications`,
          authHeader,
        );
        setApplicants(data);
      } catch (err) {
        console.log(err);
        setApplicants([]);
      } finally {
        setLoadingApps(false);
      }
    };
    fetchApplicants();
  }, [selectedOffer, refresh]);

  const myApplications = offers.flatMap((o) =>
    (o.OfferApps || []).filter((a) => a.transporter_id === user.id),
  );

  const applied = myApplications.length;

  const accepted = myApplications.filter((a) => a.status === "accepted").length;

  return (
    <div className="dash-root">
      <Navbar user={user} handleLogout={handleLogout} />

      <main className="dash-main">
        <div className="dash-header">
          <div>
            <p className="dash-greeting">Welcome back,</p>
            <h1 className="dash-title">{user?.username}</h1>
          </div>
        </div>

        <Statsbartransporter
          totalOffers={offers.length}
          totalApplicants={totalApplicants}
          accepted={accepted}
        />

        <div className="dash-body">
          <AvailableOffer
            offers={offers}
            loading={loadingOffers}
            selectedOffer={selectedOffer}
            onSelect={setSelectedOffer}
            onDelete={handleDeleteOffer}
          />
          <ApplicantsList
            offer={selectedOffer}
            applicants={applicants}
            loading={loadingApps}
            onUpdateStatus={handleUpdateStatus}
          />
        </div>
      </main>

      {showCreate && (
        <CreateOfferModal
          onSubmit={handleCreateOffer}
          onClose={() => setShowCreate(false)}
        />
      )}
    </div>
  );
}
