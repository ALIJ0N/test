const yaml = require('js-yaml')
const fs = require('fs')
const yamlFile = fs.readFileSync('yaml/cli.yml','utf-8')
const yamlLoad = yaml.load(yamlFile)
require('dotenv').config()
const { exec } = require('child_process');
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const url = process.env.URL;
const port = process.env.PORT;
const mysql = require('mysql2/promise');
const express = require('express')
const app = express()
const bot = new TelegramBot(token);
bot.setWebHook(`${url}/bot${token}`);
app.use(express.json());

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});
async function insertDb(url,fileId){
  const connection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWD,
    database: process.env.DBNAME,
  });
  try {
    const [insertResult, insertFields] = await connection.execute(
      `INSERT INTO tgbot (url, deger) VALUES (?, ?)`,
      [`${url}`, `${fileId}`]
    );
  } catch (error) {
    console.log(error);
  }
  finally{
    connection.end();
  }
}
async function checkDb(url,chatId) {
    const connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWD,
      database: process.env.DBNAME,
    });
    try {
      const [rows, fields] = await connection.execute("SELECT * FROM tgbot WHERE url = ?", [`${url}`]);
      const found = rows.length > 0;
      if (found) {
        console.log(rows[0].deger);
        bot.sendVideo(chatId,`${rows[0].deger}`)
        // INSERT INTO  new database and send video
      } else {
        console.log("not found");
        //download video
  exec(`yt-dlp -o "video.mp4" ${url}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Hata oluştu: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Hata çıktısı: ${stderr}`);
    return;
  }
        bot.sendMessage(chatId, "Video indirme işlemi başladı");
        const video = "video.mp4"
        bot.sendVideo(chatId, video, {caption: "0"}).then((result) => {
          console.log(result.video.file_id);
         let [duration,width,height] = [result.video.duration,result.video.width,result.video.height]
          
          let videoId = result.video.file_id
          
          insertDb(url,videoId)
          fs.unlinkSync('video.mp4')
        });
      });
        
      }
    } catch (err) {
      console.log(err);
    } finally {
      connection.end();
    }
  }

bot.onText(/\http/, async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text
    bot.sendMessage(chatId, "Komut alındı");

    let url = new URL(text)
    if(url.hostname == 'pornhub.com'){
        await bot.sendMessage(chatId,`siz gönderdiğiniz link ${url.hostname}a ait`)
        checkDb(url,chatId)
        
        }
        else if(url.hostname == 'tiktok.com' || 'www.tiktok.com'){
        await bot.sendMessage(chatId,`siz gönderdiğiniz link ${url.hostname}a ait`)
        }
        else if(url.hostname == 'facebook.com' || 'www.facebook.com'){
        await bot.sendMessage(chatId,`siz gönderdiğiniz link ${url.hostname}a ait`)
        }else{
        await bot.sendMessage(chatId,`siz gönderdiğiniz link veritabaında bulunaadı ama şu ${url.hostname}a ait`)
        }
});
bot.on('message', async msg => {
    const text = msg.text; 
    const chatId = msg.chat.id;
    const firstName = msg.chat.first_name;

    if (text === '/start') {
        await bot.sendMessage(chatId, `${yamlLoad.hello} ${firstName}!`);
    }
    if (text === '/info') {
        await bot.sendMessage(chatId, yamlLoad.info);
    }
})

