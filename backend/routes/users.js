const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { URL_CHECK } = require('../utils/constants');

const {
  getUsers,
  getUser,
  setUserInfo,
  setUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), setUserInfo);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .required()
      .pattern(URL_CHECK),
  }),
}), setUserAvatar);

module.exports = router;
