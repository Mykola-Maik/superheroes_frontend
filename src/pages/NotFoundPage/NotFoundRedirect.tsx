import { ROUTES } from "@/enums";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES.NOT_FOUND);
  }, []);

  return null;
};
