import { getLocalStorage } from "@/utils";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const navigate = useNavigate();

  if (!getLocalStorage("accessToken")) {
    navigate("/login");

    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;
