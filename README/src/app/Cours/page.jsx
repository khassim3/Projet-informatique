"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUsers, FaComments, FaSignOutAlt, FaBook, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Logo from "../../../public/Assets/logo-sansbg[1].svg";
import "../Cours/profil.css";
import axios from "axios";

const API_CATEGORIES_URL = "http://localhost:3000/api/categories";

const Cours = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  // Vérification de l'authentification et du rôle
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/Accueil"); // Redirige si l'utilisateur n'est pas connecté
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // Vérifie si l'utilisateur est un étudiant
    if (parsedUser.role !== "Etudiant") {
      router.push("/Accueil"); // Redirige si ce n'est pas un étudiant
    }

    fetchCategories();
  }, []);

  // Récupération des catégories de cours
  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_CATEGORIES_URL);
      if (response.data.length === 0) {
        setErrorMessage("Aucun cours disponible pour le moment.");
      } else {
        setCategories(response.data);
      }
    } catch (error) {
      setErrorMessage("Erreur lors du chargement des cours. Veuillez réessayer plus tard.");
    }
  };

  // Stocke la catégorie choisie et redirige vers ChoixMentor
  const handleCategoryClick = (category) => {
    localStorage.setItem("selectedCategory", JSON.stringify(category));
    router.push(`/ChoixMentor?categoryId=${category._id}`);
  };

  // Déconnexion
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

      <div className="content">
        <h1>Liste des Cours</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <ul className="cours-list">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li 
                key={category._id} 
                className="cours-item" 
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
              </li>
            ))
          ) : (
            <p className="empty-message">Aucun cours disponible.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Cours;
