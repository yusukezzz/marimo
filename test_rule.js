var marimo = require('./marimo.js').getInstance;
var text = process.argv[2];
var conf_file = './config.json';

var DummyClient = function() {}
DummyClient.prototype.notice = function (target, text) {
  console.log(text);
}

if ( ! text) {
  console.log('null text given.');
  process.exit(1);
}

marimo.loadConfig(conf_file, function()
{
  marimo.client = new DummyClient();
  marimo.eventMessage(marimo, 'nick', 'to', text);
});
