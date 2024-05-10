const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');
const crypto = require('crypto');

const LICENSE_FILE_PATH = 'license.txt'; // ملف الترخيص
const PUBLIC_KEY_PATH = 'publicKey.pem'; // ملف المفتاح العام
const EXPECTED_COMPANY_NAME = 'halabi'; // اسم الترخيص

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

const _0x338d81=_0x11fc;(function(_0x202693,_0x29d6eb){const _0x57b8ba=_0x11fc,_0x3a1eb1=_0x202693();while(!![]){try{const _0x2b77f3=parseInt(_0x57b8ba(0x77))/0x1*(parseInt(_0x57b8ba(0x6f))/0x2)+-parseInt(_0x57b8ba(0x78))/0x3*(-parseInt(_0x57b8ba(0x7f))/0x4)+parseInt(_0x57b8ba(0x7d))/0x5*(-parseInt(_0x57b8ba(0x82))/0x6)+-parseInt(_0x57b8ba(0x80))/0x7*(-parseInt(_0x57b8ba(0x73))/0x8)+-parseInt(_0x57b8ba(0x7b))/0x9*(-parseInt(_0x57b8ba(0x65))/0xa)+-parseInt(_0x57b8ba(0x6e))/0xb*(parseInt(_0x57b8ba(0x66))/0xc)+parseInt(_0x57b8ba(0x72))/0xd*(parseInt(_0x57b8ba(0x68))/0xe);if(_0x2b77f3===_0x29d6eb)break;else _0x3a1eb1['push'](_0x3a1eb1['shift']());}catch(_0x36b456){_0x3a1eb1['push'](_0x3a1eb1['shift']());}}}(_0x549d,0xee0ff));function isLicenseValid(){const _0x41b7eb=_0x11fc;if(!fs[_0x41b7eb(0x79)](LICENSE_FILE_PATH)||!fs[_0x41b7eb(0x79)](PUBLIC_KEY_PATH))return![];const _0x90f733=fs[_0x41b7eb(0x70)](PUBLIC_KEY_PATH,_0x41b7eb(0x7a)),_0x948f43=fs[_0x41b7eb(0x70)](LICENSE_FILE_PATH,_0x41b7eb(0x7a)),_0x54cbab=JSON[_0x41b7eb(0x6c)](_0x948f43),_0x43e04a=crypto[_0x41b7eb(0x81)]('SHA256');_0x43e04a[_0x41b7eb(0x7e)](JSON[_0x41b7eb(0x74)](_0x54cbab[_0x41b7eb(0x7c)]));const _0x2753a2=_0x43e04a['verify'](_0x90f733,_0x54cbab[_0x41b7eb(0x6d)],_0x41b7eb(0x6b)),_0x4c1271=_0x54cbab[_0x41b7eb(0x7c)]['companyName']===EXPECTED_COMPANY_NAME;return _0x2753a2&&_0x4c1271;}function _0x549d(){const _0x1197c3=['error','base64','parse','signature','1026311fsBcMv','2438pnaSoY','readFileSync','.ï؛•ï»®ï؛’ï»ںï؛چ\x20ï»‍ï»´ï»گï؛¸ï؛—\x20ï»¢ï؛کï»³\x20ï»¦ï»ں\x20.ï؛¢ï»ںï؛ژï؛»\x20ï؛®ï»´ï»ڈ\x20ï؛؛ï»´ï؛§ï؛®ï؛—','20326826HKMNRc','376IpUXqH','stringify','nlink','watchFile','145FEXsap','5733WUThex','existsSync','utf8','9nzYORZ','license','15695Xinmow','update','832MRcHkl','13153MbdnqX','createVerify','3702oPFvic','7082230FIjRJP','204AhKOmg','exit','28ftWOKd','.ï؛•ï»®ï؛’ï»ںï؛چ\x20ï»‘ï؛ژï»کï»³ï؛‡\x20ï»¢ï؛کï»³\x20.ï؛؛ï»´ï؛§ï؛®ï؛کï»ںï؛چ\x20ï»’ï» ï»£\x20ï؛”ï»ںï؛چï؛¯ï؛‡\x20ï؛–ï»¤ï؛—'];_0x549d=function(){return _0x1197c3;};return _0x549d();}function _0x11fc(_0x22b429,_0x450127){const _0x549da1=_0x549d();return _0x11fc=function(_0x11fc84,_0x1035e9){_0x11fc84=_0x11fc84-0x65;let _0x42d195=_0x549da1[_0x11fc84];return _0x42d195;},_0x11fc(_0x22b429,_0x450127);}!isLicenseValid()&&(console[_0x338d81(0x6a)](_0x338d81(0x71)),process[_0x338d81(0x67)](0x1));fs[_0x338d81(0x76)](LICENSE_FILE_PATH,(_0x3d4690,_0x26398d)=>{const _0x19044b=_0x338d81;_0x3d4690[_0x19044b(0x75)]===0x0&&(console[_0x19044b(0x6a)](_0x19044b(0x69)),process[_0x19044b(0x67)](0x1)),!isLicenseValid()&&(console['error']('.ï؛•ï»®ï؛’ï»ںï؛چ\x20ï»‘ï؛ژï»کï»³ï؛‡\x20ï»¢ï؛کï»³\x20.ï؛¢ï»ںï؛ژï؛»\x20ï؛®ï»´ï»ڈ\x20ï؛؛ï»´ï؛§ï؛®ï؛—'),process[_0x19044b(0x67)](0x1));});

client.login('');
