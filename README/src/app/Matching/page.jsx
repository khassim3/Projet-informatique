"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "../Matching/match.css";
import "../CSS/r.css";

const API_CATEGORIES_URL = "http://localhost:3000/api/categories";

const Courses = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(API_CATEGORIES_URL);
      setCourses(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des cours :", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        QUAND APPRENDRE DEVIENT PLUS FACILE!
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Rejoignez nos cours animés par des mentors passionnés. Apprenez à votre
        rythme et développez de nouvelles compétences.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                {course.name}
              </h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
