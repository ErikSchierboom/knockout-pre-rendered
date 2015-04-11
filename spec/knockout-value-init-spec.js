mocha.setup('bdd')
assert = chai.assert;

describe("valueInit binding", function () {
  it("works with an observable", function () {
    var target = $("<input data-bind='valueInit: city' type='text' value='London' />");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).val(), 'London');
    assert.strictEqual(model.city(), 'London');
  });

  it("works with a computed", function () {
    var target = $("<input data-bind='valueInit: cityComputed' type='text' value='London' />");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).val(), 'London');
    assert.strictEqual(model.cityComputed(), 'London');
  });

  it("works with field attribute", function () {
    var target = $("<input data-bind='valueInit: { field: city }' type='text' value='London' />");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).val(), 'London');
    assert.strictEqual(model.city(), 'London');
  });

  it("works with convert attribute", function () {
    var target = $("<input data-bind='valueInit: { field: year, convert: parseInt }' type='text' value='230' />");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).val(), '230');
    assert.strictEqual(model.year(), 230);
  });
});