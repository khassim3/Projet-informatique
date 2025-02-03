"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUsers, FaComments, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Logo from "../../../public/Assets/logo-sansbg[1].svg";
import "../EtudiantPage/etudiantpage.css";
import axios from "axios";
import { requireAuth } from "../utils/auth";

const API_MENTORSHIPS_URL = "http://localhost:3000/api/mentorships";
const API_USERS_URL = "http://localhost:3000/api/users";

const EtudiantPage = () => {
  requireAuth(["Etudiant"]);
  const router = useRouter();
  const [mentors, setMentors] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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
      const response = await axios.get(`${API_MENTORSHIPS_URL}?studentId=${studentId}`);
      const mentorIds = response.data.map((mentorship) => mentorship.mentorId);

      if (mentorIds.length > 0) {
        const mentorsResponse = await axios.get(API_USERS_URL);
        if (mentorsResponse.data.length > 0) {
          const filteredMentors = mentorsResponse.data.filter((mentor) => mentorIds.includes(mentor._id));
          setMentors(filteredMentors);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des mentors :", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/Accueil");
  };

  return (
    <div className="cours-container">
      <nav className="navbar">
        <h2 className="logo">
          <Image src={Logo} alt="Logo" />
        </h2>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        <div className={menuOpen ? "nav-links open" : "nav-links"}>
          <button onClick={() => router.push("/Communication")} className="nav-button">Messages</button>
          <button onClick={() => router.push("/Utilisateur")} className="nav-button">Profil</button>
          <button onClick={handleLogout} className="nav-button logout">Déconnexion</button>
        </div>
      </nav>

      <div className="menu-content">
        {user ? <h1>Bienvenue, {user.nom} {user.prenom}</h1> : <h1>Bienvenue, Étudiant</h1>}
        <p>Sélectionnez une option pour continuer :</p>

        <div className="menu-grid">
          <button className="menu-item" onClick={() => router.push("/Cours")}>
            <FaUsers className="icon" />
            Trouver un Mentor
          </button>

          <button className="menu-item" onClick={() => router.push("/EtudiantPage")}>
            <FaComments className="icon" />
            Messages
          </button>

          <button className="menu-item" onClick={() => router.push("/MesMentors")}>
            <FaUsers className="icon" />
            Mes Mentors
          </button>

          <button className="menu-item logout" onClick={handleLogout}>
            <FaSignOutAlt className="icon" />
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default EtudiantPage;
