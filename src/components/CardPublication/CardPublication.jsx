import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../helpers/date";
import { BubbleAvatar } from "../BubbleAvatar/BubbleAvatar";
import "./CardPublication.scss";
import 'moment/locale/es'

export const CardPublication = ({ item }) => {
  const {dateParsed,hourParsed}=formatDate(item);
  const navigate=useNavigate()


  const handleComent=(e)=>{
    e.preventDefault()
    navigate(`post/${item.uid}`)
  }
    
  return (
        <div className="card__publication">
          <div className="card__title__publication">
            <BubbleAvatar nombre={item.username} avatar={item.user_url} />
            <button className="dots__button">
              <h1>...</h1>
            </button>
          </div>
          <div className="card__content__publication">
            <Link to={`post/${item.uid}`}>
              <img
                src={
                  item
                    ? item.image
                    : "https://i0.wp.com/elpalomitron.com/wp-content/uploads/2020/05/Animes-que-NO-se-cancelan-destacada-El-Palomitr%C3%B3n.jpg?resize=1200%2C600&ssl=1"
                }
                className="image__card"
                alt="image_post"
              />
            </Link>
          </div>
          <div className="card__comment">
            <div className="content__description">
            <h2>{item.caption}</h2>
            <div className="content__date">
            <h2>{dateParsed}</h2>
            <h3>{hourParsed}</h3>
            </div>
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
              <form action="" onSubmit={handleComent}>
              <i className="far fa-smile"></i>
              <input type="text" placeholder="ingrese su comentario" />
              <button>publicar</button>
              </form>
            </div>
          </div>
        </div>
  );
};
