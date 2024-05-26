const { MessageEmbed } = require('discord.js-selfbot-v13');
const { webhookUrl, kişi_id } = require('../config.json');
const { sendWebhookMessage } = require('../utils/webhook');
const fetch = require('node-fetch');


function getDateTime() {
    return new Date().toLocaleString();
}

module.exports = async (client, oldUser, newUser) => {
    if (oldUser.id === kişi_id) {
        if (oldUser.avatar !== newUser.avatar) {
            const oldAvatarURL = oldUser.avatarURL() ? oldUser.avatarURL() : "Avatar yok";
            const newAvatarURL = newUser.avatarURL() ? newUser.avatarURL() : "Avatar yok";
            const embed = new MessageEmbed()
                .setTitle('Avatar Güncellemesi')
                .setDescription(`${newUser.tag} adlı kullanıcının yeni avatarı:`)
                .setImage(newAvatarURL)
                .setTimestamp();
            console.log(`${getDateTime()} - ${newUser.tag} adlı kullanıcının yeni avatarı: ${newAvatarURL}`);
            sendWebhookMessage(webhookUrl, embed);
        }
    }
};