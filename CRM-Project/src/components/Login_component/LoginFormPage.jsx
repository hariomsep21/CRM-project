import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./LoginFormPage.module.css";

const LoginFormPage = () => {
  return (
    <div className={style.text_add}>
      <div className={style.form_container}>
        <img src="/img/logo.png" alt="logo img" />
        <h5>Login to your account.</h5>
        <form>
          <div className={` form-group ${style.input_container}`}>
            <FontAwesomeIcon icon={faUser} className={style.icon} />
            <input
              type="text"
              className={`form-control ${style.input_property}`}
              id="username"
              placeholder="Username"
            />
          </div>
          <div className={`form-group ${style.input_container}`}>
            <FontAwesomeIcon icon={faLock} className={style.icon} />
            <input
              type="password"
              className={`form-control ${style.input_property}`}
              id="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className={style.btn}>
            Login
          </button>
        </form>
        <a href="#" className={style.forgot_password}>
          Forgot password?
        </a>
        <div className={style.signup}>
          <p>Don't have an account?</p>
          <button type="submit" className={`btn btn-primary ${style.btn}`}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
export default LoginFormPage;
