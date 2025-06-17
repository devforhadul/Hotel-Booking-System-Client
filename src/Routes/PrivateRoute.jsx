import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={"/login"}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
