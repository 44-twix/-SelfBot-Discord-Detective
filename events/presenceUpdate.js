const { MessageEmbed } = require('discord.js-selfbot-v13');
const { webhookUrl, kişi_id, sunucu_id } = require('../config.json');
const { sendWebhookMessage } = require('../utils/webhook');
const fetch = require('node-fetch');

function getDateTime() {
    return new Date().toLocaleString();
}

function translateStatus(status) {
    switch (status) {
        case 'online':
            return '🟢 Çevrimiçi';
        case 'idle':
            return '🟠 Boşta';
        case 'dnd':
            return '🔴 Rahatsız Etmeyin';
        case 'offline':
            return '🩶 Çevrimdışı';
        default:
            return status;
    }
}

function calculateTimeElapsed(startTime) {
    const now = new Date();
    const start = new Date(startTime);
    const diffMs = now - start;
    const diffSecs = Math.floor(diffMs / 1000) % 60;
    const diffMins = Math.floor(diffMs / 60000) % 60;
    const diffHrs = Math.floor(diffMs / 3600000);
    return `${diffHrs} saat ${diffMins} dakika ${diffSecs} saniye`;
}

module.exports = async (client, oldPresence, newPresence) => {
    if (!newPresence || !newPresence.guild || !newPresence.member) {
        console.log('Sunucu veya kullanıcı bilgisi eksik.');
        return;
    }
    if (newPresence.guild.id !== sunucu_id || newPresence.userId !== kişi_id) {
        return;
    }

    let cihazlar = [];
    if (newPresence.clientStatus) {
        if (newPresence.clientStatus.desktop) {
            cihazlar.push('🖥️ Masaüstü');
        }
        if (newPresence.clientStatus.mobile) {
            cihazlar.push('📱 Mobil');
        }
        if (newPresence.clientStatus.web) {
            cihazlar.push('🌐 Web');
        }
    }

    let cihazBilgisi = cihazlar.length > 0 ? cihazlar.join(', ') : 'Bilinmiyor';

    let aktiviteler = '';
    newPresence.activities.forEach(activity => {
        let elapsedTime = '';
        if (activity.timestamps && activity.timestamps.start) {
            elapsedTime = ` (${calculateTimeElapsed(activity.timestamps.start)})`;
        }
        switch (activity.type) {
            case 'PLAYING':
                aktiviteler += `Oyun: ${activity.name}${elapsedTime}\n`;
                break;
            case 'LISTENING':
                if (activity.name === 'Spotify') {
                    const sarkiLinki = `https://open.spotify.com/track/${activity.syncId}`;
                    aktiviteler += `Şarkı: ${activity.details} - ${activity.state} [Spotify'da Dinle](${sarkiLinki})${elapsedTime}\n`;
                } else {
                    aktiviteler += `Dinliyor: ${activity.name}${elapsedTime}\n`;
                }
                break;
            case 'WATCHING':
                aktiviteler += `İzliyor: ${activity.name}${elapsedTime}\n`;
                break;
            case 'STREAMING':
                aktiviteler += `Yayın: ${activity.name}${elapsedTime}\n`;
                break;
            case 'CUSTOM_STATUS':
                aktiviteler += `Özel Durum: ${activity.state}${elapsedTime}\n`;
                break;
            default:
                aktiviteler += `Aktivite: ${activity.name}${elapsedTime}\n`;
                break;
        }
    });

    if (!aktiviteler) {
        aktiviteler = 'Aktivite yok';
    }

    let eskiDurum = oldPresence ? translateStatus(oldPresence.status) : 'bilinmiyor';
    let yeniDurum = translateStatus(newPresence.status);
    if (oldPresence && oldPresence.status === newPresence.status && oldPresence.activities === newPresence.activities) {
        return;
    }

    let durumMesaji = `${newPresence.member.user.tag} adlı kullanıcının durumu ${eskiDurum} iken ${yeniDurum} oldu.`;
    if (newPresence.status === 'offline') {
        durumMesaji += ` En son aktif cihazlar: ${cihazBilgisi}.`;
        durumMesaji += `\nSon aktiviteler:\n${aktiviteler}`;
    }

    const embed = new MessageEmbed()
        .setTitle('Durum Güncellemesi')
        .setDescription(durumMesaji)
        .addField('Cihazlar', cihazBilgisi)
        .addField('Aktiviteler', aktiviteler)
        .setTimestamp();
    console.log(`${getDateTime()} - ${durumMesaji} Cihazlar: ${cihazBilgisi}, Aktiviteler: ${aktiviteler}`);
    sendWebhookMessage(webhookUrl, embed);
};
