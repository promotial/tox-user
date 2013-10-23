Template.topNav.events({
  //log out button
  'click #logout-btn': function () {
    Meteor.logout();
    Router.go("/");
  },
  'click #flag-btn': function() {
    if (Session.get('lang')) {
      Session.set('lang',false);
    } else {
      Session.set('lang',true);
    }
    return false;
  },
  'click .lang-dropdown-flag': function(e) {
    Meteor.users.update(Meteor.userId(),{$set:{profile:{language:e.currentTarget.id}}});
    Session.set("LG",e.currentTarget.id);
  }
});

Template.topNav.helpers({
  lang: function() {
    return Session.get('lang');
  }
});