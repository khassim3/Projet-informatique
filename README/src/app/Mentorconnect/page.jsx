"use client";
import React, { useState, useEffect } from 'react';
import "../CSS/r.css";
import axios from "axios";
import { requireAuth } from "../utils/auth";

const API_URL = "http://localhost:3000/api/users";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    role: "Mentor"
  });
  const [emailError, setEmailError] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    if (formData.email) {
      checkEmailExists();
    }
  }, [formData.email]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "email") {
      setEmailError(""); // Réinitialiser l'erreur si l'utilisateur modifie l'email
      setIsEmailValid(false);
    }
  };

  const checkEmailExists = async () => {
    if (!formData.email) return;
    setIsCheckingEmail(true);
    setEmailError(""); // Nettoyer l'erreur avant la requête
    try {
      const checkResponse = await axios.post(`${API_URL}/check-email`, { email: formData.email });
      if (checkResponse.data.exists) {
        setEmailError("Cet email est déjà utilisé. Veuillez en choisir un autre.");
        setIsEmailValid(false);
      } else {
        setEmailError("");
        setIsEmailValid(true);
      }
    } catch (error) {
      setEmailError("Erreur de connexion au serveur. Veuillez réessayer.");
      console.error("Erreur lors de la vérification de l'email :", error);
    }
    setIsCheckingEmail(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!isEmailValid) {
      setEmailError("Veuillez saisir un email valide avant de continuer.");
      return;
    }
    
    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "application/json" }
      });
      console.log("Utilisateur enregistré :", response.data);
      alert("Inscription réussie !");
      
      // Réinitialiser le formulaire après l'inscription
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        role: "Mentor",
      });
      setIsEmailValid(false);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.response ? error.response.data : error);
      alert("Échec de l'inscription. Vérifiez vos informations et réessayez.");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Veuillez entrer vos informations</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nom:
            <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Prénom:
            <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </label>
          {isCheckingEmail && <p style={{ color: 'blue' }}>Vérification en cours...</p>}
          {emailError && <p style={{ color: 'red', fontWeight: 'bold' }}>{emailError}</p>}
        </div>
        <div>
          <label>
            Mot de passe:
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label>
        </div>
        <button type="submit" disabled={!isEmailValid || isCheckingEmail}>Inscription</button>
      </form>
    </div>
  );
};

export default SignupForm;
