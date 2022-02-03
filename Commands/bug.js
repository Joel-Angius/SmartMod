const blacklist = require('../SmartModData/blacklist')
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const config = require("../Settings/config.json");

const SmartModColour = config.SmartModColours
const prefix = config.Prefix
const ms = require('ms')


module.exports = {
    name: 'bug',
    description: 'blacklists a user',
    async execute(client, message, args, discord) {
        // not for dms 
        if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")
        //   


        args = args.join(" ");

        var noargs = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("No reason provided!")
            .setDescription(`Please provide a reason for the bug report!`)
            .setFooter("Smart Moderation")

        if(!args) return message.channel.send(noargs)
    const channels = message.channel;
    let check;
    if (args[0] === "temp") {
      check = "true";
    } else if (args[1] === "temp") {
      check = "true";
    } else {
      check = "false";
    }
    let check2;
    if (args[0] === "temp") {
      check2 = "86400";
    } else if (args[1] === "temp") {
      check2 = "86400";
    } else {
      check2 = "0";
    }
    var thanksyoumessge = new Discord.MessageEmbed()
    .setColor(SmartModColour)
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setTitle("Thank you! Your report has been submitted!")
        .setDescription(`Thank you for reporting a bug! A member of the Development Team will look into this within 48 Hours.`)
        .setFooter("Smart Moderation")

    message.reply(
     thanksyoumessge
    );
    channels
      .createInvite({
        temporary: `${check}`,
        maxAge: `${check2}`,
        maxUses: 0,
        reason: `Requested By : ${message.author.username}`
      })
      .then(InviteCode =>
        client.channels.cache.get("889984290803298405").send(
            new Discord.MessageEmbed()
            .setTitle("Smart Moderation Bug Report")
            .addField(
              "Reported by :",
              `**${message.author.username}#${message.author.discriminator}**`
            )
            .addField("Report UserID :", message.author.id)
            .addField("Bug Report :", args)
            .addField("Server with bug name :", `**${message.guild.name}**`)
            .addField(`Server link with bug :`, `https://discord.gg/${InviteCode.code}`)
            .setColor(SmartModColour)
        )
    



      );
        


    }
}