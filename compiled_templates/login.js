define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"login\">\n  <form>\n    <h1>Login to Mileage</h1>\n    <label for=\"username\" class=\"control-label\">Username</label>\n    <input type=\"text\" name=\"username\">\n    <label for=\"password\" class=\"control-label\">Password</label>\n    <input type=\"password\" name=\"password\">\n    <button type=\"submit\">Login</button>\n  </form>\n</div>\n";
  })

});