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
  pattern: "fb",
  react: '#️⃣',
  alias: ["fbdl"],
  desc: "Download fb videos.",
  category: "download",
  use: '.fb <Fb video link>',
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('*Please give facebook video url !!*')
let data = await savefrom(q)
let l = data.meta
let dat = `*FB-DOWN #️⃣*

*📃 Title:* ${l.title}
*⏱️ Duration:* ${l.duration}
*📎 Url:* ${l.source}`
await conn.sendMsg(from, { image: { url: data.thumb }, caption: dat }, { quoted: mek })
if(data.url[1]){
await conn.sendMsg(from, { video: { url: data.url[0].url }, caption: '*'+data.url[0].subname+' VIDEO*'}, { quoted: mek })
await conn.sendMsg(from, { video: { url: data.url[1].url }, caption: '*'+data.url[1].subname+' VIDEO*'}, { quoted: mek })
} else {
await conn.sendMsg(from, { video: { url: data.url[0].url }, caption: '*SD VIDEO*'}, { quoted: mek })
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})