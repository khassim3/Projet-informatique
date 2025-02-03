"use client";
import React, { useState, useEffect } from "react";
import "../Supplementaire/supp.css"; // Import du fichier CSS

const DashboardFeatures = () => {
  // Liste des utilisateurs avec progression et points
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", role: "Étudiant", progress: 75, badge: "Expert" },
    { id: 2, name: "Bob", role: "Mentor", points: 120, rank: "Or" },
    { id: 3, name: "Charlie", role: "Étudiant", progress: 40, badge: "Débutant" },
    { id: 4, name: "Diana", role: "Mentor", points: 200, rank: "Platine" },
  ]);

  const [notifications, setNotifications] = useState([]);

  // Simuler des notifications
  useEffect(() => {
    const newNotifications = [
      { id: 1, message: "🎯 Objectif atteint : 5 sessions complétées !" },
      { id: 2, message: "🏆 Bravo Bob ! Tu es dans le Top 3 des mentors ce mois-ci !" },
      { id: 3, message: "📚 Alice, il te reste 25% pour débloquer le badge 'Avancé' !" },
    ];
    setNotifications(newNotifications);
  }, []);

  return (
    <div className="dashboard-container">
      <h2>🎖 Système de Récompenses & Progression</h2>

      {/* Section des Badges de progression des étudiants */}
      <div className="section">
        <h3>🎓 Progression des Étudiants</h3>
        <ul className="list">
          {users
            .filter(user => user.role === "Étudiant")
            .map(user => (
              <li key={user.id} className="student-card">
                <span className="user-name">{user.name}</span>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${user.progress}%` }}
                  ></div>
                </div>
                <span className="badge">🏅 {user.badge}</span>
              </li>
            ))}
        </ul>
      </div>

      {/* Section des Points des mentors */}
      <div className="section">
        <h3>🏆 Classement des Mentors Actifs</h3>
        <ul className="list">
          {users
            .filter(user => user.role === "Mentor")
            .map(user => (
              <li key={user.id} className="mentor-card">
                <span className="user-name">{user.name}</span>
                <span className="points">🔥 {user.points} points</span>
                <span className={`rank rank-${user.rank.toLowerCase()}`}>{user.rank}</span>
              </li>
            ))}
        </ul>
      </div>

      {/* Notifications personnalisées */}
      <div className="section notifications">
        <h3>🔔 Notifications Personnalisées</h3>
        <ul className="notification-list">
          {notifications.map(notification => (
            <li key={notification.id} className="notification-item">
              {notification.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardFeatures;
