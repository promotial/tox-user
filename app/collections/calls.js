server = DDP.connect('http://localhost:5000');

Calls = new Meteor.Collection('calls', server);

