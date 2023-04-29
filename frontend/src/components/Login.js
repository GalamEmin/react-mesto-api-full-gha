import { useState } from "react";

export default function Login({ handleLogin }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!userData.email || !userData.password) {
      return;
    }
    handleLogin(userData)
      .then(() => {
        setUserData({ email: "", password: "" });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          className="login__input login__input_form_login_email"
          type="email"
          name="email"
          required
          placeholder="Email"
          value={userData.email || ""}
          onChange={handleChange}
        />
        <input
          className="login__input login__input_form_login_password"
          type="password"
          name="password"
          required
          placeholder="Пароль"
          value={userData.password || ""}
          onChange={handleChange}
        />
        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
    </div>
  );
}
