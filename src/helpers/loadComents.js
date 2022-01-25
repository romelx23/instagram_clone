import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export const useGetComents = (uid) => {
  const [coment, setComent] = useState([]);
  const comentCollection = query(collection(db, `post/${uid}/coment`));
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
