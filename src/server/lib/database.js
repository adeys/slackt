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
    const indices = {users: ['username', 'email'], chats: ['name']};
    ['users', 'channels', 'chats'].forEach(coll => {
        if (db.getCollection(coll) === null) {
            db.addCollection(
                coll,
                indices[coll]
                    ? {indices: [indices[coll][0]], unique: indices[coll]}
                    : {}
            );
        }
    })
}

module.exports = db;