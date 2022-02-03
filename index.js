const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const ms = require('ms')
require('discord-buttons')(client)




// mongo db stuff 
const mongoose = require('mongoose')
const { mongooseConnectionString } = require('./Settings/config.json')
if (!mongooseConnectionString) return;

mongoose
    .connect(mongooseConnectionString, {
        useFindAndModify: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => console.log('Connected to mongodb'))

//





// settings 
const config = require("./Settings/config.json");
const { premium } = require('./Commands/help');
const prefix = config.Prefix
//

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

// const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
// for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);

//     client.commands.set(command.name, command);
// }




 client.on('ready', () => {

     console.log(`${client.user.tag} status has been set`)
     client.user.setActivity('Smart Moderation BETA', ({ type: "COMPETING" }))
 })






client.login(config.Token)