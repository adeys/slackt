const db = require('../lib/database');
const formatter = require('../helpers/formatter');

class RoomController {
    constructor() {
        this.list = this.list.bind(this);
    }

    list(req, res) {
        let rooms = db.getCollection('rooms').where(room => {
            return room.members.findIndex(member => member.id === req.user.id) !== -1;
        });

        let chatsCollection = db.getCollection('chats');
        res.json(rooms.map(room => {
            let tmp = room.members.find(user => user.id === req.user.id);

            return formatter.formatRoom(room, {
                lastReadMessage: tmp.lastReadMessage,
                unreadMessages: chatsCollection.findOne({roomId: room._id}).messages.length - tmp.lastReadMessage});
        }));
    }
}

module.exports = RoomController;