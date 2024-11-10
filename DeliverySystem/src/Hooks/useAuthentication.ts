import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthContext,
  AuthContextType,
} from "../Components/AuthForm/AuthProvider";
import { INVALID_ACCESS_URL } from "../constants";
import { USER_TYPE_ID, USER_INFO } from "./constants";

/* This hook takes in a one of these  ROLES as a parameter */
export const ROLE_ADMIN: number = 3; //admin has access to all
export const ROLE_DRIVER: number = 2;
export const ROLE_USER: number = 1;
export const ROLE_ANY: number = 0;

export const useAuthentication = (
  userTypeId: number
): AuthContextType | null => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  console.log(context);
  useEffect(() => {
    if (userTypeId && userTypeId !== context?.[USER_INFO]?.[USER_TYPE_ID]) {
      navigate(INVALID_ACCESS_URL);
    }
  }, [context, userTypeId, navigate]);

  return context || null;
};
