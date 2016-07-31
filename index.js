"use strict";

const Module = require('jsrml');
const app    = require('./app');
const io     = require('./lib/sockets')(app);

class Rainweb extends Module {
    constructor() {
        super("Rainweb", "A web server module");

        this.msgs = [];

        app.listen('8080');
        app.context.settings.botver = "0.6.0-alpha.1 (Mister Peace)";

        io.shoutout.on("last-20", (ctx, data) => {
            ctx.socket.emit("last-20", {msgs: this.msgs})
        });
    }

    shoutout(msg, args) {
        const shout = {
            from: msg.Name,
            msg:  args.join(' ')
        };

        this.msgs.push(shout);

        if (this.msgs.length > 20) {
            this.msgs.shift();
        }

        io.shoutout.broadcast('shout', shout);
    }
}

if (require.main === module) {
    const m = new Rainweb();

    m.addCommand('shout', {
        Help: "Shout at the skies",
        Fun: m.shoutout
    })

    m.register(process.argv);
}
