/*globals $, Backbone, _, App, alert */
$(function () {
  'use strict';
  var api = 'https://app.domain.com/api';

  //Setup XMLHTTP: Headers, CORS (may require sanitize)
  $.ajaxPrefilter('text html json xml script jsonp', function (options, _, xhr) {
    options.url = api + options.url;
    xhr.setRequestHeader('X-CSRF-Token', $('meta[name=csrf-token]').attr('content'));
  });

  $.ajaxSetup({
    crossDomain: true,
    xhrFields: {withCredentials: true}
  });

  //Override Global Backbone Sync
  var sync = Backbone.sync;
  Backbone.sync = function (method, model, options) {
      sync.apply(this, arguments)
        .done(function (resp, status, xhr) {
          if (method !== 'read' && (xhr.status === 200 || xhr.status === '200')) {
            model.trigger('sync:save');
          }
        });
  };

  //Application-level Event Bus
  App.vent = _.extend({}, Backbone.Events);

  //Application-level View Manager
  App.manager = new App.Manager({vent: App.vent, api: api, hook: $('#main') });

  //Start the Router
  App.router = new App.Routers.Master({vent: App.vent});

  //Application Destructor
  App.destruct = function (namespace) {
    namespace.router.remove();
    namespace.manager.destruct();
    namespace.router = null;
    namespace.manager = null;
    namespace.vent = null;
  };

  Backbone.history.start();
});
