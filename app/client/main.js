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
    if (window.location.pathname.toLowerCase().slice(0,9)==='/profiles') {
      Router.go("/");
      alert("You Need an Internet Connection to Add or Edit Profiles");
    } else if (window.location.pathname.toLowerCase().slice(0,8)==='/newcall') {
      Router.go("/");
      var choice = confirm("No Internet Connection - Would you like to start a new call without sending any data?");
      if (choice === true) {
        window.location.href = "tel:+41-44-251-51-51";
      }
    }
  };
});