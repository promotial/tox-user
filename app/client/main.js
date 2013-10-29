cordova = new Cordova();

Meteor.startup(function() {
  server.subscribe('calls');
  Meteor.subscribe('profiles');
  Session.set('openProfile', null);
  Deps.autorun(function () {
    if (Meteor.user()) {
      Session.set("language",Meteor.user().profile.language);
    }
  });
});
