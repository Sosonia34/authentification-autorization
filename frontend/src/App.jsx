import Connexion from "@pages/Connexion";
import Home from "@pages/Home";
import SignUp from "@pages/SignUp";
import Movies from "@pages/Movies";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "@pages/Users";
import AuthAPI from "@services/AuthAPI";
import Profile from "@pages/Profile";
import { useState } from "react";
import PrivateRoute from "@components/PrivateRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AuthContext from "./contexts/AuthContext";

AuthAPI.setup();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated
  );
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/" element={<Connexion />} />
          <Route path="/signup/" element={<SignUp />} />
          <Route
            path="/movies/"
            element={
              <PrivateRoute>
                <Movies />
              </PrivateRoute>
            }
          />
          <Route path="/users/" element={<Users />} />
          <Route path="/my-profile/" element={<Profile />} />
          <Route path="/unauthorized/" element={<UnauthorizedPage />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
