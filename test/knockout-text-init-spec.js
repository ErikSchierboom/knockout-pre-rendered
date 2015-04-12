mocha.setup('bdd')
assert = chai.assert;

describe("textInit binding", function () {
  it("works with an observable", function () {
    var target = $("<span data-bind='textInit: city'>London</span>");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).html(), 'London');
    assert.strictEqual(model.city(), 'London');
  });

  it("works with a computed", function () {
    var target = $("<span data-bind='textInit: cityComputed'>London</span>");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).html(), 'London');
    assert.strictEqual(model.cityComputed(), 'London');
  });

  it("works with field attribute", function () {
    var target = $("<span data-bind='textInit: { field: city }'>London</span>");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).html(), 'London');
    assert.strictEqual(model.city(), 'London');
  });

  it("works with convert attribute", function () {
    var target = $("<span data-bind='textInit: { field: year, convert: parseInt }'>230</span>");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).html(), '230');
    assert.strictEqual(model.year(), 230);
  });
});