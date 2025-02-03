"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "../CSS/r.css";
import { requireAuth } from "../utils/auth";

const API_LOGIN_URL = "http://localhost:3000/api/users/login";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_LOGIN_URL, formData);
      if (response.status === 200 && response.data.user) {
        // Stocker les données de l'utilisateur
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirection en fonction du rôle
        switch (response.data.user.role) {
          case "Etudiant":
            router.push("/EtudiantPage");
            break;
          case "Mentor":
            router.push("/Mentormenu");
            break;
          case "Admin":
            router.push("/Administrateur");
            break;
          default:
            setErrorMessage("Rôle inconnu. Contactez un administrateur.");
        }
      } else {
        setErrorMessage("Email ou mot de passe incorrect.");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Email ou mot de passe incorrect.");
      } else {
        setErrorMessage("Erreur de connexion, veuillez réessayer.");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Veuillez entrer vos identifiants</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left" }}>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Email :
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                display: "block",
                marginTop: "5px",
                padding: "8px",
                width: "100%",
                maxWidth: "300px",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Mot de passe :
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                display: "block",
                marginTop: "5px",
                padding: "8px",
                width: "100%",
                maxWidth: "300px",
              }}
            />
          </label>
        </div>

        {errorMessage && (
          <p style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</p>
        )}

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        > 
          Connexion
        </button>
      </form>
    </div>
  );
};

export default Login;
