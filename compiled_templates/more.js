define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"more-list\">\n  <li>\n    <a href=\"#logout\">\n      <i class=\"fa fa-sign-out\"></i>\n      Logout\n    </a>\n  </li>\n  <li>\n    <a href=\"#about\">\n      <i class=\"fa fa-info-circle\"></i>\n      About\n    </a>\n  </li>\n  <li>\n    <a href=\"http://github.com/kahnjw/stravamileage\">\n      <i class=\"fa fa-github-square\"></i>\n      Github\n    </a>\n  </li>\n</ul>";
  })

});