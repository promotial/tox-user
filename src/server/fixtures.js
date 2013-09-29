if (Meteor.users.find().count() === 0) {
  Accounts.createUser({email:"user@example.com",password:"test",username:"Danny Smith"});
};