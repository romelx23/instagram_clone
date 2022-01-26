import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Header } from "../../components/Header/Header";
import { AuthContext } from "../../context/authContext";
import { fileUpload } from "../../helpers/fileUpload";
import { updateProfileCurrent } from "../../helpers/useAuth";
import { useForm } from "../../hooks/useForm";
import "../CreatePost/CreatePost.scss";

export const ProfileScreen = () => {
  // Validar si está logueado
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [url, setUrl] = useState("");
  // Crear Post
  const [values, handleInputChange] = useForm({
    name: "",
    file: "",
  });
  // console.log(values);
  const { name } = values;

  const handleFileChange = async (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    if (file) {
      const fileUrl = await fileUpload(file);
      setUrl(fileUrl);
      Swal.fire({
        title: "Archivo subido con exito",
        icon: "success",
      });
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      // dispatch(setError('name is required'))
      console.log("title is required");
      Swal.fire({
        title: "El titulo es Requerido",
        icon: "error",
      });
      return false;
    }
    if (!url) {
      // dispatch(setError('name is required'))
      console.log("El Archivo es requerido");
      Swal.fire({
        title: "El Archivo es Requerido",
        icon: "error",
      });
      return false;
    }

    return true;
  };

  const handleForm = async (e) => {
    e.preventDefault();
    // console.log(e.target);

    if (isFormValid()) {
      await updateProfileCurrent(name, url)
        .then((e) => {
          console.log(e);
        })
        .catch((e) => {
          console.log(e);
        });
      setUser({
        displayName:name,
        photoURL:url,
      });
    }
    navigate("/");
  };
  useEffect(() => {
    if (!user.displayName) {
      navigate("/auth/login");
    }
    return () => {};
  }, [navigate, user]);

  return (
    <div className="container__create__post">
      <Header />
      <div className="content__create__post profile">
        <div className="card__form">
          <h2>Ingrese su Usuario</h2>
          <div className="content__card">
            <img src={user.photoURL} alt="avatar__actual" />
            <h3>{user.displayName}</h3>
          </div>
          <form action="" onSubmit={handleForm}>
            <label htmlFor="title">
              Usuario
              <input
                type="text"
                placeholder="Ingrese su Usuario"
                name="name"
                id="name"
                onChange={handleInputChange}
              />
            </label>
            <input
              type="file"
              placeholder="Ingrese su Imagen"
              name="file"
              onChange={handleFileChange}
            />
            {url ? (
              <img className="preview" src={url} alt="preview" />
            ) : (
              <img
                className="preview"
                src="https://mtxweb.ch/wp-content/uploads/2017/02/UploadLimit-Header.png"
                alt="upload"
              />
            )}
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};
