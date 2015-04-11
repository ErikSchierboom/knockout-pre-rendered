function CityViewModel() {
  var self = this;

  self.name = ko.observable();
}

function ViewModel() {
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
  self.year = ko.observable(0);
}