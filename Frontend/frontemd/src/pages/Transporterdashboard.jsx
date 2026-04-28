import React, { useState, useEffect } from "react";
import axios from "axios";
import Statsbartransporter from "../components/Statsbartransporter.jsx";
import Navbar from "../components/navbar.jsx";

const Transporterdashboard = ({ user, token, handleLogout }) => {
  const [data, setData] = useState([]);
  const [offer,setOffer]=useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/offer/getAll")
      .then((res) => setData(res.data))
      .catch((error) => console.error(error));
  }, []);
  const applied = offer.reduce((acc, o) => acc + (o.OfferApps?.length || 0), 0)
  const accepted = offer.reduce((acc, o) => {
    return (
      acc + (o.OfferApps?.filter((a) => a.status === "accepted").length || 0)
    );
  }, 0);

  return (
    <div className="dash-root">
      <Navbar user={user} handleLogout={handleLogout} />
      <main className="dash-main">
        <div className="dash-header">
          <div>
            <p className="dash-greeting">Welcome back,</p>
            <h1 className="dash-title">{user?.username}</h1>
          </div>
          <button className="btn-create" onClick={() => setShowCreate(true)}>
            Search
          </button>
        </div>

        <Statsbartransporter
          applied={applied}
          accepted={accepted}
          //rejected={rejected}
        />

      </main>
    </div>
  );
};

export default Transporterdashboard;
