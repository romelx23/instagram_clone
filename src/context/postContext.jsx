import { createContext, useState } from "react";

export const PostContext = createContext({
  post: [{
    caption: "",
    date: {
        seconds:0
    },
    image:"",
    uid:"",
    user_url:"",
    username:""
  }],
  setPost: () => {},
});

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState([{
    caption: "",
    date: "",
    image:"",
    uid:"",
    user_url:"",
    username:""
  }]);

  return (
    <>
      <PostContext.Provider
        value={{
          post,
          setPost,
        }}
      >
        {children}
      </PostContext.Provider>
    </>
  );
};
