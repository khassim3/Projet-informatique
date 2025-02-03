"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaUsers, FaComments, FaSignOutAlt, FaCogs } from "react-icons/fa";
import Image from "next/image";
import Logo from "../../../public/Assets/logo-sansbg[1].svg";
import "../Mentormenu/Mentormenu.css";
import { requireAuth } from "../utils/auth";

const MentorMenu = () => {
    requireAuth(["Mentor"]);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Supprime les données de connexion
    router.push("/Accueil"); // Redirige vers la page Accueil
  };

  return (
    <div className="mentor-menu-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">
          <Image src={Logo} alt="Logo" />
        </h2>
      </nav>

      {/* Contenu principal */}
      <div className="menu-content">
        <h1>Bienvenue, Mentor</h1>
        <p>Sélectionnez une option pour continuer :</p>

        <div className="menu-grid">
          <button className="menu-item" onClick={() => router.push("/Etudiants")}> 
            <FaUsers className="icon" />
            Mes étudiants
          </button>

          <button className="menu-item" onClick={() => router.push("/Communication")}> 
            <FaComments className="icon" />
            Messages
          </button>

          <button className="menu-item" onClick={() => router.push("/CoursMentor")}> 
            <FaCogs className="icon" />
            Choisir spécialité
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

export default MentorMenu;
