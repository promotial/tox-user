Meteor.methods({
  newCall: function (params) {
    if (!(this.userId)) {throw new Meteor.Error(401, "Access Denied!");}
    if (params.name && params.number && params.age && params.weight) {
      if (params.loc) {check(params.loc, Match.ObjectIncluding({lat:Number, lon:Number}));};
      check(params.name, String);
      check(params.number, String);
      check(params.age, Match.Integer);
      check(params.sex, Match.Integer);
      check(params.weight, Match.Integer);
      if (params.number.length===10 && params.weight<900 && params.age < 140 && (params.sex===1 || params.sex===0)) {
        params.secret="r4nx4NXCZsMEIPV8FJplpnIMKg28qP0HNpY2tXOl0nXzmvVLohr2HDYpyrT1w4Y";
        params.user=this.userId;
        server.call('newCall', params);
      }
    } else {
      throw new Meteor.Error(400, "Error: Not all values were entered.");
    }
  },
  newProfile: function (params) {
    if (!(this.userId)) {throw new Meteor.Error(401, "Access Denied!");}

    if (params.number && params.number !== "") {
      check(params.number, String);
    } else if (params.number === "") {params.number = undefined;}

    if (params.age !== null && params.age !== undefined && params.age !== "") {
      check(params.age, String);
      if (parseInt(params.age,10) > 140) {
        throw new Meteor.Error(400, "Error: Enter real age");
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
        throw new Meteor.Error(400, "Error: Enter real weight");
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

    throw new Meteor.Error(400, "Error: Please enter name");
  },
  updateProfile: function (params,id) {
    if (!(this.userId)) {throw new Meteor.Error(401, "Access Denied!");}

    if (params.number && params.number !== "") {
      check(params.number, String);
    } else if (params.number === "") {params.number = undefined;}

    if (params.age !== null && params.age !== undefined && params.age !== "") {
      check(params.age, String);
      if (parseInt(params.age,10) > 140) {
        throw new Meteor.Error(400, "Error: Enter real age");
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
        throw new Meteor.Error(400, "Error: Enter real weight");
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