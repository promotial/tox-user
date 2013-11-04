cordova = new Cordova();

Meteor.startup(function() {
  Meteor.subscribe('profiles');
  Session.set('openProfile', null);
  Session.set('openCall', null);
  Session.set("loading",false);
  Deps.autorun(function () {
    if (Meteor.user()) {
      Session.set("language",Meteor.user().profile.language);
      server.subscribe('calls',Meteor.userId());
      GroundDB(Calls);
      GroundDB.skipMethods({
        'newCall': true
      });
    }
  });
});