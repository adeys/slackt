const Loki = require('lokijs');
const FSAdapter = require('lokijs/src/loki-fs-structured-adapter');

const adapter = new FSAdapter();
const db = new Loki(__dirname + '/../data/database.db', {
    adapter: adapter,
    autoload: true,
    autoloadCallback: initializeDatabase,
    autosave: true,
    autosaveInterval: 4000
});

function initializeDatabase() {
    const indices = {users: ['_id', 'username',/*, 'email'*/], chats: ['_id', 'roomId']};
    ['users', 'rooms', 'chats'].forEach(coll => {
        if (db.getCollection(coll) === null) {
            db.addCollection(
                coll,
                indices[coll]
                    ? {indices: indices[coll], unique: indices[coll]}
                    : {}
            );
        }
    })
}

module.exports = db;