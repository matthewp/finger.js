var fs = require('fs'),
    net = require('net'),
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
    fs.readFile(this.planfile, cb);
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
    var user = self.req.user;
    user.getPlan(function(err, data) {
      var msg;

      if(err) {
        msg = self.parseError(user.planfile, err);
     } else {
        msg = data;
     }

     cb(msg);
    });
  },

  parseError: function(plan, err) {
    var msg;

    switch(err.code) {
      case 'ENOENT':
        msg = "User doesn't have a plan.";
        break;
      default:
        console.log('Plan: ' + plan + ', Code: ' + err.code);
        msg = "Unable to open the user's plan.";
        break;
    }
    
    return msg;
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
      stream.end();
    });
  });
}

server.listen(79);
