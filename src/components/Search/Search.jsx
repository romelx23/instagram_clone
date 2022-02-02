import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { usePostFilterSearch } from "../../hooks/usePost";
import "./Search.scss";

export const Search = () => {
  const sear = useRef(null);
  const [values, handleInputChange] = useForm();
  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);
  const { search } = values;

  const { searchUser } = usePostFilterSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const search2 = searchUser(search);
    const filterNames=search2.filter(el=>el.username.toLowerCase()===search)
    setItem(search2);
    console.log(search);
    console.log(filterNames);
  };
  //   const isFocus=sear.current===document.activeElement;
  const handleFocus = (e) => {
    setShow(true);
    //   console.log(e);
  };
  const handleCLose = (e) => {
    setShow(false);
  };
  // console.log(isFocus);
  //   console.log(item);

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="label__search" htmlFor="search">
          {/* <i className="fas fa-search logo__search"></i> */}
          <input
            className="input__search"
            type="text"
            placeholder="Buscar"
            id="search"
            name="search"
            value={search}
            onFocus={handleFocus}
            ref={sear}
            onChange={handleInputChange}
          />
        </label>
      </form>
      {show ? (
        <div className="content__search">
          <button onClick={handleCLose}>X</button>
          {item.length !== 0 ? (
            item.map((el) => {
              return (
                <div className="card__search" key={el.uid}>
                  <Link to={`/search/${el.username}`}>
                  <img src={el.user_url} alt="avatar" />
                  <h2>{el.username}</h2>
                  </Link>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
