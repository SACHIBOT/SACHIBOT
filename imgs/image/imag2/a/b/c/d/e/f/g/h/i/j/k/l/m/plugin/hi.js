
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/sachibot')
cmd({
    pattern: "hi",
    react: "👋", 
    desc: "say hi.",
    category: "main",
    use: '.hi',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await reply('hello!!')
} catch (e) {
reply('*Error !!* hello')
l(e)
}
})