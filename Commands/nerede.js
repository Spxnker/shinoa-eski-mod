const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp();

    let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!victim) return     embedCreator("#4D0A0A", `Bütün argümanları doğru yerleştirmelisin! \n Örnek: .nerede @Shinoa/461212138346905600`,message,[true,5000])

    const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');

    let count = 0;
      
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;

    let def = victim.voice.deaf ? `Kapalı ` : `Açık >` 
    let mut = victim.voice.mute ? `Kapalı ` : `Açık `
	
	if(!victim.voice.channel) return message.channel.send(embed.setDescription(`${victim} (\`${victim.id}\`) üyesi herhangi bir sesli kanalda bulunmuyor.`))

    embedCreator("#4D0A0A", `${victim} adlı üye **${victim.voice.channel.name}** kanalında.\n──────────────────\n● \`Mikrofon\` Durumu: **${mut}**\n\n● \`Kulaklık\` Durumu: **${def}**`,message,[true,5000])

};

exports.commandSettings = {
    name: "nerede",
    aliases: ["n"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}