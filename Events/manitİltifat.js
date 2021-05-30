const { Discord, MessageEmbed } = require('discord.js');

let manitÖzel = [
    "Sahibimin seni neden bu kadar çok sevdiğini şimdi anlayabiliyorum, harikasın..",
    "Bazen yapımcımı bırakıp sana mı gelsem diye düşünüyorum.",
    "Yapımcım seni iyi bulmuş ya bana da böyle biri lazım :eyes:",
    "Kodlarımda bile ismi geçen kişi sen misin? Sanırım sensin evet.",
    "Bu kadar tatlı olmak zorunda mısın :rage:",
    "Lovers rolünü almışsındır umarım qwe",
    "Var mı laf yapan, hemen alalım aklını.",
    "Beni bunu yazmam için yapan kişi sana bayılıyor",
    "Sa manit",
    "Seni izliyorum bu arada, bir gözüm sende ona göre.",
    "Adamsın",
    "Naber güzellik?",
    "Zor olmuyor mu, bu kadar tatlı olmak?",
    "Göz dikenlere for veriyorum.",
    "Hal hatır sorasım geldi bir anda.",
    "Slm tatlım.",
    "İnstanı versene güzellik :)",
    "Numaranı versenee",
    "Yapımcım Kadar zeki birini nasıl buldu kiii",
    "güzelliğine tüm botlarımla hayran kaldık"
];
let iltifatSayi = 0;



module.exports = message => {
    if (message.author.id !== "") return;
    iltifatSayi++
    if (iltifatSayi >= 40) {
        iltifatSayi = 0;
        const random = Math.floor(Math.random() * ((manitÖzel).length - 1) + 1);
        message.reply(`${(manitÖzel)[random]}`);
        console.log(`Manitaya iltifat yapıldı. Çok iyi biriyim bunu bile düşünüyorum.`);
    };

}


module.exports.reqEv = {
    event: "message",
    isim: "iltifat komutu"
};