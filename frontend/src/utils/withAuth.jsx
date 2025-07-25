import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const { userData, setUserData } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      const storedUser = localStorage.getItem("user");

      // Step 1: Set userData if exists in localStorage
      if (storedUser && !userData) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserData(parsedUser);
          if (location.pathname === "/auth" || location.pathname === "/register") {
            navigate("/dashboard");
          }
        } catch (err) {
          console.warn("⚠ Invalid stored user");
          localStorage.removeItem("user");
        }
      }

      // Step 2: If user is logged in, don't allow access to /auth or /register
      if (userData && ["/auth", "/register"].includes(location.pathname)) {
        navigate("/dashboard");
      }

      // Step 3: If user is not logged in, block access to protected routes
      if (!userData && !["/auth", "/register"].includes(location.pathname)) {
        navigate("/auth");
      }

    }, [userData, setUserData, navigate, location.pathname]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
