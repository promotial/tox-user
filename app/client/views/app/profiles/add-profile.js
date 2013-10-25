Template.addProfile.events({
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

    Meteor.call('newProfile', params, function(error) {
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