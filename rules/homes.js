exports.replyPattern = /https?:\/\/www\.homes\.co\.jp\/([a-z0-9\-.]+)[^\s]+/;

exports.reply = function(client, nick, to, dom)
{
  var items = [];
  items.push(dom('dd#chk-bkc-moneyroom > span').text());
  var tmp = dom('dd#chk-bkc-moneyroom').text().match(/\((.*?)\)/);
  items.push(tmp[1].trim());
  tmp = dom('dd#chk-bkc-moneyshikirei').text().split('/');
  items.push(tmp[1]);
  items.push(tmp[0]);
  tmp = dom('dd#chk-bkc-marodi').text().split('\n');
  items.push(tmp[0]);
  items.push(dom('dd#chk-bkc-housearea').text());
  items.push(dom('span#chk-bkh-type').text().replace('賃貸', ''));
  tmp = dom('dd#chk-bkc-kenchikudate').text().match(/\((.*?)\)/);
  items.push(tmp[1]);
  var contents = ['賃', '共', '礼', '敷'];
  for (var i=0; i<4; i++) {
    items[i] = contents[i] + items[i].trim();
  }
  var result = items.map(function(txt){return txt.trim();}).join(' ');
  client.notice(to, result);
}
