import { useState, useContext } from "react";
// eslint-disable-next-line import/no-unresolved
import GoHomeButton from "@components/GoHomeButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line import/no-unresolved
import AuthContext from "../contexts/AuthContext";

export default function Connexion() {
  const [formState, setFormState] = useState({
    email: "sonia.vidal@sncf.fr",
    password: "1234",
  });
  const { setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();
  // Requete de connexion -> stocker le token dans le local storage -> ajouter le token dans les autorisations
  // -> rediriger l'utilisateur vers la page d'accueil
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, { ...formState })
      .then((response) => response.data)
      // permet de stocker le token dans le navigateur*/
      .then((data) => {
        window.localStorage.setItem("Token", data.token);
        axios.defaults.headers.Authorization = `Bearer ${data.token}`;
        setIsAuthenticated(true);
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <GoHomeButton />
      <h2>Formulaire de connexion</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="email"
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          placeholder="Email"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={formState.password}
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
        />
        <input type="submit" />
      </form>
    </>
  );
}
