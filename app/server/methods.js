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
    if (params.name) {
      check(params.name, String);
    }
    if (params.number) {
      check(params.number, String);
      if (params.number.length>8 && params.number.length<16) {
        throw("Error: Enter real mobile number");
      }
    }
    if (params.age !== null && params.age !== undefined) {
      check(params.age, Match.Integer);
      if (params.number.age < 140) {
        throw("Error: Enter real age");
      }
    }
    if (params.sex !== null && params.sex !== undefined) {
      check(params.sex, Match.Integer);
      if (params.sex !== 1 && params.sex !== 0) {
        throw("ERROR!");
      }
    }
    if (params.weight !== null && params.weight !== undefined) {
      check(params.weight, Match.Integer);
      if (params.weight < 900) {
        throw("Error: Enter real weight");
      }
    }
    if (params.locShare !== null && params.locShare !== undefined) {
      check(params.locShare, Boolean);
    }
    params.user=this.userId;
    Profiles.insert(params);
  },
  updateProfile: function (params,id) {
    if (params.name) {check(params.name, String);}
    if (params.number) {
      check(params.number, String);
      if (params.number.length!==10) {
        throw("Error: Enter real mobile number");
      }
    }
    if (params.age) {
      check(params.age, Match.Integer);
      if (params.age > 139) {
        throw("Error: Enter real age");
      }
    }
    if (params.sex !== null) {
      check(params.sex, Match.Integer);
      if (!(params.sex===1 || params.sex===0)) {
        throw("ERROR!");
      }
    }
    if (params.weight) {
      check(params.weight, Match.Integer);
      if (params.weight > 899) {
        throw("Error: Enter real weight");
      }
    }
    if (params.locShare !== null) {check(params.locShare, Boolean);}

    Profiles.update(id,{$set:params});
  }
});