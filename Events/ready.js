const ayarlar = require('../ayarlar.json');
const moment = require("moment")
const Database = require('../Models/ExecutorModel.js')

module.exports = async() => {
        console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Bruh Aktif, Komutlar ve Eventler Yüklendi!`);
        client.user.setPresence({ activity: { name: "qwe", type: "WATCHING" }, status: "idle" })
            .catch(console.error);
        if (ayarlar.botSettings.botSes && client.channels.cache.has(ayarlar.botSettings.botSes)) client.channels.cache.get(ayarlar.botSettings.botSes).join().catch(x => console.log(`Hata: ${x}`));




    },


    module.exports.reqEv = {
        event: "ready",
        isim: "Presence Ayari"
    };