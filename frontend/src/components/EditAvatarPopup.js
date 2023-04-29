import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function EditAvatarPopup(props) {
  const avatar = useRef();

  useEffect(() => {
    avatar.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        required
        name="avatar"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_card_avatar"
        ref={avatar}
      />
    </PopupWithForm>
  );
}
