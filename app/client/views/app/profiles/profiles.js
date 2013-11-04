Template.profiles.helpers({
  profiles: function() {
    return Profiles.find({},{fields:{name:1,_id:1}});
  }
});

Template.profiles.events({
  "click .profile-delete": function(e) {
    Profiles.remove(e.currentTarget.id, function(error) {
      if (Profiles.find({}).count()===0) {
        Meteor.call('newProfile',{name:Meteor.user().profile.name}, function() {
          Session.set('usedProfile',Profiles.findOne({})._id);
        })
      } else {Session.set('usedProfile',Profiles.findOne({})._id);};
    });
  }
});
