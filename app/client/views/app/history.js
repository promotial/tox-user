Template.history.helpers({
  calls: function() {
    return Calls.find({}).fetch();
  }
});

Template.viewCall.helpers({
  comments: function() {
    var comments = Calls.findOne({_id:Session.get("openCall")}).comments;
    if (comments) {
      if (comments.length) {
        return comments;
      }
    }
    return false;
  }
});

