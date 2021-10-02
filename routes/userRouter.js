const express = require('express');
const authControllers = require('../controllers/authController');
const router = express.Router();
router.post('/signup', authControllers.signUp);
router.post('/login', authControllers.login);
router.delete('/logout', authControllers.protect, authControllers.logOut);
router.post('/getAccessToken', authControllers.getNewAccessToken);
router.post('/fetchUser', authControllers.protect, authControllers.fetchUser);

module.exports = router;
