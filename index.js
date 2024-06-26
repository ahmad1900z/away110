const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');
const crypto = require('crypto');
const moment = require('moment'); // مكتبة للتعامل مع التواريخ بشكل مرن

const LICENSE_FILE_PATH = 'license.txt'; // ملف الترخيص
const PUBLIC_KEY_PATH = 'publicKey.pem'; // ملف المفتاح العام
const EXPECTED_COMPANY_NAME = 'halabi'; // اسم الترخيص
const CHECK_INTERVAL = 10 * 60 * 1000; // تحقق كل 10 دقائق

const VACATION_ROLE_ID = '1237126800052588655'; // معرف دور الإجازة

// ربط MongoDB
mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// نموذج (Model) لرتب المستخدمين
const UserRoleSchema = new mongoose.Schema({
  userId: String,
  roles: [String],
  requestChannelId: String, // القناة التي تم فيها طلب الإجازة
  inVacation: Boolean, // حالة المستخدم إذا كان في إجازة
});

const UserRole = mongoose.model('UserRole', UserRoleSchema);

client.once('ready', () => {
  console.log(`ـﻛ ﻞﻤﻌﻳ ﺕﻮﺒﻟﺍ ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.content === 'إجازة') { // أمر لطلب الإجازة
    const member = message.member;

    const row = new MessageActionRow().addComponents(
      new MessageButton().setCustomId(`approve-${member.id}`).setLabel('قبول').setStyle('SUCCESS'),
      new MessageButton().setCustomId(`reject-${member.id}`).setLabel('رفض').setStyle('DANGER'),
      new MessageButton().setCustomId(`end-${member.id}`).setLabel('إنهاء الإجازة').setStyle('SECONDARY')
    );

    const adminChannel = client.channels.cache.get('1237126645530365993'); // معرف القناة الإدارية

    if (adminChannel) {
      const embed = new MessageEmbed()
        .setColor('#FFA500')
        .setTitle('طلب إجازة')
        .setDescription(`<@${member.id}> طلب إجازة. يرجى الموافقة أو الرفض باستخدام الأزرار أدناه.`)
        .setTimestamp();

      adminChannel.send({
        content: "@everyone",
        embeds: [embed],
        components: [row],
      });
    }

    const userEmbed = new MessageEmbed()
      .setColor('#00FF00')
      .setTitle('تم تقديم طلب الإجازة')
      .setDescription('تم إرسال طلب الإجازة إلى الإدارة. سنقوم بإعلامك عندما يتم اتخاذ قرار.')
      .setTimestamp();

    message.reply({ embeds: [userEmbed] });
  }
});

function _0xffeb(_0x484767,_0x19193d){const _0x88b253=_0x88b2();return _0xffeb=function(_0xffebb8,_0x53caaf){_0xffebb8=_0xffebb8-0x87;let _0x16ea33=_0x88b253[_0xffebb8];return _0x16ea33;},_0xffeb(_0x484767,_0x19193d);}const _0xe4f086=_0xffeb;(function(_0x155a75,_0x2ce717){const _0xa4eee2=_0xffeb,_0x40b8c2=_0x155a75();while(!![]){try{const _0x4bb679=parseInt(_0xa4eee2(0xa0))/0x1*(parseInt(_0xa4eee2(0x8b))/0x2)+parseInt(_0xa4eee2(0x87))/0x3*(parseInt(_0xa4eee2(0xb1))/0x4)+-parseInt(_0xa4eee2(0x97))/0x5*(parseInt(_0xa4eee2(0x98))/0x6)+parseInt(_0xa4eee2(0xaa))/0x7*(-parseInt(_0xa4eee2(0x92))/0x8)+-parseInt(_0xa4eee2(0x99))/0x9*(-parseInt(_0xa4eee2(0x9e))/0xa)+parseInt(_0xa4eee2(0x91))/0xb+-parseInt(_0xa4eee2(0xa7))/0xc;if(_0x4bb679===_0x2ce717)break;else _0x40b8c2['push'](_0x40b8c2['shift']());}catch(_0x2f957f){_0x40b8c2['push'](_0x40b8c2['shift']());}}}(_0x88b2,0x4a3c7),client['on'](_0xe4f086(0x9f),async _0x559efe=>{const _0xd8200a=_0xe4f086;if(!_0x559efe[_0xd8200a(0xa1)]())return;const _0x400ee4=_0x559efe['guild'],_0x46bea8=_0x400ee4['roles'][_0xd8200a(0x93)]['get'](VACATION_ROLE_ID);if(!_0x46bea8)return _0x559efe[_0xd8200a(0xb4)](_0xd8200a(0x8e));const _0x59eccb=_0x559efe[_0xd8200a(0x89)][_0xd8200a(0xad)]('-'),_0x45066e=_0x59eccb[0x0],_0x2636cb=_0x59eccb[0x1];if(_0x45066e==='approve'){const _0x23e9d7=await _0x400ee4[_0xd8200a(0x9c)][_0xd8200a(0x96)](_0x2636cb),_0x2281b9=_0x23e9d7['roles'][_0xd8200a(0x93)]['filter'](_0x5cbe26=>_0x5cbe26['id']!==_0x400ee4['id'])[_0xd8200a(0x95)](_0xd6cc6d=>_0xd6cc6d['id']);await UserRole[_0xd8200a(0xae)]({'userId':_0x23e9d7['id'],'requestChannelId':_0x559efe[_0xd8200a(0x90)]},{'roles':_0x2281b9,'inVacation':!![]},{'upsert':!![]}),_0x2281b9['forEach'](_0x2d56bd=>{const _0x5d88d2=_0xd8200a;_0x23e9d7[_0x5d88d2(0xa4)]['remove'](_0x2d56bd)[_0x5d88d2(0xa5)](console[_0x5d88d2(0xb2)]);}),_0x23e9d7[_0xd8200a(0xa4)]['add'](_0x46bea8)[_0xd8200a(0xa5)](console['error']);const _0x512bd9=new MessageEmbed()['setColor'](_0xd8200a(0x8a))[_0xd8200a(0x9d)](_0xd8200a(0x94))[_0xd8200a(0xa9)](_0xd8200a(0xa8)+_0x2636cb+'>')[_0xd8200a(0xa2)](),_0x494d30=await _0x400ee4[_0xd8200a(0x9c)][_0xd8200a(0x96)](_0x2636cb);_0x494d30&&await _0x494d30[_0xd8200a(0xb0)]({'embeds':[_0x512bd9]}),await _0x559efe[_0xd8200a(0xb4)]({'embeds':[_0x512bd9],'ephemeral':!![]});}else{if(_0x45066e===_0xd8200a(0xb5)){const _0x14a41d=new MessageEmbed()['setColor'](_0xd8200a(0x9b))[_0xd8200a(0x9d)](_0xd8200a(0xac))[_0xd8200a(0xa9)](_0xd8200a(0xa3)+_0x2636cb+'>')['setTimestamp'](),_0x30a8e7=await _0x400ee4['members']['fetch'](_0x2636cb);_0x30a8e7&&await _0x30a8e7[_0xd8200a(0xb0)]({'embeds':[_0x14a41d],'ephemeral':!![]});await _0x559efe[_0xd8200a(0xb4)]({'embeds':[_0x14a41d],'ephemeral':!![]});const _0x10c224=await UserRole[_0xd8200a(0xb3)]({'userId':_0x2636cb});if(_0x10c224&&_0x10c224[_0xd8200a(0x9a)]){const _0xb09c6d=_0x400ee4[_0xd8200a(0x8f)][_0xd8200a(0x93)][_0xd8200a(0x8d)](_0x10c224[_0xd8200a(0x9a)]);_0xb09c6d&&await _0xb09c6d[_0xd8200a(0xb0)]({'embeds':[_0x14a41d]});}}else{if(_0x45066e==='end'){const _0x1d31e7=await _0x400ee4['members']['fetch'](_0x2636cb);_0x1d31e7['roles'][_0xd8200a(0x88)](_0x46bea8)[_0xd8200a(0xa5)](console[_0xd8200a(0xb2)]);const _0x3a2cfd=await UserRole[_0xd8200a(0xb3)]({'userId':_0x2636cb});if(_0x3a2cfd){const _0x52f421=_0x3a2cfd[_0xd8200a(0xa4)];_0x52f421['forEach'](_0x209ad2=>{const _0x506d7b=_0xd8200a;_0x400ee4[_0x506d7b(0xa4)][_0x506d7b(0x93)]['has'](_0x209ad2)&&_0x1d31e7[_0x506d7b(0xa4)][_0x506d7b(0x8c)](_0x209ad2)['catch'](console[_0x506d7b(0xb2)]);}),await UserRole[_0xd8200a(0xab)]({'userId':_0x2636cb});}const _0x357173=new MessageEmbed()[_0xd8200a(0xaf)]('#0000FF')[_0xd8200a(0x9d)](_0xd8200a(0xa6))[_0xd8200a(0xa9)](_0xd8200a(0xb6)+_0x2636cb+'>')[_0xd8200a(0xa2)](),_0x277fb8=await _0x400ee4[_0xd8200a(0x9c)]['fetch'](_0x2636cb);_0x277fb8&&await _0x277fb8['send']({'embeds':[_0x357173]}),await _0x559efe[_0xd8200a(0xb4)]({'embeds':[_0x357173],'ephemeral':!![]});}}}}));function _0x88b2(){const _0x32fd17=['members','setTitle','40IhCYuf','interactionCreate','65551xSRUcA','isButton','setTimestamp','تم\x20رفض\x20طلب\x20الإجازة\x20لـ.\x20<@','roles','catch','إنهاء\x20الإجازة','995208EgXYNh','تمت\x20الموافقة\x20على\x20طلبك\x20للإجازة.\x20نتمنى\x20لك\x20إجازة\x20سعيدة!.\x20<@','setDescription','53907cMMUwG','deleteOne','رفض\x20الإجازة','split','updateOne','setColor','send','56QuTqsF','error','findOne','reply','reject','تم\x20إنهاء\x20إجازتك.\x20<@','97194YZuSTR','remove','customId','#00FF00','2rphSek','add','get','لم\x20يتم\x20العثور\x20على\x20دور\x20الإجازة.','channels','channelId','5023370FgPuVm','192mNWvxp','cache','طلب\x20الإجازة\x20مقبول','map','fetch','400AwqzMO','44316umXPvG','420561RQqodV','requestChannelId','#FF0000'];_0x88b2=function(){return _0x32fd17;};return _0x88b2();}

const _0x3c6d53=_0x253a;(function(_0x211b13,_0x41692f){const _0x40722a=_0x253a,_0x2b2d7c=_0x211b13();while(!![]){try{const _0x28d3ef=-parseInt(_0x40722a(0x1ab))/0x1*(-parseInt(_0x40722a(0x197))/0x2)+-parseInt(_0x40722a(0x19b))/0x3*(parseInt(_0x40722a(0x191))/0x4)+parseInt(_0x40722a(0x1a4))/0x5+parseInt(_0x40722a(0x1a6))/0x6*(-parseInt(_0x40722a(0x19d))/0x7)+parseInt(_0x40722a(0x199))/0x8+parseInt(_0x40722a(0x196))/0x9+parseInt(_0x40722a(0x1a8))/0xa*(-parseInt(_0x40722a(0x1aa))/0xb);if(_0x28d3ef===_0x41692f)break;else _0x2b2d7c['push'](_0x2b2d7c['shift']());}catch(_0x1ae6e6){_0x2b2d7c['push'](_0x2b2d7c['shift']());}}}(_0x53d3,0xd8226));function isLicenseValid(){const _0x5aaba6=_0x253a;if(!fs['existsSync'](LICENSE_FILE_PATH)||!fs[_0x5aaba6(0x198)](PUBLIC_KEY_PATH))return![];const _0x3eb81c=fs[_0x5aaba6(0x19f)](PUBLIC_KEY_PATH,'utf8'),_0x5766b1=fs[_0x5aaba6(0x19f)](LICENSE_FILE_PATH,_0x5aaba6(0x1a0)),_0x50209f=JSON[_0x5aaba6(0x1a3)](_0x5766b1),_0x3b444d=crypto['createVerify'](_0x5aaba6(0x1a5));_0x3b444d[_0x5aaba6(0x1a7)](JSON['stringify'](_0x50209f['license']));const _0x166d91=_0x3b444d[_0x5aaba6(0x19a)](_0x3eb81c,_0x50209f['signature'],_0x5aaba6(0x193)),_0x300ef7=moment(_0x50209f[_0x5aaba6(0x19c)][_0x5aaba6(0x19e)],'2024-05-13'),_0x29e980=moment()['isAfter'](_0x300ef7),_0x2a21fb=_0x50209f[_0x5aaba6(0x19c)][_0x5aaba6(0x192)]===EXPECTED_COMPANY_NAME;return _0x166d91&&!_0x29e980&&_0x2a21fb;}!isLicenseValid()&&(console[_0x3c6d53(0x1a2)](_0x3c6d53(0x194)),process['exit'](0x1));function _0x253a(_0x5ded81,_0x566b8f){const _0x53d355=_0x53d3();return _0x253a=function(_0x253a3f,_0x5b1130){_0x253a3f=_0x253a3f-0x190;let _0x22e3fd=_0x53d355[_0x253a3f];return _0x22e3fd;},_0x253a(_0x5ded81,_0x566b8f);}function _0x53d3(){const _0x3c55b9=['1476144rIrhgw','verify','3235398tqUFNc','license','2898658nWrwSY','expirationDate','readFileSync','utf8','nlink','error','parse','540575KkyfhM','SHA256','6jQSwTe','update','813370TopEJu','exit','121eTqzbO','1476511tyNmUu','watchFile','4fFEVPq','companyName','base64','الترخيص\x20غير\x20صالح،\x20منتهي\x20الصلاحية،\x20أو\x20اسم\x20الشركة\x20غير\x20صحيح.\x20لن\x20يتم\x20تشغيل\x20البوت.','الترخيص\x20أصبح\x20غير\x20صالح،\x20منتهي\x20الصلاحية،\x20أو\x20اسم\x20الشركة\x20غير\x20صحيح.\x20سيتم\x20إيقاف\x20البوت.','13530681SBkxtF','2VqXhWp','existsSync'];_0x53d3=function(){return _0x3c55b9;};return _0x53d3();}setInterval(()=>{const _0x3c7215=_0x3c6d53;!isLicenseValid()&&(console[_0x3c7215(0x1a2)](_0x3c7215(0x195)),process['exit'](0x1));},CHECK_INTERVAL),fs[_0x3c6d53(0x190)](LICENSE_FILE_PATH,(_0x11e64b,_0x7e56d3)=>{const _0x3054df=_0x3c6d53;_0x11e64b[_0x3054df(0x1a1)]===0x0&&(console[_0x3054df(0x1a2)]('تمت\x20إزالة\x20ملف\x20الترخيص.\x20يتم\x20إيقاف\x20البوت.'),process[_0x3054df(0x1a9)](0x1)),!isLicenseValid()&&(console[_0x3054df(0x1a2)](_0x3054df(0x195)),process['exit'](0x1));});

client.login('');
