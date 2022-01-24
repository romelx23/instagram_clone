import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";

export const obtenerData = async () => {
  const post = [];
  const postcollection = query(collection(db, "post"));
  onSnapshot(postcollection, (docs) => {
    docs.forEach((doc) => {
      console.log(doc.data());
      post.push({
        ...doc.data(),
      });
    });
    console.log(post);
    return post;
  });
  console.log(post);
  return post;
};
