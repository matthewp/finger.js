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
    console.log('Planfile located at ' + this.planfile);
    fs.readFile(this.planfile, cb);
  }
};
