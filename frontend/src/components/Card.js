import { useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const { card } = props;
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(_id => card.owner._id ? currentUser._id : "");
  const cardLike = `element__like ${isLiked && "element__like_active"}`;

  return (
    <div className="element">
      {isOwn && (
        <button
          aria-label="Удалить"
          onClick={handleDeleteClick}
          className="element__trash"
          type="button"
        />
      )}
      <img
        className="element__image"
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
      />
      <div className="element__text">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__likes">
          <button
            className={cardLike}
            type="submit"
            onClick={handleLikeClick}
          />
          <span className="element__numbers">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}
