import LoginFormPage from "./LoginFormPage";
import style from "./LoginPage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  return (
    <>
      <div className={style.img_Add}></div>
      <LoginFormPage />
    </>
  );
};
export default LoginPage;
