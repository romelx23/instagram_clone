import React from "react";
import "../Slider/Slider.scss";
import { Bubble } from "../Bubble/Bubble";
import { usePost } from "../../hooks/usePost";
import { convertDate } from "../../helpers/date";

export const Slider = () => {
  const { item } = usePost();
  // Ordenar por fecha o por id
  const orderDate = () => {
    const order = item.sort((a, b) => {
      return convertDate(b.date) - convertDate(a.date);
    });
    // setItem(order)
  };
  orderDate();
  return (
    <div className="slider">
      {/* <h3>Slider</h3> */}
      <div className="slider__content">
        {
            item?item.map((el)=>{
              return(
                  <Bubble 
                      key={el.uid}
                      {...el}
                  />
              )
          })
          :
          (
            <Bubble />
          )
        }
      </div>
    </div>
  );
};
