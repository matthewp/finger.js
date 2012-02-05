function Request(raw) {
  var data = raw.split('\r\n');
  if(data) {
    this.user = new User(data[0]);
  }
}

Request.prototype = {
  user: ''
};
