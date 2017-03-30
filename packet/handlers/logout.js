// This packet is sent whenever a player clicks the logout button on the options
// menu.

module.exports.name = 'logout';

module.exports.handle = function (session, payload, done) {
    var player = session.player;

    // TODO check if they're busy or in combat etc.

    console.log("Logging out player session with ID '%s'", session.identifier);

    player.logout();
    done(null);
};
