exports.replyPattern = /https?:\/\/www\.homes\.co\.jp\/([a-z0-9\-.]+)[^\s]+/;

exports.reply = function(client, nick, to, dom)
{
  var items = [];
  items.push(dom('dd#chk-bkc-moneyroom > span').text().trim());
  var tmp = dom('dd#chk-bkc-moneyroom').text().trim().match(/\((.*?)\)/);
  items.push(tmp[1].trim());
  tmp = dom('dd#chk-bkc-moneyshikirei').text().trim().split('/');
  items.push(tmp[1].trim());
  items.push(tmp[0].trim());
  tmp = dom('dd#chk-bkc-marodi').text().trim().split('\n');
  items.push(tmp[0].trim());
  items.push(dom('dd#chk-bkc-housearea').text().trim());
  items.push(dom('span#chk-bkh-type').text().trim().replace('賃貸', ''));
  tmp = dom('dd#chk-bkc-kenchikudate').text().trim().match(/\((.*?)\)/);
  items.push(tmp[1].trim());
  var contents = ['賃', '共', '礼', '敷'];
  for (var i=0; i<4; i++) {
    items[i] = contents[i] + items[i];
  }
  var result = items.join(' ');
  client.notice(to, result);
}
