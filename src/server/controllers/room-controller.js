const db = require('../lib/database');

class RoomController {
    constructor() {
        this.list = this.list.bind(this);
    }

    list(req, res) {
        let user = db.getCollection('users').findOne({_id: req.user.id});
        let rooms = db.getCollection('rooms').find({_id: {$in: user.rooms.map(room => room.id)}});

        res.json(rooms.map(room => this._formatData(room, rooms.find(item => item.id === room._id))));
    }

    _formatData(room, userRoom) {
        let data = {
            id: room._id,
            scope: room.scope,
            name: room.name,
            attributes: {},
            last_read_message: 0,
            unread_messages: 0,
            date_created: room.createdAt
        };

        if (room.scope === 'public') {
            data.attributes = {
                summary: room.summary,
                created_by: room.author,
                members_count: room.members.length
            };
        }

        return data;
    }
}

module.exports = RoomController;