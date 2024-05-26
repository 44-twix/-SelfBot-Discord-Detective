const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function sendWebhookMessage(webhookUrl, embed) {
    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            embeds: [embed]
        })
    }).then(() => console.log('Webhook üzerinden mesaj gönderildi.'))
      .catch(err => console.error('Webhook mesajı gönderilirken bir hata oluştu:', err));
}

module.exports = { sendWebhookMessage };