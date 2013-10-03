Template.profiles.helpers({
  profiles: function() {
    return Profiles.find();
  }
});

Template.profiles.rendered = function() {
  Meteor.subscribe('profiles');
};

Template.profiles.events({
  "click .profile-delete": function(e) {
    Profiles.remove(e.currentTarget.id);
  }
});