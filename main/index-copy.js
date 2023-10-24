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
const admin = 5403720382;
const channel = -1001966613443;
bot.setWebHook(`${url}/bot${token}`);
app.use(express.json());

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});
//functions\\

//tiktok\\
async function checkTiktokDb(url,chatId) {
  const connection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWD,
    database: process.env.DBNAME,
  });
  try {
    const [rows, fields] = await connection.execute("SELECT * FROM tiktok WHERE url = ?", [`${url}`]);
    const found = rows.length > 0;
    if (found) {
      
      bot.sendVideo(chatId,`${rows[0].fileId}`,{caption: `${rows[0].title}`})
      // INSERT INTO  new data and send video
    } else {
      console.log("not found");
      //download video
exec(`yt-dlp -o "tiktok/video.mp4" ${url}`, async(error, stdout, stderr) => {
if (error) {
  console.error(`Hata oluştu: ${error.message}`);
  return;
}
if (stderr) {
  console.error(`Hata çıktısı: ${stderr}`);
  return;
}     //global variables  
      let msgId;
      let duration,width,height,file_size;
      const video = "tiktok/video.mp4";
  bot.sendVideo(chatId, video, {caption: "video"})
      .then((result) => {
          console.log(result.video.file_id);
          let videoId = result.video.file_id;
          msgId = result.message_id;
          [duration,width,height,file_size] = [result.video.duration,result.video.width,result.video.height,result.video.file_size]
          fs.unlinkSync('tiktok/video.mp4');
          let title =`|ℹ️Info:\n
|🔗Url: ${url},\n
|🎬Video resloution: ${width}x${height},\n
|⏱Duration: ${duration}s,\n
|💾File size: ${file_size}kb,\n
|📅Date: ${Date()}\n
↳Category: ${yamlLoad.category.tiktok}          
` 
          bot.editMessageCaption(title,{
        chat_id:chatId,
        message_id:msgId
      })
          insertTiktok(url, videoId,file_size,title);
        });
    });
      
    }
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
}
async function insertTiktok(url,fileId,file_size,title){
  const connection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWD,
    database: process.env.DBNAME,
  });
  try {
    const [insertResult, insertFields] = await connection.execute(
      `INSERT INTO tiktok (url,fileId,fileSize,title) VALUES (?, ?, ?, ?)`,
      [`${url}`,`${fileId}`,`${file_size}`,`${title}}`]
    );
  } catch (error) {
    console.log(error);
  }
  finally{
    connection.end();
  }
}
//facebook\\
async function checkFacebookDb(url,chatId) {
  const connection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWD,
    database: process.env.DBNAME,
  });
  try {
    const [rows, fields] = await connection.execute("SELECT * FROM facebook WHERE url = ?", [`${url}`]);
    const found = rows.length > 0;
    if (found) {
      
      bot.sendVideo(chatId,`${rows[0].fileId}`,{caption: `${rows[0].title}`})
      // INSERT INTO  new data and send video
    } else {
      console.log("not found");
      //download video
exec(`yt-dlp -o "facebook/video.mp4" '${url}'`, async(error, stdout, stderr) => {
if (error) {
  console.error(`Hata oluştu: ${error.message}`);
  return;
}
if (stderr) {
  console.error(`Hata çıktısı: ${stderr}`);
  return;
}     //global variables  
      let msgId;
      let duration,width,height,file_size;
      const video = "facebook/video.mp4";
  bot.sendVideo(chatId, video, {caption: "video"})
      .then((result) => {
          console.log(result.video.file_id);
          let videoId = result.video.file_id;
          msgId = result.message_id;
          [duration,width,height,file_size] = [result.video.duration,result.video.width,result.video.height,result.video.file_size]
          fs.unlinkSync('facebook/video.mp4');
          let title =`|ℹ️Info:\n
|🔗Url: ${url},\n
|🎬Video resloution: ${width}x${height},\n
|⏱Duration: ${duration}s,\n
|💾File size: ${file_size}kb,\n
|📅Date: ${Date()}\n
↳Category: ${yamlLoad.category.facebook}          
` 
          bot.editMessageCaption(title,{
        chat_id:chatId,
        message_id:msgId
      })
          insertFacebook(url, videoId,file_size,title);
        });
    });
      
    }
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
}
async function insertFacebook(url,fileId,file_size,title){
  const connection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWD,
    database: process.env.DBNAME,
  });
  try {
    const [insertResult, insertFields] = await connection.execute(
      `INSERT INTO facebook (url,fileId,fileSize,title) VALUES (?, ?, ?, ?)`,
      [`${url}`,`${fileId}`,`${file_size}`,`${title}}`]
    );
  } catch (error) {
    console.log(error);
  }
  finally{
    connection.end();
  }
}
//pornhub\\
async function checkPornhubDb(url,chatId) {
  const connection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWD,
    database: process.env.DBNAME,
  });
  try {
    const [rows, fields] = await connection.execute("SELECT * FROM others WHERE url = ?", [`${url}`]);
    const found = rows.length > 0;
    if (found) {
      
      bot.sendVideo(chatId,`${rows[0].fileId}`,{caption: `${rows[0].title}`})
      // INSERT INTO  new data and send video
    } else {
      console.log("not found");
      //download video
exec(`yt-dlp -o "others/video.mp4" ${url}`, async(error, stdout, stderr) => {
if (error) {
  console.error(`Hata oluştu: ${error.message}`);
  return;
}
if (stderr) {
  console.error(`Hata çıktısı: ${stderr}`);
  return;
}     //global variables  
      let msgId;
      let duration,width,height,file_size;
      const video = "others/video.mp4";
  bot.sendVideo(chatId, video, {caption: "video"})
      .then((result) => {
          console.log(result.video.file_id);
          let videoId = result.video.file_id;
          msgId = result.message_id;
          [duration,width,height,file_size] = [result.video.duration,result.video.width,result.video.height,result.video.file_size]
          fs.unlinkSync('others/video.mp4');
          let title =`|ℹ️Info:\n
|🔗Url: ${url},\n
|🎬Video resloution: ${width}x${height},\n
|⏱Duration: ${duration}s,\n
|💾File size: ${file_size}kb,\n
|📅Date: ${Date()}\n
↳Category: ${yamlLoad.category.phub}          
` 
          bot.editMessageCaption(title,{
        chat_id:chatId,
        message_id:msgId
      })
          insertPornhub(url, videoId,file_size,title);
        });
    });
      
    }
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
}
async function insertPornhub(url,fileId,file_size,title){
  const connection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWD,
    database: process.env.DBNAME,
  });
  try {
    const [insertResult, insertFields] = await connection.execute(
      `INSERT INTO others (url,fileId,fileSize,title) VALUES (?, ?, ?, ?)`,
      [`${url}`,`${fileId}`,`${file_size}`,`${title}}`]
    );
  } catch (error) {
    console.log(error);
  }
  finally{
    connection.end();
  }
}
//user\\
async function checkUserDb(chatId,firstName){
  const connection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWD,
    database: process.env.DBNAME,
  });
  try {
    const [rows,fields] = await connection.execute("SELECT * FROM users WHERE chatId = ?",[`${chatId}`]);
    const found = rows.length > 0;
    console.log(rows)
    if(found){
      console.log('user found')
    }else{
      console.log('user not found')
      const [insertResult, insertFields] = await connection.execute(
        `INSERT INTO users (chatId,firstName) VALUES (?,?)`,
        [`${chatId}`,`${firstName}`]
      );
    }
  } catch (error) {
    console.log(error);
  }finally{
    connection.end();
  }
}
//admin\\
async function adminDb(admin){
  const connection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWD,
    database: process.env.DBNAME,
  });
  try {
    const [rows,fields] = await connection.execute("SELECT * FROM users");
    let users = '\n'
    let toplam;
    for (const item of rows) {
      users +=`\n🔢Kullanıcı numarası: ${item.id},
🆔telegram-chat-id: ${item.chatId},
ℹ️Adı: ${item.firstName}\n`
    toplam = item.id
    }
    bot.sendMessage(admin,users,{parse_mode: 'Markdown'})
    bot.sendMessage(admin,`🔄Toplam kullanıcı sayısı: ${toplam}`)

    const [rows2,fields2] = await connection.execute("SELECT * FROM tiktok");
    let videos;
    let trafic = 0;
    for (const videoNumber of rows2) {
      videos=`\n⇓Toplam indirilen video sayısı: ${videoNumber.id},`
      trafic+=videoNumber.fileSize
      
    }
    trafic = trafic / (1024*1024*1024)
    bot.sendMessage(admin,videos,{parse_mode: 'Markdown'})
    bot.sendMessage(admin,`\n⇅Toplam gönderme trafiği ${trafic}GB`,{parse_mode: 'Markdown'})
  } catch (error) {
    console.log(error)
  }finally{
    connection.end();
  }
}

bot.onText(/\http/, async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    let url = new URL(text)
    if(url.hostname == 'tiktok.com' || 'www.tiktok.com'){
        //
        await checkTiktokDb(url,chatId)
        }
        else if(url.hostname == 'facebook.com' || 'www.facebook.com'){
        //
        await checkFacebookDb(url,chatId)
        }else if(url.hostname == "pornhub.com" || 'www.pornhub.com'){
          bot.sendMessage(chatId,`siz gönderdiğiniz link ${url.hostname}a ait`)
          await checkPornhubDb(url,chatId)
        }
        else{
        await bot.sendMessage(chatId,`siz gönderdiğiniz link veritabaında bulunaadı ama şu ${url.hostname}a ait`)
        }
});
bot.on('message', async msg => {
    const text = msg.text; 
    const chatId = msg.chat.id;
    const firstName = msg.chat.first_name;
    if(chatId == admin && text =='/start'){
      bot.sendMessage(chatId,yamlLoad.admin.hello)
    }
    if(chatId == admin && text =='/info'){
      await adminDb(chatId)
    }
    if (text === '/start') {
      await bot.sendMessage(chatId, `${yamlLoad.hello} ${firstName}!`);
      await bot.sendMessage(channel,  `hello channel`);
      await checkUserDb(chatId,firstName);
    }
})
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;


  bot.sendMessage(chatId, `✅Downloading:
█▒▒▒▒▒▒▒▒▒ 𝟏𝟎%`).then((sentMessage) => {
    const messageId = sentMessage.message_id;
    setTimeout(() => {
      bot.editMessageText(`██▒▒▒▒▒▒▒▒ 𝟐𝟎%`, { chat_id: chatId, message_id: messageId });
    }, 1000);
    setTimeout(() => {
      bot.editMessageText(`███▒▒▒▒▒▒▒ 3𝟎%`, { chat_id: chatId, message_id: messageId });
    }, 2000);
    setTimeout(() => {
      bot.editMessageText(`████▒▒▒▒▒▒ 𝟒𝟎%`, { chat_id: chatId, message_id: messageId });
    }, 3000);
    setTimeout(() => {
      bot.editMessageText(`█████▒▒▒▒▒ 𝟓𝟎%`, { chat_id: chatId, message_id: messageId });
    }, 4000);
    setTimeout(() => {
      bot.editMessageText(`██████▒▒▒▒ 6𝟎%`, { chat_id: chatId, message_id: messageId });
    }, 5000);
    setTimeout(() => {
      bot.editMessageText(`███████▒▒▒ 𝟕𝟎%`, { chat_id: chatId, message_id: messageId });
    }, 6000);
    setTimeout(() => {
      bot.editMessageText(`████████▒▒ 𝟖𝟎%`, { chat_id: chatId, message_id: messageId });
    }, 7000);
    setTimeout(() => {
      bot.editMessageText(`█████████▒ 9𝟎%`, { chat_id: chatId, message_id: messageId });
    }, 8000);
    setTimeout(() => {
      bot.editMessageText(`██████████ 𝟏𝟎𝟎%`, { chat_id: chatId, message_id: messageId });
    }, 9000);
  });
});
let downloadLoading = `
█▒▒▒▒▒▒▒▒▒ 𝟏𝟎%
██▒▒▒▒▒▒▒▒ 𝟐𝟎%
███▒▒▒▒▒▒▒ 3𝟎%
████▒▒▒▒▒▒ 𝟒𝟎%
█████▒▒▒▒▒ 𝟓𝟎%
██████▒▒▒▒ 6𝟎%
███████▒▒▒ 𝟕𝟎%
████████▒▒ 𝟖𝟎%
█████████▒ 9𝟎%
██████████ 𝟏𝟎𝟎%`






