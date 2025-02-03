"use client";
import React, { useState } from "react";
import Image from 'next/image'; // Importez le composant Image de Next.js
import BannerBackground from "../../public/Assets/what-is-a-mentor.webp";
import BannerImage from "../../public/Assets/image.png";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from 'next/navigation';


  
export default function page() {

  const router = useRouter(); // Initialize useRouter
    const [showRegister, setShowRegister] = useState(false);
  
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
            SI TU ES A LA RECHERCHE D'UN MENTOR TU ES AU BON ENDROIT
          </h1>
          <p className="primary-text">
            DES MENTORS DE QUALITE A TA DISPOSITION.
          </p>
          <button className="secondary-button" onClick={handleRegisterClick}>
            Reprenez Maintenant <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <Image src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  )
};

