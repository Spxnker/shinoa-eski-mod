const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp();

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.react(ayarlar.emojiler.red);
let id = args[0]
if(!args[1] || isNaN(args[1])) return embedCreator("#4D0A0A", `Geçerli bir ban yemiş kullanıcı ID'si belirtmelisin!  `,message,[true,5000])
return message.guild.fetchBan(args.slice(1).join(' ')).then(({ user, reason }) => message.channel.send(embed.setDescription(`**Banlanan Üye:** ${user} (\`${user.id}\`)\n**Ban Sebebi:** ${reason ? reason : "Belirtilmemiş!"}`))).catch(err => message.channel.send(embed.setDescription(`  Belirtilen ID numarasına sahip bir ban bulunamadı! | ${err}`)).then(x => x.delete({timeout: 10000})));

};

exports.commandSettings = {
    name: "banbilgi",
    aliases: ["ban-bilgi","ban-sorgu"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}