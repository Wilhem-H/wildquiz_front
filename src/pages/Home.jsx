import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useUser } from "../contexts/UserContext";

import "./Home.css";

export default function Home() {
  const { user, setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [player, setPlayer] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    if (email === "admin@admin.fr") {
      fetch(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
        }/admin/login`,
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
            console.log("coucou");
            navigate("/admin");
          } else {
            setError(true);
            setTimeout(() => {
              setError(false);
            }, "5000");
          }
        });
    } else {
      fetch(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
        }/player/login`,
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
            console.log("coucou");
            navigate("/game");
          } else {
            setError(true);
            setTimeout(() => {
              setError(false);
            }, "5000");
          }
        });
    }
  };

  return (
    <div className="home">
      <form className="home_form" onSubmit={handleClick}>
        <h1>Connectez-vous</h1>
        <p className={error ? "on" : "off"}>E-mail ou mot de passe invalides</p>
        <TextField
          id="Mail"
          label="Mail"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          id="outlined-basic"
          label="Mot de passe"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          variant="contained"
          type="submit"
          style={{
            backgroundColor: "#daa520",
          }}
        >
          Let's Go!
        </Button>

        <Link to="/inscription">
          <p>Pas encore inscrit ? Clique ici</p>
        </Link>
      </form>
    </div>
  );
}
