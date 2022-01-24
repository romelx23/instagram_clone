import React from "react";
import { BubbleAvatar } from "../BubbleAvatar/BubbleAvatar";
import "./CardSqueleton.scss";

export const CardSqueleton = () => {
  return (
    <div className="card__squeleton">
      <div className="card__title__publication">
        <BubbleAvatar />
        <button className="dots__button">
          <h1>...</h1>
        </button>
      </div>
      <div className="card__content__publication animation__squeleton">
        <div className="squeleton__place"></div>
      </div>
      <div className="card__comment">
        <div className="nombre__squeleton"></div>
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
  );
};
