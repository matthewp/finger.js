function User(name) {
  this.name = name;
}

User.prototype = {
  name: '',

  errors: {},

  get home () {
    return homePath + slash + this.name;
  },

  get planfile () {
    return this.home + slash + '.plan';
  },

  get projectfile () {
    return this.home + slash + '.project';
  },

  get plan () {
    return this._plan;
  },

  set plan (p) {
    this._plan = p;
  },

  get project () {
    return this._project;
  },

  set project (p) {
    this._project = p;
  },

  getPlan: function(cb) {
    fs.readFile(this.planfile, cb);
  },

  getProject: function(cb) {
    fs.readFile(this.projectfile, cb);
  },

  getPlanAndProject: function(cb, type, err, data) {
    console.log(typeof type === 'undefined'
        ? 'Starting'
        : 'type: ' + type
          + ', cb: ' + typeof cb
          + ', err: ' + err
          + ', data: ' + data);

    var self = this, compose;

    if(typeof type === 'undefined') {
      compose = function(t) {
        return self.getPlanAndProject.bind(self, cb, t);
      }
      self.getPlan(compose('plan'));
      self.getProject(compose('project'));

      return;
    }

    self[type] = data;
    if(err)
      self.errors[type] = err;

    if(self.plan !== null && self.project !== null) {
      if(Object.keys(self.errors).length > 0)
        cb(self.errors, self.plan, self.project);
      else
        cb(null, self.plan, self.project);
    }
  }
};
