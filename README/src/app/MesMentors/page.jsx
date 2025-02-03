"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserTie, FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Logo from "../../../public/Assets/logo-sansbg[1].svg";
import "./mesmentors.css";
import axios from "axios";
import { requireAuth } from "../utils/auth";

const API_MENTORSHIPS_URL = "http://localhost:3000/api/mentorships";
const API_USERS_URL = "http://localhost:3000/api/users";

const MesMentors = () => {
  requireAuth(["Etudiant"]);
  const router = useRouter();
  const [mentors, setMentors] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser?._id) {
        fetchMentors(parsedUser._id);
      }
    } else {
      setErrorMessage("Utilisateur non trouvé. Veuillez vous reconnecter.");
    }
  }, []);

  const fetchMentors = async (studentId) => {
    try {
      // Récupérer les mentorships où l'étudiant est inscrit
      const mentorshipResponse = await axios.get(`${API_MENTORSHIPS_URL}`);
      const mentorships = mentorshipResponse.data.filter(m => m.studentId === studentId);

      if (mentorships.length === 0) {
        setErrorMessage("Vous n'avez aucun mentor enregistré.");
        return;
      }

      // Extraire les IDs des mentors associés à cet étudiant
      const mentorIds = mentorships.map(m => m.mentorId);

      // Récupérer tous les utilisateurs et filtrer ceux qui sont mentors
      const usersResponse = await axios.get(API_USERS_URL);
      const mentorsList = usersResponse.data.filter(user => mentorIds.includes(user._id) && user.role === "Mentor");

      setMentors(mentorsList);
    } catch (error) {
      setErrorMessage("Erreur lors de la récupération des mentors. Veuillez réessayer.");
      console.error("Erreur de récupération des mentors :", error);
    }
  };

  return (
    <div className="mentors-container">
      <nav className="navbar">
        <h2 className="logo">
          <Image src={Logo} alt="Logo" />
        </h2>
        <button className="back-button" onClick={() => router.push("/EtudiantPage")}>
          <FaArrowLeft /> Retour
        </button>
      </nav>

      <div className="content">
        <h1>Mes Mentors</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <ul className="mentors-list">
          {mentors.length > 0 ? (
            mentors.map((mentor) => (
              <li key={mentor._id} className="mentor-item">
                <FaUserTie className="mentor-icon" />
                <span>{mentor.nom} {mentor.prenom} - {mentor.email}</span>
              </li>
            ))
          ) : (
            <p className="empty-message">Aucun mentor trouvé.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MesMentors;
