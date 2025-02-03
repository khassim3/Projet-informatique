"use client"; // Ajoutez cette ligne en haut pour indiquer un composant côté client

import React from 'react';
import { useRouter } from 'next/navigation'; // Importez useRouter de next/navigation
import Image from 'next/image'; // Importez le composant Image de Next.js
import AboutBackgroundImage from "../../../public/Assets/aboutimg.webp";
import { BsFillPlayCircleFill } from 'react-icons/bs';
import "../CSS/r.css";



const About = () => {
  const router = useRouter(); // Initialisez useRouter pour la navigation
  // Fonction pour gérer le clic sur le bouton "NOS COURS"
  const handleLearnMoreClick = () => {
    // Redirigez l'utilisateur vers la page des cours
    router.push('/Matching');
  };

  // Fonction pour gérer le clic sur le bouton "Regarder vidéo"
  const handleWatchVideoClick = () => {
    // Redirigez l'utilisateur vers la page de lecture vidéo
    router.push('/watch-video');
  };

  return (
    <div className="about-section-container">
      
      <div className="about-section-image-container">
        <Image src={AboutBackgroundImage} alt=""/>
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">A Propos</p>
        <h1 className="primary-heading">
        SEN_MENTOR est une association qui facilite la liaison entre l'apprenant et l'enseignant 
        </h1>
        <p className="primary-text">
        Rejoignez notre plateforme de mentorat et trouvez le guide ou le mentor 
        idéal pour vous accompagner vers la réussite !
        </p>
        <p className="primary-text">
        Que vous soyez en quête de conseils pour votre avenir ou prêt à partager votre expertise, 
        notre communauté vous attend. Ensemble, avançons plus loin !
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button" onClick={handleLearnMoreClick}>NOS COURS</button>
        </div>
      </div>
    </div>
  );
};

export default About;
