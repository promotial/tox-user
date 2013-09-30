Router.configure({
  layoutTemplate: 'layout'
  //redirects users that aren't logged in to login page (all paths)
  /*before: function () {
    if (!Meteor.user()) {
      // render the login template but keep the url in the browser the same
      this.render('login');

      // stop the rest of the before hooks and the action function
      this.stop();
    }
  }*/
});

Router.map(function () {
  //individual call view by id
  /*
  this.route('callView', {
    path: '/calls/:_id',
    before: function() {
      //redirect users back to app "/" if call doesn't exist
      if ( !Calls.findOne({_id: this.params._id}) ) {
        this.redirect("/");
      }
    },
    action: function () {
      //data property can't yet change context of child yields so using session
      Session.set("openCall",this.params._id);

      //render app and then call view template
      this.render("app");
      this.render('callView', { to: "callTab" });
    }
  });*/

  //routes "/" to app
  this.route("app", {
    path: "/",
    yieldTemplates: { 'home': {to: 'appView'} }
  });

  //routes "/newCall" to newCall page
  this.route("newCall", {
    template: "app",
    yieldTemplates: { 'newCall': {to: "appView"} }
  });

  //redirect all other urls to app ("/")
  this.route("notFound", {
    path: "*",
    action: function () {
      this.redirect("/");
    }
  });
});