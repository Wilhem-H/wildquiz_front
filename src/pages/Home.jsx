import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./Home.css";

export default function Home() {
  const [player, setPlayer] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    // event.preventDefault();
    // fetch(
    //   `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/player`,
    //   {
    //     method: "post",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //     credentials: "include",
    //     body: JSON.stringify({
    //       name: nameRef.current.value,
    //       password: passwordRef.current.value,
    //     }),
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {});

    navigate("/game");
  };

  return (
    <div className="home">
      <form className="home_form">
        <h1>Connectez-vous</h1>
        <p className={error ? "on" : "off"}>E-mail ou mot de passe invalides</p>
        <TextField
          id="outlined-basic"
          label="Mail"
          variant="outlined"
          type="email"
        />
        <TextField
          id="outlined-basic"
          label="Mot de passe"
          variant="outlined"
          type="password"
        />

        <Button
          variant="contained"
          onClick={handleClick}
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
