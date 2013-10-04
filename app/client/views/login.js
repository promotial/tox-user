Template.login.events({
  'click #login-btn': function (e, t) {
    e.preventDefault();

    var trimInput = function(val) {
      return val.replace(/^\s*|\s*$/g, "");
    };

    // retrieve the input field values
    var email = trimInput(t.find('#login-username').value);
    var password = t.find('#login-pass').value;

    if (password==="" || email==="") {
      Session.set('error',"Fill in all values");
      return false;
    }

    if (Session.get('register')) {
      var name = t.find('#name-val').value;
      if (password !== t.find('#clogin-pass').value) {
        return Session.set('error',"Passwords do not match");
        return false;
      }
      if (name==="") {
        return Session.set('error',"Please enter a name");
        return false;
      }
      Accounts.createUser({email:email,password:password,profile:{name:name}}, function(err) {
        if (err) {
          if (err.reason === "Match failed") {
            err.reason = "Fill in all values";
          }
          Session.set('error',err.reason);
        } else {
          server.subscribe('calls');
          Meteor.subscribe('profiles', email);
        }
      });
    } else {
      Meteor.loginWithPassword(email, password, function(err) {
        if (err) {
          if (err.reason === "Match failed") {
            err.reason = "Fill in all values";
          }
          Session.set('error',err.reason);
        } else {
          server.subscribe('calls');
          Meteor.subscribe('profiles', email);
        }
      });
    }
    return false;
  },
  'click #register-btn': function (e) {
    if (Session.get('register')) {
      Session.set('register',false);
      Session.set('error',null);
      e.currentTarget.value="Register";
    } else {
      Session.set('register',true);
      Session.set('error',null);
      e.currentTarget.value="Cancel";
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

