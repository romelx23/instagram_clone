import React, { useEffect } from "react";
import { Publications } from "../Publications/Publications";
import { Side } from "../Side/Side";
import { Slider } from "../Slider/Slider";
import "../Content/Content.scss";
import { ButtonTop } from "../ButtonTop/ButtonTop";
export const Content = () => {
  return (
    <div className="content__instagram">
      <Slider />
      <Publications />
      <ButtonTop/>
      <Side />
    </div>
  );
};
