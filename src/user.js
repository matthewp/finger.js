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

  get projectfile () {
    return this.home + slash + '.project';
  },

  getPlan: function(cb) {
    fs.readFile(this.planfile, cb);
  }
};
