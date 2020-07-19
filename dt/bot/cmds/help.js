const Discord = require(`discord.js`)

module.exports.run = async(client, message, args) => {
    let embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setDescription(`Привет привет ну привет как дела как дела это новый фортнайт`)
    message.channel.send(embed)
}

module.exports.config = {
    command: "help"
}