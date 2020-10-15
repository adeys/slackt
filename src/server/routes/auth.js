const { Router } = require('express');
const AuthController = require('../controllers/auth-controller');

const router = Router();

// Register auth routes
let authController = new AuthController();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;