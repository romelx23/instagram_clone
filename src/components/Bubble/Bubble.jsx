import React from "react";
import { Link } from "react-router-dom";
import "../Bubble/Bubble.scss";
export const Bubble = (item) => {
  const { username: nombre, user_url: avatar, uid } = item;
  return (
    <>
      {item ? (
        <div className="container__bubble">
          <Link to={`/post/${uid}`}>
            <div className="bubble_border">
              <div className="bubble__container">
                <img
                  className="bubble__image"
                  src={
                    avatar
                      ? avatar
                      : "https://sm.ign.com/t/ign_latam/news/c/crunchyrol/crunchyrolls-anime-awards-winners-announced_bnmy.1280.jpg"
                  }
                  alt="avatar_slider"
                />
              </div>
            </div>
          </Link>
          <h4>{nombre}</h4>
        </div>
      ) : (
        <div className="container__bubble">
          <div className="bubble_border">
            <div className="bubble__container">
              <img
                className="bubble__image"
                src={
                  "https://sm.ign.com/t/ign_latam/news/c/crunchyrol/crunchyrolls-anime-awards-winners-announced_bnmy.1280.jpg"
                }
                alt="avatar_slider"
              />
            </div>
          </div>
          <h4>nombre</h4>
        </div>
      )}
    </>
  );
};
