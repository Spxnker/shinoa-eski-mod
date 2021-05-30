const { Discord, MessageEmbed } = require('discord.js');
const Database = require('../Models/ExecutorModel.js');
const ayarlar = require('../ayarlar.json')




module.exports = member => {

async function ceza() {
    let guild = client.guilds.cache.get(ayarlar.guildSettings.guildID);

Database.findOne({guildID: guild.id, victimID: member.id, activity: true},(err, res) => {
if(!res) return
if(res.Type == "JAIL")  user.roles.cache.has(ayarlar.guildRoles.boosterRole) ? user.roles.set([ayarlar.guildRoles.jailRole, ayarlar.guildRoles.boosterRole]) : user.roles.set([ayarlar.guildRoles.jailRole]);
if(res.Type == "MUTE") user.roles.add(ayarlar.guildRoles.muteRole) 
if(res.Type == "VOİCE-MUTE") user.roles.add(ayarlar.guildRoles.vmuteRole) 
})
}

let suphelilik = true;
if ((Date.now() - member.user.createdAt) > (1000 * 60 * 60 * 24 * 7)) suphelilik = false; // 7 Gün! Değiştirebilirsniz

if(suphelilik) {
member.roles.add(ayarlar.guildRoles.unregister)
} else {
    member.roles.add(ayarlar.guildRoles.sus)

}

setTimeout(async() => {
    let dort = "";
    if (!suphelilik) dort = `✅ Hesap Durumu: \`Güvenli\``;
    else dort = `❌ Hesap Durumu: \`Tehlikeli\``;
    let emoji = "●" //İsterseniz bir emojiyle değişin
    welcome.send(`**${emoji} ${guild.name}'a hoş geldin. ${member}, seninle beraber ${member.guild.members.cache.size} kişi olduk.\n\n${emoji} Kayıt odalarına giriş yaparak kaydını yaptırabilirsin.\n\n${emoji} Yetkili arkadaşlar sizinle ilgilenecektir.\n\n${emoji} Hesap Kuruluş Tarihi: \`${moment(member.user.createdAt).format("lll")}\`\n\n${dort}**`)
}, 15)

}


module.exports.reqEv = {
    event: "guildMemberAdd",
    isim: "Ceza kontrol ve hosgeldin"
};