import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import httpStatus from "http-status";
import { createContext, useContext, useState  } from "react";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL:"http://localhost:8080/api/v1/users"
});

export const AuthProvider = ({ children }) => {
    const authContext =useContext(AuthContext);

    const [userData, setUserData] = useState(authContext);

    const handleRegister = async (username, email, password) => {
        try{
            let request = await client.post("/register", {
                username: username,
                email: email,
                password: password
            })
            if(request.status === httpStatus.CREATED){
                return request.data.message;
            }

        }catch(error){
            throw error
        }
    }

    const handleLogin = async (username, password) => {
        try{
            let request = await client.post("/login", {
                username: username,
                password: password
            })
             if (request.status === httpStatus.OK) {
            const user = request.data.user[0]; // because user is an array
            setUserData(user);

            // Check if the user is admin and route them
            if (user.isAdmin) {
                router("/admin"); // go to admin panel
            } else {
                router("/dashboard"); // go to regular user panel
            }

            return request.data.message;
        }
        }catch(error){
            throw error;
        };
    };

    const router = useNavigate();
    const data = {
        userData, setUserData, handleRegister, handleLogin
    };
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}