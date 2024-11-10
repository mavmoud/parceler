import React, { createContext, useState, ReactNode } from "react";
import { UserData } from "./types";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE_URL } from "../../constants";

export interface AuthContextType {
  authToken: string;
  login: (accessToken: string, userData: UserData) => void;
  logout: () => void;
  getUserInfo: () => UserData;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState<string>(() => {
    return localStorage.getItem("authToken") || "";
  });

  const [userInfo, setUserInfo] = useState<UserData>(() => {
    const savedUserData = localStorage.getItem("userData");
    return savedUserData ? JSON.parse(savedUserData) : null;
  });

  const login = (accessToken: string, userData: UserData) => {
    setUserInfo(userData);
    setAuthToken(accessToken);
    localStorage.setItem("authToken", accessToken);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const logout = () => {
    setAuthToken("");
    setUserInfo(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate(HOME_PAGE_URL);
  };

  const value = {
    userInfo,
    authToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
