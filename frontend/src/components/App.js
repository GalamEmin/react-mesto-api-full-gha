import Header from "./Header.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import Footer from "./Footer.js";
import { useState, useEffect } from "react";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { ArrayCardsContext } from "../contexts/ArrayCardsContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/auth";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link;
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const [headerEmail, setHeaderEmail] = useState("");
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isInfoTolltip, setIsInfoTolltip] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken(token).then((data) => {
          setLoggedIn(true);
          setHeaderEmail(data.email);
          navigate("/");
      });
    }
    // eslint-disable-next-line
  }, []);

  function handleLogin({ email, password }) {
    return auth
      .authorize(email, password)
      .then((data) => {
          localStorage.setItem("jwt", data.jwt);
          setLoggedIn(true);
          setHeaderEmail(email);
          setUserData({
            email: email,
          });
          navigate("/");
      })
      .catch((err) => {
        setIsInfoTolltip(false);
        setIsConfirmationPopupOpen(true);
        console.log(err);
      });
  }

  function handleRegister({ email, password }) {
    return auth
      .register(email, password)
      .then(() => {
        navigate("/signin");
        setIsInfoTolltip(true);
      })
      .catch((err) => {
        setIsInfoTolltip(false);
        console.log(err);
      })
      .finally(() => setIsConfirmationPopupOpen(true));
  }


  useEffect(() => {
    if (loggedIn) {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });}
  }, [setCurrentUser, setCards, loggedIn]);


  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleChangeAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(props) {
    setIsImagePopupOpen(true);
    setSelectedCard(props);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(_id => card.owner._id ? currentUser._id : "");

    if (!isLiked) {
      api
        .putLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsConfirmationPopupOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    api
      .updateUserInfo({ name, about })
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .editAvatar({ avatar })
      .then((newUserAvatar) => {
        setCurrentUser(newUserAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleSingOut() {
    localStorage.removeItem("jwt");
    setHeaderEmail("");
    setLoggedIn(false);
    navigate("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <ArrayCardsContext.Provider value={cards}>
        <Header onSignOut={handleSingOut} headerEmail={headerEmail} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Main}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleChangeAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                userData={userData}
              />
            }
          />
          <Route
            path="/signup"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="*"
            element={loggedIn ? <Navigate to="/" /> : <Navigate to="/signup" />}
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          name={currentUser.name}
          description={currentUser.about}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={isImagePopupOpen}
          linkCard={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          name={"confirmation"}
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          isConfirmation={isInfoTolltip}
        />
      </ArrayCardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
