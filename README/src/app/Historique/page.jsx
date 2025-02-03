"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "../Historique/histo.css";
import Image from "next/image";
import Logo from "../../../public/Assets/logo-sansbg[1].svg";

const API_MENTORSHIPS_URL = "http://localhost:3000/api/mentorships";
const API_USERS_URL = "http://localhost:3000/api/users";

const Historique = () => {
  const router = useRouter();
  const [mentorships, setMentorships] = useState([]);
  const [users, setUsers] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchMentorships();
    fetchUsers();
  }, []);

  // Récupération des mentorships triés par date de début
  const fetchMentorships = async () => {
    try {
      const response = await axios.get(API_MENTORSHIPS_URL);
      const sortedMentorships = response.data.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      );
      setMentorships(sortedMentorships);
    } catch (error) {
      console.error("Erreur lors de la récupération des mentorats :", error);
      setErrorMessage("Impossible de charger les mentorships.");
    }
  };

  // Récupération des utilisateurs pour lier mentor et étudiant à leurs ID
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_USERS_URL);
      const usersMap = {};
      response.data.forEach(user => {
        usersMap[user._id] = user;
      });
      setUsers(usersMap);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      setErrorMessage("Impossible de charger les utilisateurs.");
    }
  };

  // Génération du fichier CSV
  const downloadCSV = () => {
    const csvContent =
      "Date,Mentor,Étudiant\n" +
      mentorships.map((mentorship) => {
        const mentor = users[mentorship.mentorId]
          ? `${users[mentorship.mentorId].nom} ${users[mentorship.mentorId].prenom}`
          : "Inconnu";
        const student = users[mentorship.studentId]
          ? `${users[mentorship.studentId].nom} ${users[mentorship.studentId].prenom}`
          : "Inconnu";
        return `${new Date(mentorship.startDate).toLocaleString()},${mentor},${student}`;
      }).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Historique_Mentorat.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="historique-container">
      <nav className="navbar">
        <h2 className="logo">
          <Image src={Logo} alt="Logo" />
        </h2>
      </nav>

      <div className="content">
        <h1>Historique des Mentorships</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Mentor</th>
              <th>Étudiant</th>
            </tr>
          </thead>
          <tbody>
            {mentorships.length > 0 ? (
              mentorships.map((mentorship) => (
                <tr key={mentorship._id}>
                  <td>{new Date(mentorship.startDate).toLocaleString()}</td>
                  <td>
                    {users[mentorship.mentorId]
                      ? `${users[mentorship.mentorId].nom} ${users[mentorship.mentorId].prenom}`
                      : "Inconnu"}
                  </td>
                  <td>
                    {users[mentorship.studentId]
                      ? `${users[mentorship.studentId].nom} ${users[mentorship.studentId].prenom}`
                      : "Inconnu"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="empty-message">Aucun mentorship enregistré.</td>
              </tr>
            )}
          </tbody>
        </table>

        <button className="download-button" onClick={downloadCSV}>📥 Télécharger l’historique</button>
      </div>
    </div>
  );
};

export default Historique;
