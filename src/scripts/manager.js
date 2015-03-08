/* globals alert, console, _, Backbone */
'use strict';
var App = App || {};

App.Manager = function (options) {
  this.api = options.api;
  this.hook = options.hook;
  this.vent = options.vent;
  this.next = null;
  this.current = null;

  this.vent.bind('welcome:show', this.showWelcome, this);
  this.vent.bind('error:show:404', this.show404, this);

  this.user = new App.Models.User();
};

App.Manager.prototype.show = function() {
  if (this.current) {
    this.current.remove();
    this.current.hook = null;
  }//Cleanup current view

  this.current = this.next;
  this.next = null;
  this.current.render();
};

App.Manager.prototype.showWelcome = function () {
  this.next = new App.Views.WelcomeHome({hook: this.hook, model: this.user});
  this.show();
};

App.Manager.prototype.show404 = function () {
  this.next = new App.Views.NotFoundError({hook: this.hook});
  this.show();
};

App.Manager.prototype.destruct = function () {
  this.vent.unbind('welcome:show', this.showWelcome, this);
  this.vent.unbind('error:show:404', this.show404, this);
  this.vent = null;
  this.user = null;

  if (this.current) {
    this.current.remove();
    this.current.hook = null;
  }
};
