import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthContext,
  AuthContextType,
} from "../Components/AuthForm/AuthProvider";
import { INVALID_ACCESS_URL } from "../constants";

/* This hook takes in a one of these  ROLES as a parameter */
export const ROLE_ADMIN: number = 3; //admin has access to all
export const ROLE_DRIVER: number = 2;
export const ROLE_USER: number = 1;
export const ROLE_ANY: number = 0;

export const useAuthentication = (
  userTypeId: number,
  url?: string
): AuthContextType | null => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  useEffect(() => {
    if (userTypeId && userTypeId !== context?.userInfo?.userTypeId) {
      navigate(url || INVALID_ACCESS_URL);
    }
  }, [context, userTypeId, navigate, url]);

  return context || null;
};
