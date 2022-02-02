import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export const useGetComents = (uid) => {
  const [coment, setComent] = useState([]);
  const comentCollection = query(collection(db, `post/${uid}/coment`),orderBy("date", "desc"),limit(10));
  useEffect(() => {
    const unsSubcribe=onSnapshot(comentCollection, (docs) => {
      const coments = [];
      docs.forEach((doc) => {
        // console.log(doc.data());
        coments.push({
          ...doc.data(),
        });
      });
      setComent(coments)
      // console.log(coments);
      // return coments;
    });
    return () => {
      unsSubcribe()
    };
  }, []);
  
  // console.log(coments);
  return {
    coment,
    setComent
  };
};
export const useGetComent = (uid) => {
  const [coment, setComent] = useState([]);
  const comentCollection = query(collection(db, `post/${uid}/coment`),orderBy("date", "desc"),
    limit(1));
  useEffect(() => {
    const unsSubcribe=onSnapshot(comentCollection, (docs) => {
      const coments = [];
      docs.forEach((doc) => {
        // console.log(doc.data());
        coments.push({
          ...doc.data(),
        });
      });
      setComent(coments)
      // console.log(coments);
      // return coments;
    });
    return () => {
      unsSubcribe()
    };
  }, []);
  
  // console.log(coments);
  return {
    coment,
    setComent
  };
};
