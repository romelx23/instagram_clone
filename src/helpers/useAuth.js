import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Swal from "sweetalert2";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuthRegister = () => {
  const { setUser, user } = useContext(AuthContext);
  const authRegister = (email, password, name) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user.displayName) {
        } else {
          const photoURL =
            "https://res.cloudinary.com/react-romel/image/upload/v1617636275/n2c8uanoks7hjod45fjd.jpg";
          updateProfile(user, {
            displayName: name,
            photoURL,
          });
          setUser({
            displayName: name,
            photoURL,
            uid: user.uid,
          });
        }
        Swal.fire({
          icon: "success",
          title: "Correcto",
          text: "Se Registro correctamente...",
        });
      })
      .catch((error) => Swal.fire("Error", error.message, "error"));
  };
  // console.log(user);
  return {
    authRegister,
  };
};

export const authLogin = (email, password) => {
  const auth = getAuth();
  // const { setUser } = useContext(AuthContext);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // const {displayName,photoURL}=user;
      console.log(user.displayName);
      Swal.fire({
        icon: "success",
        title: "Correcto",
        text: "Se Logueo correctamente...",
      });
    })
    .catch((error) => {
      //   const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        title: "Error",
        icon: "error",
        text: `${errorMessage}`,
      });
    });
};

export const handleLogOut = () => {
  const auth = getAuth();
  signOut(auth);
};

export const createPost = async (caption, username, image, user_url) => {
  const fecha = new Date();
  const key = fecha.getTime();
  // const newItem = [];
  await setDoc(doc(db, `post/${key}`), {
    caption,
    username,
    image,
    date: fecha,
    user_url,
  });
  // newItem.push([{ uid:key,caption, username, image, date: fecha, user_url }]);
  Swal.fire({
    title: "Posteado con exito",
    icon: "success",
  });
  // return newItem;
};

export const googleSignIn = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      Swal.fire({
        title: "Logueo",
        icon: "success",
        text: "Se logueo correctamente",
      });
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // Swal.fire({
      //   title:'Error',
      //   icon:'error',
      //   text:errorMessage
      // })
      console.log(errorCode, errorMessage, email, credential);
    });
};

export const createComent = async (coment, uid, username, user_url) => {
  const fecha = new Date();
  // await setDoc(doc(db,`${uid}`,'coment'), {
  //   coment,
  //   username,
  //   user_url,
  //   date:fecha,
  // });
  const docRef = await addDoc(collection(db, `post/${uid}/coment`), {
    coment,
    username,
    user_url,
    date: fecha,
  });

  // Swal.fire({
  //   title: "Realizo un Comentario",
  //   icon: "success",
  // });
};

export const updateProfileCurrent = async (displayName, photoURL) => {
  const auth = getAuth();
  updateProfile(auth.currentUser, {
    displayName,
    photoURL,
  })
    .then(() => {
      // Profile updated!
      Swal.fire({
        title: "Perfil Actualizado",
        icon: "success",
      });
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
};

export const getUserCurrent = (username = "") => {
  const auth = getAuth();
  const user = auth.name;

  if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
    });
  }
};
