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

      // render the loginView but keep the url in the browser the same
      this.render('login');

      // stop the rest of the before hooks and the action function
      this.stop();

    } else {
      Session.set("error",null);
      Session.set("lang",false);
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
      if (Profiles.find().count()===0) {
        Meteor.call('newProfile',{name:Meteor.user().profile.name}, function() {
          Session.set('usedProfile',Profiles.findOne({})._id);
        })
      } else {Session.set('usedProfile',Profiles.findOne({})._id);};
    },
    waitOn: function() {
      return Meteor.subscribe('profiles');
    }
  });

  //renders newCall into appView on '/newCall'
  this.route("newCall", {
    template: "app",
    yieldTemplates: { 'newCall': {to: "appView"} },
    before: function() {
      if (Profiles.find().count()===0) {
        Meteor.call('newProfile',{name:Meteor.user().profile.name}, function() {
          Session.set('usedProfile',Profiles.findOne({})._id);
        })
      } else {Session.set('usedProfile',Profiles.findOne({})._id);};
    },
    waitOn: function() {
      return Meteor.subscribe('profiles');
    }
  });

  //renders history into appView on '/history'
  this.route("history", {
    template: "app",
    yieldTemplates: { 'history': {to: "appView"} }
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














