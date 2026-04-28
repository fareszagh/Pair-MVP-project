import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar.jsx";
import Statsbartransporter from "../components/Statsbartransporter.jsx";
import AvailableOffer from "../components/AvailableOffers.jsx";
import MyApplications from "../components/MyApplications.jsx";
import "../assets/dashboard.css";

export default function Dashboard({ user, token, handleLogout }) {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [myApplications, setMyApplication] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [loadingApps, setLoadingApps] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [offerId, setOfferId] = useState(null);
  const [messageBody, setMessageBody] = useState("i can handle this offer");
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
    const fetchmyapplications = async () => {
      setLoadingApps(true);
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/offer/applications/me",
          authHeader,
        );
        setMyApplication(data);
        console.log(myApplications)
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingApps(false);
      }
    };
    fetchmyapplications();
  }, [refresh]);

  const handleApply = async (offerId) => {
  try {
    await applyToApplication(offerId, messageBody);
  } catch (error) {
    console.log(error);
  }
};

  const applyToApplication = async (offerId,messageBody) => {
    try {
      setOfferId(offerId);
      await axios.post(
        `http://localhost:3000/api/offer/${offerId}/applications`,
        { message: messageBody },
        authHeader,
      );
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const applied = myApplications.length;

  const accepted = myApplications.filter((a) => a.status === "accepted").length;

  const rejected = myApplications.filter((a) => a.status === "rejected").length;

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
          applied={applied}
          accepted={accepted}
          rejected={rejected}
        />

        <div className="dash-body">
          <AvailableOffer
            offers={offers}
            loading={loadingOffers}
            selectedOffer={selectedOffer}
            onSelect={setSelectedOffer}
            onApply={handleApply}
          />
          <MyApplications
            applications={myApplications}
            loading={loadingOffers}
          />
        </div>
      </main>
    </div>
  );
}
