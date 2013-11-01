Meteor.methods({
  newCall: function (params) {
    if (!(this.userId)) {throw new Meteor.Error(401, "Access Denied!");}

    if (params.number && params.number !== "") {
      check(params.number, String);
    } else {throw new Meteor.Error(400, "Fill in all values");}

    if (params.age !== null && params.age !== undefined && params.age !== "") {
      check(params.age, String);
      if (parseInt(params.age,10) > 140) {
        throw new Meteor.Error(400, "Enter real age");
      }
    } else {throw new Meteor.Error(400, "Fill in all values");}

    if (params.sex !== null && params.sex !== undefined) {
      check(params.sex, Match.Integer);
      if (params.sex !== 1 && params.sex !== 0) {
        throw new Meteor.Error(400, "ERROR!");
      }
    } else {throw new Meteor.Error(400, "ERROR!");}

    if (params.weight !== null && params.weight !== undefined && params.weight !== "") {
      check(params.weight, String);
      if (parseInt(params.weight,10) > 900) {
        throw new Meteor.Error(400, "Enter real weight");
      }
    } else {throw new Meteor.Error(400, "Fill in all values");}

    if (params.locShare !== null && params.locShare !== undefined) {
      check(params.locShare, Boolean);
      if (params.locShare) {
        check(params.loc,{loc:String,lat:String})
      } else {if (params.loc !== false) {throw new Meteor.Error(400, "ERROR!");} }
    } else {throw new Meteor.Error(400, "ERROR!");}

    params.user=this.userId;

    if (params.name && params.name.length > 0) {
      check(params.name, String);
    } else {throw new Meteor.Error(400, "Fill in all values");}

    params.secret="r4nx4NXCZsMEIPV8FJplpnIMKg28qP0HNpY2tXOl0nXzmvVLohr2HDYpyrT1w4Y";
    server.call('newCall', params);
  },
  newProfile: function (params) {
    if (!(this.userId)) {throw new Meteor.Error(401, "Access Denied!");}

    if (params.number && params.number !== "") {
      check(params.number, String);
    } else if (params.number === "") {params.number = undefined;}

    if (params.age !== null && params.age !== undefined && params.age !== "") {
      check(params.age, String);
      if (parseInt(params.age,10) > 140) {
        throw new Meteor.Error(400, "Enter real age");
      }
    } else if (params.age === "") {params.age = undefined;}

    if (params.sex !== null && params.sex !== undefined) {
      check(params.sex, Match.Integer);
      if (params.sex !== 1 && params.sex !== 0) {
        throw new Meteor.Error(400, "ERROR!");
      }
    };

    if (params.weight !== null && params.weight !== undefined && params.weight !== "") {
      check(params.weight, String);
      if (parseInt(params.weight,10) > 900) {
        throw new Meteor.Error(400, "Enter real weight");
      }
    } else if (params.weight === "") {params.weight = undefined;}

    if (params.locShare !== null && params.locShare !== undefined) {
      check(params.locShare, Boolean);
    };

    params.user=this.userId;

    if (params.name && params.name.length > 0) {
      check(params.name, String);
      return Profiles.insert(params);
    }

    throw new Meteor.Error(400, "Please enter name");
  },
  updateProfile: function (params,id) {
    if (!(this.userId)) {throw new Meteor.Error(401, "Access Denied!");}

    if (params.number && params.number !== "") {
      check(params.number, String);
    } else if (params.number === "") {params.number = undefined;}

    if (params.age !== null && params.age !== undefined && params.age !== "") {
      check(params.age, String);
      if (parseInt(params.age,10) > 140) {
        throw new Meteor.Error(400, "Enter real age");
      }
    } else if (params.age === "") {params.age = undefined;}

    if (params.sex !== null && params.sex !== undefined) {
      check(params.sex, Match.Integer);
      if (params.sex !== 1 && params.sex !== 0) {
        throw new Meteor.Error(400, "ERROR!");
      }
    } else {throw new Meteor.Error(400, "ERROR!");}

    if (params.weight !== null && params.weight !== undefined && params.weight !== "") {
      check(params.weight, String);
      if (parseInt(params.weight,10) > 900) {
        throw new Meteor.Error(400, "Enter real weight");
      }
    } else if (params.weight === "") {params.weight = undefined;}

    if (params.locShare !== null && params.locShare !== undefined) {
      check(params.locShare, Boolean);
    } else {throw new Meteor.Error(400, "ERROR!");}

    params.user=this.userId;

    if (params.name && params.name.length > 0) {
      check(params.name, String);
    } else if (params.name === "") {params.name = undefined;}

    Profiles.update(id,{$set:params});
  }
});