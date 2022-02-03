const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const config = require("../Settings/config.json");
const prefix = config.Prefix
const ms = require('ms')

module.exports = {
    name: 'warn',
    description: 'warns a user',
    async execute(client, message, args, discord) {

// not for dms 
if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")
    // logs 
    const warns = require("../Systemlogs/warns.json");
    const memberuserlogs = message.mentions.members.first()

    if (!warns[memberuserlogs]) {
        warns[memberuserlogs] = {
            warnCount: 1
        }
    } else {
        warns[memberuserlogs].warnCount += 1;
    }

    //
    let guildname = message.guild.name
    const user = message.mentions.members.first();
    const reason = args.slice(1).join(" ")
    // command variables 
    var errormessage = new Discord.MessageEmbed()
        .setColor('b15b5b')
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setDescription(`This user has been warned but I failed to dm them.`)
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
        .setTitle("Command : -warn")
        .setDescription("**Command Layout:** -warn [User] [Reason] \n **Example:** -warn JoelHCraft#9541 Stop coding! \n **Cooldown:** Coming soon!")
        .setFooter("Smart Moderation")

    var antiwarnauth = new Discord.MessageEmbed()
        .setColor('b15b5b')
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setTitle("You cannot warn yourself!")
        .setDescription(`You cannot use the warn command on yourself!`)
        .setFooter("Smart Moderation")

    var dmwarn = new Discord.MessageEmbed()
        .setColor('b15b5b')
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setDescription(`You were warned in ${guildname} for : ${reason != "" ? reason : "No reason was given"}`)
        .setFooter("Smart Moderation")

    var nowwarned = new Discord.MessageEmbed()
        .setColor('b15b5b')
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setTitle("User has been warned!")
        .addFields({
            name: `User Warned:`,
            value: `${user}`,
            inline: true
        },
            {
                name: 'Moderated by:',
                value: `${message.author}`,
                inline: false
            },
            {
                name: `Warned for:`,
                value: `${reason != "" ? reason : "No reason was provided"}`,
                inline: false
            }
        )
        .setFooter('Smart Moderation')




        if (!message.member.roles.cache.some(r => r.name === "Admin" || r.name === "Moderator" || r.name === "Trial Moderator")) return message.channel.send(NoPerms)
        if (!user) return message.channel.send(invalidlayout);
        const target = message.guild.members.cache.get(user.id);
        if (user.id === message.author.id) return message.channel.send(antiwarnauth);


        user.send(dmwarn)
        .catch(err => message.channel.send(errormessage));

    message.channel.send(nowwarned);

    fs.writeFile("./Systemlogs/warns.json", JSON.stringify(warns), err => {
        if (err) console.log(err);
    });


    }
}