const { Router } = require('express');
const authController = require('../controllers/auth-controller');

const router = Router();

// Register auth routes
router.post('/auth/register', authController.registerUser);
router.post('/auth/login', authController.loginUser);

module.exports = router;