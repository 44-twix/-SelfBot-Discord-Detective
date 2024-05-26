module.exports = (client) => {
    console.log(`${new Date().toLocaleString()} - Giriş yapıldı: ${client.user.tag}`);
};