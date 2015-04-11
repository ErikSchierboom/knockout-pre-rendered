mocha.setup('bdd')
assert = chai.assert;

describe("init binding", function () {
  it("works with an observable", function () {
    var target = $("<input data-bind='init: city' type='hidden' value='London' />");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).val(), 'London');
    assert.strictEqual(model.city(), 'London');
  });

  it("works with a computed", function () {
    var target = $("<input data-bind='init: cityComputed' type='text' value='London' />");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).val(), 'London');
    assert.strictEqual(model.cityComputed(), 'London');
  });

  it("works with field attribute", function () {
    var target = $("<input data-bind='init: { field: city }' type='text' value='London' />");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).val(), 'London');
    assert.strictEqual(model.city(), 'London');
  });

  it("works with val attribute", function () {
    var target = $("<input data-bind='init: { field: city, val: \"London\" }' type='text' value='London' />");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).val(), 'London');
    assert.strictEqual(model.city(), 'London');
  });

  it("works with convert attribute", function () {
    var target = $("<input data-bind='init: { field: year, convert: parseInt }' type='text' value='230' />");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).val(), '230');
    assert.strictEqual(model.year(), 230);
  });

  it("works on input element", function () {
    var target = $("<input data-bind='init: city' type='hidden' value='London' />");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).val(), 'London');
    assert.strictEqual(model.city(), 'London');
  });

  it("works on non-input element", function () {
    var target = $("<span data-bind='init: city'>London</span>");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).html(), 'London');
    assert.strictEqual(model.city(), 'London');
  });

  it("works with virtual element", function () {
    var target = $("<!-- ko init: city -->London<!--/ko-->");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.strictEqual(model.city(), 'London');
  });

  it("works with field element", function () {
    var target = $("<!-- ko init: { field: city } -->London<!--/ko-->");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.strictEqual(model.city(), 'London');
  });

  it("works with virtual element with convert attribute", function () {
    var target = $("<!-- ko init: { field: year, convert: parseInt } -->230<!--/ko-->");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.strictEqual(model.year(), 230);
  });

  it("works with virtual element with val attribute", function () {
    var target = $("<!-- ko init: { field: city, val: \"London\" } --><!--/ko-->");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.strictEqual(model.city(), 'London');
  });
});