/* globals _, Backbone */
'use strict';
var App = App || {};
App.Models = App.Models || {};

App.Models.User = Backbone.Model.extend({
  url: '/user',
  defaults: {
    'name': 'Ayo'
  },
  initialize: function (options) {
    options = options || {};
  }
});
