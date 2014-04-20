define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"connect\">\n  <h1>\n    We need access to your strava account to get your mileage\n  </h1>\n  <a href=\"https://www.strava.com/oauth/authorize?client_id=1356&response_type=code&redirect_uri=http://localhost:9000/#approve&approval_prompt=force\">\n    <img src=\"images/ConnectWithStrava@2x.png\" alt=\"Connect With Strava\">\n  </a>\n  <p>\n    We won't be sharing your information with anyone.\n  </p>\n</div>";
  })

});