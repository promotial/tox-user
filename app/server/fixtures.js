if (Meteor.users.find().count() === 0) {
  Accounts.createUser({email:"user@example.com",password:"test",username:"Danny Smith"});
  Profiles.insert({
    user: Meteor.users.findOne({username:"Danny Smith"})._id,
    locShare: true,
    name: "John Doe",
    number: '0423512256',
    age: 19,
    sex: 0,
    weight: 23
  });
  Profiles.insert({
    user: Meteor.users.findOne({username:"Danny Smith"})._id,
    locShare: false,
    name: "Mary Sue",
    number: '0423512256',
    age: 19,
    sex: 1,
    weight: 23
  });
  Profiles.insert({
    user: Meteor.users.findOne({username:"Danny Smith"})._id,
    locShare: true,
    name: "Joe Bloggs",
    number: '0423512256',
    age: 19,
    sex: 0,
    weight: 23
  });
}