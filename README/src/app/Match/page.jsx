"use client";
import React, { useState } from "react";
import "../Match/match.css"; // Import du fichier CSS
import { requireAuth } from "../utils/auth";

const mentors = [
  { id: 1, name: "Alice", skills: ["JavaScript", "React", "Node.js"] },
  { id: 2, name: "Bob", skills: ["Python", "Django", "Data Science"] },
  { id: 3, name: "Charlie", skills: ["Java", "Spring Boot", "Cloud Computing"] },
  { id: 4, name: "Diana", skills: ["Machine Learning", "AI", "Python"] },
];

const MentorshipMatch = () => {
  const [userType, setUserType] = useState("Étudiant");
  const [skillsOrNeeds, setSkillsOrNeeds] = useState("");
  const [duration, setDuration] = useState("");
  const [matches, setMatches] = useState([]);
  const [noMatchMessage, setNoMatchMessage] = useState("");

  const handleMatch = () => {
    const keywords = skillsOrNeeds.split(",").map((kw) => kw.trim().toLowerCase());

    let foundMatches = [];
    if (userType === "Étudiant") {
      foundMatches = mentors.filter((mentor) =>
        mentor.skills.some((skill) => keywords.includes(skill.toLowerCase()))
      );
    } 

    setMatches(foundMatches);

    // Gérer le message si aucun match n'est trouvé
    if (foundMatches.length === 0) {
      setNoMatchMessage("Aucun match disponible pour vos critères.");
    } else {
      setNoMatchMessage(""); // Réinitialiser le message si des résultats sont trouvés
    }
  };

  return (
    <div className="mentorship-container">
      <h1 className="mentorship-title">Trouver un Mentor ou un Étudiant</h1>

      <div className="form-container">
        <h2>Barre de Recherche</h2>

        <input
          type="text"
          placeholder={userType === "Étudiant" ? "Compétences recherchées (ex: React, Python)" : "Compétences offertes"}
          value={skillsOrNeeds}
          onChange={(e) => setSkillsOrNeeds(e.target.value)}
          className="input-field"
        />

        <input
          type="text"
          placeholder="Durée souhaitée (ex: 3 mois)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="input-field"
        />

        <button onClick={handleMatch} className="match-button">Rechercher</button>
      </div>

      {matches.length > 0 ? (
        <div className="results-container">
          <h2 className="results-title">
            {userType === "Étudiant" ? "Mentors correspondants" : "Étudiants correspondants"}
          </h2>
          <ul className="match-list">
            {matches.map((match) => (
              <li key={match.id} className="match-item">
                <strong>{match.name}</strong> - {userType === "Étudiant" ? match.skills.join(", ") : match.needs.join(", ")}
                <button className="connect-button">Se connecter</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        noMatchMessage && (
          <div className="no-match-message">
            <p>{noMatchMessage}</p>
          </div>
        )
      )}
    </div>
  );
};

export default MentorshipMatch;
