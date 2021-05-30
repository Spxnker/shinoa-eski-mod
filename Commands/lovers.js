const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.react(ayarlar.emojiler.red);
    let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!victim) return     embedCreator("#4D0A0A", `Bütün argümanları doğru yerleştirmelisin! \n Örnek: .lovers @Shinoa/461212138346905600`,message,[true,5000])
    if (victim.user.bot) return embedCreator("#4D0A0A", `Bu komutu botlar üzerinde kullanamazsın! `,message,[true,5000])
    if (message.member.roles.highest.position <= victim.roles.highest.position) return embedCreator("#4D0A0A", `Belirttiğin kişi senden üst yetkide veya aynı yetkidesiniz!`,message,[true,5000])
    embedCreator("#4D0A0A", ` ${victim} Kişisine <@&${ayarlar.ekstraRoles.lovers}> rolü **başarıyla** verildi.`,message,[true,5000])

};

exports.commandSettings = {
    name: "lovers",
    aliases: [],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}