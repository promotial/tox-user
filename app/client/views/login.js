Template.login.events({
  'click #login-btn': function (e, t) {
    var trimInput = function(val) {
      return val.replace(/^\s*|\s*$/g, "");
    };

    Session.set("loading",true);

    if (Session.get('register')) {
      // retrieve the input field values
      var email = trimInput(t.find('#login-username-register').value);
      var password = t.find('#login-pass-register').value;

      if (password==="" || email==="") {
        Session.set("loading",false);
        alert("Fill in all values");
        return false;
      }
      var uname = t.find('#register-name').value;
      if (password !== t.find('#register-cpass').value) {
        Session.set("loading",false);
        alert("Passwords do not match");
        return false;
      }
      if (uname==="") {
        Session.set("loading",false);
        alert("Please enter a name");
        return false;
      }
      Accounts.createUser({email:email,password:password,profile:{name:uname,language:"de"}}, function(err) {
        if (err) {
          if (err.reason === "Match failed") {
            err.reason = "Fill in all values";
          }
          Session.set("loading",false);
          alert( (err.reason != null) ? err.reason:"Unknown Error" )
        } else {
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
          Session.set("loading",false);
          alert( (err.reason != null) ? err.reason:"Unknown Error" )
        } else {
          Meteor.subscribe('profiles');
        }
      });
    }
    Meteor.setTimeout(function() {Session.set("loading",false);},4000);
    return false;
  },
  'click #register-btn': function (e) {
    if (Session.get('register')) {
      Session.set('register',false);
    } else {
      Session.set('register',true);
    }
  },
  'click .sign-in-btn': function(e) {
    Session.set("loading",true);

    var loginError = function(err) {
      if (err) {
        Session.set("loading",false);
        alert( (err.reason != null) ? err.reason:"Unknown Error" )
      } else {
        Meteor.subscribe('profiles');
      }
    };

    if (e.currentTarget.id === "facebook-sign-in") {
      Meteor.loginWithFacebook(loginError);
    }

    if (e.currentTarget.id === "twitter-sign-in") {
      Meteor.loginWithTwitter(loginError);
    }
    if (e.currentTarget.id === "google-sign-in") {
      Meteor.loginWithGoogle(loginError);
    }

    Meteor.setTimeout(function() {Session.set("loading",false);},4000);
    return false;
  }
});

Template.login.helpers({
  register: function() {
    return Session.get('register');
  }
});


