 mocha.setup('bdd')
 assert = chai.assert;

describe("init binding", function () {

  it("works with convert attribute without field", function () {
      var target = $("<span data-bind='init: { convert: parseInt }, text: year'>230</span>");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).html(), '230');
      assert.strictEqual(model.year(), 230);
    });

  it("works with text binding and no init field", function () {
    var target = $("<input data-bind='init, text: city' type='hidden' value='London' />");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).val(), 'London');
    assert.strictEqual(model.city(), 'London');
  });

  it("works with value binding and no init field", function () {
    var target = $("<input data-bind='init, text: city' type='hidden' value='London' />");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).val(), 'London');
    assert.strictEqual(model.city(), 'London');
  });

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
    var target = $("<input data-bind='init: { field: city, value: \"London\" }' type='text' value='London' />");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).val(), 'London');
    assert.strictEqual(model.city(), 'London');
  });
  
  it("works with val attribute that is false", function () {
    var target = $("<input data-bind='init: { field: visited, value: false }' type='text' value='London' />");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).val(), 'London');
    assert.strictEqual(model.visited(), false);
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
    var target = $("<!-- ko init: { field: city, value: \"London\" } --><!--/ko-->");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.strictEqual(model.city(), 'London');
  });

  it("works with different field than text binding", function () {
    var target = $("<span data-bind='init: { field: city }, text: year'>London</span>");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).html(), '0');
    assert.strictEqual(model.city(), 'London');
    assert.strictEqual(model.year(), 0);
  });

  it("allows multiple fields to be initialized", function () {
    var target = $("<span data-bind='init: { city: \"London\", year: 230 }'></span>");
    var model = new ViewModel();
    ko.applyBindings(model, target[0]);
    assert.equal($(target).html(), '');
    assert.strictEqual(model.city(), 'London');
    assert.strictEqual(model.year(), 230);
  });

  describe("combined with text binding", function () {
    it("works with an observable", function () {
      var target = $("<span data-bind='init, text: city'>London</span>");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).html(), 'London');
      assert.strictEqual(model.city(), 'London');
    });

    it("works with a computed", function () {
      var target = $("<span data-bind='init, text: cityComputed'>London</span>");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).html(), 'London');
      assert.strictEqual(model.cityComputed(), 'London');
    });

    it("works with field attribute", function () {
      var target = $("<span data-bind='init: { field: city }, text: city'>London</span>");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).html(), 'London');
      assert.strictEqual(model.city(), 'London');
    });

    it("works with convert attribute", function () {
      var target = $("<span data-bind='init: { field: year, convert: parseInt }, text: year'>230</span>");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).html(), '230');
      assert.strictEqual(model.year(), 230);
    });

    it("works with convert attribute without field", function () {
      var target = $("<span data-bind='init: { convert: parseInt }, text: year'>230</span>");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).html(), '230');
      assert.strictEqual(model.year(), 230);
    });

    it("allows init to work on with different observable", function () {
      var target = $("<span data-bind='init: { field: city }, text: year'>London</span>");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).html(), '0');
      assert.strictEqual(model.city(), 'London');
      assert.strictEqual(model.year(), 0);
    });
  });

  describe("combined with textInput binding", function () {
    it("works with an observable", function () {
      var target = $("<span data-bind='init, textInput: city'>London</span>");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).html(), 'London');
      assert.strictEqual(model.city(), 'London');
    });

    it("works with a computed", function () {
      var target = $("<span data-bind='init, textInput: cityComputed'>London</span>");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).html(), 'London');
      assert.strictEqual(model.cityComputed(), 'London');
    });

    it("works with field attribute", function () {
      var target = $("<span data-bind='init: { field: city }, textInput: city'>London</span>");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).html(), 'London');
      assert.strictEqual(model.city(), 'London');
    });

    it("works with convert attribute", function () {
      var target = $("<span data-bind='init: { field: year, convert: parseInt }, textInput: year'>230</span>");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).html(), '230');
      assert.strictEqual(model.year(), 230);
    });

    it("works with convert attribute without field", function () {
      var target = $("<span data-bind='init: { convert: parseInt }, textInput: year'>230</span>");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).html(), '230');
      assert.strictEqual(model.year(), 230);
    });
  });

  describe("combined with value binding", function () {
    it("works with an observable", function () {
      var target = $("<input data-bind='init, value: city' type='text' value='London' />");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).val(), 'London');
      assert.strictEqual(model.city(), 'London');
    });

    it("works with a computed", function () {
      var target = $("<input data-bind='init, value: cityComputed' type='text' value='London' />");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).val(), 'London');
      assert.strictEqual(model.cityComputed(), 'London');
    });

    it("works with field attribute", function () {
      var target = $("<input data-bind='init: { field: city }, value: city' type='text' value='London' />");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).val(), 'London');
      assert.strictEqual(model.city(), 'London');
    });

    it("works with convert attribute", function () {
      var target = $("<input data-bind='init: { field: year, convert: parseInt }, value: year' type='text' value='230' />");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).val(), '230');
      assert.strictEqual(model.year(), 230);
    });

    it("works with convert attribute without field", function () {
      var target = $("<input data-bind='init: { convert: parseInt }, value: year' type='text' value='230' />");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).val(), '230');
      assert.strictEqual(model.year(), 230);
    });
  });

  describe("combined with checked binding", function () {
    it("works with an observable", function () {
      var target = $("<input data-bind='init, checked: visited' type='checkbox' checked='checked' />");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).attr('checked'), 'checked');
      assert.isTrue(model.visited());
    });

    it("works with a computed", function () {
      var target = $("<input data-bind='init, checked: visitedComputed' type='checkbox' checked='checked' />");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).attr('checked'), 'checked');
      assert.isTrue(model.visitedComputed());
    });

    it("works with field attribute", function () {
      var target = $("<input data-bind='init: { field: visited }, checked: visited' type='checkbox' checked='checked' />");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).attr('checked'), 'checked');
      assert.isTrue(model.visited());
    });

    it("works with convert attribute", function () {
      var target = $("<input data-bind='init: { field: visited, convert: function(x) { return !x; } }, checked: visited' type='checkbox' checked='checked' />");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).attr('checked'), 'checked');
      assert.isFalse(model.visited());
    });

    it("works with convert attribute without field", function () {
      var target = $("<input data-bind='init: { convert: function(x) { return !x; } }, checked: visited' type='checkbox' checked='checked' />");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).attr('checked'), 'checked');
      assert.isFalse(model.visited());
    });

    it("works with checkbox is checked", function () {
      var target = $("<input data-bind='init, checked: visited' type='checkbox' checked='checked' />");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).attr('checked'), 'checked');
      assert.isTrue(model.visited());
    });

    it("works with checkbox is not checked", function () {
      var target = $("<input data-bind='init, checked: visited' type='checkbox' />");
      var model = new ViewModel();
      ko.applyBindings(model, target[0]);
      assert.equal($(target).attr('checked'), undefined);
      assert.isFalse(model.visited());
    });
  });
});