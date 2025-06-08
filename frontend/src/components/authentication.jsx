import React, { useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "./AuthContext.jsx";
import {Silk} from "../react-bits/ShinyText/ShinyText.jsx"
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  InputAdornment,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Snackbar } from '@mui/material';
import "../App.css"

import { useNavigate } from "react-router-dom";



export default function Authentication() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [formState, setFormState] = useState(0);
  const [open, setOpen] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const navigate = useNavigate();

  const theme = useTheme();

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  
const handleAuth = async () => {
  try {
    if (formState === 1) {
      await handleLogin(username, password);
      navigate("/dashboard"); // <== move it here
    }
    if (formState === 0) {
      let res = await handleRegister(username, email, password);
      setMessage(res);
      setOpen(true);
      setError("");
      setFormState(1);
      setUsername("");
      setEmail("");
      setPassword("");
    }
  } catch (err) {
    let message =
      err.response?.data?.message || "An error occurred. Please try again.";
    setError(message);
  }
};
  const isDark = formState === 0 && isAdminLogin;

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0 z-0 ">
         <Silk
  speed={7}
  scale={1.2}
  color="#9272AD"
  noiseIntensity={1}
  rotation={0}
/>
        </div>

    {formState === 1 && (
        <div className="absolute top-4 right-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAdminLogin(!isAdminLogin)}
            className={`px-3 py-1 rounded-md text-xs sm:text-sm font-semibold shadow transition-all duration-300 ${
              isAdminLogin
                ? "bg-white text-gray-900 hover:bg-gray-100"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {isAdminLogin ? "Back to User Login" : "Admin Login"}
          </motion.button>
        </div>
      )}

     <Box
      className={`relative z-10 shadow-xl auth-box${isDark ? "bg-gray-800 text-white" : "bg-white text-black"} ${isAdminLogin
                ? "bg-white text-gray-900 hover:bg-gray-100"
                : "bg-gray-900 text-white hover:bg-gray-800"}`}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.58)', backdropFilter: 'blur(10px)', borderRadius:"2rem", paddingInline:"20px" }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        flexDirection: 'column',
      }}
    >

    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>

       <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }} color={isDark ? "secondary" : "primary"}>
        
        {isAdminLogin ? "Admin Login" :
        formState === 1 ? 'Login to Your Account' : 'Create a New Account'
         }
      </Typography>
     

      {/* Toggle Buttons */}

      {isAdminLogin ? "" :
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button
          variant={formState === 1 ? 'contained' : 'outlined'}
          onClick={() => setFormState(1)}
          sx={{ textTransform: 'none' }}
        >
          Sign In
        </Button>
        <Button
          variant={formState === 0 ? 'contained' : 'outlined'}
          onClick={() => setFormState(0)}
          sx={{ textTransform: 'none' }}
        >
          Sign Up
        </Button>
      </Box>
}

    
         <Box component="form" noValidate sx={{ mt: 1, width: '100%', maxWidth: 300 }}>

        <TextField
          fullWidth
           margin="normal"
          type="text"
          label="Username"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
           slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle fontSize="inherit" />
                  </InputAdornment>
                ),
              },
            }}
          variant="outlined"
          color={isDark ? "secondary" : "primary"}
          
        />

        {formState === 0 && (
          <TextField
            fullWidth
             margin="normal"
            type="email"
            label="Email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            color={isDark ? "secondary" : "primary"}
            
          />
        )}

        <TextField
          fullWidth
           margin="normal"
          type="password"
          label="Password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          color={isDark ? "secondary" : "primary"}
        
        />

        {formState === 1 && (
          <FormControlLabel
            label="Remember me"
            control={
              <Checkbox
                name="remember"
                value="true"
                color="primary"
                sx={{ padding: 0.5, '& .MuiSvgIcon-root': { fontSize: 20 } }}
              />
            }
            slotProps={{
              typography: {
                color: 'textSecondary',
                fontSize: theme.typography.pxToRem(14),
              },
            }}
          />
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="button"
          fullWidth
          onClick={handleAuth}
          variant="contained"
          sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition duration-200 ${
            isDark
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {formState === 0 ? "SIGN UP" : "SIGN IN"}
        </Button>

        {formState === 1 ? (
          <p
            onClick={() => setFormState(0)}
            className="text-center text-xs sm:text-sm text-blue-500 cursor-pointer hover:underline"
          >
            {isAdminLogin ? "" : "Don't have an account? Sign Up"}
          </p>
        ) : (
          <p
            onClick={() => setFormState(1)}
            className="text-center text-xs sm:text-sm text-blue-500 cursor-pointer hover:underline"
          >
            Already have an account? Login
          </p>
        )}

        </Box>
    </Box>

     

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={"Registration successful!"}
        onClose={() => setOpen(false)}
        action={
          <button
            onClick={() => setOpen(false)}
            style={{ color: "white", padding: "0.5rem" }}
          >
            X
          </button>
        }
      />

    </div>
  );
}
