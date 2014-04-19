define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<nav>\n  <ul>\n    <li>\n      <a href=\"#mileage\" class=\"active mileage\">\n        <i class=\"fa fa-tachometer\"></i>\n        <span>Mileage</span>\n      </a>\n    </li>\n    <li>\n      <a href=\"#profile\" class=\"profile\">\n        <i class=\"fa fa-user\"></i>\n        <span>Profile</span>\n      </a>\n    </li>\n    <li>\n      <a href=\"#gear\" class=\"gear\">\n        <i class=\"fa fa-cog\"></i>\n        <span>Gear</span>\n      </a>\n    </li>\n    <li>\n      <a href=\"#more\" class=\"more\">\n        <i class=\"fa fa-ellipsis-h\"></i>\n        <span>More</span>\n      </a>\n    </li>\n  </ul>\n</nav>\n";
  })

});