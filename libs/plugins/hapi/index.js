'use strict';

const Hapi = require('hapi');
// const Sqlite3 = require('sqlite3');

// const DB_FILE = __dirname + './oss.sqlite';

exports.register = function(server, options, next){


	// const db = new Sqlite3.Database(DB_FILE);

	// server.bind({ db: db });

	server.register([
            require('inert')
        ], (err) => {

        if (err) {
            return next(err);
        }

        // server.route(require('./routes/routes'));

        next();
    });
}

exports.register.attributes = {
	pkg: require('./package.json')
}