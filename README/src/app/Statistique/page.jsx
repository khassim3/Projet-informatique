"use client";
import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";
import "../Statistique/stat.css";

// Enregistrer les éléments nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // Simuler les statistiques
  const [stats, setStats] = useState({
    mentorsActifs: 42,
    inscriptions: 180,
    tempsMoyen: "2h30",
    leaderboard: [
      { name: "Alice Dupont", sessions: 25 },
      { name: "Thomas Martin", sessions: 22 },
      { name: "Sophie Leroy", sessions: 18 },
      { name: "Lucas Bernard", sessions: 15 },
    ],
  });

  // Données pour le graphique des mentors actifs
  const mentorsChartData = {
    labels: ["Mentors Actifs"],
    datasets: [
      {
        label: "Nombre",
        data: [stats.mentorsActifs],
        backgroundColor: ["#4CAF50"],
      },
    ],
  };

  // Données pour le graphique des inscriptions
  const inscriptionsChartData = {
    labels: ["Inscriptions"],
    datasets: [
      {
        label: "Nombre",
        data: [stats.inscriptions],
        backgroundColor: ["#2196F3"],
      },
    ],
  };

  // Données pour le leaderboard des mentors
  const leaderboardChartData = {
    labels: stats.leaderboard.map((mentor) => mentor.name),
    datasets: [
      {
        label: "Sessions",
        data: stats.leaderboard.map((mentor) => mentor.sessions),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#66BB6A"],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2>Vue d’ensemble des interactions</h2>

      {/* Statistiques principales */}
      <div className="stats">
        <div className="stat-box">
          <h3>Mentors actifs</h3>
          <p>{stats.mentorsActifs}</p>
        </div>
        <div className="stat-box">
          <h3>Inscriptions</h3>
          <p>{stats.inscriptions}</p>
        </div>
        <div className="stat-box">
          <h3>Temps moyen par mentorat</h3>
          <p>{stats.tempsMoyen}</p>
        </div>
      </div>

      {/* Graphiques */}
      <div className="charts">
        <div className="chart">
          <h3>Mentors Actifs</h3>
          <Bar data={mentorsChartData} />
        </div>
        <div className="chart">
          <h3>Inscriptions</h3>
          <Pie data={inscriptionsChartData} />
        </div>
      </div>

      {/* Classement des mentors les plus actifs */}
      <div className="leaderboard">
        <h3>Classement des mentors les plus actifs 👑</h3>
        <Bar data={leaderboardChartData} />
      </div>
    </div>
  );
};

export default Dashboard;
