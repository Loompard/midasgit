const Discord = require(`discord.js`)
const fn = require(`fortnite`)
const fortnite = new fn(`9a6e9e5e-662a-4f66-b498-6c62061ba7ab`)
const fortsave = require(`../fortnitejs.dat.json`)

module.exports.run = async(client, message, args) => {
    if(args[0] && (args[0] == "store" || args[0] == "shop" || (args[0] == "item" && args[1] && args[1] == "shop"))) {
        if(message.author.id == "270606615789568001" && args[1] == "setup") {
            setTimeout(async () => {
                let testing = setInterval(async () => {
                    let store = await fortnite.store()
                    store.sort((a, b) => {
                        return b.vbucks - a.vbucks
                    })
                    let embed = new Discord.RichEmbed()
                    .setAuthor(`Магазин предметов Fortnite`, `http://pbs.twimg.com/profile_images/1017458813199372289/QtGv1tyn_400x400.jpg`)
                    .setTimestamp()
                    .setColor(`#84c1e8`)
                    store.forEach(element => {
                        embed.addField(element.name, `**- Редкость:** ${element.rarity}\n**- Цена:** ${element.vbucks}Vb\n**- Картинка:** [Клик](${element.image})`, true)
                    })
                    message.channel.send(embed)
                    return
                }, 86400000)
            }, 6120000)
        }
        let store = await fortnite.store()
        store.sort((a, b) => {
            return b.vbucks - a.vbucks
        })
        let embed = new Discord.RichEmbed()
        .setAuthor(`Fortnite Item Shop`, `http://pbs.twimg.com/profile_images/1017458813199372289/QtGv1tyn_400x400.jpg`)
        .setTimestamp()
        .setColor(`#84c1e8`)
        store.forEach(element => {
            embed.addField(element.name, `**- Rarity:** ${element.rarity}\n**- Price:** ${element.vbucks}Vb\n**- Image:** [Click](${element.image})`, true)
        })
        message.channel.send(embed)
        return
    } else if(args[0] && args[0] == "map") {
        let embed = new Discord.RichEmbed()
        .setAuthor(`Current Fortnite Map`, "http://pbs.twimg.com/profile_images/1017458813199372289/QtGv1tyn_400x400.jpg")
        .setImage("https://media.fortniteapi.io/images/map.png?showPOI=true")
        message.channel.send(embed)
        return
    }
    argsv = args.join(" ").split(", ")
    if(args[0] == "link") {
        if(!fortsave[message.author.id]) return
        args[0]=""
        argsv = args.join(" ").slice(1).split(", ")
        let username = argsv[0]
        let platform = argsv[1]
        if(platform == "PC" || platform == "Pc" || platform == "pC" || platform == "pc"){
            platform = "pc"
        } else if(platform == "psn" ||platform == "PSN" || platform == "Psn" || platform == "pSn" || platform == "psN" || platform == "PSn" || platform == "PsN" || platform == "pSN" || platform == "ps4" || platform == "PS4" || platform == "pS4" || platform == "Ps4"){
            platform = "psn"
        } else if(platform == "xbl" || platform == "XBL" || platform == "Xbl" || platform == "xBl" || platform == "xbL" || platform == "XBl" || platform == "XbL" || platform == "xBL" || platform == "xbox" || platform == "XBOX" || platform == "XBox" || platform == "xBox"){
            platform == "xbl"
        }
        fortnite.user(username, platform).then(data => {
            let stats = data.stats
        }).catch(e => {
            return message.channel.send(`**There's no players with this username on ths platform`)
        })
        fortsave[message.author.id].username = username
        fortsave[message.author.id].plat = platform
        await fs.writeFile(`../fortnitejs.dat.json`, JSON.stringify(fortsave), err => {if(err) console.log(err)})
        message.channel.send(`**Now** \`${username}\` **is linked to your account**`)
        return
    }
    let name = argsv[0]
    let platform = argsv[1] || 'pc'
    let plat
    platform = platform.toLowerCase()
    if(platform == "PC" || platform == "Pc" || platform == "pC" || platform == "pc"){
        platform = "pc"
        plat = "PC"
    } else if(platform == "PSN" || platform == "Psn" || platform == "pSn" || platform == "psN" || platform == "PSn" || platform == "PsN" || platform == "pSN" || platform == "ps4" || platform == "PS4" || platform == "pS4" || platform == "Ps4"){
        platform = "psn"
        plat = "PlayStation"
    } else if(platform == "XBL" || platform == "Xbl" || platform == "xBl" || platform == "xbL" || platform == "XBl" || platform == "XbL" || platform == "xBL" || platform == "xbox" || platform == "XBOX" || platform == "XBox" || platform == "xBox"){
        platform == "xbl"
        plat = "Xbox"
    }
    if(!name) {
        if(fortsave[message.author.id] && fortsave[message.author.id].active && fortsave[message.author.id].username != null && fortsave[message.author.id].plat != null) {
            name = fortsave[message.author.id].username
            platform = fortsave[message.author.id].plat
            if(platform == "pc") plat = "PC"
            else if(platform == "psn") plat = "PlayStation"
            else if(platform == "xbl") plat = "Xbox"
        } else return message.channel.send(`Использование: @Midasbot fortnite <Username>, <Platform>`)
    }
    let info
    await fortnite.user(name, platform).then(async (data) => {
        if(!data) return message.channel.send(`Игрок не найден`)
        info = data
    }).catch(e => {
        message.channel.send(`Игрок не найден`)
        return
    })
    let embed = new Discord.RichEmbed()
    .setAuthor(info.username + " - " + plat, `http://pbs.twimg.com/profile_images/1017458813199372289/QtGv1tyn_400x400.jpg`)
    let lifetime = info.stats.lifetime
    let kd = lifetime.kd
    let kills = lifetime.kills
    let wins = lifetime.wins
    let matches = lifetime.matches
    let top3 = lifetime.top_3
    let top6 = lifetime.top_6
    let top12 = lifetime.top_12
    let top25 = lifetime.top_25
    let winper = Number(((100*wins)/matches).toString()[0])
    embed.addField(`Убийства`, kills, true)
    embed.setColor(`#84c1e8`)
    embed.addField(`Победы`, wins, true)
    embed.addField(`У/С`, kd, true)
    embed.addField(`Матчей`, matches, true)
    embed.addField(`Процент побед`, `${winper.toString()[0]}%`, true)
    embed.addField(`Топ-3`, top3, true)
    embed.addField(`Топ-6`, top6, true)
    embed.addField(`Топ-12`, top12, true)
    embed.addField(`Топ-25`, top25, true)
    embed.setFooter(`Статистика от fortnitetracker.com`)
    embed.setTimestamp()
    message.channel.send(embed)
    return
    if(fortsave[message.author.id].active && name == fortsave[message.author.id].username && platform == fortsave[message.author.id].plat) {
        let messageStat = ``
        if((fortsave[message.author.id].lastKD < kd) && fortsave[message.author.id].lastKD != null) {
            let kdMinus = (kd-fortsave[message.author.id].lastKD) + ""
            let kdreal = "" + kdMinus[0] + "" + kdMinus[1] + "" + kdMinus[2] + "" + kdMinus[3]
            messageStat += `${langpack.CDIncreased} ***${kd} (+${kdreal})***\n`
        } else if((fortsave[message.author.id].lastKD > kd) && fortsave[message.author.id].lastKD != null) {
            let kdMinus = fortsave[message.author.id].lastKD-kd + ""
            let kdreal = "" + kdMinus[0] + "" + kdMinus[1] + "" + kdMinus[2] + "" + kdMinus[3]
            messageStat += `${langpack.CDDecreased} ***${kd} (-${kdreal})***\n`
        }
        if((fortsave[message.author.id].lastKills < kills) && fortsave[message.author.id].lastKills != null) {
            messageStat += `${langpack.KillsIncreased} ***${kills} (+${kills-fortsave[message.author.id].lastKills} ${langpack.KillsPlus})***\n`
        }
        if((fortsave[message.author.id].lastMatches < matches) && fortsave[message.author.id].lastMatches != null){
            messageStat += `${langpack.MatchesIncreased} ***${matches} (+${matches - fortsave[message.author.id].lastMatches})***\n`
        }
        if((fortsave[message.author.id].lastWins < wins) && fortsave[message.author.id].lastWins != null) {
            messageStat += `${langpack.WinsIncreased} ***${wins} (+${wins - fortsave[message.author.id].lastWins} ${langpack.WinsPlus})***\n`
        }
        if((fortsave[message.author.id].lastWinPer < winper) && fortsave[message.author.id].lastWinPer != null) {
            messageStat += `${langpack.WinperIncreased} ***${winper} (${fortsave[message.author.id].lastWinPer} - ${langpack.Previous})***\n`
        } else if((fortsave[message.author.id].lastWinPer > winper) && fortsave[message.author.id].lastWinPer != null) {
            messageStat += `${langpack.WinperDecreased} ***${winper} (${fortsave[message.author.id].lastWinPer} - ${langpack.Previous})***\n`
        }
        if(fortsave[message.author.id]) {
            fortsave[message.author.id].lastKills = kills
            fortsave[message.author.id].lastKD = kd
            fortsave[message.author.id].lastWins = wins
            fortsave[message.author.id].lastWinPer = winper
            fortsave[message.author.id].lastMatches = matches
            await fs.writeFile((`../fortnitejs.dat.json`), JSON.stringify(fortsave), err => {if(err) console.log(err)})
        }
        if(messageStat != ``) {
        setTimeout(() => {
                message.channel.send(messageStat)
            }, 1500)
        }
    }
}

module.exports.config = {
    name: "fortnite"
}