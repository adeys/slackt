const { Router } = require('express');
const ChannelController = require('../controllers/channel-controller');
const RoomController = require('../controllers/room-controller');

const router = Router();

// Channels related routes
let channelController = new ChannelController();
router.route('/channels')
    .get(channelController.list);

// Rooms related routes
let roomController = new RoomController();
router.get('/rooms', roomController.list);

module.exports = router;