const { MessageEmbed } = require('discord.js-selfbot-v13');
const { webhookUrl, kişi_id } = require('../config.json');
const { sendWebhookMessage } = require('../utils/webhook');

module.exports = async (client, message) => {
    if (message.author.id !== kişi_id || message.author.bot) return;
    let messageContent = message.content;
    if (message.attachments.size > 0) {
        message.attachments.forEach(attachment => {
            messageContent += `\nEklenen dosya: ${attachment.url}`;
        });
    }
    const messageLink = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`;
    const embed = new MessageEmbed()
        .setTitle('Yeni Mesaj')
        .setDescription(`<@${message.author.id}> (${message.author.tag})`)
        .addField('Mesaj Bilgisi', `Sunucu: ${message.guild.name} • Kanal: <#${message.channel.id}> (${message.channel.name})`)
        .addField('Mesaj İçeriği', messageContent)
        .addField('Mesaj Linki', `[Mesaja Git](${messageLink})`)
        .setTimestamp();

    sendWebhookMessage(webhookUrl, embed.toJSON()).catch(err => console.error('Webhook mesajı gönderilirken bir hata oluştu:', err));
};