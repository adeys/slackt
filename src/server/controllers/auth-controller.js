const path = require('path');
const fs = require('fs');
const Validator = require('validatorjs');
const {nanoid} = require('nanoid');
const jwt = require('jsonwebtoken');
const jdenticon = require('jdenticon');

const validationHelper = require('../helpers/validator');
const status = require('../helpers/http-statuses');
const security = require('../lib/security');
const jwtConfig = require('../settings').jwt;

const db = require('../lib/database');

class AuthController {
    constructor() {
        this.rules = {
            username: 'required|alpha_dash',
            password: 'required|min:8'
        };

        this.registerUser = this.registerUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    registerUser(req, res) {
        let rules = {...this.rules, email: 'required|email'};
        let validation = new Validator(req.body, rules, {
            required: 'The :attribute field cannot be empty'
        });

        if (validation.fails()) {
            let errors = validationHelper.errors.firstOfAll(validation.errors.all());
            res.status(status.HTTP_NOT_ACCEPTABLE)
                .json({status: status.HTTP_NOT_ACCEPTABLE, errors});
            return;
        }

        let {username, email, password} = req.body;

        let row;
        try {
            row = db.getCollection('users')
                .insertOne({
                    _id: nanoid(),
                    username,
                    email,
                    password: security.hashPassword(password),
                    rooms: [],
                    joinedAt: new Date()
                });
        } catch (e) {
            // Unique constraint fails
            res.status(status.HTTP_NOT_ACCEPTABLE)
                .json({
                    status: status.HTTP_NOT_ACCEPTABLE,
                    errors: {username: 'This username is not available.'}
                });
            return;
        }

        res.json({status: status.HTTP_CREATED, message: 'User successfully registered'});
        this.generateAvatar(row);
    }

    loginUser(req, res) {
        let {username, password} = req.body;

        let record = db.getCollection('users')
            .findOne({username});

        if (record === null || !security.verifyHash(record.password, password)) {
            return this.sendForbiddenResponse(res);
        }

        let token = jwt.sign({jti: record._id, username}, jwtConfig.secret, jwtConfig.options);

        res.json({
            status: status.HTTP_OK,
            user: {
                username,
                token,
                avatar: `${req.protocol}://${req.get('Host')}/assets/avatar/${record._id}.png`
            }
        });
    }

    sendForbiddenResponse(res) {
        let code = status.HTTP_FORBIDDEN;
        res.status(code).json({
            status: code,
            error: {
                code,
                message: 'Invalid credentials'
            }
        });
    }

    generateAvatar(data) {
        let dir = path.resolve(__dirname, `../../../public/build/avatar`);

        if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
            fs.mkdirSync(dir);
        }

        fs.writeFileSync(
            `${dir}/${data._id}.png`,
            jdenticon.toPng(
                security.hashPassword(data.username  + '-' + data._id).hash,
                100
            ),
        );
    }
}

module.exports = AuthController;