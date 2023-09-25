import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/game");
  };

  return (
    <div className="home">
      <form className="home_form">
        <h1>Connectez-vous</h1>
        <TextField id="outlined-basic" label="Mail" variant="outlined" />
        <TextField
          id="outlined-basic"
          label="Mot de passe"
          variant="outlined"
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
