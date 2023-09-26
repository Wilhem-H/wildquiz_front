import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./Inscription.css";

export default function Inscription() {
  const navigate = useNavigate();

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/player`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pseudo,
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        const erreurData = await response.json();
        setError(erreurData.message);
      }
    } catch (erreur) {
      console.error(erreur);
      setError("Une erreur s'est produite lors de l'inscription.");
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        // main: "#343333",
        main: "#daa520",
      },
      secondary: {
        main: "#0b2c2d",
      },
    },
  });

  return (
    <div className="inscription">
      <form className="inscription_form" onSubmit={handleSubmit}>
        <h1>Inscription</h1>
        <TextField
          id="outlined-basic"
          label="Pseudo"
          variant="outlined"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          required
        />
        <TextField
          id="email"
          label="email"
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
        <TextField
          id="outlined-basic"
          label="Confirmer mot de passe"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <p className={error ? "on" : "off"}>{error}</p>
        <div className="inscription_button">
          <ThemeProvider theme={theme}>
            <Link to="/">
              <IconButton aria-label="Brightness3">
                <KeyboardReturnIcon color="secondary" />
              </IconButton>
            </Link>
            <Button variant="contained" type="submit" color="primary">
              Valider
            </Button>
          </ThemeProvider>
        </div>
      </form>
    </div>
  );
}
