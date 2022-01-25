import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreatePost } from "../screens/CreatePost/CreatePost";
import { DetailsScreen } from "../screens/DetailsScreen/DetailsScreen";
import { HomeScreen } from "../screens/HomeScreen/HomeScreen";
import { LoginScreen } from "../screens/LoginScreen/LoginScreen";
import { NotFound } from "../screens/NotFound/NotFound";
import { RegisterScreen } from "../screens/RegisterScreen/RegisterScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../context/authContext";
import { ProfileScreen } from "../screens/ProfileScreen/ProfileScreen";
export const DasboardRoutes = () => {
  
  const {setUser} = useContext(AuthContext);
  // console.log(user);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid,displayName, photoURL } = user;
        // console.log(uid, displayName, photoURL);
        setUser({
          displayName,
          photoURL,
          uid
        });
        setLoading(true);
      } else {
        // User is signed out
        setUser({});
        setLoading(false);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  if(loading){
    return <h1 style={{color:'#fff'}}>Cargando...</h1>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />

        <Route path="post/:postId" element={<DetailsScreen />} />
        <Route path="create-post" element={<CreatePost />} />
        <Route path="edit-profile" element={<ProfileScreen />} />
        <Route path="auth">
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
