var slash;    
var homePath = (function() {
  var isWin = process.platform === 'win32',
      home = isWin ? process.env['USERPROFILE'] : '/home/';

  slash = isWin ? '\\' : '/';

  return home.substring(0, home.lastIndexOf(slash));
})();
