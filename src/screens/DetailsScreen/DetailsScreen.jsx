import React, { useContext, useEffect } from "react";
import "./DetailScreen.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useFilterPost } from "../../hooks/usePost";
import { Header } from "../../components/Header/Header";
import { AuthContext } from "../../context/authContext";
import {  formatDate } from "../../helpers/date";
import { BubbleAvatar } from "../../components/BubbleAvatar/BubbleAvatar";
import { useForm } from "../../hooks/useForm";
import { createComent } from "../../helpers/useAuth";
import { useGetComents } from "../../helpers/loadComents";
import { CardSqueleton } from "../../components/CardSqueleton/CardSqueleton";
import Swal from "sweetalert2";

export const DetailsScreen = () => {
  const [values, handleChange,setValues] = useForm({
    coment:''
  });
  const { coment } = values;
  // console.log(values);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { postId } = useParams();
  // console.log(postId);

  const { filtrado } = useFilterPost(postId);
  // console.log(filtrado);

  const handleForm = async (e) => {
    e.preventDefault();
    if(coment.length===0){
      Swal.fire({
        title:"Debe de llenar el campo",
        icon:'error'
      })
      return false;
    }
    // console.log(e);
    console.log(coment, postId, user.displayName, user.photoURL);
    setValues({coment:''})
    await createComent(coment, postId, user.displayName, user.photoURL);
  };
  // pasamos el id del post
  const { coment: coments} = useGetComents(postId);

  // ordenar los comentarios
  // const orderDate = () => {
  //   const order = coments.sort((a, b) => {
  //     return convertDate(b.date) - convertDate(a.date);
  //   });
  //   // setItem(order)
  // };
  // orderDate();
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
        <div className="header__deatils"></div>
        {filtrado.length !== 0 ? (
          <div className="container__content__details">
            <BubbleAvatar
              nombre={filtrado[0].username}
              avatar={filtrado[0].user_url}
            />
            <img src={filtrado[0].image} alt="" />
            <div className="card__comment">
              <div className="content__description">
                <h2>{filtrado[0].caption}</h2>
                <div className="content__date">
                  <h2>{formatDate(filtrado[0]).dateParsed}</h2>
                  <h3>{formatDate(filtrado[0]).hourParsed}</h3>
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
              <div className="comments__content details">
                <form onSubmit={handleForm} className="form">
                  <i className="far fa-smile"></i>
                  <input
                    type="text"
                    name="coment"
                    onChange={handleChange}
                    value={coment}
                    placeholder="ingrese su comentario"
                  />
                  <button>publicar</button>
                </form>
                <div className="coment">
                  {coments.map((el) => {
                    const key = Math.random().toString(36).slice(2);
                    return (
                      <div className="content__coment" key={key}>
                        <img src={el.user_url} alt="" />
                        <div className="">
                          <h5>{el.username}</h5>
                          <h4>{el.coment}</h4>
                          <h5>{formatDate(el).hourParsed}</h5>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <CardSqueleton />
        )}
      </div>
    </div>
  );
};
