const express = require('express');
const userRouter = require('./routes/userRouter');
const cookieParser = require('cookie-parser');
const errorController = require('./controllers/errorController');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const cookiesMiddleware = require('universal-cookie-express');
const AppError = require('./utils/AppError');
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.options('*', cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// app.use(cookiesMiddleware());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());
app.use('/api/v1/users', userRouter);
app.use(errorController);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
