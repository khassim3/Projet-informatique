"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "../MentorProfile/MentorProfile.css";
import { requireAuth } from "../utils/auth";

const API_USERS_URL = "http://localhost:3000/api/users";

const MentorProfile = () => {
  const router = useRouter();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMentorProfile();
  }, []);

  const fetchMentorProfile = async () => {
    try {
      const response = await axios.get(API_USERS_URL);
      const mentors = response.data.filter(user => user.role === "Mentor");
      
      if (mentors.length > 0) {
        setMentor(mentors[0]); // Afficher le premier mentor trouvé
      } else {
        setError("Aucun mentor trouvé");
      }
    } catch (error) {
      setError("Erreur lors de la récupération du profil du mentor");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="mentor-profile-container">
        <h2 className="mentor-profile-title">Chargement du profil...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mentor-profile-container">
        <h2 className="mentor-profile-title" style={{ color: "red" }}>{error}</h2>
      </div>
    );
  }

  return (
    <div className="mentor-profile-container">
      <h2 className="mentor-profile-title">Profil du Mentor</h2>
      <div className="profile-card">
        <img
          src={mentor.photo || "https://via.placeholder.com/150"}
          alt="Photo du mentor"
          className="mentor-photo"
        />
        <h3>{mentor.nom} {mentor.prenom}</h3>
        <p><strong>Email :</strong> {mentor.email}</p>
        <p><strong>Spécialité :</strong> {mentor.specialite}</p>
        <p><strong>Expérience :</strong> {mentor.experience} ans</p>
        <p><strong>Description :</strong> {mentor.description || "Aucune description disponible"}</p>
        <button className="contact-button">Contacter</button>
      </div>
    </div>
  );
};

export default MentorProfile;
