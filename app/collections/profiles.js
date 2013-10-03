Profiles = new Meteor.Collection('profiles');

Profiles.allow({
  remove: function() {
    return true;
  }
});

