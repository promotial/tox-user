Accounts.config({
  forbidClientAccountCreation: false,
  sendVerificationEmail: false
});

Accounts.onCreateUser(function(options, user) {
  if (!(options.profile.language)) {
    options.profile.language = "de";
  }
  user.profile = options.profile;
  return user;
});

Accounts.loginServiceConfiguration.remove({
  service: "facebook"
});
Accounts.loginServiceConfiguration.insert({
  service: "facebook",
  appId: "454019284709457",
  secret: "3fc81d45d6368de6d6ba8806b9ea49de"
});

Accounts.loginServiceConfiguration.remove({
  service: "twitter"
});
Accounts.loginServiceConfiguration.insert({
  service: "twitter",
  consumerKey: "e8L3SweotYqupGV8VYbUyg",
  secret: "pj5GtkUJRfHlUNCmv0YroOf5kEoO8TiZko6UK9SZQ"
});

Accounts.loginServiceConfiguration.remove({
  service: "google"
});
Accounts.loginServiceConfiguration.insert({
  service: "google",
  clientId: "491863669516.apps.googleusercontent.com",
  secret: "K05IgARKLokE6GFedl0HU3XV"
});


