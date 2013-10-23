Template.login.events({
  'click #login-btn': function (e, t) {
    e.preventDefault();

    var trimInput = function(val) {
      return val.replace(/^\s*|\s*$/g, "");
    };

    if (Session.get('register')) {
      // retrieve the input field values
      var email = trimInput(t.find('#login-username-register').value);
      var password = t.find('#login-pass-register').value;

      if (password==="" || email==="") {
        Session.set('error',"Fill in all values");
        return false;
      }
      var name = t.find('#register-name').value;
      if (password !== t.find('#register-cpass').value) {
        return Session.set('error',"Passwords do not match");
        return false;
      }
      if (name==="") {
        return Session.set('error',"Please enter a name");
        return false;
      }
      Accounts.createUser({email:email,password:password,profile:{name:name,language:"de"}}, function(err) {
        if (err) {
          if (err.reason === "Match failed") {
            err.reason = "Fill in all values";
          }
          Session.set('error',err.reason);
        } else {
          server.subscribe('calls');
          Meteor.subscribe('profiles');
        }
      });
    } else {
      // retrieve the input field values
      var email = trimInput(t.find('#login-username').value);
      var password = t.find('#login-pass').value;

      Meteor.loginWithPassword(email, password, function(err) {
        if (err) {
          if (err.reason === "Match failed") {
            err.reason = "Fill in all values";
          }
          Session.set('error',err.reason);
        } else {
          server.subscribe('calls');
          Meteor.subscribe('profiles');
        }
      });
    }
    return false;
  },
  'click #register-btn': function (e) {
    if (Session.get('register')) {
      Session.set('register',false);
      Session.set('error',null);
    } else {
      Session.set('register',true);
      Session.set('error',null);
    }
  }
});

Template.login.helpers({
  register: function() {
    return Session.get('register');
  },
  error: function() {
    return Session.get('error');
  }
});


