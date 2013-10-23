Template.editProfile.helpers({
  profile: function() {
    return Profiles.findOne({_id:Session.get("openProfile")});
  },
  female: function() {
    if (Profiles.findOne({_id:Session.get("openProfile")}).sex===1) {
      return true;
    }
  }
});

Template.editProfile.events({
  "click #new-call-save": function(e,t) {
    e.preventDefault();

    var trimInput = function (val) {
      return val.replace(/^\s*|\s*$/g, "");
    };

    // retrieve the input field values
    var params = {};
    params.name = trimInput(t.find('#call-name-input').value);
    params.number = ''+t.find('#call-mobile-input').value;
    params.weight = +t.find('#call-weight-input').value;
    params.age = +t.find('#call-age-input').value;
    params.locShare = false;
    params.sex = 0;
    if (t.find('#loc-toggle-checkbox').checked) {
      params.locShare=true;
    }
    if (t.find('#sex-toggle-checkbox').checked) {
      params.sex=1;
    }

    Meteor.call('updateProfile', params, Session.get("openProfile"), function(error) {
      if (error) {
        console.log(error.reason);
        /* alert with error message */
      } else {
        Router.go("/profiles");
      }
    });

    return false;
  }
});