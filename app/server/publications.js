Meteor.publish('profiles', function(email) {
  if (this.userId) {
    return Profiles.find({user: {$in:[this.userId,email]} });
  }
});