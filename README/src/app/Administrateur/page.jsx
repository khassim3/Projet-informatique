"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Logo from "../../../public/Assets/logo-sansbg[1].svg";
import "../Administrateur/ad.css";
import axios from "axios";
import { requireAuth } from "../utils/auth";

const API_USERS_URL = "http://localhost:3000/api/users";
const API_CATEGORIES_URL = "http://localhost:3000/api/categories";


const RolesPage = () => {
  requireAuth(["Admin"]);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchCourses();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_USERS_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_USERS_URL}/${id}`);
      setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(API_CATEGORIES_URL);
      setCourses(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des cours :", error);
    }
  };

  const addCourse = async () => {
    if (newCourseTitle.trim() === "") {
      alert("Le titre ne peut pas être vide.");
      return;
    }
    try {
      await axios.post(API_CATEGORIES_URL, { name: newCourseTitle, description: newCourseDescription });
      setNewCourseTitle("");
      setNewCourseDescription("");
      fetchCourses();
    } catch (error) {
      console.error("Erreur lors de l'ajout du cours :", error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`${API_CATEGORIES_URL}/${id}`);
      fetchCourses();
    } catch (error) {
      console.error("Erreur lors de la suppression du cours :", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Suppression des données de connexion
    router.push("/login"); // Redirection vers la page de connexion
  };

  return (
    <div className="mentore-container">
      <nav className="navbar">
        <h2 className="logo">
          <Image src={Logo} alt="Logo" />
        </h2>
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
        <div className={menuOpen ? "nav-links open" : "nav-links"}>
          <button onClick={() => router.push("/Administrateur")} className="nav-button">Gestion</button>
          <button onClick={() => router.push("/Communication")} className="nav-button">Messages</button>
          <button onClick={() => router.push("/Historique")} className="nav-button">Historique</button>
          <button onClick={handleLogout} className="nav-button logout">Déconnexion</button>
        </div>
      </nav>

      <div className="roles-container">
        <h1>Gestion des Utilisateurs</h1>  
        <table>
          <thead>
            <tr><th>Nom</th><th>Email</th><th>Rôle</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.nom} {user.prenom}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => deleteUser(user._id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="courses-container">
        <h1>Gestion des Cours</h1>
        <input type="text" placeholder="Titre du cours" value={newCourseTitle} onChange={(e) => setNewCourseTitle(e.target.value)} />
        <input type="text" placeholder="Description du cours" value={newCourseDescription} onChange={(e) => setNewCourseDescription(e.target.value)} />
        <button onClick={addCourse}>Ajouter</button>
        <table>
          <thead>
            <tr><th>Intitulé</th><th>Description</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course._id}>
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>
                  <button onClick={() => deleteCourse(course._id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesPage;
