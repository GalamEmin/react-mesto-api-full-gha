import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (props.isOpen) {
      setName("");
      setLink("");
    }
  }, [props.isOpen]);


  function handleNameChange(e) {
    setName(e.target.value);
  }

  function hendelLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="addPlace"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        required
        name="name"
        placeholder="Название"
        className="popup__input popup__input_card_name"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="url"
        required
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_card_link"
        value={link}
        onChange={hendelLinkChange}
      />
    </PopupWithForm>
  );
}
