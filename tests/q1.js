var assert = require('assert'),
    finger = require('../finger.js');

(function() {

 var query = 'matthew';
 var req = new finger.Request(query);
 var resp = new finger.Response(req);
 resp.reply(function(msg) {
  console.log(msg);
  assert.ok(true);
 });

})();
