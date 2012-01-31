var net = require('net'),
    os = require('os')
    server = net.createServer(connect);

var slash;    
var homePath = (function() {
  var isWin = process.platform === 'win32',
      home = process.env[isWin ? 'USERPROFILE' : 'HOME'];

  slash = isWin ? '\\' : '/';

  return home.substring(0, home.lastIndexOf(slash));
})();

function User(name) {
  this.name = name;
}

User.prototype = {
  name: '',

  get home () {
    return homePath + slash + this.name;
  },

  get planfile () {
    return this.home + slash + '.plan';
  },

  getPlan: function(cb) {
    // TODO retrieve the .plan

  }
};

function Request(raw) {
  var data = raw.split('\r\n');
  if(data) {
    this.user = new User(data[0]);
  }
}

Request.prototype = {
  user: ''
};

function Response(request) {
  this.req = request;
}

Response.prototype = {
  reply: function(cb) {
    var self = this;
    // TODO retrieve the user's .plan
  }
};

function connect (stream) {
  stream.setEncoding('utf8');
  stream.on('connect', function() {
    
  });

  stream.on('data', function(data) {
    var req = new Request(data),
        resp = new Response(req);
    
    resp.reply(function(msg) {
      stream.write(msg);
      stream.close();
    });
  });
}

server.listen(79);
