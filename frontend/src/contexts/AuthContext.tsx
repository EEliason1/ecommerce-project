import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  user: { id: string; username: string } | null;
  token: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ id: string; username: string } | null>(
    null
  );
  const [token, setToken] = useState<string | null>(null);

  const login = (username: string, token: string) => {
    setUser({ id: "1", username }); // Replace "1" with actual user ID.
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
