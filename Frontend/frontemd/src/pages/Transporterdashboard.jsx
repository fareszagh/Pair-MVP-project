import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const Transporterdashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/offer/getAll")
      .then((res) => setData(res.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
        <h3>Avialable offers</h3>
      {data.map((offer) => (
        <div key={offer.id}>
          <p>
            <strong>Offer title</strong> {offer.title}
          </p>
          <p>
            <strong>Offer description</strong> {offer.description}
          </p>
          <p>
            <strong>Offer start Point</strong> {offer.start_point}
          </p>
          <p>
            <strong>Offer Endpoint</strong> {offer.end_point}
          </p>
          <p>
            <strong>Offer weight</strong> {offer.weight}
          </p>
          <p>
            <strong>Offer height</strong> {offer.height}
          </p>
        </div>
      ))}
      <h3>My Applications</h3>
      
    </div>
  );
};

export default Transporterdashboard;
