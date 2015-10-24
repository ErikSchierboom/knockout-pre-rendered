var ko = require('knockout');

var Models = {};

Models.CityViewModel = function() {
  var self = this;

  self.name = ko.observable();
}

Models.ViewModel = function() {
  var self = this;

  self.cities = ko.observableArray();
  self.city = ko.observable('');
  self.cityComputed = ko.computed({
    read: function () { 
        return self.city();
    }, 
    write: function (value) { 
        self.city(value);
    }
  });

  self.link = ko.observable();
  self.linkComputed = ko.observable();
  self.linkTitle = ko.observable();
  self.year = ko.observable(0);
  self.visited = ko.observable(false);
  self.visitedComputed = ko.computed({
    read: function () { 
        return self.visited();
    }, 
    write: function (value) { 
        self.visited(value);
    }
  });
  
  self.createCity = function() {
    return new Models.CityViewModel();
  };

  self.toUpperCase = function(str) {
      return str.toUpperCase();
  };

  self.negate = function(bool) {
    return !bool;
  };
}

module.exports = Models;