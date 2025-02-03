"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "../Etudiants/etudiants.css";
import { requireAuth } from "../utils/auth";

const API_MENTORSHIPS_URL = "http://localhost:3000/api/mentorships";
const API_USERS_URL = "http://localhost:3000/api/users";

const Etudiants = () => {
    requireAuth(["Mentor"]);
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchStudents(parsedUser._id);
    } else {
      setErrorMessage("Utilisateur non trouvé. Veuillez vous reconnecter.");
    }
  }, []);

  const fetchStudents = async (mentorId) => {
    try {
      const response = await axios.get(`${API_MENTORSHIPS_URL}?mentorId=${mentorId}`);
      const mentorships = response.data;
      const studentIds = mentorships.map((mentorship) => mentorship.studentId);
      const studentsData = await Promise.all(
        studentIds.map(async (studentId) => {
          const studentResponse = await axios.get(`${API_USERS_URL}/${studentId}`);
          return studentResponse.data;
        })
      );
      setStudents(studentsData);
    } catch (error) {
      setErrorMessage("Erreur lors de la récupération des étudiants.");
    }
  };

  return (
    <div className="etudiants-container">
      <h1>Mes Étudiants</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <ul className="etudiants-list">
        {students.length > 0 ? (
          students.map((student) => (
            <li key={student._id} className="etudiant-item">
              <p><strong>Nom :</strong> {student.nom} {student.prenom}</p>
              <p><strong>Email :</strong> {student.email}</p>
            </li>
          ))
        ) : (
          <p>Aucun étudiant trouvé.</p>
        )}
      </ul>
    </div>
  );
};

export default Etudiants;
