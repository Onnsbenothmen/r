// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

// Création du contexte d'authentification
const AuthContext = createContext();

// Hook personnalisé pour accéder au contexte d'authentification
export const useAuth = () => {
  return useContext(AuthContext);
};

// Composant fournisseur du contexte d'authentification
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State pour stocker les informations de l'utilisateur connecté
  const [token, setToken] = useState(null); // State pour stocker le token d'authentification

  // Fonction pour connecter l'utilisateur
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
