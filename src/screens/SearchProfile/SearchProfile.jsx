import React, { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { AuthContext } from "../../context/authContext";
import "../UserScreen/UserScreen.scss";
import { usePostFilter, usePostFilterSearch } from "../../hooks/usePost";
import { Link, useNavigate, useParams } from "react-router-dom";

export const SearchProfile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  // const { searchUser } = usePostFilterSearch();
  // const [user, setUser] = useState({});

  // useEffect(() => {
  //     const filtrado = searchUser(username);
  //     console.log(filtrado);
  //     const filterFirst = filtrado.slice(0, 1);
  //     const [user] = filterFirst;
  //     setUser({
  //       user,
  //     });
  // }, [username]);

  //   const { user } = useContext(AuthContext);
  const { item } = usePostFilter(username);
  //   console.log(item);
  useEffect(() => {
    if (!username) {
      navigate("/auth/login");
    }
    return () => {};
  }, [navigate, username]);

  // console.log(username);
  // console.log(item);
  // console.log(user);
  return (
    <div className="container__profile">
      <Header />
      <div className="content__user">
        {
          item.length !== 0?<img className="avatar" src={item[0].user_url} alt="avatar" />
          :<></>
        }
        
        <div className="content__info">
          <div className="profile">
            <h2>{username}</h2>
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
