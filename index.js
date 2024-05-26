const { Client, Intents, MessageEmbed } = require('discord.js-selfbot-v13');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES] });
const fetch = require('node-fetch');
const fs = require('fs');

const { token, webhookUrl } = require('./config.json');

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
}



async function sendWebhookMessage(embed) {
    const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            embeds: [embed]
        })
    }).then(() => console.log('Webhook üzerinden mesaj gönderildi.'))
        .catch(err => console.error('Webhook mesajı gönderilirken bir hata oluştu:', err));
}



client.login(token);