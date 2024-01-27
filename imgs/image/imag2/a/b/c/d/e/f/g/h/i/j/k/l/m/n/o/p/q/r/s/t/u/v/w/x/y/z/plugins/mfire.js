const config = require('../config')
const fg = require('api-dylux');
const { mediafireDl } = require('mfiredlcore-vihangayt')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/sachibot')
cmd({
    pattern: "mediafire",
    alias: ["mfire"],
    react: '📁',
    desc: "Download mediafire files.",
    category: "download",
    use: '.mediafire <mediafire link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('*Please give me google drive url*')
if (!q.includes('mediafire.com')) return reply('*Please give me google drive url*')
if (!q.includes('/file')) return reply('*Please give me google drive url*')
const baby1 = await mediafireDl(q)
if(baby1.size.includes('MB') && baby1.size.replace('MB','') > config.MAX_SIZE) return reply('*This file is too big !!*')
if(baby1.size.includes('GB')) return reply('*This file is too big !!*')
const mfile = conn.sendMsg(from, { document : { url : baby1.link}, fileName : baby1.name, mimetype: baby1.mime,caption: `*🧸 Name* : ${baby1.name}
*📊 Size* : ${baby1.size}
*🕹️ Mime* : ${baby1.mime}`}, {quoted: mek})	
await conn.sendMsg(from, { react: { text: '📁', key: mfile.key }})
} catch (e) {
reply('*Error !!*')
l(e)
}
})