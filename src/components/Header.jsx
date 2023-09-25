import logo from "/logo2.png";
import "./Header.css";

import { useUser } from "../contexts/UserContext";

export default function Header() {
  const { user, setUser, logout } = useUser();

  return (
    <div className="header">
      <img src={logo} alt="logo page web" />
      {user && <button onClick={logout}>log out</button>}
      {/* <div>
        <p>Joueur</p>
        <p>Score</p>
      </div> */}
    </div>
  );
}
