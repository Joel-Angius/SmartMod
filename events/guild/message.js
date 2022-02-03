module.exports = (Discord, client, message) => {
    const config = require(`../../Settings/config.json`)
    const prefix = config.Prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;



    var errrrr = new Discord.MessageEmbed()
    .setColor('b15b5b')
    .setAuthor('Smart Moderation', 'https://i.imgur.com/t9Ku2gs.jpg')
    .setDescription(`An error has occurred please try again or join our support server for assistance!`)
    .setFooter("Smart Moderation")


    const blacklist = require('../../SmartModData/blacklist')

    var blacklisted = new Discord.MessageEmbed()
    .setColor('b15b5b')
    .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
    .setTitle("You are blacklisted!")
    .setDescription(`You cannot use this command as you have been blacklisted!`)
    .setFooter("Smart Moderation")

    var nopremium = new Discord.MessageEmbed()
    .setColor('b15b5b')
    .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
    .setTitle("You do not have premium!")
    .setDescription(`You cannot use this command as you haven\'t got premium!`)
    .setFooter("Smart Moderation")

    var expired = new Discord.MessageEmbed()
    .setColor('b15b5b')
    .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
    .setTitle("You do not have premium!")
    .setDescription(`Your premium has ran out!`)
    .setFooter("Smart Moderation")


    


    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase()



    blacklist.findOne({ id: message.author.id }, async (err, SmartModerationData) => {

        if (err) throw err;
        if (!SmartModerationData) {

    const command = client.commands.get(cmd) ||
                    client.commands.find(a => a.aliases && a.aliases.includes(cmd))


                    const premiumSchema = require('../../SmartModData/premium')
                    if(command.premium && !(await premiumSchema.findOne({ User: message.author.id }))) return message.channel.send(nopremium)
            
        try {
           command.execute(client, message, args, cmd, Discord)
        } catch (err){
            message.channel.send(errrrr)
        }

    } 
    else {
        message.channel.send(blacklisted)
    } 
    
    }) 

   
} 