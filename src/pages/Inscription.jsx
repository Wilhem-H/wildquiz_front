import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import "./Inscription.css";

export default function Inscription() {
  return (
    <div className="inscription">
      <form className="inscription_form">
        <h1>Inscription</h1>
        <TextField id="outlined-basic" label="Pseudo" variant="outlined" />
        <TextField id="outlined-basic" label="Mail" variant="outlined" />
        <TextField
          id="outlined-basic"
          label="Mot de passe"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Confirmer mot de passe"
          variant="outlined"
        />
        <div>
          <Link to="/">
            <IconButton aria-label="Brightness3">
              <KeyboardReturnIcon />
            </IconButton>
          </Link>
          <Button variant="outlined">Valider</Button>
        </div>
      </form>
    </div>
  );
}
