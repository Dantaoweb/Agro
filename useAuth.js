import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api'; // Axios or fetch configured for backend requests

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds user data and role
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Function to handle login
  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      // Store token in localStorage or sessionStorage
      navigate('/dashboard'); // Redirect based on role
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Function to handle logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Function to register user
  const register = async (userData) => {
    try {
      await api.post('/auth/register', userData);
      navigate('/login');
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  // Check and set user from local storage on load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      // Fetch user data or decode token to get role, etc.
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth context
export const useAuth = () => useContext(AuthContext);