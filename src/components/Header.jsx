import logo from "/logo2.png";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo page web" />
      {/* <div>
        <p>Joueur</p>
        <p>Score</p>
      </div> */}
    </div>
  );
}
