Template.newCall.events({
  'click #init-call-btn': function (e, t) {
    Session.set("loading", true);

    var timeout, params = {};
    params.name = t.find('#call-profile-select').value;
    params.age = t.find('#age-input').value;
    params.number = t.find('#mobile-input').value;
    params.weight = t.find('#weight-input').value;
    params.sex = t.find('#gender-input').checked;
    params.locShare = !(t.find('#loc-share-input').checked);
    params.photos = [];

    if (params.sex) {
      params.sex = 1;
    } else { params.sex = 0; }

    var newTimeout = function(time) {
      timeout = Meteor.setTimeout(function() {
        var choice = confirm("Request Timed Out - would you like to start the call without sending any data?");
        if (choice === true) {
          window.location.href = "tel:+41-44-251-51-51";
        }
        Session.set("loading",false);
      },time);
    };

    var newCall = function () {
      Meteor.call('newCall',params,function(error) {
        if (error) {
          alert(error.reason);
        } else {
          window.location.href = "tel:+41-44-251-51-51";
        }
        Meteor.clearTimeout(timeout);
        Session.set("loading", false);
      });
    };

    var addPhotos = function () {
      var photos = [];
      for (var i = 0; i < 3; i++) {
        var image = document.getElementById("attach-photo-"+i);
        if (image.src.slice(-12) !== "no-image.png") {
          photos[i] = image.src;
        }
      }
      if (photos.length > 0) {
        server.call('uploadPhotos',photos, function(error,result) {
          if (error) {
            Meteor.clearTimeout(timeout);
            var choice = confirm("Couldn't upload images - would you like to start the call without sending any images?");
            if (choice === true) {
              newTimeout(15000);
              newCall();
            } else {
              Session.set("loading",false);
            }
          } else if (result) {
            if (result.length === photos.length) {
              params.photos = result;
              newCall();
            } else {
              Meteor.clearTimeout(timeout);
              var choice = confirm("Couldn't upload images - would you like to start the call without sending any images?");
              if (choice === true) {
                newTimeout(15000);
                newCall();
              } else {
                Session.set("loading",false);
              }
            }
          }
        })
      } else {
        newCall()
      }
    }

    var getPosition = function(position) {
      params.loc = {lon:position.coords.longitude,lat:position.coords.latitude};
      addPhotos();
    };

    function getPositionError(err) {
      Meteor.clearTimeout(timeout);
      var choice = confirm("Couldn't get your location - would you like to start the call without sending a location?");
      if (choice === true) {
        params.locShare = false;
        params.loc = false;
        newTimeout(17000);
        addPhotos();
      } else {
        Session.set("loading",false);
      }
    }

    newTimeout(21000);

    if (params.locShare) {
      navigator.geolocation.getCurrentPosition(getPosition,getPositionError);
    } else {params.loc=false; addPhotos();}
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



