module.exports = {
    formatRoom(room, extra) {
        let data = {
            id: room._id,
            scope: room.scope,
            name: room.name,
            attributes: {},
            last_read_message: extra.lastReadMessage,
            unread_messages: extra.unreadMessages,
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
    },
};