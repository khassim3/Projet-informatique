"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Logo from "../../../public/Assets/logo-sansbg[1].svg";
import "../ChoixMentor/choixmentor.css";
import axios from "axios";
import { requireAuth } from "../utils/auth";

const API_MENTOR_CATEGORIES_URL = "http://localhost:3000/api/mentorcategories";
const API_USERS_URL = "http://localhost:3000/api/users";
const API_MENTORSHIPS_URL = "http://localhost:3000/api/mentorships";

const ChoixMentor = () => {
    requireAuth(["Etudiant"]);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [existingMentorships, setExistingMentorships] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCategory = localStorage.getItem("selectedCategory");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedCategory) {
      const categoryData = JSON.parse(storedCategory);
      setSelectedCategory(categoryData);
      fetchMentors(categoryData._id);
      fetchExistingMentorships(JSON.parse(storedUser)?._id);
    }
  }, []);

  const fetchMentors = async (categoryId) => {
    try {
      const mentorCategoryResponse = await axios.get(`${API_MENTOR_CATEGORIES_URL}`);
      const mentorCategories = mentorCategoryResponse.data.filter(mc => mc.categoryId === categoryId);

      if (mentorCategories.length === 0) {
        setErrorMessage("Aucun mentor disponible pour cette catégorie.");
        return;
      }

      const mentorIds = mentorCategories.map(mc => mc.mentorId);
      const mentorsResponse = await axios.get(API_USERS_URL);
      const filteredMentors = mentorsResponse.data.filter(mentor => mentorIds.includes(mentor._id));
      setMentors(filteredMentors);
    } catch (error) {
      setErrorMessage("Erreur lors de la récupération des mentors.");
    }
  };

  const fetchExistingMentorships = async (studentId) => {
    try {
      const mentorshipResponse = await axios.get(`${API_MENTORSHIPS_URL}`);
      const studentMentors = mentorshipResponse.data
        .filter(mentorship => mentorship.studentId === studentId)
        .map(mentorship => mentorship.mentorId);
      setExistingMentorships(studentMentors);
    } catch (error) {
      console.error("Erreur lors de la récupération des mentorats :", error);
    }
  };

  const addMentor = async (mentorId) => {
    if (!user) {
        setErrorMessage("Vous devez être connecté pour ajouter un mentor.");
        return;
    }

    const newMentorship = {
        studentId: user._id,
        mentorId: mentorId,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)), // Exemple : 3 mois de mentorat
        status: "active",
        objectives: [
            { objective: "Premier objectif", progress: "not started" }
        ]
    };

    try {
        await axios.post(API_MENTORSHIPS_URL, newMentorship);
        alert("Mentor ajouté avec succès !");
    } catch (error) {
        setErrorMessage("Erreur lors de l'ajout du mentor.");
        console.error("Erreur :", error.response ? error.response.data : error);
    }
};


  return (
    <div className="choix-mentor-container">
      <nav className="navbar">
        <h2 className="logo">
          <Image src={Logo} alt="Logo" />
        </h2>
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
      </nav>

      <div className="content">
        <h1>Mentors pour {selectedCategory?.name || "cette catégorie"}</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <ul className="mentors-list">
          {mentors.length > 0 ? (
            mentors.map((mentor) => (
              <li key={mentor._id} className="mentor-item">
                {mentor.nom} {mentor.prenom}
                <button 
                  className="add-mentor-button" 
                  onClick={() => addMentor(mentor._id)}
                  disabled={existingMentorships.includes(mentor._id)}
                >
                  <FaUserPlus /> {existingMentorships.includes(mentor._id) ? "Ajouté" : "Ajouter"}
                </button>
              </li>
            ))
          ) : (
            <p className="empty-message">Aucun mentor trouvé pour cette catégorie.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChoixMentor;
