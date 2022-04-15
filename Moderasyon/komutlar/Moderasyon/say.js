const {
    MessageEmbed,
    Discord
    } = require("discord.js");
    const conf = client.ayarlar;
    let mongoose = require("mongoose");
    let sunucuayar = require("../../models/sunucuayar");
    module.exports.run = async (client, message, args, durum,kanal) => {
    if (!message.guild) return;
    if(kanal) return
    let data = await sunucuayar.findOne({});
    let sunucuTAG = data.TAG;
    let etiketTAG = data.TAG2;
    let tag = await message.guild.members.cache.filter(member => member.user.username.includes(sunucuTAG)).size;
    let etiket = await message.guild.members.cache.filter(member => member.user.discriminator.includes(etiketTAG) && !member.user.username.includes(sunucuTAG)).size;
    
    let sesli = message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b);
    let embed = new MessageEmbed()
    .setColor("BLACK")
    .setDescription(`\`>\` Şu anda toplam **${sesli}** kişi seslide.
    \`>\` Sunucuda **${message.guild.memberCount}** adet üye var (**${message.guild.members.cache.filter(member => member.presence.status !== "offline").size}** Aktif)
    \`>\` Toplamda **${etiket}** kişi etiketimizi (${etiketTAG}) alarak bizi desteklemiş.
    \`>\` Toplamda **${tag}** kişi tagımızı (${sunucuTAG}) alarak bizi desteklemiş.
    \`>\` Toplamda **${etiket+tag}** kişi hem etiket hem tagımızı (${sunucuTAG} / ${etiketTAG}) alarak bizi desteklemiş.
    \`>\` Toplamda **${message.guild.premiumSubscriptionCount}** adet boost basılmış! ve Sunucu **${message.guild.premiumTier}** seviye`);
    message.channel.send(embed)
    }
    
    exports.conf = {
    aliases: ["sunucusay", "serversay", "Say"]
    };
    exports.help = {
    name: 'say'
    };