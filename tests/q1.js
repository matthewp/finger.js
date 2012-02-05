var assert = require('assert'),
    exec = require('child_process').exec;

function finger(query, callback) {
  exec('finger ' + query, callback);
}

(function() {
  var query = 'matthew';
  finger(query, function(stdout, stderr) {
    console.log(stdout);
  });
})();
