var ko = require("knockout-es5");

var Models = {};

Models.CityViewModel = function() {
  var self = this;

  self.name = ko.observable();
};

Models.ViewModel = function() {
  var self = this;

  self.cities = ko.observableArray();
  self.city = ko.observable("");
  self.cityComputed = ko.computed({
    read: function() {
      return self.city();
    },
    write: function(value) {
      self.city(value);
    }
  });

  self.link = ko.observable();
  self.linkComputed = ko.observable();
  self.linkTitle = ko.observable();
  self.year = ko.observable(0);
  self.visited = ko.observable(false);
  self.visitedComputed = ko.computed({
    read: function() {
      return self.visited();
    },
    write: function(value) {
      self.visited(value);
    }
  });

  self.external = ko.observable(false);

  self.createCity = function() {
    return new Models.CityViewModel();
  };

  self.toUpperCase = function(str) {
    return str.toUpperCase();
  };

  self.toLowerCase = function(str) {
    return str.toLowerCase();
  };

  self.negate = function(bool) {
    return !bool;
  };
};

Models.PlainJSModel = function() {
  var self = this;

  self.cities = [];
  self.city = "";
  self.link = "";
  self.linkTitle = "";
  self.year = 0;
  self.visited = false;
  self.external = false;
};

Models.Es5TrackedModel = function() {
  var self = this;

  self.cities = [];
  self.city = "";
  self.link = "";
  self.linkTitle = "";
  self.year = 0;
  self.visited = false;
  self.external = false;
  ko.track(self);
};

module.exports = Models;
