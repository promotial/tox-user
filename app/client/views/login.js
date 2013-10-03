Template.login.events({
  'click #login-btn': function (e, t) {
    e.preventDefault();

    var trimInput = function(val) {
      return val.replace(/^\s*|\s*$/g, "");
    };

    // retrieve the input field values
    var email = trimInput(t.find('#login-username').value);
    var password = t.find('#login-pass').value;

    Meteor.loginWithPassword(email, password, function(err) {
      if (err) {
        console.log("Login Failed");
      } else {
        Meteor.subscribe('calls');
        Meteor.subscribe('profiles');
      }
    });

    return false;
  }
});