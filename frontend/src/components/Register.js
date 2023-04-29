import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ handleRegister }) {
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

    if (userData.password) {
      handleRegister(userData)
      .catch((err) => console.log(err))
  }
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          className="register__input register__input_form_register_email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          name="email"
          value={userData.email || ""}
        />
        <input
          className="register__input register__input_form_register_password"
          type="password"
          placeholder="Пароль"
          onChange={handleChange}
          name="password"
          value={userData.password || ""}
        />
        <button type="submit" className="register__button">Зарегистрироваться</button>
      </form>
      <Link to="/signin" className="register__question">Уже зарегистрированы? Войти</Link>
    </div>
  );
}
