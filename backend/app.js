require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { URL_CHECK } = require('./utils/constants');

const { login, createUser } = require('./controllers/users');

const corsErr = require('./middlewares/cors');

const allowedCors = {
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'https://mesto.galam.nomoredomains.monster',
    'http://mesto.galam.nomoredomains.monster',
  ],
  methods: ['GET', 'POST', 'PUT', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'authorization'],
  credentials: true,
};

const app = express();
app.use(cors(allowedCors));
app.use(helmet());
app.use(express.json());

const auth = require('./middlewares/auth');
const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');
const NotFoundErr = require('./errors/NotFoundErr');

app.use(corsErr);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const { PORT = 3000 } = process.env;

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_CHECK),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use(routeUsers);
app.use(routeCards);

app.use((req, res, next) => {
  next(new NotFoundErr('Такой страницы не существует'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT);
