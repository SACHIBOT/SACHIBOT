const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID === undefined ? '' : process.env.SESSION_ID,
BOTNAME : 'MOVIE-MYSTIC',
FOOTERNAME: '‌ꜱᴀᴄʜɪʙᴏᴛ',
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE === undefined ? 'false' : process.env.ALWAYS_ONLINE,
MAX_SIZE: process.env.MAX_SIZE === undefined ? '500': process.env.MAX_SIZE,/*add this in megabytes*/
ONLY_GROUP: process.env.ONLY_GROUP === undefined ? 'false' : process.env.ONLY_GROUP,
ONLY_ME: process.env.ONLY_ME === undefined ? 'true' : process.env.ONLY_ME,
ALIVE: process.env.ALIVE === undefined ? `🍿 *Welcome to ${BOTNAME} !* 🍿\n\n🎬 _Get ready for an incredible movie experience!_ 🎬\n\n📥 _Simply send me the name of the movie you want to download, and I'll provide you with direct download links._\n\n🌟 _No more hassle, just pure entertainment at your fingertips!_ 🌟\n\n🔥 _Let's dive into the world of movies together!_ 🔥\n\n${FOOTERNAME}` : process.env.ALIVE,
LOGO: `https://telegra.ph/file/800b484e6723535f201b1.jpg`,
DEVNUMBER: '94725881990',
DEVBOT: '94761717506'
};
