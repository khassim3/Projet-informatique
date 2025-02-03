"use client";
import React from 'react';


const Register = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Veuillez entrer vos informations</h2>
      <form>
        <div>
          <label>
            Nom:
            <input type="text" name="lastName" />
          </label>
        </div>
        <div>
          <label>
            Prénom:
            <input type="text" name="firstName" />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
        </div>
        <div>
          <label>
            Mot de passe:
            <input type="password" name="password" />
          </label>
        </div>
        <button type="submit">Inscription</button>
      </form>
    </div>
  );
};

export default Register;
