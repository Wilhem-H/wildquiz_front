import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconButton from "@mui/material/IconButton";
import logo from "/logo2.png";
import "./Header.css";

import { useUser } from "../contexts/UserContext";

export default function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="header">
      {user ? (
        <div className="header_login">
          <img src={logo} alt="logo page web" />
          <div className="header_user">
            <div className="header_userInfo">
              <p>{user.pseudo}</p>
              <p>{user.score}</p>
            </div>
            <div className="header_button" onClick={handleClick}>
              <IconButton
                aria-label="Brightness3"
                onClick={logout}
                style={{
                  color: "#FFFFFF ",
                  fontSize: "1em",
                  display: "flex",
                  flexDirection: "column",
                  height: "10vh",
                }}
              >
                <ExitToAppIcon fontSize="large" />
                logout
              </IconButton>
              {/* <button onClick={logout}>log out</button> */}
            </div>
          </div>
        </div>
      ) : (
        <img src={logo} alt="logo page web" />
      )}
    </div>
  );
}
