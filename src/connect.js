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

