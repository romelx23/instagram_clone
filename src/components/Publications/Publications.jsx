import React, { useContext, useEffect, useRef, useState } from "react";
import { CardPublication } from "../CardPublication/CardPublication";
import { nextP, useNextPost, usePost } from "../../hooks/usePost";
import "../Publications/Publications.scss";
import { CardSqueleton } from "../CardSqueleton/CardSqueleton";
// import { convertDate } from "../../helpers/date";
import { useIntersection } from "../../hooks/useIntersection";
import { PostContext } from "../../context/postContext";

export const Publications = () => {
  const container = useRef(null);
  const isVisible = useIntersection(
    {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    },
    container
  );
  const [uid, setUid] = useState("");
  const [pan, setPan] = useState([]);
  const [load, setLoad] = useState(false);
  // console.log(isVisible);

  // const { item, setItem } = usePost();
  const {post:item,setPost:setItem} = useContext(PostContext);
  
  // console.log(item[item.length-1]);
  // const {nextitem}=useNextPost(uid)
  // console.log(nextitem);
  // const uid=lastElement[0].uid;
  // console.log(item);
  // Ordenar por fecha o por id
  // const orderDate = () => {
  //   // console.log("order");
  //   const order = item.sort((a, b) => {
  //     return convertDate(b.date) - convertDate(a.date);
  //   });
  //   // setItem(order)
  // };
  
  const lastElement = item.slice(-1)[0];
  const trae = async () => {
    if (item.length !== 0) {
      const resp = await nextP(lastElement.uid);
      // console.log(resp);
      setPan(resp);
    }
    if(pan.length!==0){
      setLoad(true)
    }
  };
  // console.log(pan);

  useEffect(() => {
    // if (item.length !== 0) {
    //   console.log(lastElement.uid);
    //   setUid(lastElement.uid);
    // }
    trae();
    if (isVisible === true) {
      setItem([...item, ...pan]);
      setLoad(false)
    }
  }, [isVisible]);

  // orderDate();
  // let content = document.querySelector(".container__publications");
  // intersectionObserver(container.current)
  return (
    <>
      <div className="container__publications">
        <h1>Publicaciones</h1>
        {item.length !== 1 ? (
          item.map((item) => <CardPublication key={item.uid} item={item} />)
        ) : (
          <>
            <CardSqueleton />
            <CardSqueleton />
          </>
        )}
      </div>
      {
        load?<img src="https://tradinglatam.com/wp-content/uploads/2019/04/loading-gif-png-4.gif" alt="spinner" />
        :<></>
      }
      <div className="reference" ref={container}></div>
    </>
  );
};
