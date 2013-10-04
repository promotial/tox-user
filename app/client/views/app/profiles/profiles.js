Template.profiles.helpers({
  profiles: function() {
    return Profiles.find({},{fields:{name:1,_id:1}});
  }
});

Template.profiles.rendered = function() {
  Meteor.subscribe('profiles', Meteor.user().emails[0].address);
};

Template.profiles.events({
  "click .profile-delete": function(e) {
    Profiles.remove(e.currentTarget.id);
  }
});