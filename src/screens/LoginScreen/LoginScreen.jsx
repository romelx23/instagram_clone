import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { authLogin, googleSignIn } from "../../helpers/useAuth";
import { useForm } from "../../hooks/useForm";
import "./LoginScreen.scss";

export const LoginScreen = () => {
  const navigate=useNavigate()
  const {user} = useContext(AuthContext);
  const [formValues, handleInputChange, reset] = useForm({
    email: "", //romx23@gmail.com
    password: "", //123456
  });
  const { email, password } = formValues;
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email);
    // dispatch(startLoginEmailPassword(email,password))
    authLogin(email, password)
  };
  const handleGoogleLogin = () => {
    // dispatch(StartGooogleLogin());
    googleSignIn()
  };
  useEffect(() => {
    if(user.displayName){
      navigate('/')
    }
  }, [navigate, user]);
  
  return (
    <div className="auth__main">
      <div className="auth__content">
        <h3 className="auth__title">Login</h3>
        <form
          onSubmit={handleLogin}
          className="animate__animated animate__fadeIn animate__faster"
        >
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="auth__input"
            value={email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Pasword..."
            name="password"
            className="auth__input"
            autoComplete="on"
            value={password}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="btn__login"
            // disabled={loading}
          >
            Login
          </button>

          <div className="auth__social-network">
            <p>Login with social network</p>
            <div className="google-btn" onClick={handleGoogleLogin}>
              <div className="google-icon-wrapper">
                <img
                  className="google-icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="google button"
                />
              </div>
              <p className="btn-text">
                <b>Sign in with google</b>
              </p>
            </div>
          </div>
          <Link to={"/auth/register"} className="link">
            Create new
          </Link>
        </form>
      </div>
    </div>
  );
};
