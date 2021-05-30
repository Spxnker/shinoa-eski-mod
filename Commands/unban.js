const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {
    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
     let logKanal = sunucu.channels.cache.get(ayarlar.guildLogs.banLogs);
     let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp();

if(!message.member.roles.cache.has(ayarlar.guildHammer.banHammer) && !message.member.hasPermission("ADMINISTRATOR")) return embedCreator("#4D0A0A", `Bu komutu kullanmak için yeterli yetkin bulunmuyor.`,message,[true,5000])

let reason = args.splice(1).join(" ");
if (!args[0] || isNaN(args[0])) return message.channel.send(embed.setDescription("Geçerli bir kişi ID'si belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  let kisi = await client.users.fetch(args[0]);
  if(kisi) {
    let reason = args.splice(1).join(" ") || "sebep belirtilmedi";
    message.guild.members.unban(kisi.id).catch(err => message.channel.send(embed.setDescription("Belirtilen ID numarasına sahip bir ban bulunamadı!")).then(x => x.delete({timeout: 5000})));
if(logKanal) logKanal.send(embed.setDescription(`${kisi.tag} Adlı Kişinin banı ${message.author.tag} Tarafından Kaldırıldı  `))
embedCreator("#4D0A0A", `  Belirtilen üyenin yasaklaması başarılı bir şekilde kaldırıldı `,message,[true,5000])

};
}
exports.commandSettings = {
    name: "unban",
    aliases: ["bankaldır"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}