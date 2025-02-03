"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../Utilisateur/utili.css"; // CSS pour le style
import axios from "axios";
import { requireAuth } from "../utils/auth";

const API_USERS_URL = "http://localhost:3000/api/users";
const API_MENTORSHIPS_URL = "http://localhost:3000/api/mentorships";
const API_MENTOR_CATEGORIES_URL = "http://localhost:3000/api/mentorcategories";
const API_CATEGORIES_URL = "http://localhost:3000/api/categories";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [mentoredCourses, setMentoredCourses] = useState([]);
  const [coursesAsMentor, setCoursesAsMentor] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUpdatedUser(parsedUser);
      fetchUserCourses(parsedUser._id, parsedUser.role);
    } else {
      router.push("/login"); // Redirection si l'utilisateur n'est pas connecté
    }
  }, []);

  const fetchUserCourses = async (userId, role) => {
    try {
      // 1️⃣ Récupérer les mentors suivis par l'étudiant
      const mentorshipsResponse = await axios.get(`${API_MENTORSHIPS_URL}?studentId=${userId}`);
      const mentorships = mentorshipsResponse.data;

      // 2️⃣ Récupérer les ID des mentors
      const mentorIds = mentorships.map(m => m.mentorId);

      // 3️⃣ Récupérer les catégories de cours des mentors suivis
      const mentorCategoriesResponse = await axios.get(API_MENTOR_CATEGORIES_URL);
      const mentorCategories = mentorCategoriesResponse.data.filter(mc => mentorIds.includes(mc.mentorId));

      // 4️⃣ Récupérer les détails des catégories de cours
      const categoriesResponse = await axios.get(API_CATEGORIES_URL);
      const categories = categoriesResponse.data;

      // 5️⃣ Associer les catégories avec le mentor correspondant
      const formattedMentoredCourses = mentorCategories.map(mc => {
        const category = categories.find(c => c._id === mc.categoryId);
        const mentor = mentorships.find(m => m.mentorId === mc.mentorId);

        return {
          courseName: category ? category.name : "Inconnu",
          mentorName: mentor ? `${mentor.mentorName}` : "Mentor Inconnu",
        };
      });

      setMentoredCourses(formattedMentoredCourses);

      // 6️⃣ Récupérer les cours enseignés si c'est un mentor
      if (role === "Mentor") {
        const mentorCoursesResponse = await axios.get(`${API_MENTOR_CATEGORIES_URL}?mentorId=${userId}`);
        const mentorCourses = mentorCoursesResponse.data.map(mc => {
          const category = categories.find(c => c._id === mc.categoryId);
          return category ? category.name : "Inconnu";
        });

        setCoursesAsMentor(mentorCourses);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des cours :", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_USERS_URL}/${user._id}`, updatedUser);
      setUser(updatedUser);
      setIsEditing(false);
      localStorage.setItem("user", JSON.stringify(updatedUser)); // Mise à jour du localStorage
      alert("Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="profile-container">
      <h2>Profil de {user.nom} {user.prenom}</h2>

      <div className="user-info">
        <label>
          <strong>Nom:</strong>
          <input
            type="text"
            name="nom"
            value={updatedUser.nom}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label>
          <strong>Prénom:</strong>
          <input
            type="text"
            name="prenom"
            value={updatedUser.prenom}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label>
          <strong>Email:</strong>
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label>
          <strong>Mot de passe:</strong>
          <input
            type="password"
            name="password"
            value="********"
            disabled
          />
        </label>

        <label>
          <strong>Rôle:</strong> {user.role}
        </label>
      </div>

      {!isEditing ? (
        <button className="edit-button" onClick={() => setIsEditing(true)}>Modifier</button>
      ) : (
        <button className="save-button" onClick={handleSave}>Enregistrer</button>
      )}

      <div className="courses">
        <h3>Cours suivis en tant qu'étudiant 📚</h3>
        {mentoredCourses.length > 0 ? (
          <ul>
            {mentoredCourses.map((course, index) => (
              <li key={index}>
                <strong>{course.courseName}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun cours suivi.</p>
        )}

        {user.role === "Mentor" && (
          <>
            <h3>Cours enseignés en tant que mentor 👨‍🏫</h3>
            {coursesAsMentor.length > 0 ? (
              <ul>
                {coursesAsMentor.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            ) : (
              <p>Vous ne donnez actuellement aucun cours.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
