import React from "react";
// import { AuthContext } from "../../context/authContext";
import "../BubbleAvatar/BubbleAvatar.scss";
export const BubbleAvatar = ({ nombre,avatar }) => {
  // const {user} = useContext(AuthContext);
  return (
    <div className="bubble__container_avatar">
      <div className="bubble_border_a">
        <div className="bubble__container_a">
          {
            avatar?
            <img src={avatar} className="avatar" alt="avatar" />
            :<img
            className="bubble__image_a"
            src="https://sm.ign.com/t/ign_latam/news/c/crunchyrol/crunchyrolls-anime-awards-winners-announced_bnmy.1280.jpg"
            alt="avatar"
          />
          }
        </div>
      </div>
      <h4>{
          nombre?nombre:<div className="nombre__squeleton"></div>
    }
    </h4>
    </div>
  );
};
