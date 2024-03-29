userDocHandle = {
  ready: function () {
    if(!Accounts.loginServicesConfigured())
      return false;
    if(Meteor.loggingIn()) {
      return false;
    }
    return true;
  }
};

Router.configure({
  layoutTemplate: 'layout',

  //redirects users that aren't logged in to login page (all paths)
  before: function () {
    if (!Meteor.user()) {
      //start at login not register
      Session.set("register",false);

      window.parent.postMessage("loginPage", "*");

      // render the loginView but keep the url in the browser the same
      this.render('login');
      // stop the rest of the before hooks and the action function
      this.stop();
    } else {
      Session.set("lang", false);
      Session.set("loading", false);
      window.parent.postMessage("app", "*");
    }
  },

  //check user isn't logging in when doing login checks
  waitOn: function() {return userDocHandle;}
});

Router.map(function () {
  //renders home into appView on '/'
  this.route("home", {
    path: '/',
    template:"app",
    yieldTemplates: { 'home': {to: 'appView'} }
  });

  //renders profiles into appView on '/profiles'
  this.route("profiles", {
    template: "app",
    yieldTemplates: { 'profiles': {to: "appView"} },
    before: function() {
      if (window.onLine !== true) {
        alert("You Need an Internet Connection to Add or Edit Profiles");
        this.stop();
        this.redirect("/");
      }
    },
    waitOn: function() {
      return Meteor.subscribe('profiles', function() {
        if (Profiles.find({}).count()===0) {
          Meteor.call('newProfile',{name:Meteor.user().profile.name}, function() {
            Session.set('usedProfile',Profiles.findOne({})._id);
          })
        } else {Session.set('usedProfile',Profiles.findOne({})._id);};
      });
    }
  });

  //renders newCall into appView on '/newCall'
  this.route("newCall", {
    template: "app",
    yieldTemplates: { 'newCall': {to: "appView"} },
    before: function() {
      if (window.onLine !== true) {
        this.stop();
        this.redirect("/");
        var choice = confirm("No Internet Connection - Would you like to start a new call without sending any data?");
        if (choice === true) {
          window.location.href = "tel:+41-44-251-51-51";
        }
      }
    },
    waitOn: function() {
      return Meteor.subscribe('profiles', function() {
        if (Profiles.find({}).count()===0) {
          Meteor.call('newProfile',{name:Meteor.user().profile.name}, function() {
            Session.set('usedProfile',Profiles.findOne({})._id);
          })
        } else {Session.set('usedProfile',Profiles.findOne({})._id);};
      });
    }
  });

  //renders history into appView on '/history'
  this.route("history", {
    template: "app",
    yieldTemplates: { 'history': {to: "appView"} },
    waitOn: function() {return server.subscribe('calls',Meteor.userId());}
  });

  //renders about into appView on '/about'
  this.route("about", {
    template: "app",
    yieldTemplates: { 'about': {to: "appView"} }
  });

  this.route('editProfile', {
    path: '/profiles/edit/:_id',
    before: function() {
      //redirect users back to home "/" if profile doesn't exist
      if ( !Profiles.findOne({_id: this.params._id}) ) {
        this.redirect("/profiles");
        this.stop();
      }
    },
    action: function () {
      //data property can't yet change context of child yields so using session
      Session.set("openProfile",this.params._id);

      //renders editProfile into appView
      this.render("app");
      this.render('editProfile', { to: "appView" });
    },
    waitOn: function () {return Meteor.subscribe('profiles') }
  });

  this.route('viewCall', {
    path: '/history/:_id',
    before: function() {
      //redirect users back to home "/" if profile doesn't exist
      if ( !Calls.findOne({_id: this.params._id}) ) {
        this.redirect("/history");
        this.stop();
      }
    },
    action: function () {
      //data property can't yet change context of child yields so using session
      Session.set("openCall",this.params._id);

      //renders editProfile into appView
      this.render("app");
      this.render('viewCall', { to: "appView" });
    },
    waitOn: function () {return server.subscribe('calls',Meteor.userId());}
  });

  //renders profiles into appView on '/profiles'
  this.route("addProfile", {
    path: "/profiles/add",
    template: "app",
    yieldTemplates: { 'addProfile': {to: "appView"} }
  });

  //redirect all other urls to home ("/")
  this.route("notFound", {
    path: "*",
    action: function () {
      this.redirect("/");
    }
  });
});














