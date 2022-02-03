const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')

const config = require("../Settings/config.json");

const SmartModColour = config.SmartModColours

module.exports = {
    name: 'ban',
    description: 'bans a user',
    async execute(client, message, args, discord) {

// not for dms 
if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")
//

        // prios 

        let guildname = message.guild.name
        const user = message.mentions.users.first();
        const reason = args.slice(1).join(" ");

//

        // command variables 
        var NoPerms = new Discord.MessageEmbed()
        .setColor(SmartModColour)
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
       .setTitle("You cannot use this command!")
        .setDescription("You aren\'t part of the Moderation team in this server!")
        .setFooter("Smart Moderation")

        var invalidlayout = new Discord.MessageEmbed()
        .setColor(SmartModColour)
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setTitle("Command : -ban")
         .setDescription("**Command Layout:** -ban [User] [Reason] \n **Example:** -ban JoelHCraft#9541 you silly boy! \n **Cooldown:** Coming soon!")
         .setFooter("Smart Moderation")

         var mainban = new Discord.MessageEmbed()
         .setColor(SmartModColour)
         .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
         .setTitle("User has been banned!")
         .setDescription(`${user} has been banned!`)
         .addFields({
             name: 'User banned:',
             value: `${user}`
         },
         {
             name: "Banned by:",
             value: `<@${message.author.id}>`
         },
         {
             name: "Reason:",
             value: `${reason != "" ? reason : "No reason was given"}`
         })
         .setFooter("Smart Moderation")

         var antibanauth = new Discord.MessageEmbed()
         .setColor(SmartModColour)
         .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
         .setTitle("You cannot ban yourself!")
         .setDescription(`You cannot use the ban command on yourself!`)
         .setFooter("Smart Moderation")

         var antimod = new Discord.MessageEmbed()
         .setColor(SmartModColour)
         .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
         .setTitle("You cannot ban Moderators!")
         .setDescription(`I cannot ban people in the moderation team!`)
         .setFooter("Smart Moderation")

         var highmember = new Discord.MessageEmbed()
         .setColor(SmartModColour)
         .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
         .setTitle("I cannot ban this member!")
         .setDescription(`I cannot ban this member!`)
         .setFooter("Smart Moderation")
         //

         if(!message.member.roles.cache.some(r => r.name === "Admin")) return message.channel.send(NoPerms)

         if (!user) return message.channel.send(invalidlayout);
         if(user.id === message.author.id) return message.channel.send(antibanauth);

         // anti mod removal 

       

         const target = message.guild.members.cache.get(user.id);
         const mods = message.guild.roles.cache.find(r => r.name === "Admin" || r.name === "Moderator");

         if (target.roles.cache.has(mods.id)) return message.channel.send(antimod);



         message.guild.members.cache.get(user.id).ban({reason: reason});

         message.channel.send(mainban);
    }
}