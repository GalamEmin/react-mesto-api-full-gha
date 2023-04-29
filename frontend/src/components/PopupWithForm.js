export default function PopupWithForm(props) {
  return (
    <section
      className={`${
        props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup`
      }`}
    >
      <div className="popup__overlay"></div>
      <div className="popup__container">
        <div className="popup__content">
          <h2 className="popup__title">{props.title}</h2>
          <form className="popup__form" onSubmit={props.onSubmit}>
            {props.children}
            <button
              aria-label="Сохранить"
              className="popup__button"
              type="submit"
            >
              Сохранить
            </button>
          </form>
        </div>
        <button
          aria-label="Закрыть"
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}
