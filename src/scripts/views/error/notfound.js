/* globals _, Backbone */
'use strict';
var App = App || {};

App.Views.NotFoundError = Backbone.View.extend({
  className: 'text-center',
  template: App.Templates['error/404'],
  events: {
  },
  initialize: function (options) {
    options = options || {};
    this.hook = options.hook;
  },
  render: function () {
    this.$el.html(this.template());
    this.hook.html(this.el);

    return this;
  }
});
