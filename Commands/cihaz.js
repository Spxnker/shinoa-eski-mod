const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {


    let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!victim) return message.channel.send("Bütün argümanları doğru yerleştirmelisin! ```Örnek: .cihaz @Shinoa/424544845290536970``` ");
  let p = Object.keys(victim.presence.clientStatus).join(',')
  let cihazisim = p
  .replace(`mobile`,`Mobil`)
  .replace(`desktop`,`Bilgisayar`)
  .replace(`web`,`İnternet Tarayıcısı`)
  
  let k = Object.values(victim.presence.clientStatus).join(',')
  let durum = k
  .replace(`online`,`Çevrimiçi`)
  .replace(`idle`,`Boşta`)
  .replace(`dnd`,`Rahatsız Etmeyin`)
  .replace(`offline`,`Çevrimdışı/Görünmez`)

  message.channel.send(`${victim} Cihaz bilgisi: **${cihazisim} | ${durum}**`)


};

exports.commandSettings = {
    name: "cihaz",
    aliases: [],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}