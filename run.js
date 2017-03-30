console.log("Starting RSC.js...");

var config = require('./config.json'),
    Server = require('./server'),

    server = new Server(config.port, config.host);


server.start(function (err) {
    if (err) {
        console.log("Starting RSC.js failed! Error object follows.");
        console.error(err);
        process.exit(1);
    }
    console.log("RSC.js successfully started!");
});
