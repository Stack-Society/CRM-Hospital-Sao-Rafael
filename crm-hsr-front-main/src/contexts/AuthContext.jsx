import { createContext, useCallback, useContext, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    }
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  const getCurrentUser = useCallback(async () => {
    try {
      const response = await api.get("/api/funcionarios/me")
      return response.data
    } catch (error) {
      console.error("Erro ao buscar usuário:", error)
      throw error
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
