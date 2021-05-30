const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.react(ayarlar.emojiler.red);
      
    let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor("RANDOM")

    let rol = args[0]
    if (!rol) return message.channel.send("Rol ID belirtmelisin.").then(x => x.delete({ timeout: 10000 }))
    let rolsayi = message.guild.members.cache.filter(piece => piece.roles.cache.has(rol)).size


    message.channel.send(embed.setDescription(`> <@&${rol}> rolünde bulunan üye sayısı \`${rolsayi}\``));

};

exports.commandSettings = {
    name: "rolsorgu",
    aliases: [],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}