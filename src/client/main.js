cordova = new Cordova();

server = DDP.connect('https://tox-operator.meteor.com');
Calls = new Meteor.Collection('calls', server);

server.subscribe('calls');