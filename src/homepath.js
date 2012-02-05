var slash;    
var homePath = (function() {
  var isWin = process.platform === 'win32',
      isMac = process.platform === 'darwin',
      home = isWin ? process.env['USERPROFILE'] :
        isMac ? '/Users/' : '/home/';

  slash = isWin ? '\\' : '/';

  return home.substring(0, home.lastIndexOf(slash));
})();
