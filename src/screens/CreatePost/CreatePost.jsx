import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Header } from "../../components/Header/Header";
import { AuthContext } from "../../context/authContext";
import { fileUpload } from "../../helpers/fileUpload";
import { createPost } from "../../helpers/useAuth";
import { useForm } from "../../hooks/useForm";
import "./CreatePost.scss";

export const CreatePost = () => {
  // Validar si está logueado
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [url, setUrl] = useState("");
  const [load, setLoad] = useState(false);
  // Crear Post
  const [values, handleInputChange] = useForm({
    title:'',
    file:''
  });
  // console.log(values);
  const { title } = values;
  // console.log(values);

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
    if (title.trim().length === 0) {
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
    setLoad(false);
    return true;
  };
  const handleForm = async (e) => {
    e.preventDefault();
    // console.log(e.target);

    if (isFormValid()) {
      await createPost(title, user.displayName, url, user.photoURL).catch(
        (e) => {
          console.log(e);
        }
      );
    }
    // setLoad(true);
    // navigate("/");
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
      <div className="content__create__post">
        <div className="card__form">
          <h2>Ingrese su Post</h2>
          <form action="" onSubmit={handleForm}>
            <label htmlFor="title">
              Titulo
              <input
                type="text"
                placeholder="Ingrese el titulo de su Post"
                name="title"
                id="title"
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
            <button disabled={load} type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
