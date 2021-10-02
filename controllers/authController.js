const User = require('../models/UserModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const signAccessToken = (uId, email) => {
  return jwt.sign({ id: uId, email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '6h',
  });
};
const signRefreshToken = (uId) => {
  return jwt.sign({ userID: uId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  });
};
const createCookies = (uId, email, req, res) => {
  const accessToken = signAccessToken(uId, email);
  const refreshToken = signRefreshToken(uId);
  console.log('setting');
  res.cookie('AccessToken', accessToken, {
    expires: new Date(Date.now() + 6 * 60 * 60 * 1000),
    // httpOnly: true,

    secure: true,
  });

  res.cookie('RefreshToken', refreshToken, {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_REFRESH_EXPIRY) * 24 * 60 * 60 * 1000
    ),
    // httpOnly: true,
    secure: true,
  });
  return { accessToken, refreshToken };
};
exports.signUp = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    photo: req.body.photo,
    userName: req.body.userName,
    accessToken: '',
  });

  const tokens = createCookies(
    user._id,
    user.email,

    req,
    res
  );

  const encAccessToken = await user.cryptoEncrypt(tokens.accessToken);

  const update = await User.findOneAndUpdate(
    { email: req.body.email },
    {
      accessToken: encAccessToken,
    }
  );

  res.status(201).json({
    status: 'success',
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    id: user._id,
    name: user.name,
    photo: user.photo,
    userName: user.userName,
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Email or password not entered'));
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 400));
  }
  const tokens = createCookies(user._id, user.email, res, res);

  res.status(200).json({
    status: 'success',
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    id: user._id,
    name: user.name,
    photo: user.photo,
    userName: user.userName,
  });
});
exports.logOut = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, { accessToken: '' });
  console.log('clearing and sending response');
  res.clearCookie('AccessToken');
  res.json({ status: 'success' });
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }
  if (!token) {
    return next(new AppError('Sign in to continue', 403));
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_ACCESS_SECRET
  );

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    next(
      new AppError(
        'The account belonging to this user does no longer exist',
        401
      )
    );
  }
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  req.user = currentUser;
  next();
});
exports.getNewAccessToken = (req, res) => {
  res.json({
    accessToken: signAccessToken(req.user._id, req.user.email),
  });
};

exports.fetchUser = async (req, res) => {
  res.status(200).json({
    status: true,
    userData: req.user,
  });
};
