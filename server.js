var events = require('events'),
    net = require('net'),
    util = require('util'),

    World = require('./model/world'),
    Session = require('./session');


function Server(port, host) {
    console.log("Instantiating Server object...");

    this.options = {
        "port": port || 43594,
        "host": host || "localhost"
    }

    // The world where all of the entities are held.
    this.world = new World();

    // A map to hold all of the connection sessions in. It uses the format
    // ` { identifier: session } `
    this.sessions = {};
}

util.inherits(Server, events.EventEmitter);


// Remove a session from the map.
Server.prototype.removeSession = function (identifier) {
    console.log("Removing session with ID '%s'", identifier);
    this.world.removePlayer(this.sessions[identifier].player)
    delete this.sessions[identifier];
};

// Start accepting requests on the specified port and create new session
// objects associated with connection sockets.
Server.prototype.listen = function (done) {
    console.log("Attempting to open socket...");
    var that = this;

    this.server = net.createServer(function (socket) {
        var session = new Session(that, socket);

        that.sessions[session.identifier] = session;
    }).on('error', (e) => {
           console.log('error here');
           done(e);
    });

    console.log("Attempting to listen on socket...");

   this.server.listen(this.options, done);

};

Server.prototype.start = function (done) {
    var that = this;

    this.listen(function (err) {
        if (err) {
            return done(err);
        }

        var fmt = net.isIPv6(that.options.host) ? "[%s]" : "%s";
        console.log('Server listening on ' + fmt + ':%d.', 
          that.options.host, that.options.port);

        done();
    });
};

module.exports = Server;
