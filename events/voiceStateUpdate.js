const { MessageEmbed } = require('discord.js-selfbot-v13');
const { webhookUrl, kişi_id } = require('../config.json'); 
const { sendWebhookMessage } = require('../utils/webhook');
const fetch = require('node-fetch');

let voiceChannelJoinTimes = {};
let selfMuteTimes = {};
let selfDeafTimes = {};

function getDateTime() {
    return new Date().toLocaleString();
}

function getVoiceChannelMembers(channel) {
    if (!channel) return 'Kanalda kimse yok.';
    const members = channel.members.map(member => `${member.user.tag} (${member.id})`).join(', ');
    return members ? `Kanalda bulunan üyeler: ${members}` : 'Kanalda kimse yok.';
}

function formatDuration(duration) {
    return `${Math.floor(duration / 60)} dakika ${duration % 60} saniye`;
}

module.exports = async (client, oldState, newState) => {
    if (newState.member.id === kişi_id) {
        let yeniKanal = newState.channel;
        let eskiKanal = oldState.channel;
        
        const selfMuteDeğişikliği = oldState.selfMute !== newState.selfMute;
        const selfDeafDeğişikliği = oldState.selfDeaf !== newState.selfDeaf;
        const kanalDeğişikliği = oldState.channelId !== newState.channelId;

        let açıklama = '';

        if (kanalDeğişikliği) {
            if (yeniKanal) {
                açıklama += `<@${newState.member.user.id}> (${newState.member.user.tag}) adlı kullanıcı <#${yeniKanal.id}> (${yeniKanal.name}) adlı ses kanalına girdi.\n`;
                voiceChannelJoinTimes[newState.member.id] = new Date();
                açıklama += getVoiceChannelMembers(yeniKanal);
            } else if (!yeniKanal && eskiKanal) {
                let joinTime = voiceChannelJoinTimes[newState.member.id];
                let leaveTime = new Date();
                let duration = Math.floor((leaveTime - joinTime) / 1000);
                let durationMessage = formatDuration(duration);
                açıklama += `<@${newState.member.user.id}> (${newState.member.user.tag}) adlı kullanıcı <#${eskiKanal.id}> (${eskiKanal.name}) adlı ses kanalından ayrıldı. Kanalda kalınan süre: ${durationMessage}.\n`;
                delete voiceChannelJoinTimes[newState.member.id];
            }
        }

        if (selfMuteDeğişikliği) {
            if (newState.selfMute) {
                selfMuteTimes[newState.member.id] = new Date();
                açıklama += 'Kullanıcı kendini susturdu.\n';
            } else {
                let muteDuration = Math.floor((new Date() - selfMuteTimes[newState.member.id]) / 1000);
                açıklama += `Kullanıcı kendini susturmanın kaldırıldı. Susturma süresi: ${formatDuration(muteDuration)}.\n`;
                delete selfMuteTimes[newState.member.id];
            }
        }

        if (selfDeafDeğişikliği) {
            if (newState.selfDeaf) {
                selfDeafTimes[newState.member.id] = new Date();
                açıklama += 'Kullanıcı kendini sağırlaştırdı.\n';
            } else {
                let deafDuration = Math.floor((new Date() - selfDeafTimes[newState.member.id]) / 1000);
                açıklama += `Kullanıcı kendini sağırlaştırmanın kaldırıldı. Sağırlaştırma süresi: ${formatDuration(deafDuration)}.\n`;
                delete selfDeafTimes[newState.member.id];
            }
        }

        if (açıklama) {
            const embed = new MessageEmbed()
                .setTitle('Ses Kanalı Güncellemesi')
                .setDescription(açıklama)
                .setTimestamp();

            console.log(`${getDateTime()} - ${açıklama}`);
            sendWebhookMessage(webhookUrl, embed);
        }
    }
};