"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "../CoursMentor/cm.css";
import { requireAuth } from "../utils/auth";

const API_CATEGORIES_URL = "http://localhost:3000/api/categories";
const API_MENTOR_CATEGORIES_URL = "http://localhost:3000/api/mentorcategories";

const CoursMentor = () => {
  const router = useRouter();
  const [domains, setDomains] = useState([]);
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchDomains();
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setErrorMessage("Utilisateur non trouvé. Veuillez vous reconnecter.");
    }
  }, []);

  const fetchDomains = async () => {
    try {
      const response = await axios.get(API_CATEGORIES_URL);
      setDomains(response.data);
    } catch (error) {
      setErrorMessage("Erreur lors de la récupération des domaines.");
    }
  };

  const handleSelectDomain = async (categoryId) => {
    if (!user || !user._id) {
      setErrorMessage("Utilisateur non trouvé. Veuillez vous reconnecter.");
      return;
    }
    try {
      await axios.post(API_MENTOR_CATEGORIES_URL, { mentorId: user._id, categoryId });
      setSuccessMessage("Spécialité attribuée avec succès !");
      setTimeout(() => router.push("/Mentormenu"), 2000);
    } catch (error) {
      setErrorMessage("Erreur lors de l'attribution de la spécialité.");
    }
  };

  return (
    <div className="domains-container">
      <h2 className="title">Choisissez votre domaine de formation</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="domains-grid">
        {domains.map((domain) => (
          <div key={domain._id} className="domain-card">
            <h3>{domain.name}</h3>
            <p className="description">{domain.description}</p>
            <button className="select-button" onClick={() => handleSelectDomain(domain._id)}>
              Choisir ce domaine
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursMentor;
