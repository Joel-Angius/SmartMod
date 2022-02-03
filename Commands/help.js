const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const { MessageMenu, MessageMenuOption, MessageActionRow, ButtonCollector, MessageSelectRow, MessageButton } = require('discord-buttons')
const ButtonPages = require('discord-button-pages')

const config = require("../Settings/config.json");

const SmartModColour = config.SmartModColours


module.exports = {
    name: 'help',
    description: 'sends help embed',
    async execute(client, message, args, discord) {


        // not for dms 
        if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")
        //


        const embed = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setDescription("Smart Moderation | Moderation made simple! Here is a list of all available commands use the interaction system to see more commands!");


        const embed1 = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setTitle('Moderation')
            .addFields(
                {
                    name: `-warn`,
                    value: "Warns the user that you mention",
                },
                {
                    name: "-kick",
                    value: "Kicks a user from the Discord server",
                },
                {
                    name: "-ban",
                    value: "Bans a user from the Discord server",
                },
                {
                    name: "-mute",
                    value: "Mutes a user in the Discord Server",
                },
                {
                    name: "-unmute",
                    value: "Unmutes a user in the Discord server"
                })
            .setDescription("Smart Moderation | Moderation made simple! Here is a list of all available commands use the interaction system to see more commands!");

        const embed2 = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .addFields(
                {
                    name: `Premium`,
                    value: "Coming Soon!",
                },
                {
                    name: "-status",
                    value: "Shows if you have premium or not"
                },
                {
                    name: "-prefix",
                    value: "Changes the prefix of the bot"
                },
                {
                    name: "-givepremium",
                    value: "This can only be used by trusted staff members of Smart Moderation"
                },
                {
                    name: "-removepremium",
                    value: "This can only be used by trusted staff members of Smart Moderation"
                })
            .setDescription("Smart Moderation | Moderation made simple! Here is a list of all available commands use the interaction system to see more commands!");

        const embed3 = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setTitle('Miscellaneous')
            .addFields(
                {
                    name: "-serverinfo",
                    value: "Shows all the information about the server"
                },
                {
                    name: "-botinfo",
                    value: "Shows you information about Smart Moderation"
                },
                {
                    name: "-avatar",
                    value: "Shows you the user you mentioned avatar"
                },
                {
                    name: "-whois",
                    value: "Shows you all discord information about a user"
                },
                {
                    name: "-nickname [COMING SOON]",
                    value: "Changes a users nickname"
                },
                {
                    name: "-roles [COMING SOON]",
                    value: "Shows you a full list of the servers roles"
                })
            .setDescription("Smart Moderation | Moderation made simple! Here is a list of all available commands use the interaction system to see more commands!");

            const embed4 = new Discord.MessageEmbed()
            .setColor(SmartModColour)
            .setTitle('Moderation')
            .addFields(
                {
                    name: `-lock`,
                    value: "Locks the channel that you mention in the Discord",
                },
                {
                    name: "-unlock",
                    value: "Unlocks the channel that you mention in the Discord",
                },
                {
                    name: "-slowmode [COMING SOON]",
                    value: "Adds a slowmode to the channel that you mention in the Discord",
                },
                {
                    name: "-warnings [COMING SOON]",
                    value: "Checks how many warnings a user has",
                },
                {
                    name: "-removewarnings [COMING SOON]",
                    value: "Clears all of the users warning history"
                })
            .setDescription("Smart Moderation | Moderation made simple! Here is a list of all available commands use the interaction system to see more commands!");






        let option1 = new MessageMenuOption()
            .setLabel('Moderation Primary')
            .setValue('option1')

        let option2 = new MessageMenuOption()
            .setLabel('Moderation Secondary')
            .setValue('option2')

        let option3 = new MessageMenuOption()
            .setLabel('Premium')
            .setValue('option3')

        let option4 = new MessageMenuOption()
            .setLabel('Miscellaneous')
            .setValue('option4')

        let select = new MessageMenu()
            .setID('selector')
            .setPlaceholder('Smart Moderation')
            .setMaxValues(1)
            .setMinValues(1)
            .addOptions(option1, option2, option3, option4)




        const Sendmenu = await message.channel.send(embed, select);


        const filter = (button) => button.clicker.user.id === message.author.id;
        let collector = Sendmenu.createMenuCollector(filter, { time: 10000 });

        collector.on("collect", (b) => {
            if (b.values[0] == "option1") {
                Sendmenu.edit(embed1, select)
            }

            if (b.values[0] == "option2") {
                Sendmenu.edit(embed4, select)
            }

            if (b.values[0] == "option3") {
                Sendmenu.edit(embed2, select)
            }

            if (b.values[0] == "option4") {
                Sendmenu.edit(embed3, select)
            }

            b.reply.defer();
        })





    }


}