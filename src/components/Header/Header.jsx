import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { handleLogOut } from "../../helpers/useAuth";
import "../Header/Header.scss";
import { Search } from "../Search/Search";
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
        {/* <label className="label__search" htmlFor="search">
          <input
            className="input__search"
            type="text"
            placeholder="Buscar"
            id="search"
          />
        </label> */}
        <Search/>
        <div className="iconos">
          <Link to={"/"}>
            <i className="fas fa-home"></i>
          </Link>
          <Link to={"/"}>
            <i className="fas fa-paper-plane"></i>
          </Link>
          <Link to={"/create-post"} className="create__post">
            <i className="fas fa-plus"></i>
          </Link>
          <Link to={"/"}>
            <i className="far fa-compass"></i>
          </Link>
          <Link to={"/"}>
            <i className="far fa-heart"></i>
          </Link>
        </div>
        {user.photoURL ? (
          <div className="navbar__avatar">
            <label htmlFor="decoration">
              <div className="avatar">
                <img src={user.photoURL} alt="avatar" />
                <h6 className="avatar__name">{user.displayName}</h6>
              </div>
            </label>
            <input type="checkbox" name="decoration" id="decoration" />
            <div className="btn btn__profile">
              <Link to={"/profile"}>
              <i className="fas fa-user"></i>
              </Link>
            </div>
            <div className="btn btn__edit">
              <Link to={"/edit-profile"}>
              <i className="far fa-edit"></i>
              </Link>
            </div>

            <div className="btn btn__logout" onClick={handleLogOut}>
              <i className="fas fa-sign-out-alt"></i>
            </div>
          </div>
        ) : (
          <Link to={"auth/login"}>
            <i className="far fa-user"></i>
          </Link>
        )}
      </nav>
    </header>
  );
};
