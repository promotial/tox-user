Template.newCall.events({
  'click #new-call-start': function (e, t) {
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
    if (t.find('#loc-toggle-checkbox').checked) {
      params.loc={lat:124,lon:325};
    }
    if (t.find('#sex-toggle-checkbox').checked) {
      params.sex=1;
    } else {params.sex=0;}
    Meteor.call('newCall',params, function(error) {
      if (error) {
        console.log(error.reason);
        /* alert with error message */
      }
    });
  },
  "change #call-profile-select": function(event) {
    Session.set('usedProfile',Profiles.findOne({_id: event.currentTarget.value})._id);
  }
});

Template.newCall.helpers({
  profile: function() {
    return Profiles.findOne({_id:Session.get("usedProfile")});
  },
  profileList:  function() {
    return Profiles.find({},{fields:{name:1,_id:1}});
  },
  female: function() {
    if (Profiles.findOne({_id:Session.get("usedProfile")}).sex===1) {
      return true;
    }
  }
});



