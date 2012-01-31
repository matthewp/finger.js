var net = require('net'),
    server = net.createServer(connect);

function User(name) {
  this.name = name;
}

User.prototype = {
  name: '',

  get home () {
    if(!this.name) {
      return '';
    }

    return '/home/' + this.name;
  },

  get planfile () {
    if(!this.name) {
      return '';
    }

    return this.home + '/.plan';
  },

  get plan () {

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

function connect(stream) {
  stream.setEncoding('utf8');
  stream.on('connect', function() {
    console.log('Connection created.');
  });

  stream.on('data', function(data) {
    var req = new Request(data);

    console.log(req.user.planfile);
  });
}

server.listen(79);
