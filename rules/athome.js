exports.replyPattern = /https?:\/\/www\.athome\.co\.jp\/([a-z0-9\-.]+)[^\s]+/;

exports.reply = function(client, nick, to, dom)
{
  var items = [];
  items.push(dom('.price').text().trim());
  items.push(dom('.upkeep').text().trim());
  items.push(dom('.reward').text().trim());
  var tmp = dom('.deposit').text().trim().split('/');
  items.push(tmp[0].trim());
  items.push(dom('.layout').text().trim());
  items.push(dom('.area').text().trim());
  items.push(dom('.type').text().trim().replace('賃貸', ''));
  items.push(dom('.completion').text().trim());
  var contents = ['賃', '共', '礼', '敷'];
  for (var i=0; i<4; i++) {
    items[i] = contents[i] + items[i];
  }
  var result = items.join(' ');
  client.notice(to, result);
}
