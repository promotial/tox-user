server = DDP.connect('https://tox-operator.meteor.com');

Calls = new Meteor.Collection('calls', server);

