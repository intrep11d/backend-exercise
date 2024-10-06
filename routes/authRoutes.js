// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registrationSchema, loginSchema } = require('../validation/authValidation');
const validate = require('../middleware/validationMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, validate(registrationSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);


module.exports = router;