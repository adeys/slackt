const Validator = require('validatorjs');

const validationHelper = require('../helpers/validator');
const status = require('../helpers/http-statuses');

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
            res.status(status.HTTP_NOT_ACCEPTABLE).json({status: status.HTTP_NOT_ACCEPTABLE, errors});
            return;
        }

        let {username, email, password} = req.body;

        try {
            db.getCollection('users')
                .insertOne({username, email, password, joinedAt: new Date()});
        } catch (e) {
            // Unique constraint fails
            res.json({status: status.HTTP_NOT_ACCEPTABLE, errors: {username: 'This username is not available.'}});
            return;
        }

        res.json({status: status.HTTP_CREATED, message: 'User successfully registered'});
    }

    loginUser(req, res) {

    }
}

module.exports = new AuthController();