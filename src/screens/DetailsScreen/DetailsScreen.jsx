import React, { useContext, useEffect } from "react";
import "./DetailScreen.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useFilterPost } from "../../hooks/usePost";
import { Header } from "../../components/Header/Header";
import { AuthContext } from "../../context/authContext";
import { formatDate } from "../../helpers/date";
import { BubbleAvatar } from "../../components/BubbleAvatar/BubbleAvatar";

export const DetailsScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { postId } = useParams();
  // console.log(postId);

  const { filtrado } = useFilterPost(postId);
  // console.log(filtrado);

  useEffect(() => {
    if (!user.displayName) {
      navigate("/auth/login");
    }
    return () => {};
  }, [navigate, user]);

  return (
    <div className="container__details">
      <Header />
      <div className="container__card__details">
        <div className="header__deatils">
        </div>
        {filtrado.length !== 0 ? (
          <div className="container__content__details">
            <BubbleAvatar nombre={filtrado[0].username} avatar={filtrado[0].user_url}/>
            <img src={filtrado[0].image} alt="" />
            <div className="card__comment">
            <div className="content__description">
            <h2>{filtrado[0].caption}</h2>
            <h2>{formatDate(filtrado[0])}</h2>
            </div>
            <div className="card__bar__icons">
              <div className="content__icons__card">
                <i className="far fa-heart"></i>
                <i className="far fa-comment"></i>
                <i className="far fa-paper-plane"></i>
              </div>
              <i className="far fa-bookmark"></i>
            </div>
            <div className="comments__content">
              <i className="far fa-smile"></i>
              <input type="text" placeholder="ingrese su comentario" />
              <button>publicar</button>
            </div>
          </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
