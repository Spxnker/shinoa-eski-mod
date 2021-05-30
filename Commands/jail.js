const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {
    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
     let logKanal = sunucu.channels.cache.get(ayarlar.guildLogs.jailLogs);
if(!message.member.roles.cache.has(ayarlar.guildHammer.jailHammer) && !message.member.hasPermission("ADMINISTRATOR"))  return embedCreator("#4D0A0A", `Bu komutu kullanmak için yeterli yetkin bulunmuyor.`,message,[true,5000])
let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let reason = args.splice(1).join(" ");
if (!victim  || reason.length < 1) return message.channel.send("Bütün argümanları doğru yerleştirmelisin! ```Örnek: .jail @Shinoa/461212138346905600  [sebep]``` ").then(x => x.delete({timeout: 10000}));
if (message.member.roles.highest.position <= victim.roles.highest.position) return message.channel.send(` Belirttiğin kişi senden üst yetkide veya aynı yetkidesiniz!`).then(x => x.delete({timeout: 10000}));
if (victim.user.bot) return message.channel.send(` Bu komutu botlar üzerinde kullanamazsın!`).then(x => x.delete({timeout: 10000}));
let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp();

let data = await Database.find({guildID: message.guild.id, execID: victim, activity: true, Type: "JAIL"})
if(data.length >= 1 ) return  embedCreator("#4D0A0A", ` Bu kişinin halı hazırda bir cezası bulunuyor `,message,[true,5000])
let count = await Database.countDocuments().exec();
count = count == 0 ? 1 : count + 1;

let Penal = await new Database({
    guildID: message.guild.id,
    execID: message.author.id,
    cezaID: count,
    victimID: victim.id,
    dateNow: Date.now(),
    activity: true,
    Temporary: false,
    Reason: reason,
    Type: "JAIL"
}).save()
victim.roles.cache.has(ayarlar.guildRoles.boosterRole) ? victim.roles.set([ayarlar.guildRoles.jailRole, ayarlar.guildRoles.boosterRole]) : victim.roles.set([ayarlar.guildRoles.jailRole]);
if(logKanal) logKanal.send(embed.setDescription(`${victim} (\`${victim.id}\`) üyesi cezalıya gönderildi.\n**•** Sebep: \`${reason}\``).setFooter(`Ceza numarası: #${count}`).setTimestamp());
return embedCreator("#4D0A0A", `${victim} (\`${victim.id}\`) adlı üye cezalıya gönderildi.\nCezalıya gönderilme sebebi: **__${reason}__** (Ceza numarası: \`#${count}\`)`,message,[true,5000])
};

exports.commandSettings = {
    name: "jail",
    aliases: ["cezalandir"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}