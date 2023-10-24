/*const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const token = '6103239909:AAGVwiQmRX9MYjJw1GeBHfDCkMfoHe-voZw'
const SERVER_URL = 'https://6ce4-193-140-8-26.ngrok-free.app'
const TELEGRAM_API = `https://api.telegram.org/bot${token}`
const URI = `/webhook/${token}`
const webhookURL = `${SERVER_URL}${URI}`

const app = express()
app.use(bodyParser.json())

const init = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${webhookURL}&drop_pending_updates=true`)
  console.log(res.data)
}
app.post(URI, async(req, res) => {
  console.log(req.body);
  
  const chatId = req.body.message.chat.id
  const text = req.body.message.text
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: `You said: ${text}`
  })
})

app.listen(5000, async() => {
  console.log('Server is running on port 4000')
  await init()
})


//////////raw\\\\\\\\\\
const chatId = msg.chat.id;
const video = "video.mp4";

// Video gönderilmeden önce video hakkında bilgiyi al
bot.sendMessage(chatId, "Video indirme işlemi başladı").then(() => {
  // Video hakkında bilgiyi almak için bot.getFile kullanın
  bot.sendVideo(chatId, video, { caption: "Video hakkında bilgi alınıyor..." }).then((result) => {
    const file_id = result.video.file_id;

    // Video bilgilerini almak için bot.getFile kullanın
    bot.getFile(file_id).then((fileInfo) => {
      const videoTitle = "Video Başlığı: " + fileInfo.file_path;
      const duration = "Süre: " + result.video.duration + " saniye";
      const width = "Genişlik: " + result.video.width + " piksel";
      const height = "Yükseklik: " + result.video.height + " piksel";

      // Video hakkında bilgileri birleştirin ve caption olarak ekleyin
      const caption = videoTitle + "\n" + duration + "\n" + width + "\n" + height;
      
      // Videoyu tekrar gönderin ve bu sefer doğru caption ile
      bot.sendVideo(chatId, video, { caption });
    });
  });
});


//edit message caption
bot.sendMessage(chatId, "Video indirme işlemi başladı").then((message) => {
  const video = "video.mp4";
  bot.sendVideo(chatId, video, {caption: "0"}).then((result) => {
    console.log(result.video.file_id);
    let videoId = result.video.file_id;
    
    fs.unlinkSync('video.mp4');
    bot.editMessageCaption(`Video indirme işlemi tamamlandı.`, {
      chat_id: chatId,
      message_id: message.message_id
    });
    insertDb(url, videoId);
  });
});


*/


let b = 9582335
let mb = b / (1024*1024*1024)
console.log(mb)

const timestamp = 1695854847;
const date = new Date(timestamp * 1000);
console.log(date);





const data = [
  { kb: 125 },
  { kb: 7854 },
  { kb: 4415 }
];

// KB'ları toplamak için bir döngü kullanma
let totalKB = 0;

for (const item of data) {
  totalKB += item.kb;
}

console.log("Toplam KB: " + totalKB);
