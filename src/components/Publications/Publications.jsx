import React, { useEffect, useState } from "react";
import { CardPublication } from "../CardPublication/CardPublication";
import { usePost } from "../../hooks/usePost";
import "../Publications/Publications.scss";
import { CardSqueleton } from "../CardSqueleton/CardSqueleton";
import { convertDate } from "../../helpers/date";

export const Publications = () => {
  const [scroll, setScroll] = useState(0);
  const { item } = usePost();
  // console.log(item);

  // Ordenar por fecha o por id
  const orderDate = () => {
    console.log("order");
    const order = item.sort((a, b) => {
      return convertDate(b.date) - convertDate(a.date);
    });
    // setItem(order)
  };
  orderDate();
  useEffect(() => {
    // window.onscroll = () => {
    //   const y = window.scrollY;
    //   console.log(y);
    // };
  }, []);

  // console.log(item.sort((a,b)=>{return a.date-b.date}));

  return (
    <div className="container__publications">
      <h1>Publications</h1>
      {item.length !== 0 ? (
        item.map((item) => <CardPublication key={item.uid} item={item} />)
      ) : (
        <>
          <CardSqueleton />
          <CardSqueleton />
        </>
      )}
    </div>
  );
};
