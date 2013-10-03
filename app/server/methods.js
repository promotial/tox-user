Meteor.methods({
  newCall: function (params) {
    if (!(this.userId)) {throw new Meteor.Error(401, "Access Denied!");}
    if (params.name && params.number && params.age && params.sex && params.weight) {
      var getDigits = function(number) {return number.toString().length;};
      if (params.loc) {check(params.loc, Match.ObjectIncluding({lat:Number, lon:Number}));};
      check(params.name, String);
      check(params.number, Match.Integer);
      check(params.age, Match.Integer);
      check(params.sex, Match.Integer);
      check(params.weight, Match.Integer);
      if (getDigits(params.number)===10 && getDigits(params.weight)<4 && params.age < 140 && (params.sex===1 || params.sex===0)) {
        params.secret="r4nx4NXCZsMEIPV8FJplpnIMKg28qP0HNpY2tXOl0nXzmvVLohr2HDYpyrT1w4Y";
        params.user=this.userId;
        server.call('newCall', params);
      }
    } else {
      throw new Meteor.Error(400, "Error: Not all values were entered.");
    }
  }
});