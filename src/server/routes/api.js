const { Router } = require('express');
const ChannelController = require('../controllers/channel-controller');
const RoomController = require('../controllers/room-controller');
const statusCodes = require('../helpers/http-statuses');

const router = Router();

// Channels related routes
let channelController = new ChannelController();
router.route('/channels')
    .get(channelController.list)
    .post(channelController.create);

router.get('/channels/:id/join', channelController.addUser);
router.get('/channels/:id/leave', channelController.removeUser);

// Rooms related routes
let roomController = new RoomController();
router.get('/rooms', roomController.list);

// Final handler
router.use((req, res) => {
    let status = statusCodes.HTTP_NOT_FOUND;
    res.status(status);
    res.json({status, error: {code: status, message: 'Not Found'}})
});

module.exports = router;