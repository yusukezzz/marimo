exports.replyPattern = /https?:\/\/www\.athome\.co\.jp\/([a-z0-9\-.]+)[^\s]+/;

exports.reply = function(client, nick, to, dom)
{
  var items = [];
  items.push(dom('.price').text());
  items.push(dom('.upkeep').text());
  items.push(dom('.reward').text());
  var tmp = dom('.deposit').text().split('/');
  items.push(tmp[0]);
  items.push(dom('.layout').text());
  items.push(dom('.area').text());
  items.push(dom('.type').text().replace('賃貸', ''));
  items.push(dom('.completion').text());
  var contents = ['賃', '共', '礼', '敷'];
  for (var i=0; i<4; i++) {
    items[i] = contents[i] + items[i].trim();
  }
  var result = items.map(function(txt){return txt.trim();}).join(' ');
  client.notice(to, result);
}
