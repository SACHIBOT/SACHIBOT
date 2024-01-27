const config = require('../config')
const fg = require('api-dylux');
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/sachibot')
const cheerio = require('cheerio')
const axios = require("axios")
const vm = require('vm')
async function savefrom(urlL) {
let body = new URLSearchParams({ "sf_url": encodeURI(urlL), "sf_submit": "", "new": 2, "lang": "id", "app": "", "country": "id", "os": "Windows", "browser": "Chrome", "channel": " main", "sf-nomad": 1 });
let { data } = await axios({ "url": "https://worker.sf-tools.com/savefrom.php", "method": "POST", "data": body, "headers": { "content-type": "application/x-www-form-urlencoded", "origin": "https://id.savefrom.net", "referer": "https://id.savefrom.net/", "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36" }});
let exec = '[]["filter"]["constructor"](b).call(a);';
data = data.replace(exec, `\ntry {\ni++;\nif (i === 2) scriptResult = ${exec.split(".call")[0]}.toString();\nelse (\n${exec.replace(/;/, "")}\n);\n} catch {}`);
let context = { "scriptResult": "", "i": 0 };
vm.createContext(context);
new vm.Script(data).runInContext(context);
return JSON.parse(context.scriptResult.split("window.parent.sf.videoResult.show(")?.[1].split(");")?.[0])
}
cmd({
    pattern: "tiktok",
    alias: ["ttdl"],
    react: '🏷️',
    desc: "Download tiktok videos.",
    category: "download",
    use: '.tiktok <Tiktok link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('*Please give me tiktok url !!*')   
let data = await savefrom(`${q}`)
let l = data.meta
let dat = `*TIKTOK-DOWN 📱* 

*📃 Title:* ${l.title}
*⏳ Duration:* ${l.duration}`
reply(dat)
await conn.sendMsg(from, { video: { url: data.url[0].url}, caption: 'VIDEO NO WATERMARK'}, { quoted: mek })
await conn.sendMsg(from, { document: { url: data.url[1].url }, mimetype: 'audio/mpeg', fileName: 'TikTok Audio' + '.mp3',caption: `` }, { quoted: mek })
} catch (e) {
reply('*Error !!*')
l(e)
}
})