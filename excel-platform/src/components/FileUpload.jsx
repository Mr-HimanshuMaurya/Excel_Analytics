import React, { useState } from "react";
import { motion } from "framer-motion";
import { Snackbar } from "@mui/material";
import { AuthContext } from "./AuthContext.jsx";
import TextField from "@mui/material/TextField";

export default function Authentication() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [formState, setFormState] = useState(0);
  const [open, setOpen] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 1) {
        await handleLogin(username, password);
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

  const isDark = formState === 1 && isAdminLogin;

  return (
    <motion.div
      className={`relative flex items-center justify-center min-h-screen p-3 sm:p-6 transition-colors duration-500 ${
        isDark ? "bg-gray-900" : "bg-gray-100"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Toggle only when on Sign In screen */}
      {formState === 1 && (
        <div className="absolute top-4 right-4">
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

      <motion.form
        style={{ padding: "1.75rem" }}
        className={`w-full max-w-md rounded-2xl shadow-2xl flex flex-col gap-4 sm:gap-5 animate-slide-up ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-center">
          {formState === 0 ? "SIGN UP" : "SIGN IN"}
        </h2>

        <TextField
          fullWidth
          type="text"
          label="Username"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          variant="outlined"
          color={isDark ? "secondary" : "primary"}
          InputLabelProps={{ style: { color: isDark ? "#fff" : "#000" } }}
          InputProps={{ style: { color: isDark ? "#fff" : "#000" } }}
        />

        {formState === 0 && (
          <TextField
            fullWidth
            type="email"
            label="Email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            color={isDark ? "secondary" : "primary"}
            InputLabelProps={{ style: { color: isDark ? "#fff" : "#000" } }}
            InputProps={{ style: { color: isDark ? "#fff" : "#000" } }}
          />
        )}

        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          color={isDark ? "secondary" : "primary"}
          InputLabelProps={{ style: { color: isDark ? "#fff" : "#000" } }}
          InputProps={{ style: { color: isDark ? "#fff" : "#000" } }}
        />

        {formState === 0 && (
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              className="accent-blue-500 w-4 h-4"
              required
            />
            <span>I agree to the terms and conditions</span>
          </label>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <motion.button
          type="button"
          onClick={handleAuth}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition duration-200 ${
            isDark
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {formState === 0 ? "SIGN UP" : "SIGN IN"}
        </motion.button>

        {formState === 1 ? (
          <p
            onClick={() => setFormState(0)}
            className="text-center text-xs sm:text-sm text-blue-500 cursor-pointer hover:underline"
          >
            {isAdminLogin
              ? "Admin Registration"
              : "Don't have an account? Sign Up"}
          </p>
        ) : (
          <p
            onClick={() => setFormState(1)}
            className="text-center text-xs sm:text-sm text-blue-500 cursor-pointer hover:underline"
          >
            Already have an account? Login
          </p>
        )}
      </motion.form>

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
    </motion.div>
  );
}
