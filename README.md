# Discord Detective

Discord Detective, Discord'da belirlediğiniz kişinin her detayına kadar takip etmenize olanak sağlayan bir self-bottur.

## Özellikler

- 🎤 Sesli kanallara giriş ve çıkışları
- 🔇 Kendini sağır moduna alma ve çıkma durumları
- 🎮 Aktif, offline ve oyun aktiviteleri
- 💬 Attığı mesajlar ve paylaştığı görseller
- 🌐 Hangi platformdan giriş yaptığını
- 🖼️ Avatar değişikliği

## Kurulum

Projeyi kullanmaya başlamak için aşağıdaki adımları takip edin:

1. Projeyi GitHub'dan klonlayın veya indirin:

```bash
git clone https://github.com/kullaniciAdiniz/Discord-Watcher.git
```

2. Bağımlılıkları yükleyin:

```bash
cd Discord-Watcher
npm install
```

3. `config.json` dosyasını düzenleyerek botunuzun ayarlarını yapın:

```json
{
  "token": "HESAP_TOKENI",
  "webhookUrl": "WEBHOOK_URL",
  "kişi_id": "TAKIP_EDILECEK_KİSİ"
}
```

4. Botu başlatın:

```bash
npm start
```

## Kullanım

Botu başlattıktan sonra, ayarladığınız Discord sunucusunda belirtilen kullanıcıların aktivitelerini takip etmeye başlayacaktır. Webhook URL'si aracılığıyla belirli eventler için bildirimler alacaksınız.

## Lisans

Bu proje ISC lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

![Proje Görseli]([https://github.com/kullaniciAdiniz/Discord-Watcher/blob/main/images/proje-gorseli.png?raw=true](https://media.discordapp.net/attachments/1241655902587715665/1244427257959809127/b9OqM.png?ex=665512b2&is=6653c132&hm=e150c2e190cf64a543a168a57615feb24f77d73a443b8dbc8f1a8958c055b4db&=&format=webp&quality=lossless&width=351&height=174))
