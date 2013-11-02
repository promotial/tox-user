Template.newCall.events({
  'click #init-call-btn': function (e, t) {
    Session.set("loading",true);

    var params = {};
    params.name = t.find('#call-profile-select').value;
    params.age = t.find('#age-input').value;
    params.number = t.find('#mobile-input').value;
    params.weight = t.find('#weight-input').value;
    params.sex = t.find('#gender-input').checked;
    params.locShare = !(t.find('#loc-share-input').checked);

    if (params.sex) {
      params.sex = 1;
    } else {params.sex = 0}

    params.loc = false;

    Meteor.call('newCall',params,function(error) {
      if (error.reason) {
        alert(error.reason);
      } else {
        window.location.href = "tel:+41-44-251-51-51";
      }
      Meteor.clearTimeout(timeout);
      Session.set("loading",false);
    });

    var timeout = Meteor.setTimeout(function() {
      alert("Request Timed Out" );
      Session.set("loading",false);
    },15000);
  },
  'click .attach-photo': function (e) {
    capturePhoto(e.currentTarget.id);
  },
  "change #call-profile-select": function(e) {
    Session.set('usedProfile',Profiles.findOne({_id: e.currentTarget.children[e.currentTarget.selectedIndex].id})._id);
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
    } else {return false;}
  },
  location: function() {
    return !(Profiles.findOne({_id:Session.get("usedProfile")}).locShare);
  },
  selected: function(id) {
    if (id===Session.get("usedProfile")) {
      return true;
    }
  }
});



