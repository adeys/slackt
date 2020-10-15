const db = require('../lib/database');

class ChannelController {
    constructor() {

    }

    list(req, res) {
        let rooms = db.getCollection('rooms')
            .find({type: 'channel'});

        res.json(rooms.map(this._formatChannelData));
    }

    /**
     * @param channel
     * @returns {
     * {summary: string, date_created: string, name: string, members_count: number,
     *  id: string, type: string, created_by: {id: string, username: string}, message_count: number
     * }}
     * @private
     */
    _formatChannelData(channel) {
        return {
            id: channel._id,
            name: channel.name,
            type: 'channel',
            summary: channel.summary,
            created_by: {id: channel.author.id, username: channel.author.username},
            date_created: channel.createdAt,
            members_count: channel.members.length,
            messages_count: channel.messageCount
        }
    }
}

module.exports = ChannelController;