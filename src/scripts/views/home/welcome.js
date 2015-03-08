/* globals _, Backbone */
'use strict';
var App = App || {};

App.Views.WelcomeHome = Backbone.View.extend({
  className: 'text-center',
  template: App.Templates['home/welcome'],
  events: {
    'click .btn-info': 'success',
    'click .btn-success': 'reset'
  },
  ui: {
    sampler: 'button'
  },
  initialize: function (options) {
    options = options || {};
    this.hook = options.hook;
    this.vent = options.vent;
  },
  success: function (e) {
    this.Button.success.call(this, this.ui.sampler, 'Success');
  },
  reset: function (e) {
    this.Button.reset.call(this, this.ui.sampler, 'Try Again');
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.hook.html(this.el);

    return this;
  },
  remove: function () {
    if (this.vent) { this.vent = null; }
    Backbone.View.prototype.remove.call(this);
  }
});

_.extend(App.Views.WelcomeHome.prototype, App.Mixins.Form);
