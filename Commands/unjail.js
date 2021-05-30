const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {
    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
     let logKanal = sunucu.channels.cache.get(ayarlar.guildLogs.muteLogs);
     let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp();

if(!message.member.roles.cache.has(ayarlar.guildHammer.muteHammer) && !message.member.hasPermission("ADMINISTRATOR")) return embedCreator("#4D0A0A", `Bu komutu kullanmak için yeterli yetkin bulunmuyor.`,message,[true,5000])

let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let reason = args.splice(1).join(" ") || "Sebep Belirtilmedi"
if (!victim  || reason.length < 1) return embedCreator("#4D0A0A", `Bütün argümanları doğru yerleştirmelisin! \n Örnek: .unmute @Shinoa/461212138346905600  [sebep] `,message,[true,5000])

if (message.member.roles.highest.position <= victim.roles.highest.position) return embedCreator("#4D0A0A", `Belirttiğin kişi senden üst yetkide veya aynı yetkidesiniz!`,message,[true,5000])
if (victim.user.bot) return embedCreator("#4D0A0A", `Bu komutu botlar üzerinde kullanamazsın! `,message,[true,5000])
let mList = await Database.find({activity: true, victimID: victim.id, Type: "JAIL"})
if (mList.length <= 0) return embedCreator("#4D0A0A", ` **Belirttiğin kişi herhangi bir jail cezasına sahip değil.** `,message,[true,5000])

mList.forEach(d => {
    d.activity = false;
    d.save();
  });
  victim.roles.remove(ayarlar.guildRoles.muteRole)



if(logKanal) logKanal.send(embed.setDescription(`${victim} (\`${victim.id}\`) üyesinin mutesi ${message.author} tarafından  ${reason} sebebiyle açıldı.`).setFooter(`Shinoa`).setTimestamp());
message.channel.send(embed.setDescription(` ${victim} adlı üyenin cezası **${reason}** sebebi ile kaldırıldı.`));
embedCreator("#4D0A0A", `  ${victim} adlı üyenin cezası **${reason}** sebebi ile kaldırıldı. `,message,[true,5000])

};

exports.commandSettings = {
    name: "unjail",
    aliases: ["jailkaldır"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}