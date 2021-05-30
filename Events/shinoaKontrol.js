const ayarlar = require('../ayarlar.json');
const moment = require("moment")
const Database = require("../Models/ExecutorModel.js");

module.exports = async() => {

function shinoa() {
    let guild = client.guilds.cache.get(ayarlar.guildSettings.guildID);

Database.find({activity: true}, (err, res) => {
    if(!res) return
    res.filter((penal) => penal.Temporary === true && Date.now() < penal.finishDate).forEach((doc) => {
const user = guild.members.cache.get(doc.victimID)
if(!user) return
if(doc.Type === "MUTE" && !user.roles.cache.has(ayarlar.guildRoles.muteRole))   user.roles.add(ayarlar.guildRoles.muteRole) 
if(doc.Type === "JAIL" && !user.roles.cache.has(ayarlar.guildRoles.jailRole))   user.roles.cache.has(ayarlar.guildRoles.boosterRole) ? user.roles.set([ayarlar.guildRoles.jailRole, ayarlar.guildRoles.boosterRole]) : user.roles.set([ayarlar.guildRoles.jailRole]);
if(doc.Type === "VOİCE-MUTE" && !user.roles.cache.has(ayarlar.guildRoles.vmuteRole))   user.roles.add(ayarlar.guildRoles.vmuteRole) 
})
    res.filter((penal) => penal.Temporary === true && Date.now() >= penal.finishDate).forEach((doc) => {
        const user = guild.members.cache.get(doc.victimID);
        if (!user) return;
        if(doc.Type === "MUTE" && user.roles.cache.has(ayarlar.guildRoles.muteRole)) user.roles.remove(ayarlar.guildRoles.muteRole).catch(); {
        doc.activity = false; 
        doc.save();    
        } 

        if(doc.Type === "JAIL" && user.roles.cache.has(ayarlar.guildRoles.jailRole))  user.roles.cache.has(ayarlar.guildRoles.boosterRole) ? user.roles.set([ayarlar.guildRoles.unregister, ayarlar.guildRoles.boosterRole]) : user.roles.set([ayarlar.guildRoles.unregister]).catch(); {
            doc.activity = false; 
            doc.save();    
            } 

            if(doc.Type === "VOİCE-MUTE" && user.roles.cache.has(ayarlar.guildRoles.muteRole)) user.roles.remove(ayarlar.guildRoles.muteRole).catch(); {
                doc.activity = false; 
                doc.save();    
                } 


    })
}) 

}

setInterval(() => {
shinoa()
},20000)







    },
    module.exports.reqEv = {
        event: "ready",
        isim: "Presence Ayari"
    };