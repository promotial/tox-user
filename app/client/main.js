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
  window.offLineHandler = function() {
    if (window.location.pathname.slice(0,9)==='/profiles') {
      alert("You Need an Internet Connection to Add or Edit Profiles");
      Router.go("/");
    }
  };
});