Template.loader.helpers({
  loading: function() {return Session.get("loading")}
})

Template.loader.events({
  'click .overlay': function() {return false}
})