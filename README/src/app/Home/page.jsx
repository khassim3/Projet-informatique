"use client";
import React, { useState } from "react";
import Image from 'next/image'; // Importez le composant Image de Next.js
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import "../CSS/r.css";
  
export default function page() {

  const router = useRouter(); // Initialize useRouter
    const [showRegister, setShowRegister] = useState(false);

    const goToRegister = () => {
      router.push('/register'); // Navigate to the register page
    };
    
    const goToMentor = () => {
      router.push('/Mentorconnect'); // Navigate to the register page
    };
  
  
    const handleRegisterClick = () => {
      setShowRegister(true);
      //history.push('/register'); // Navigate to Register page
      router.push('/premiere_conexion'); // Navigate to the register page
    }

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            JE CHERCHE UN MENTOR
          </h1>
          <p className="primary-text">
            DES MENTORS DE QUALITE A TA DISPOSITION.
          </p>
          <button onClick={goToRegister} style={{ marginRight: '100px' }}>
          INSCRIS TOI
        </button>
        </div>
        <div className="home-image-section">
        </div>


        <div className="home-bannerImage-container">
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            JE DEVIENS UN MENTOR  
          </h1>
          <p className="primary-text">
            POUR TRANSMETTRE LE SAVOIR.
          </p>
          <button onClick={goToMentor} style={{ marginRight: '100px' }}>
          DEVIENS MENTOR
        </button>
        </div>
        <div className="home-image-section">
        </div>
      </div>
    </div>
  )
};

