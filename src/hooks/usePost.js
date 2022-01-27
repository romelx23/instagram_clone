import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  startAfter,
  getDoc,
  doc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../context/postContext";
import { db } from "../firebase";

export const usePost = () => {
  const {post:item,setPost:setItem} = useContext(PostContext);
  // const [item, setItem] = useState([]);

  const postcollection = query(
    collection(db, "post"),
    orderBy("date", "desc"),
    limit(10)
  );
  useEffect(() => {
    onSnapshot(postcollection, (docs) => {
      const post = [];
      docs.forEach((doc) => {
        //   console.log(doc.data());
        post.push({
          uid: doc.id,
          ...doc.data(),
        });
        //   setItem({...doc.data})
      });
        if(item.length!==item[item.length-1]){
          setItem(item);
        }if(item.length===1){
          setItem(post);
        }
      // else if(post.length===0){
      //   setItem(post)
      // }

    });
    // return ()=>{
    //   unSubcribe()
    // }
  }, []);
  // console.log(item);
  return {
    item,
    setItem,
  };
};

export const useNextPost = (key) => {
  const [nextitem, setNextItem] = useState([]);
  // const nextPost = (key) => {
  const postcollection = query(
    collection(db, "post"),
    orderBy("date", "desc"),
    startAfter(key),
    limit(10)
  );
  useEffect(() => {
    const unSubcribe = onSnapshot(postcollection, (docs) => {
      const post = [];
      docs.forEach((doc) => {
        //   console.log(doc.data());
        post.push({
          uid: doc.id,
          ...doc.data(),
        });
        //   setItem({...doc.data})
      });
      setNextItem(post);
    });
  }, []);
  console.log(nextitem);
  // };
  return {
    // nextPost,
    nextitem,
    setNextItem,
  };
};

export const nextP = async (key) => {
  
  const post = [];
  if (key !== "") {
    const postcollection = query(
      collection(db, "post"),
      orderBy("date", "desc"),
      limit(10)
    );
    const citiesRef = collection(db, "post");
    const docSnap = await getDoc(doc(citiesRef, key));
    const next = query(
      collection(db, "post"),
      orderBy("date", "desc"),
      startAfter(docSnap),
      limit(10)
    );

    onSnapshot(next, (docs) => {
      docs.forEach((doc) => {
        //   console.log(doc.data());
        post.push({
          uid: doc.id,
          ...doc.data(),
        });
        //   setItem({...doc.data})
      });
    });
    // console.log(post);
  }
  return post;
};

export const useFilterPost = (id) => {
  // const { item } = usePost();
  const {post:item} = useContext(PostContext);
  const filtrado = item.filter((el) => el.uid === id);

  return {
    filtrado,
  };
};
