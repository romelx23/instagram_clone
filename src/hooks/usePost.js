import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export const usePost = () => {
  const [item, setItem] = useState([]);
  
  const postcollection = query(collection(db, "post"));
  useEffect(() => {
      onSnapshot(postcollection, (docs) => {
        const post = [];
        docs.forEach((doc) => {
        //   console.log(doc.data());
          post.push({
            uid:doc.id,
            ...doc.data(),
          });
        //   setItem({...doc.data})
      });
      setItem(post)
      });
  }, []);
  // console.log(item);
  return {
    item,
    setItem
  };
};

export const useFilterPost=(id)=>{
  const{item}=usePost();
  const filtrado=item.filter((el)=>el.uid===id)
  
  return {
    filtrado
  };
}