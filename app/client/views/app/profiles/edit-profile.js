Template.editProfile.helpers({
  check: function(value) {
    if (value !== null && value !== "" && value !== undefined) {
      return true;
    } else {return false;}
  },
  profile: function() {
    return Profiles.findOne({_id:Session.get("openProfile")});
  },
  female: function() {
    if (Profiles.findOne({_id:Session.get("openProfile")}).sex===1) {
      return true;
    } else {return false;}
  },
  location: function() {
    return !(Profiles.findOne({_id:Session.get("openProfile")}).locShare);
  }
});

Template.editProfile.events({
  "click #add-btn": function(e,t) {

    var trimInput = function (val) {
      return val.replace(/^\s*|\s*$/g, "");
    };

    // retrieve the input field values
    var params = {};
    params.name = trimInput(t.find('#name-input-profile').value);
    params.number = trimInput(''+t.find('#mobile-input-profile').value);
    params.weight = trimInput(''+t.find('#weight-input-profile').value);
    params.age = trimInput(''+t.find('#age-input-profile').value);
    params.locShare = false;
    params.sex = 0;
    if (!t.find('#locselect').checked) {
      params.locShare=true;
    }
    if (t.find('#sexselect').checked) {
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