"use client";
import React from "react";
import { useRouter } from 'next/router'; // Importez useRouter de next/router
import Image from 'next/image'; // Importez le composant Image de Next.js
import Logo from "../../public/Assets/image.png"; // Assurez-vous que le chemin est correct
import "../CSS/r.css";
import "../register/register.css";

const Navbar = () => {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login');
  };

  const goToRegister = () => {
    router.push('/register');
  };

  return (
    <nav>
      <div className="nav-logo-container">
        <Image src={Logo} alt="Logo" width={100} height={50} /> {/* Ajustez la largeur et la hauteur selon vos besoins */}
      </div>
      <div className="navbar-links-container">
        <button onClick={goToLogin} style={{ marginRight: '100px' }}>
          Connexion
        </button>
        <button onClick={goToRegister} style={{ marginRight: '100px' }}>
          Inscription
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
