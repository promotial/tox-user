Accounts.config({
  forbidClientAccountCreation: false,
  sendVerificationEmail: false
});

// Validate Email, sending a specific error message on failure.
Accounts.validateNewUser(function (user) {
  console.log(user);
  if (!(user.emails[0].address)) {
    throw new Meteor.Error(403, "Please enter an email");
  }
  if (!(user.profile.name)) {
    throw new Meteor.Error(403, "Please enter a name");
  }
  if (!(user.profile.language)) {
    throw new Meteor.Error(403, "ERROR!");
  }
  return true;
});

