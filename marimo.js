var fs = require('fs');
var irc = require('irc');
var request = require('request');
var cheerio = require('cheerio');

Marimo = function()
{
  var config;
  var rules;
  var client;
}

Marimo.prototype.loadConfig = function(filePath, callback)
{
  var marimo = this;
  fs.readFile(filePath, 'utf8', function(error, data){
    if (error) {
      throw error;
    }
    marimo.config = JSON.parse(data);
    console.log('loadConfig');
    marimo.loadRules();
    console.log('loadRules');
    if (callback) {
      callback.call();
    }
  });
}

Marimo.prototype.loadRules = function()
{
  var marimo = this;
  var rules = [];
  var files = fs.readdirSync('./rules');
  for (var i=0; i<files.length; i++) {
    var name = files[i].replace('.js', '');
    var time = new Date().getTime();
    var srcPath = './rules/' + name + '.js';
    var dstPath = './tmp/' + name + time;
    fs.linkSync(srcPath, dstPath);
    rules[i] = require(dstPath);
    fs.unlinkSync(dstPath);
  }
  console.log(rules);
  marimo.rules = rules;
}

Marimo.prototype.eventMessage = function(marimo, nick, to, text)
{
  for (var i=0; i<marimo.rules.length; i++){
    var rule = marimo.rules[i];
    var result = text.match(rule.replyPattern);
    if (result) {
      console.log(rule.replyPattern);
      marimo.fetchDocument(result[0], function(dom){
        rule.reply.call(null, marimo.client, nick, to, dom);
      });
    }
  }
}

Marimo.prototype.fetchDocument = function(page_url, callback)
{
  try {
    var opts = {url : page_url, encoding : null, headers : {"User-Agent": "marimo"}};
    request.get(opts, function(err, response, body){
      var dom = null;
      if (err) {
        console.log(err)
        return null;
      }
      dom = cheerio.load(body, {lowerCaseTags:true, xmlMode:true});
      if (callback) {
        callback.call(null, dom);
      }
    });
  } catch(e) {
    console.log(e);
  }
}

Marimo.prototype.start = function(configFile)
{
  var marimo = this;
  marimo.loadConfig(configFile, function() {
    var options = marimo.config['options'];
    options['autoConnect'] = false;
    var client = new irc.Client(marimo.config['server'], marimo.config['nick'], options);
    marimo.client = client;
    // events
    client.addListener('message', function(nick, to, text) {
      marimo.eventMessage(marimo, nick, to, text);
    });
    client.connect();
  });
  // watch config file.
  fs.watchFile(configFile, function(current, prev) {
    if(current.mtime > prev.mtime) {
      marimo.loadConfig(configFile, null);
    }
  });
}

exports.getInstance = new Marimo();
