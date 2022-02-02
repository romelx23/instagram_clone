import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  startAfter,
  getDoc,
  doc,
  where,
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
        }
        if(item.length===1){
          setItem(post);
        }
        // if(post.length===10){
          setItem(post);
        // }
        console.log(item.length);
        console.log(post.length);
        // if(item.length<=item.length+1){
        //   setItem(post);
        // }
        // setItem(post);
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

export const usePostFilter = (username='') => {
   const [item, setItem] = useState([]);

  const postcollection = query(
    collection(db, "post"),
    orderBy("date", "desc"),
    where('username','==',username)
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
      });
        setItem(post);
    });
  }, [username]);
  // console.log(item);
  return {
    item,
    setItem,
  };
};
export const usePostFilterbyId = (post_id='') => {
   const [item, setItem] = useState([]);

  const postcollection = query(
    collection(db, "post"),
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
      });
      const filter=post.filter(el=>el.uid===post_id)
        setItem(filter);
    });
  }, []);
  // console.log(item);
  return {
    item,
    setItem,
  };
};


export const usePostFilterSearch = () => {
  const [item, setItem] = useState([]);

 const postcollection = query(
   collection(db, "post"),
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
     });
     setItem(post);
   });
 }, []);

 const searchUser=(username='')=>{
  const filterItem=item.filter(el=>el.username.toLowerCase().includes(username.toLowerCase()));
  // const filtersame=filterItem.filter((el,i)=>filterItem[i].username.indexOf(el)===i)
  const firstten=filterItem.slice(0,10);
  return firstten;
 }

 return {
   item,
   searchUser
 };
};