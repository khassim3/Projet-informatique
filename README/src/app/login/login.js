"use client";

import React from 'react';


const Login = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px'}}>
      <h2>Veuillez entrer vos identifiants</h2>
      <form>
        <div>
          <label>
            Nom:
            <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Mot de passe:
            <input type="password" name="password" />
          </label>
        </div>
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
};

export default Login;