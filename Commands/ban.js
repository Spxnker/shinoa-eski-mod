const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk, embedCreator } = require('../functions');
exports.run = async(client, message, args) => {
    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
     let logKanal = sunucu.channels.cache.get(ayarlar.guildLogs.banLogs);
     let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp();

if(!message.member.roles.cache.has(ayarlar.guildHammer.banHammer) && !message.member.hasPermission("ADMINISTRATOR")) return embedCreator("#4D0A0A", `Bu komutu kullanmak için yeterli yetkin bulunmuyor.`,message,[true,5000])

let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let reason = args.splice(1).join(" ");
if (!victim  || reason.length < 1) return embedCreator("#4D0A0A", ` Bütün argümanları doğru yerleştirmelisin! \n Örnek: .ban @Shinoa/461212138346905600  [sebep]  `,message,[true,5000])  
if (message.member.roles.highest.position <= victim.roles.highest.position) return  embedCreator("#4D0A0A", `**Kendinden daha üstteki kullanıcıya işlem uygulayamazsın**`,message,[true,5000])
if (victim.user.bot) return embedCreator("#4D0A0A", ` Bu komutu botlar üzerinde kullanamazsın! `,message,[true,5000])  


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
    Type: "BAN"
}).save()
message.guild.members.ban(victim, {reason: reason}).catch(err => message.reply(` Bu kişiyi yasaklayamıyorum. | ${err}`))
message.channel.send(`${victim.tag} (\`${victim.id}\`) kişisi **__${reason}__** sebebiyle yasaklandı!`, new MessageAttachment("https://tenor.com/view/tank-world-war-tank-fire-gif-16949276"))

if(logKanal) logKanal.send(`**__${victim.tag}__** adlı kişi \`${reason}\` sebebi ile **${message.author.username}** Tarafından Banlandı `);

};

exports.commandSettings = {
    name: "ban",
    aliases: ["yasakla"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}