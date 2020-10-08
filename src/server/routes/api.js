const { Router } = require('express');

const router = Router();

router.get('/index', ((req, res) => {
    res.json({message: 'Welcome to Slackt', code: 200});
}));

module.exports = router;