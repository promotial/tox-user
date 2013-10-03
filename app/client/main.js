cordova = new Cordova();
Meteor.startup(function() {
  server.subscribe('calls');
  Meteor.subscribe('profiles');
  Session.set('openProfile', null);
});
