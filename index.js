const amsconsole = require("./src/core/DiscordConsole") //connect to discord console
const savebooting = require("./save-booting.js")
//const server = require("./src/extended/HostServer") //connect to web server

if (savebooting) {
    console.log(` Status: AMS System Started`)
} else {
    console.log(`Status: Erorr ${err}`)
}
