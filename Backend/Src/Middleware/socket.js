let io; 
module.exports = {
    init: function(server) {
        io = require("socket.io")(server);
        return io;
    },
    getSocket: function() {
        if (!io) {
            throw new Error("no io")
        }
        return io;
    }
}