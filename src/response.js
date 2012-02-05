function Response(request) {
  this.req = request;
}

Response.prototype = {
  reply: function(cb) {
    var self = this;
    var user = self.req.user;
    user.getPlan(function(err, data) {
      var msg;

      if(err) {
        msg = self.parseError(user.planfile, err);
     } else {
        msg = data;
     }

     cb(msg);
    });
  },

  parseError: function(plan, err) {
    var msg;

    switch(err.code) {
      case 'ENOENT':
        msg = "User doesn't have a plan.\n";
        break;
      default:
        console.log('Plan: ' + plan + ', Code: ' + err.code);
        msg = "Unable to open the user's plan.";
        break;
    }
    
    return msg;
  }
};