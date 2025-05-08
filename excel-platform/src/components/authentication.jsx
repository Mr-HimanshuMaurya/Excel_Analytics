import React, { useState } from "react";
import { motion } from "framer-motion";
import {Snackbar} from "@mui/material";
import { AuthContext } from "./AuthContext.jsx";
import TextField from '@mui/material/TextField';

export default function Authentication() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState();

  const [formState, setFormState] = React.useState(0);

  const [open, setOpen] = React.useState(false);

  const {handleRegister, handleLogin} = React.useContext(AuthContext);

  const [isAdminLogin, setIsAdminLogin] = useState(false);

  let handleAuth = async () => {
    // e.preventDefault();

    try {
      if(formState === 1) {
        let result = await handleLogin(username, password);
      }
      // if(result) {
        //   navigate("/file-upload"); // Redirect to file upload page after signup
        // } else {
        //   setMessage("Login failed. Please check your credentials.");
        // }
      
      if(formState === 0) {
        let res = await handleRegister(username, email, password);
        console.log(res);
        setMessage(res); // Updated to access the message property
        setOpen(true);
        setError("");
        setFormState(1);
        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      let message = err.response.data.message || "An error occurred. Please try again.";
      console.log(err);
      console.log(err.response.data.message)
      setError(message);
    }
  }

      // const res = await fetch("", {
      //   //node js api
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ username, email, password }),
      // });
  //     const data = await res.json();
  //     if (data.token) {
  //       localStorage.setItem("token", data.token);
  //       navigate("/file-upload"); // Redirect to file upload page after signup
  //     } else {
  //       alert("Signup failed");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Signup Failed");
  //   }
  // };

  return (
    <motion.div
         className={`relative flex items-center justify-center min-h-screen p-3 sm:p-4 ${
           isAdminLogin ? "bg-slate-900" : "bg-gray-100"
         }`}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
       >
         <div className="absolute top-4 right-4">
           {!isAdminLogin ? (
             <button
               onClick={() => setIsAdminLogin(true)}
               className="text-xs sm:text-sm text-blue-600"
             >
              {formState === 0 ? <></> : "Admin Login"}
             </button>
           ) : (
             <button
               onClick={() => setIsAdminLogin(false)}
               className="text-xs sm:text-sm text-white"
             >
               Back to User Login
             </button>
           )}
         </div>
      <form
        // onSubmit={handleAuth}
        style={{padding: "1.75rem"}}
        className="bg-white w-full max-w-md  rounded-2xl sm:rounded-2xl shadow-2xl flex flex-col gap-4 sm:gap-5 animate-slide-up"
      >

        {formState === 0 ?
        <h2 
        className="text-xl sm:text-2xl font-semibold text-center">
          SIGN UP
        </h2> : <h2 
        className="text-xl sm:text-2xl font-semibold text-center">
          SIGN IN
        </h2> }

        <TextField 
          fullWidth
          type="text"
          label="Username"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {formState === 0 ?
        <TextField
      
          fullWidth
          type="email"
          label="Email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /> : <></>}

        <TextField
          
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {formState === 0 ?
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="accent-blue-500 w-4 h-4" required />
          <span className="text-gray-700">&nbsp;I agree to the terms and conditions</span>
        </label> : <></>}

          <p style={{color:"red"}}>{error}</p>
        <button
          type="button"
          onClick={handleAuth}
          style={{padding:"0.75rem", cursor:"pointer"}}
          className="w-full py-2 sm:py-3 bg-green-500 text-white rounded-lg text-sm sm:text-base font-medium transition-transform duration-200 hover:bg-green-600 hover:scale-105 disabled:opacity-50"
        >
         {formState === 0 ? "SIGN UP" : "SIGN IN"}
        </button>

          {formState === 1 ?
        <p
          onClick={() => setFormState(0)}
          className="text-center text-xs sm:text-sm text-blue-600 cursor-pointer"
        > 
        {isAdminLogin ? (
          <p>Admin Registration</p>
        ) : (
          <p> Don't have an account? Sign Up</p>
        )}
          </p>
          :
          <p
          onClick={() => setFormState(1)}
          className="text-center text-xs sm:text-sm text-blue-600 cursor-pointer"
          >
          Already have an account? Login
        </p>}

      </form>
      <Snackbar
      open={open}
      autoHideDuration={4000}
      message={"Registration successful!"}
      onClose={() => setOpen(false)}
      action={
        <button onClick={() => setOpen(false)} style={{color:"white", padding:"0.5rem"}}>
          X
        </button>
      }
      
      
      />
    </motion.div>
  );
};

