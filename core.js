const Discord = require(`discord.js`)
const settings = require(`./dt/bot/settings.json`)
const fs = require(`fs`)
const client = new Discord.Client()
client.cmds = new Discord.Collection()
const defprefix = "<@!730825175506878635>"
let now = new Date()

async function ready() {
    now = new Date()
    console.log(`[${now.getHours()}:${now.getMinutes()}] ${client.user.username} is ready`)
    client.user.setStatus(`dnd`)
    client.user.setActivity(`Eaten by a shark`)
}

async function clientRestart() {
    fs.readdir(`./dt/bot/cmds`, (err, files) => {
        if(err) console.log(err)
        let file = files.filter(f => f.split(".").pop() === "js")
        if(file.length <= 0) return console.log("Команды отсутствуют")
        file.forEach((f, i) => {
            delete require.cache[require.resolve(`./dt/bot/cmds/${f}`)]
            let pull = require(`./dt/bot/cmds/${f}`)
            client.cmds.set(pull.config.command, pull)
        })
    })
}

fs.readdir(`./dt/bot/cmds`, (err, files) => {
    if(err) console.log(err)
    let file = files.filter(f => f.split(".").pop() === "js")
    if(file.length <= 0) return console.log("Команды отсутствуют")
    file.forEach((f, i) => {
        let pull = require(`./dt/bot/cmds/${f}`)
        client.cmds.set(pull.config.command, pull)
    })
})

client.on(`ready`, async() => ready())

client.on(`message`, async(message) => {
    if(message.author.bot) return
    console.log(message.content)
    if(!message.content.startsWith(defprefix)) {
        return
    }
    let msgArray = message.content.split(" ")
    let cmd, args
    if(message.content.startsWith(defprefix)) {
        if(!msgArray[1]) return
        cmd = msgArray[1].toLowerCase()
    }
    else if(msgArray[0]) cmd = msgArray[0].toLowerCase()

    args = msgArray.slice(1)
    let cmdfile = client.cmds.get(cmd)
    if(cmdfile) cmdfile.run(client, message, args)
    else if(cmd == "reload" || cmd == "рестарт") {
        clientRestart()
        let embed = new Discord.RichEmbed()
        .setAuthor(`Перезагрузка завершена`, client.user.displayAvatarURL)
        .setColor("#84c1e8")
        message.channel.send(embed)
    }
})

client.login(settings.discord)