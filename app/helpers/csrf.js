define(function(require, exports, module){
  'use strict';

  var $ = require('jquery');
  require('jquery.cookie');

  var cookieKey = "csrftoken";

  function setCookie(data) {
    var cookieOptions = {
      expires: 365,
      path: "/"
    };

    $.cookie(cookieKey, data.csrf_token, cookieOptions);
  }

  function getTokenFromServer(callback) {
    return $.get("/api/v1/csrf/", callback);
  }

  var csrf = {
    clear: function() {
      return $.removeCookie(cookieKey, {path: "/"});
    },

    exists: function() {
      return !!$.cookie(cookieKey);
    },

    init: function(callback) {
      var that = this;
      this.setCsrfToken().done(function(){
        callback(that.value());
      });
    },

    setCsrfToken: function() {
      return getTokenFromServer(setCookie);
    },

    value: function() {
      return $.cookie(cookieKey);
    }
  };

  function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }
  function sameOrigin(url) {
    var host = document.location.host;
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;

    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        !(/^(\/\/|http:|https:).*/.test(url));
    }

  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", csrf.value());
      }
    }
  });

  return csrf;
});
