import React from "react";
import { UseAdminAuth } from "./UseAuth";
import { Navigate } from "react-router-dom";

function RequireAdminLogin({ children }) {
  const {adminToken} = UseAdminAuth();
  if (adminToken) {
    return <Navigate to={"/admin/dashbord"} />;
  }

  return children;
}

export default RequireAdminLogin;
