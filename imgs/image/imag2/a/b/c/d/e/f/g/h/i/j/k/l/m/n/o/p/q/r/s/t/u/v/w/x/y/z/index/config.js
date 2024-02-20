const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID === undefined ? 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEwrYndLVEh2UlM5cThuYVJzRGZGMGZtT3dGMk83elZDcjVCOVM2d1pGND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOUxOaVB5M3NvVWhDdVQvb2RERDdOd01kYXZSbW1yeWZmeitOOTA5cVZIST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTRk1nazk1R1c2aW01ODJyVXdua3VYR2loRSs5L2NhbWYrenltckdqcDM0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3L0R5NFhnczVhd3lRVXpDWmI0LytFQmh5NUJkOVp3VW5kL0IxejFKcDI4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktDVHBhVW1VQUlHSU8vTjdpSUtIVGJpQ2dKTUIzRisyVnVVRFM0YkJ5M1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlEveGhlN2tKOU9nZUtXUnlFTGhxcmNKS3E2aHNscDdTQ2NKSkRHOEpFVUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0ZYblNjdC9ITzIxSmY5SWZueVRpSVNyRHJsVmsrVVZGRjA0V2ZuVEprWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUTdzUWhUK20xZVlmakNMa0lQdW15WFZ2VnErdVp4TDFLcGo4Sk56NWV3QT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik95ajVEdVFST1pRWndCWmlwRXpicDRPa0VBWUlkczIrRVlTVWxEc3JiNS9hOGtnYnBnRjFrcjdkY1BsT3UvbVpFWHlKYmp0c0JUV3lhZ0N4N0xnaUJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcsImFkdlNlY3JldEtleSI6IjNnWjdqdWhTMFpiN0JFZ05oVlh6bGVwNisvN2Q4cTJYbXFoVUJ3djFiMTg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3MjU4ODE5OTBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiREUwNUUwNTZDQjlFQzg0RjYzOTBBOTU2RDkxNDhFMDYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcwNjQ0OTEwM30seyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3MjU4ODE5OTBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRjIyNzFCNUFDMzUyMzdFMkVDM0Q2QTAwNDlBMjVGMjEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcwNjQ0OTEwNX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiMUJKT1dxZlBSdnFjZU53Y2dGNjBsZyIsInBob25lSWQiOiI4MDFhMmRkZC1kZWE3LTRiNmUtOTEyMC0yZGZkMWM5NTlmOWUiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaEZYN1lkSVhMWnY2QjBicUtsZk5VbVYzYmhzPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVBN0toRFNkcmdBTDBIbzFVelFyTkRYdk54az0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJNRFI1UDE3WCIsIm1lIjp7ImlkIjoiOTQ3MjU4ODE5OTA6MTlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiU2FjaGludGhhIFJhc2hhbiIsImxpZCI6IjE1NjA0MDU1NzU0MzQ3NzoxOUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ051VzVXc1F5TEhaclFZWUF5QUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Iis2aVIvbXZENmJxNjRSVlJrdHorcUlIMmZYVmFIYmNuNmQ4SzBXVll0amc9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImQweWZJME1NTjMweG5EbWFZUE85bTlyZm5FdHdtRzlxT215N0pZbGpheWdyRnlRSmF5QWhLRVl6Vkc2UE5pdlhkUUxjWXpFdWJIN0tTOFhMdzVDbEJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJYVnFVYW51RjhSUGhML3dWaEdHVDJNNWV5dHNoYXl3UUlCR29XWkkyYkdVV2tkOGV6YndKQkIvOWM2TWpxQzU2Kys0d1lyYk5vSWZkcWxsR3RzSzJCQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzI1ODgxOTkwOjE5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZ1b2tmNXJ3K202dXVFVlVaTGMvcWlCOW4xMVdoMjNKK25mQ3RGbFdMWTQifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MDY0NDkwOTksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTGxiIn0=' : process.env.SESSION_ID,
BOTNAME : process.env.BOTNAME === undefined ?'SACHIBOT': process.env.BOTNAME,
FOOTERNAME: process.env.FOOTERNAME === undefined ? '‌ꜱᴀᴄʜɪʙᴏᴛ': process.env.FOOTERNAME,
MAX_SIZE: process.env.MAX_SIZE === undefined ? '500': process.env.MAX_SIZE,/*add this in megabytes*/
ONLY_GROUP: process.env.ONLY_GROUP === undefined ? 'false' : process.env.ONLY_GROUP,
ONLY_ME: process.env.ONLY_ME === undefined ? 'true' : process.env.ONLY_ME,
ALIVE: process.env.ALIVE === undefined ? `Hello im alive now !!` : process.env.ALIVE,
LOGO: process.env.LOGO === undefined ? `https://telegra.ph/file/800b484e6723535f201b1.jpg` : process.env.LOGO,
DEVNUMBER: process.env.DEVNUMBER === undefined ? 'https://wa.me/94725881990?text=.request%20premium' : process.env.DEVNUMBER,
DEVBOT: process.env.DEVBOT === undefined ? '94761717506?text=.request%20trial' : process.env.DEVBOT
};
