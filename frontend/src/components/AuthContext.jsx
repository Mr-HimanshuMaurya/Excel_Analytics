import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import httpStatus from "http-status";

export const AuthContext = createContext();

const client = axios.create({
  baseURL: "http://localhost:8080/api/v1/users",
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    try {
      if (storedUser && storedUser !== "undefined") {
        setUserData(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      localStorage.removeItem("user");
    }
  }, []);

  // ✅ Log updates to userData inside component
  useEffect(() => {
    console.log("✅ userData updated:", userData);
  }, [userData]);

  const handleLogin = async (username, password) => {
    try {
      const request = await client.post("/login", {
        username,
        password,
      });

      if (request.status === httpStatus.OK) {
        const user = request.data.user[0];
        setUserData(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("username", user.username);
        return request.data.message;
      }
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (username, email, password) => {
    try {
      const request = await client.post("/register", {
        username,
        email,
        password,
      });
      if (request.status === httpStatus.CREATED) {
        return request.data.message;
      }
    } catch (error) {
      throw error;
    }
  };

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
  };

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};
