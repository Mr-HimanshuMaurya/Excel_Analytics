import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Authentication from "./authentication";

const SmartAuthentication = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (userData || storedUser) {
      navigate("/dashboard");
    }
  }, [userData, navigate]);

  return <Authentication />;
};

export default SmartAuthentication;
