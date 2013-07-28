exports.replyPattern = /https?:\/\/suumo\.jp\/([a-z0-9\-.]+)[^\s]+/;

exports.reply = function(client, nick, to, dom)
{
  var items = [];
  var table = 'table.data_table:nth-child(4) > tr:nth-child(2) > ';
  var child_nums = ['3', '4', '5', '7'];
  child_nums.forEach(function(num){
    dom(table + ' td:nth-child(' + num + ')').html().split('<br>').forEach(function(v){
      items.push(v.replace(/<\/?[^>]+>/gi, '').trim());
    });
  });
  var contents = ['賃', '共', '礼', '敷'];
  for (var i=0; i<4; i++) {
    items[i] = contents[i] + items[i];
  }
  var result = items.join(' ');
  client.notice(to, result);
}
