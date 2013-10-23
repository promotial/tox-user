Accounts.config({
  forbidClientAccountCreation: false,
  sendVerificationEmail: false
});

// Validate Email, sending a specific error message on failure.
Accounts.validateNewUser(function (user) {
  if (user.emails[0].address) {
    return true;
  }
  throw new Meteor.Error(403, "Please enter an email");
});

Accounts.onCreateUser(function(options, user) {
  if (options.profile.name) {
    return user;
  }
  throw new Meteor.Error(403, "Please enter name");
});
