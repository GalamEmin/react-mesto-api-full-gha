export default function InfoTooltip(props) {
  return (
    <section
      className={`${
        props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup`
      }`}
    >
      <div className="popup__overlay"></div>
      <div className="popup__container">
        <div className="popup__content">
          <div
            className={`popup__confirmation ${
              props.isConfirmation
                ? "popup__confirmation_type_successfully"
                : "popup__confirmation_type_fail"
            }`}
          ></div>
          <h2 className="popup__title_type_confirmation">
            {props.isConfirmation
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте еще раз"}
          </h2>
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
