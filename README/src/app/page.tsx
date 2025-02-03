
// pages/index.js
"use client"

import Image from "next/image";
import React from "react";
import Link from "next/link";

import Navbar from "./Navbar/page"
import Home from "./Home/page";
import About from "./About/page";
import Utilisateur from "./Utilisateur/page";
import Cours from "./Cours/page";
import Supplementaire from "./Supplementaire/page";
import Statistique from "./Statistique/page";
import Register from "./register/page";
import Historique from "./Historique/page";
import Administrateur from "./Administrateur/page";
import CoursMentor from "./CoursMentor/page";
import MentorProfile from "./MentorProfile/page"
import EtudiantPage from "../app/EtudiantPage/page";

function Index() {
  return (
    <div className="App">
      <EtudiantPage/>
    </div> )
	}

export default Index;

