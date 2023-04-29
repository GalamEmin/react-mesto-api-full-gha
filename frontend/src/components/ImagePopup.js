export default function ImagePopup({card, linkCard, onClose}) {
  return (
    <section className={`${card ? `popup popup_opened` : `popup`}`}>
      <div className="popup__container popup__container_zoom">
      <button
          className="popup__close popup__close_zoom"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__zoom-image"
          src={`${linkCard.link}`}
          alt={linkCard.name}
        />
        <h2 className="popup__name-zoom">{linkCard.name}</h2>
      </div>
    </section>
  );
}