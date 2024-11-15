import React, { createContext, useState, ReactNode } from "react";
import { UserData } from "./types";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE_URL } from "../../constants";
import { AuthService } from "../../services";
import { useSnackbar } from "notistack";

export interface AuthContextType {
  authToken?: string;
  userInfo?: UserData;
  login: (accessToken: string, userData: UserData) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [authToken, setAuthToken] = useState<string | undefined>(() => {
    return localStorage.getItem("authToken") || "";
  });

  const [userInfo, setUserInfo] = useState<UserData | undefined>(() => {
    const savedUserData = localStorage.getItem("userData");
    return savedUserData ? JSON.parse(savedUserData) : null;
  });

  const login = (accessToken: string, userData: UserData) => {
    setUserInfo(userData);
    setAuthToken(accessToken);
    localStorage.setItem("authToken", accessToken);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      const res = await AuthService.Logout(authToken || "");
      if (res.status == 200) {
        setAuthToken(undefined);
        setUserInfo(undefined);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        navigate(HOME_PAGE_URL);
        enqueueSnackbar(res.data.message, { variant: "success" });
      } else {
        console.log("Request failed with status:", res.status);
      }
    } catch (error) {
      console.error("An error occurred during the HTTP request:", error);
    }
  };

  const value = {
    userInfo,
    authToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
