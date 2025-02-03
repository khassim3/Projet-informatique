
// pages/index.js
"use client"

import Image from "next/image";
import React from "react";
import Link from "next/link";

import Navbar from "../Navbar/page"
import Home from "../Home/page";
import About from "../About/page";
import "../CSS/r.css";


function Index() {
  return (
    <div className="App">
      <Navbar/>
      <Home/>
      <About/>
    </div> )
	}

export default Index;

