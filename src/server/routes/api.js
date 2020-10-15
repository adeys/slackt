const { Router } = require('express');
const ChannelController = require('../controllers/channel-controller');

const router = Router();

// Rooms related routes
let roomController = new ChannelController();
router.route('/channels')
    .get(roomController.list);

module.exports = router;