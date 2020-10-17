const Validator = require('validatorjs');
const nanoId = require('nanoid');
const db = require('../lib/database');
const statusCodes = require('../helpers/http-statuses');
const formatter = require('../helpers/formatter');
const validatorHelper = require('../helpers/validator');

class ChannelController {
    constructor() {
        this.list = this.list.bind(this);
        this.create = this.create.bind(this);
        this.chatCollection = null;
    }

    /**
     * @param req
     * @param res
     */
    list(req, res) {
        let rooms = db.getCollection('rooms')
            .find({scope: 'public'});

        this.chatCollection = db.getCollection('chats');
        res.json(rooms.map(this._formatChannelData));
    }

    /**
     * @param req
     * @param res
     * @returns {void}
     */
    create(req, res) {
        let validator = new Validator(req.body, {name: 'required|max:136', about: 'string'});

        if (validator.fails()) {
            let code = statusCodes.HTTP_NOT_ACCEPTABLE;
            let errors = validatorHelper.errors.firstOfAll(validator.errors.all());
            res.status(code).json({status: code, error: {code, message: 'Not Acceptable', data: errors}});
            return;
        }

        let doc = {
            _id: nanoId.nanoid(),
            name: req.body.name,
            scope: 'public',
            summary: req.body.about || null,
            author: req.user,
            members: [{...req.user, lastReadMessage: 0}],
            createdAt: new Date()
        };

        db.getCollection('rooms')
            .insertOne(doc);

        db.getCollection('chats')
            .insertOne({_id: nanoId.nanoid(), roomId: doc._id, messages: []});

        let code = statusCodes.HTTP_CREATED;
        res.status(code);
        res.json({status: code, data: formatter.formatRoom(doc, {lastReadMessage: 0, unreadMessages: 0})});
    }

    addUser(req, res, next) {
        let rooms = db.getCollection('rooms');
        let count = rooms.count({_id: req.params.id, scope: 'public'});
        if (count === 0) {
            return next();
        }

        let channel = {};
        let messageCount = db.getCollection('chats')
            .findOne({roomId: req.params.id}).messages.length;

        rooms.updateWhere(
            room => room._id === req.params.id,
            room => {
                if (room.members.findIndex((member) => member.id === req.user.id) === -1) {
                    room.members.push({...req.user, lastReadMessage: messageCount});
                }

                channel = room;
                return room;
            }
        );

        res.json({
            status: statusCodes.HTTP_OK,
            data: formatter.formatRoom(channel, {
                lastReadMessage: messageCount,
                unreadMessages: 0
            })
        });
    }

    removeUser(req, res, next) {
        let rooms = db.getCollection('rooms');
        let count = rooms.count({_id: req.params.id, scope: 'public'});
        if (count === 0) {
            return next();
        }

        rooms.updateWhere(
            room => room._id === req.params.id,
            room => {
                room.members = room.members.filter((member) => member.id !== req.user.id);

                return room;
            }
        );

        res.json({status: statusCodes.HTTP_NO_CONTENT, data: {}});
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
            scope: 'public',
            summary: channel.summary,
            created_by: channel.author,
            date_created: channel.createdAt,
            members_count: channel.members.length,
            // messages_count: this.chatCollection.count({roomId: channel._id})
        }
    }
}

module.exports = ChannelController;