/* globals */
'use strict';
var App = App || {};
App.Mixins = App.Mixins || {};
App.Mixins.Form = App.Mixins.Form || {};

App.Mixins.Form.Button = {
  success: function (selector, text) {
    this.$(selector).text(text).removeClass('btn-info').addClass('btn-success').blur();
  },
  reset: function (selector, text) {
    this.$(selector).text(text).removeClass('btn-success').addClass('btn-info').blur();
  }
};
