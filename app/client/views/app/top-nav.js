Template.topNav.events({
  //log out button
  'click #logout-btn': function () {
    Meteor.logout();
    Router.go("/");
  }
});
