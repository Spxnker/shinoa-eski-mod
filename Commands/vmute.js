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
if(!message.member.roles.cache.has(ayarlar.guildHammer.muteHammer) && !message.member.hasPermission("ADMINISTRATOR")) return embedCreator("#4D0A0A", `Bu komutu kullanmak için yeterli yetkin bulunmuyor.`,message,[true,5000])
let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let time = args[1]
let reason = args.splice(2).join(" ");
if (!victim || !time || !ms(time) || reason.length < 1) return embedCreator("#4D0A0A", `Bütün argümanları doğru yerleştirmelisin! \n Örnek: .tempmute @Shinoa/461212138346905600 [süre] [sebep]`,message,[true,5000])
if (message.member.roles.highest.position <= victim.roles.highest.position) return embedCreator("#4D0A0A", `Belirttiğin kişi senden üst yetkide veya aynı yetkidesiniz!`,message,[true,5000])
if (victim.user.bot) return embedCreator("#4D0A0A", `Bu komutu botlar üzerinde kullanamazsın! `,message,[true,5000])

let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp();

let yaziSure = time.replace("h", "Saat").replace("m", "Dakika").replace("d", "Gün").replace("s", "Saniye");
let atilanAy = moment(Date.now()).format("MM");
let atilanSaat = moment(Date.now()).format("HH:mm:ss");
let atilanGün = moment(Date.now()).format("DD");
let bitişAy = moment(Date.now()+ms(time)).format("MM");
let bitişSaat = moment(Date.now()+ms(time)).format("HH:mm:ss");
let bitişGün = moment(Date.now()+ms(time)).format("DD");

let muteAtılma = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanSaat}`;
let muteBitiş = `${bitişGün} ${bitişAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${bitişSaat}`;

let data = await Database.find({guildID: message.guild.id, victimID: victim.id, activity: true, Type: "VOİCE-MUTE"})
if(data.length >= 1 ) return embedCreator("#4D0A0A", ` Bu kişinin halı hazırda bir cezası bulunuyor `,message,[true,5000])


let count = await Database.countDocuments().exec();
count = count == 0 ? 1 : count + 1;

let Penal = await new Database({
    guildID: message.guild.id,
    execID: message.author.id,
    cezaID: count,
    victimID: victim.id,
    dateNow: Date.now(),
    activity: true,
    Temporary: true,
    Reason: reason,
    Type: "VOİCE-MUTE",  
    finishDate: (Date.now() + ms(time))
}).save()
victim.roles.add(ayarlar.guildRoles.vmuteRole)
if(victim.voice.channel) victim.voice.setMute(true).catch();
if(logKanal) logKanal.send(embed.setDescription(`${victim} (\`${victim.id}\`) üyesi ses kanallarında susturuldu!\n**•** Mute Başlangıç: \`${muteAtılma}\`\n**•** Mute Bitiş: \`${muteBitiş}\`\n**•** Süre: \`${yaziSure}\`\n\n**•** Sebep: \`${reason}\``).setFooter(`Ceza numarası: #${count}`).setTimestamp());
embedCreator("#4D0A0A", ` ${victim} kişisi **${yaziSure}** boyunca **sesli kanallarda** susuturuldu.\nSusturulma sebebi: \`${reason}\` (Ceza numarası: \`#${count}\`) `,message,[true,5000])

};

exports.commandSettings = {
    name: "voicemute",
    aliases: ["vm","vmute","sesmute","sm"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}