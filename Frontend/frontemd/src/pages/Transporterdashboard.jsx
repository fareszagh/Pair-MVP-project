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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
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
        console.log(myApplications);
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

  const applyToApplication = async (offerId, messageBody) => {
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

  const handleSearch = async (Query) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/offer/applications/search?search=${Query}`,
        authHeader,
      );
      setSearchResult(data);
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
          <div className="offers-column">
            {/* Search input — visual only, wire up to your backend logic */}
            <div className="offer-search-wrapper">
              <span className="offer-search-icon">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                className="offer-search-input"
                type="text"
                placeholder="Search offers…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="offer-search-clear"
                  onClick={() => handleSearch(searchQuery)}
                  aria-label="Clear search"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              )}
            </div>

            <AvailableOffer
              offers={searchResult.length > 0 ? searchResult : offers}
              loading={loadingOffers}
              selectedOffer={selectedOffer}
              onSelect={setSelectedOffer}
              onApply={handleApply}
            />
          </div>

          <MyApplications
            applications={myApplications}
            loading={loadingOffers}
          />
        </div>
      </main>
    </div>
  );
}
