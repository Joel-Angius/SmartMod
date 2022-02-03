const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const config = require("../Settings/config.json");
const prefix = config.Prefix
const ms = require('ms')

module.exports = {
    name: 'unmute',
    description: 'unmute a user',
    async execute(message, args, discord, client) {


    // not for dms 
    if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")


    let guildname = message.guild.name
    const user = message.mentions.members.first();

// command variables 
var errormessage = new Discord.MessageEmbed()
.setColor('b15b5b')
.setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
.setDescription(`This user has been muted but I failed to dm them.`)
.setFooter("Smart Moderation")

var NoPerms = new Discord.MessageEmbed()
.setColor('b15b5b')
.setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
.setTitle("You cannot use this command!")
.setDescription("You aren\'t part of the Moderation team in this server!")
.setFooter("Smart Moderation")

var invalidlayout = new Discord.MessageEmbed()
.setColor('b15b5b')
.setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
.setTitle("Command : -unmute")
.setDescription("**Command Layout:** -unmute [User] \n **Example:** -unmute JoelHCraft#9541 \n **Cooldown:** Coming soon!")
.setFooter("Smart Moderation")

var antiunmuteauth = new Discord.MessageEmbed()
.setColor('b15b5b')
.setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
.setTitle("You cannot unmute yourself!")
.setDescription(`You cannot use the unmute command on yourself!`)
.setFooter("Smart Moderation")

var notmuted = new Discord.MessageEmbed()
.setColor('b15b5b')
.setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
.setTitle("This user is already muted!")
.setDescription(`I cannot unmute this user as they\'re not muted!`)
.setFooter("Smart Moderation")

var dmunmute = new Discord.MessageEmbed()
.setColor('b15b5b')
.setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
.setDescription(`You were unmuted in ${guildname}`)
.setFooter("Smart Moderation")

var nomuterolefound = new Discord.MessageEmbed()
.setColor('b15b5b')
.setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
.setTitle("No mute role!")
.setDescription(`I cannot unmute this user as I cannot find the Mute role! Please create a role called Muted`)
.setFooter("Smart Moderation")

var unmuted = new Discord.MessageEmbed()
.setColor('b15b5b')
.setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
.setTitle("User has been unmuted!")
.addFields({
name: `User Unmuted:`,
value: `${user}`,
inline: true
},
{
    name: 'Unmuted by:',
    value: `${message.author}`,
    inline: false
},
)
.setFooter("Smart Moderation")

// variables end 

if (!user) return message.channel.send(invalidlayout);
const mutedroleid = 'Muted';
const mutedrole = message.guild.roles.cache.find(role => role.name === "Muted");

if (!message.member.roles.cache.some(r => r.name === "Admin" || r.name === "Moderator" || r.name === "Trial Moderator")) return message.channel.send(NoPerms)
    const target = message.guild.members.cache.get(user.id);
    if(!target.roles.cache.has(mutedrole.id)) return message.channel.send(notmuted);
    if(user.id === message.author.id) return message.channel.send(antiunmuteauth);
    if(!mutedrole) return message.channel.send(nomuterolefound);


    target.roles.remove(mutedrole);
    

    user.send(dmunmute)
    .catch(err => message.channel.send(errormessage));


    message.channel.send(unmuted);


    }
}