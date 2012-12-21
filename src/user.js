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
    var self = this, compose;

    if(typeof type === 'undefined') {
      compose = function(t) {
        return self.getPlanAndProject.bind(self, cb, t);
      }
      self.getPlan(compose('plan'));
      self.getProject(compose('project'));

      return;
    }

    self[type] = data || null;
    self[type + '_d'] = true;
    
    if(err) {
      self.errors[type] = err;
    }

    if(exists(self['plan_d']) && exists(self['project_d'])) {
      if(Object.keys(self.errors).length > 0)
        cb(self.errors, self.plan, self.project);
      else
        cb(null, self.plan, self.project);
    }
  }
};
