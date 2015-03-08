/*global console, Backbone */
'use strict';

var App = App || {};
App.Routers = App.Routers || {};

App.Routers.Master = Backbone.Router.extend({
  routes: {
    '': 'welcome',
    '*notFound': 'notFound'
  },
  initialize: function (options) {
    options = options || {};
    this.vent = options.vent;
  },
  welcome: function () {
    this.vent.trigger('welcome:show');
  },
  notFound: function () {
    this.vent.trigger('error:show:404');
  },
  remove: function () {
    this.stopListening();
    if (this.vent) { this.vent = null; }
  }
});
