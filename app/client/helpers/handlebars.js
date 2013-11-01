Handlebars.registerHelper('callTime', function(date) {
  moment.lang(Session.get("language"));
  return moment(date).format('h:mmA D/MM/YY');
});

Handlebars.registerHelper('calendarTime', function(date) {
  return moment(date).calendar();
});

Handlebars.registerHelper('callTimeAgo', function(date) {
  moment.lang(Session.get("language"));
  return moment(date).fromNow();
});

Handlebars.registerHelper('getInitials', function(name) {
  return name.replace(/[^A-Z]/g, '');
});