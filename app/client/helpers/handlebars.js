Handlebars.registerHelper('callTime', function(date) {
  moment.lang('en');
  return moment(date).format('h:mmA D/MM/YY');
});

Handlebars.registerHelper('callTimeAgo', function(date) {
  moment.lang('en');
  return moment(date).fromNow();
});