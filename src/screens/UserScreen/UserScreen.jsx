import React, { useContext, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { AuthContext } from "../../context/authContext";
import "./UserScreen.scss";
import { usePostFilter } from "../../hooks/usePost";
import { Link, useNavigate } from "react-router-dom";

export const UserScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { item } = usePostFilter(user.displayName);
//   console.log(item);
  useEffect(() => {
    if (!user.displayName) {
      navigate("/auth/login");
    }
    return () => {};
  }, [navigate, user]);
  return (
    <div className="container__profile">
      <Header />
      <div className="content__user">
        <img className="avatar" src={user.photoURL} alt="avatar" />
        <div className="content__info">
          <div className="profile">
            <h2>{user.displayName}</h2>
            <button>Editar perfil</button>
          </div>
          <div className="actions">
            <h3>12 publicaciones</h3>
            <h3>34 seguidores</h3>
            <h3>50 seguidos</h3>
          </div>
        </div>
      </div>
      <div className="content__publications">
        <div className="content__btns">
          <button>Publicaciones</button>
          <button>Guardados</button>
        </div>
        <div className="content__cards">
          {item.length !== 0 ? (
            item.map((el) => {
              return (
                <div className="card__post" key={el.uid}>
                  <Link to={`/post/${el.uid}`}>
                    <img src={el.image} alt="" />
                  </Link>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
