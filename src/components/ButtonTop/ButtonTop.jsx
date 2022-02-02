import React, { useRef } from "react";

export const ButtonTop = () => {
    const topBtn = useRef(null);
    const {current}=topBtn;
    const goTop=()=>{
        window.scroll(0,0)
    }
    if(current!==null){
        window.onscroll = () => window.scrollY > 500 ? current.style.opacity = 1 : current.style.opacity = 0
    }
  return (
    <div className="btn__top" onClick={goTop} ref={topBtn}>
      <i className="fas fa-arrow-up"></i>
    </div>
  );
};
