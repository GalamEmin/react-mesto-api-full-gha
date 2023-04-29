import logo from "../images/header/logo.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header({ onSignOut, headerEmail }) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Logo" />
      {location.pathname === "/signin" && (
        <Link to="/signup" className="header__text">
          Регистрация
        </Link>
      )}
      {location.pathname === "/signup" && (
        <Link to="/signin" className="header__text">
          Войти
        </Link>
      )}
      {location.pathname === "/" && (
        <div className="header__info">
          <p className="header__email">{headerEmail}</p>
          <button
            to="/signin"
            className="header__text_type_sign"
            onClick={onSignOut}
          >
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}
