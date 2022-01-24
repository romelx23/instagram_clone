import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "../../components/Content/Content";
import { Header } from "../../components/Header/Header";
import { AuthContext } from "../../context/authContext";
import './HomeScreen.scss'
export const HomeScreen = () => {
  const navigate=useNavigate()
  const {user} = useContext(AuthContext);
  useEffect(() => {
    if(!user.displayName){
      navigate('/auth/login')
    }
    return ()=>{
    }
  }, [navigate, user]);
  
  return (
    <div className="container__home">
      <Header />
      <Content />
    </div>
  );
};
