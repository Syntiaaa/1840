const {
  MessageEmbed
} = require("discord.js");
let sunucuayar = require("../models/sunucuayar");
let client = global.client;
module.exports = async (oldUser, newUser) => {
  if ((oldUser.username !== newUser.username) || (oldUser.discriminator !== newUser.discriminator)) {
    let ayarlar = await sunucuayar.findOne({})
    let yasaklıtag = ayarlar.BAN_TAG;
    let yasaklıtagRol = ayarlar.BANTAG;
    let boostRol = ayarlar.BOOST;
    let guild = client.guilds.cache.get(ayarlar.guildID);
    let user = guild.members.cache.get(oldUser.id);
    const embed = new MessageEmbed().setAuthor(user.displayName, user.user.avatarURL({
      dynamic: true
    })).setFooter(client.ayarlar.footer).setColor("RANDOM").setTimestamp();
    let log = client.channels.cache.get(ayarlar.TAGLOG);
    if (!log) return;
    if (newUser.username.includes(ayarlar.TAG) && !user.roles.cache.has(ayarlar.TEAM)) {
     await user.roles.add(ayarlar.TEAM).catch();
      log.send(embed.setDescription(`${user} kişisi ismine \`${ayarlar.TAG}\` sembolünü alarak <@&${ayarlar.TEAM}> ekibimize katıldı!`).setColor("#32FF00")).catch();
    } else if (!newUser.username.includes(ayarlar.TAG) && user.roles.cache.has(ayarlar.TEAM)) {
      if (newUser.discriminator === ayarlar.TAG2) return;
        await user.roles.remove(user.roles.cache.filter(rol => !rol.managed)).catch();
        await user.roles.add(ayarlar.UNREGISTER).catch();
        log.send(embed.setDescription(`${user} kişisi isminden \`${ayarlar.TAG}\` sembolünü çıkararak <@&${ayarlar.TEAM}> ekibimizden ayrıldı!`).setColor("#B20000")).catch();
    }
    if (newUser.discriminator == ayarlar.TAG2 && !user.roles.cache.has(ayarlar.TEAM)) {
      await user.roles.add(ayarlar.TEAM).catch();
      log.send(embed.setDescription(`${user} kişisi ismine \`${ayarlar.TAG2}\` etiketini alarak <@&${ayarlar.TEAM}> ekibimize katıldı!`).setColor("#32FF00")).catch();
    } else if (newUser.discriminator != ayarlar.TAG2 && user.roles.cache.has(ayarlar.TEAM)) {
      if (newUser.username.includes(ayarlar.TAG)) return;
        await user.roles.remove(user.roles.cache.filter(rol => !rol.managed)).catch();
        await user.roles.add(ayarlar.UNREGISTER).catch();
      log.send(embed.setDescription(`${user} kişisi isminden \`${ayarlar.TAG2}\` etiketini çıkararak <@&${ayarlar.TEAM}> ekibimizden ayrıldı!`).setColor("#B20000")).catch();
    }
    if (yasaklıtag.some(tag => newUser.username.includes(tag)) && !user.roles.cache.has(yasaklıtagRol)) {
      user.user.send(`İsmine yasaklı tag aldığın için sunucumuzda kısıtlandırıldın.`)
      await user.roles.set(user.roles.cache.get(boostRol) ? [boostRol, yasaklıtagRol] : [yasaklıtagRol]).catch(() => {});
    } else if (!yasaklıtag.some(tag => newUser.username.includes(tag)) && user.roles.cache.has(yasaklıtagRol)) {
user.user.send(`**Ne güzel ne güzel :)**
Yasaklı Tag'ı kaldırmışsın tekrardan **Hoşgeldin!**`)
        await user.roles.set(user.roles.cache.get(boostRol) ? ayarlar.UNREGISTER.push(boostRol) : ayarlar.UNREGISTER);      
    };
  };
};
