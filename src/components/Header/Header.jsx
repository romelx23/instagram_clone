import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { handleLogOut } from "../../helpers/useAuth";
import "../Header/Header.scss";
export const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <header className="app__header">
      <nav className="container__header">
        {/* <div className="content__search"> */}
        <Link to={"/"}>
          <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            className="app-logo"
            alt="logo"
          />
        </Link>
        <label className="label__search" htmlFor="search">
          {/* <i className="fas fa-search logo__search"></i> */}
          <input
            className="input__search"
            type="text"
            placeholder="Buscar"
            id="search"
          />
        </label>
        {/* </div> */}
        <div className="iconos">
          <Link to={"/create-post"}>
            <i className="fas fa-home"></i>
          </Link>
          <i className="fas fa-paper-plane"></i>
          <i className="far fa-compass"></i>
          <i className="far fa-heart"></i>
        {user.photoURL ? (
          <div className="navbar__avatar" onClick={handleLogOut}>
            <img src={user.photoURL} alt="avatar" />
            <h6 className="avatar__name">{user.displayName}</h6>
          </div>
        ) : (
          <Link to={"auth/login"}>
            <i className="far fa-user"></i>
          </Link>
        )}
        </div>
      </nav>
    </header>
  );
};
