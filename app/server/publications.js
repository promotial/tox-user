Meteor.publish('profiles', function() {
  if (this.userId) {
    return Profiles.find({user:this.userId});
  }
});