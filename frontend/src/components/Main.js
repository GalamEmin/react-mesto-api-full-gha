import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__image">
          <img
            src={currentUser.avatar}
            className="profile__avatar"
            alt="Аватар"
            name="avatar"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title" name="name">
            {currentUser.name}
          </h1>
          <button
            aria-label="Редактировать"
            className="profile__edit-button"
            type="button"
            onClick={props.onEditProfile}
          />
          <p className="profile__subtitle" name="about">
            {currentUser.about}
          </p>
        </div>
        <button
          aria-label="Добавить"
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        />
      </section>

      <section aria-label="Элементы" className="elements">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        }).reverse()}
      </section>
    </main>
  );
}
