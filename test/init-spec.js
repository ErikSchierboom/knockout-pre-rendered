require('./common.js');
require('../knockout-pre-rendered.js');

var expect = require('chai').expect;
var ko = require('knockout');
var Models = require('./models.js');
var $ = require('jquery');

describe("init binding", function () {

  it("works with convert attribute without field", function () {
      var target = $("<span data-bind='init: { convert: parseInt }, text: year'>230</span>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('230');
      expect(model.year()).to.equal(230);
    });

  it("works with text binding and no init field", function () {
    var target = $("<input data-bind='init, text: city' type='hidden' value='London' />");
    var model = new Models.ViewModel();
    ko.applyBindings(model, target[0]);
    expect($(target).val()).to.equal('London');
    expect(model.city()).to.equal('London');
  });

  it("works with value binding and no init field", function () {
    var target = $("<input data-bind='init, text: city' type='hidden' value='London' />");
    var model = new Models.ViewModel();
    ko.applyBindings(model, target[0]);
    expect($(target).val()).to.equal('London');
    expect(model.city()).to.equal('London');
  });

  it("works with an observable", function () {
    var target = $("<input data-bind='init: city' type='hidden' value='London' />");
    var model = new Models.ViewModel();
    ko.applyBindings(model, target[0]);
    expect($(target).val()).to.equal('London');
    expect(model.city()).to.equal('London');
  });

  it("works with a computed", function () {
    var target = $("<input data-bind='init: cityComputed' type='text' value='London' />");
    var model = new Models.ViewModel();
    ko.applyBindings(model, target[0]);
    expect($(target).val()).to.equal('London');
    expect(model.cityComputed()).to.equal('London');
  });

  it("works with field attribute", function () {
    var target = $("<input data-bind='init: { field: city }' type='text' value='London' />");
    var model = new Models.ViewModel();
    ko.applyBindings(model, target[0]);
    expect($(target).val()).to.equal('London');
    expect(model.city()).to.equal('London');
  });

  it("works with val attribute", function () {
    var target = $("<input data-bind='init: { field: city, value: \"London\" }' type='text' value='London' />");
    var model = new Models.ViewModel();
    ko.applyBindings(model, target[0]);
    expect($(target).val()).to.equal('London');
    expect(model.city()).to.equal('London');
  });
  
  it("works with val attribute that is false", function () {
    var target = $("<input data-bind='init: { field: visited, value: false }' type='text' value='London' />");
    var model = new Models.ViewModel();
    ko.applyBindings(model, target[0]);
    expect($(target).val()).to.equal('London');
    expect(model.visited()).to.equal(false);
  });

  it("works with convert attribute", function () {
    var target = $("<input data-bind='init: { field: year, convert: parseInt }' type='text' value='230' />");
    var model = new Models.ViewModel();
    ko.applyBindings(model, target[0]);
    expect($(target).val()).to.equal('230');
    expect(model.year()).to.equal(230);
  });

  it("works on input element", function () {
    var target = $("<input data-bind='init: city' type='hidden' value='London' />");
    var model = new Models.ViewModel();
    ko.applyBindings(model, target[0]);
    expect($(target).val()).to.equal('London');
    expect(model.city()).to.equal('London');
  });

  it("works on non-input element", function () {
    var target = $("<span data-bind='init: city'>London</span>");
    var model = new Models.ViewModel();
    ko.applyBindings(model, target[0]);
    expect($(target).html()).to.equal('London');
    expect(model.city()).to.equal('London');
  });

  it("works with virtual element", function () {
    var target = $("<!-- ko init: city -->London<!--/ko-->");
    var model = new Models.ViewModel();
    ko.applyBindings(model, target[0]);
    expect(model.city()).to.equal('London');
  });

  it("works with field element", function () {
    var target = $("<!-- ko init: { field: city } -->London<!--/ko-->");
    var model = new Models.ViewModel();
    ko.applyBindings(model, target[0]);
    expect(model.city()).to.equal('London');
  });

  it("works with virtual element with convert attribute", function () {
    var target = $("<!-- ko init: { field: year, convert: parseInt } -->230<!--/ko-->");
    var model = new Models.ViewModel();
    ko.applyBindings(model, target[0]);
    expect(model.year()).to.equal(230);
  });

  it("works with virtual element with val attribute", function () {
    var target = $("<!-- ko init: { field: city, value: \"London\" } --><!--/ko-->");
    var model = new Models.ViewModel();
    ko.applyBindings(model, target[0]);
    expect(model.city()).to.equal('London');
  });

  it("works with different field than text binding", function () {
    var target = $("<span data-bind='init: { field: city }, text: year'>London</span>");
    var model = new Models.ViewModel();
    ko.applyBindings(model, target[0]);
    expect($(target).html()).to.equal('0');
    expect(model.city()).to.equal('London');
    expect(model.year()).to.equal(0);
  });

  it("allows multiple fields to be initialized", function () {
    var target = $("<span data-bind='init: { city: \"London\", year: 230 }'></span>");
    var model = new Models.ViewModel();
    ko.applyBindings(model, target[0]);
    expect($(target).html()).to.equal('');
    expect(model.city()).to.equal('London');
    expect(model.year()).to.equal(230);
  });

  it("allows multiple fields to be initialized in a plain JS model", function () {
    var target = $("<span data-bind='init: { city: \"London\", year: 230 }'></span>");
    var model = new Models.PlainJSModel();
    ko.applyBindings(model, target[0]);
    expect($(target).html()).to.equal('');
    expect(model.city).to.equal('London');
    expect(model.year).to.equal(230);
  });

  describe("combined with text binding", function () {
    it("works with an observable", function () {
      var target = $("<span data-bind='init, text: city'>London</span>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('London');
      expect(model.city()).to.equal('London');
    });

    it("works with a computed", function () {
      var target = $("<span data-bind='init, text: cityComputed'>London</span>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('London');
      expect(model.cityComputed()).to.equal('London');
    });

    it("works with field attribute", function () {
      var target = $("<span data-bind='init: { field: city }, text: city'>London</span>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('London');
      expect(model.city()).to.equal('London');
    });

    it("works with convert attribute", function () {
      var target = $("<span data-bind='init: { field: year, convert: parseInt }, text: year'>230</span>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('230');
      expect(model.year()).to.equal(230);
    });

    it("works with convert attribute without field", function () {
      var target = $("<span data-bind='init: { convert: parseInt }, text: year'>230</span>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('230');
      expect(model.year()).to.equal(230);
    });

    it("allows init to work on with different observable", function () {
      var target = $("<span data-bind='init: { field: city }, text: year'>London</span>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('0');
      expect(model.city()).to.equal('London');
      expect(model.year()).to.equal(0);
    });

    it("works with plain JS (non-observable) property", function () {
      var target = $("<span data-bind='init, text: city'>London</span>");
      var model = new Models.PlainJSModel();
      ko.applyBindings(model, target[0]);
      expect(model.city).to.equal('London');
    });

    it("allows init to work on with different non-observable in a plain JS model", function () {
      var target = $("<span data-bind='init: { field: city }, text: year'>London</span>");
      var model = new Models.PlainJSModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('0');
      expect(model.city).to.equal('London');
      expect(model.year).to.equal(0);
    });

    it("works with ES5 'reactive' properties", function () {
      var target = $("<span data-bind='init, text: city'>London</span>");
      var model = new Models.Es5TrackedModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('London');
      expect(model.city).to.equal('London');
      model.city = 'France';
      expect($(target).html()).to.equal('France');
    });

  });

  describe("combined with textInput binding", function () {
    it("works with an observable", function () {
      var target = $("<span data-bind='init, textInput: city'>London</span>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('London');
      expect(model.city()).to.equal('London');
    });

    it("works with a computed", function () {
      var target = $("<span data-bind='init, textInput: cityComputed'>London</span>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('London');
      expect(model.cityComputed()).to.equal('London');
    });

    it("works with field attribute", function () {
      var target = $("<span data-bind='init: { field: city }, textInput: city'>London</span>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('London');
      expect(model.city()).to.equal('London');
    });

    it("works with convert attribute", function () {
      var target = $("<span data-bind='init: { field: year, convert: parseInt }, textInput: year'>230</span>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('230');
      expect(model.year()).to.equal(230);
    });

    it("works with convert attribute without field", function () {
      var target = $("<span data-bind='init: { convert: parseInt }, textInput: year'>230</span>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('230');
      expect(model.year()).to.equal(230);
    });
  });

  describe("combined with value binding", function () {
    it("works with an observable", function () {
      var target = $("<input data-bind='init, value: city' type='text' value='London' />");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).val()).to.equal('London');
      expect(model.city()).to.equal('London');
    });

    it("works with a computed", function () {
      var target = $("<input data-bind='init, value: cityComputed' type='text' value='London' />");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).val()).to.equal('London');
      expect(model.cityComputed()).to.equal('London');
    });

    it("works with field attribute", function () {
      var target = $("<input data-bind='init: { field: city }, value: city' type='text' value='London' />");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).val()).to.equal('London');
      expect(model.city()).to.equal('London');
    });

    it("works with convert attribute", function () {
      var target = $("<input data-bind='init: { field: year, convert: parseInt }, value: year' type='text' value='230' />");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).val()).to.equal('230');
      expect(model.year()).to.equal(230);
    });

    it("works with convert attribute without field", function () {
      var target = $("<input data-bind='init: { convert: parseInt }, value: year' type='text' value='230' />");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).val()).to.equal('230');
      expect(model.year()).to.equal(230);
    });
  });

  describe("combined with checked binding", function () {
    it("works with an observable", function () {
      var target = $("<input data-bind='init, checked: visited' type='checkbox' checked='checked' />");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).attr('checked')).to.equal('checked');
      expect(model.visited()).to.be.true;
    });

    it("works with a computed", function () {
      var target = $("<input data-bind='init, checked: visitedComputed' type='checkbox' checked='checked' />");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).attr('checked')).to.equal('checked');
      expect(model.visitedComputed()).to.be.true;
    });

    it("works with field attribute", function () {
      var target = $("<input data-bind='init: { field: visited }, checked: visited' type='checkbox' checked='checked' />");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).attr('checked')).to.equal('checked');
      expect(model.visited()).to.be.true;
    });

    it("works with convert attribute", function () {
      var target = $("<input data-bind='init: { field: visited, convert: negate }, checked: visited' type='checkbox' checked='checked' />");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).attr('checked')).to.equal('checked');
      expect(model.visited()).to.be.false;
    });

    it("works with convert attribute without field", function () {
      var target = $("<input data-bind='init: { convert: negate }, checked: visited' type='checkbox' checked='checked' />");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).attr('checked')).to.equal('checked');
      expect(model.visited()).to.be.false;
    });

    it("works with checkbox is checked", function () {
      var target = $("<input data-bind='init, checked: visited' type='checkbox' checked='checked' />");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).attr('checked')).to.equal('checked');
      expect(model.visited()).to.be.true;
    });

    it("works with checkbox is not checked", function () {
      var target = $("<input data-bind='init, checked: visited' type='checkbox' />");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).attr('checked')).to.equal(undefined);
      expect(model.visited()).to.be.false;
    });
  });

  describe("combined with visible binding", function () {

    describe("on visible element", function () {
      it("works with an observable", function () {
        var target = $("<span data-bind='init, visible: visited'>London</span>");
        var $template = target.appendTo(document.body);
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).html()).to.equal('London');
        expect(model.visited()).to.be.true;
        $template.remove();
      });

      it("works with a computed", function () {
        var target = $("<span data-bind='init, visible: visitedComputed'>London</span>");
        var $template = target.appendTo(document.body);
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).html()).to.equal('London');
        expect(model.visitedComputed()).to.be.true;
        $template.remove();
      });

      it("works with field attribute", function () {
        var target = $("<span data-bind='init: { field: visited }, visible: visited'>London</span>");
        var $template = target.appendTo(document.body);
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).html()).to.equal('London');
        expect(model.visited()).to.be.true;
        $template.remove();
      });

      it("works with convert attribute", function () {
        var target = $("<span data-bind='init: { field: visited, convert: negate }, visible: visited'>230</span>");
        var $template = target.appendTo(document.body);
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).html()).to.equal('230');
        expect(model.visited()).to.be.false;
        $template.remove();
      });

      it("works with convert attribute without field", function () {
        var target = $("<span data-bind='init: { convert: negate }, visible: visited'>230</span>");
        var $template = target.appendTo(document.body);
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).html()).to.equal('230');
        expect(model.visited()).to.be.false;
        $template.remove();
      });
    });

    describe("on hidden element", function () {
      it("works with an observable", function () {
        var target = $("<span data-bind='init, visible: visited' style='display: none'>London</span>");
        var $template = target.appendTo(document.body);
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).html()).to.equal('London');
        expect(model.visited()).to.be.false;
        $template.remove();
      });

      it("works with a computed", function () {
        var target = $("<span data-bind='init, visible: visitedComputed' style='display: none'>London</span>");
        var $template = target.appendTo(document.body);
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).html()).to.equal('London');
        expect(model.visitedComputed()).to.be.false;
        $template.remove();
      });

      it("works with field attribute", function () {
        var target = $("<span data-bind='init: { field: visited }, visible: visited' style='display: none'>London</span>");
        var $template = target.appendTo(document.body);
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).html()).to.equal('London');
        expect(model.visited()).to.be.false;
        $template.remove();
      });

      it("works with convert attribute", function () {
        var target = $("<span data-bind='init: { field: visited, convert: negate }, visible: visited' style='display: none'>230</span>");
        var $template = target.appendTo(document.body);
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).html()).to.equal('230');
        expect(model.visited()).to.be.true;
        $template.remove();
      });

      it("works with convert attribute without field", function () {
        var target = $("<span data-bind='init: { convert: negate }, visible: visited' style='display: none'>230</span>");
        var $template = target.appendTo(document.body);
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).html()).to.equal('230');
        expect(model.visited()).to.be.true;
        $template.remove();
      });
    });
  });

  describe("combined with html binding", function () {
    it("works with an observable", function () {
      var target = $("<span data-bind='init, html: city'><i>London</i></span>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('<i>London</i>');
      expect(model.city()).to.equal('<i>London</i>');
    });

    it("works with a computed", function () {
      var target = $("<span data-bind='init, html: cityComputed'><i>London</i></span>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('<i>London</i>');
      expect(model.cityComputed()).to.equal('<i>London</i>');
    });

    it("works with field attribute", function () {
      var target = $("<span data-bind='init: { field: city }, html: city'><i>London</i></span>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('<i>London</i>');
      expect(model.city()).to.equal('<i>London</i>');
    });

    it("works with convert attribute", function () {
      var target = $("<span data-bind='init: { field: city, convert: toUpperCase }, html: city'><i>London</i></span>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('<i>LONDON</i>');
      expect(model.city()).to.equal('<I>LONDON</I>');
    });

    it("works with convert attribute without field", function () {
      var target = $("<span data-bind='init: { convert: toUpperCase }, html: city'><i>London</i></span>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).html()).to.equal('<i>LONDON</i>');
      expect(model.city()).to.equal('<I>LONDON</I>');
    });
  });

  describe("combined with enable binding", function () {

    describe("on enabled element", function () {

      it("works with an observable", function () {
        var target = $("<input data-bind='init, enable: visited' type='text' value='London' />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visited()).to.be.true;
      });

      it("works with a computed", function () {
        var target = $("<input data-bind='init, enable: visitedComputed' type='text' value='London' />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visitedComputed()).to.be.true;
      });

      it("works with field attribute", function () {
        var target = $("<input data-bind='init: { field: visited }, enable: visited' type='text' value='London' />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visited()).to.be.true;
      });

      it("works with convert attribute", function () {
        var target = $("<input data-bind='init: { field: visited, convert: negate }, enable: visited' type='text' value='230' />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('230');
        expect(model.visited()).to.be.false;
      });

      it("works with convert attribute without field", function () {
        var target = $("<input data-bind='init: { convert: negate }, enable: visited' type='text' value='230' />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('230');
        expect(model.visited()).to.be.false;
      });

      it("works with input text element", function () {
        var target = $("<input data-bind='init, enable: visited' type='text' value='London' />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visited()).to.be.true;
      });

      it("works with input checkbox element", function () {
        var target = $("<input data-bind='init, enable: visited' type='checkbox' checked='checked' />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).attr('checked')).to.equal('checked');
        expect(model.visited()).to.be.true;
      });

      it("works with textarea element", function () {
        var target = $("<textarea data-bind='init, enable: visited'>London</textarea>");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visited()).to.be.true;
      });
    });

    describe("on disabled element", function () {

      it("works with an observable", function () {
        var target = $("<input data-bind='init, enable: visited' type='text' value='London' disabled />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visited()).to.be.false;
      });

      it("works with a computed", function () {
        var target = $("<input data-bind='init, enable: visitedComputed' type='text' value='London' disabled />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visitedComputed()).to.be.false;
      });

      it("works with field attribute", function () {
        var target = $("<input data-bind='init: { field: visited }, enable: visited' type='text' value='London' disabled />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visited()).to.be.false;
      });

      it("works with convert attribute", function () {
        var target = $("<input data-bind='init: { field: visited, convert: negate }, enable: visited' type='text' value='230' disabled />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('230');
        expect(model.visited()).to.be.true;
      });

      it("works with convert attribute without field", function () {
        var target = $("<input data-bind='init: { convert: negate }, enable: visited' type='text' value='230' disabled />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('230');
        expect(model.visited()).to.be.true;
      });

      it("works with input text element", function () {
        var target = $("<input data-bind='init, enable: visited' type='text' value='London' disabled />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visited()).to.be.false;
      });

      it("works with input checkbox element", function () {
        var target = $("<input data-bind='init, enable: visited' type='checkbox' checked='checked' disabled />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).attr('checked')).to.equal('checked');
        expect(model.visited()).to.be.false;
      });

      it("works with textarea element", function () {
        var target = $("<textarea data-bind='init, enable: visited' disabled>London</textarea>");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visited()).to.be.false;
      });
    });
  });

  describe("combined with disable binding", function () {

    describe("on enabled element", function () {

      it("works with an observable", function () {
        var target = $("<input data-bind='init, disable: visited' type='text' value='London' />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visited()).to.be.false;
      });

      it("works with a computed", function () {
        var target = $("<input data-bind='init, disable: visitedComputed' type='text' value='London' />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visitedComputed()).to.be.false;
      });

      it("works with field attribute", function () {
        var target = $("<input data-bind='init: { field: visited }, disable: visited' type='text' value='London' />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visited()).to.be.false;
      });

      it("works with convert attribute", function () {
        var target = $("<input data-bind='init: { field: visited, convert: negate }, disable: visited' type='text' value='230' />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('230');
        expect(model.visited()).to.be.true;
      });

      it("works with convert attribute without field", function () {
        var target = $("<input data-bind='init: { convert: negate }, disable: visited' type='text' value='230' />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('230');
        expect(model.visited()).to.be.true;
      });

      it("works with input text element", function () {
        var target = $("<input data-bind='init, disable: visited' type='text' value='London' />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visited()).to.be.false;
      });

      it("works with input checkbox element", function () {
        var target = $("<input data-bind='init, disable: visited' type='checkbox' checked='checked' />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).attr('checked')).to.equal('checked');
        expect(model.visited()).to.be.false;
      });

      it("works with textarea element", function () {
        var target = $("<textarea data-bind='init, disable: visited'>London</textarea>");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visited()).to.be.false;
      });
    });

    describe("on disabled element", function () {

      it("works with an observable", function () {
        var target = $("<input data-bind='init, disable: visited' type='text' value='London' disabled />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visited()).to.be.true;
      });

      it("works with a computed", function () {
        var target = $("<input data-bind='init, disable: visitedComputed' type='text' value='London' disabled />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visitedComputed()).to.be.true;
      });

      it("works with field attribute", function () {
        var target = $("<input data-bind='init: { field: visited }, disable: visited' type='text' value='London' disabled />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visited()).to.be.true;
      });

      it("works with convert attribute", function () {
        var target = $("<input data-bind='init: { field: visited, convert: negate }, disable: visited' type='text' value='230' disabled />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('230');
        expect(model.visited()).to.be.false;
      });

      it("works with convert attribute without field", function () {
        var target = $("<input data-bind='init: { convert: negate }, disable: visited' type='text' value='230' disabled />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('230');
        expect(model.visited()).to.be.false;
      });

      it("works with input text element", function () {
        var target = $("<input data-bind='init, disable: visited' type='text' value='London' disabled />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visited()).to.be.true;
      });

      it("works with input checkbox element", function () {
        var target = $("<input data-bind='init, disable: visited' type='checkbox' checked='checked' disabled />");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).attr('checked')).to.equal('checked');
        expect(model.visited()).to.be.true;
      });

      it("works with textarea element", function () {
        var target = $("<textarea data-bind='init, disable: visited' disabled>London</textarea>");
        var model = new Models.ViewModel();
        ko.applyBindings(model, target[0]);
        expect($(target).val()).to.equal('London');
        expect(model.visited()).to.be.true;
      });
    });
  });

  describe("combined with attr binding", function () {
    it("works with an observable", function () {
      var target = $("<a data-bind='init, attr: { href: link }' href='http://www.google.com' title='Visit Google.com'>Google</a>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).text()).to.equal('Google');
      expect(model.link()).to.equal('http://www.google.com');
    });

    it("works with a plain JS property", function () {
      var target = $("<a data-bind='init, attr: { href: link }' href='http://www.google.com' title='Visit Google.com'>Google</a>");
      var model = new Models.PlainJSModel();
      ko.applyBindings(model, target[0]);
      expect($(target).text()).to.equal('Google');
      expect(model.link).to.equal('http://www.google.com');
    });

    it("works with a computed", function () {
      var target = $("<a data-bind='init, attr: { href: linkComputed }' href='http://www.google.com' title='Visit Google.com'>Google</a>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).text()).to.equal('Google');
      expect(model.linkComputed()).to.equal('http://www.google.com');
    });

    it("ignores field attribute", function () {
      var target = $("<a data-bind='init: { field: city }, attr: { href: link }' href='http://www.google.com' title='Visit Google.com'>Google</a>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).text()).to.equal('Google');
      expect(model.link()).to.equal('http://www.google.com');
    });

    it("ignores missing attribute", function () {
      var target = $("<a data-bind='init, attr: { href: link, title: linkTitle }' href='http://www.google.com'>Google</a>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).text()).to.equal('Google');
      expect(model.link()).to.equal('http://www.google.com');
    });

    it("works with convert attribute", function () {
      var target = $("<a data-bind='init: { convert: toUpperCase }, attr: { href: link }' href='http://www.google.com' title='Visit Google.com'>Google</a>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).text()).to.equal('Google');
      expect(model.link()).to.equal('HTTP://WWW.GOOGLE.COM');
    });

    it("works with multiple attributes", function () {
      var target = $("<a data-bind='init, attr: { href: link, title: linkTitle }' href='http://www.google.com' title='Visit Google.com'>Google</a>");
      var model = new Models.ViewModel();
      ko.applyBindings(model, target[0]);
      expect($(target).text()).to.equal('Google');
      expect(model.link()).to.equal('http://www.google.com');
      expect(model.linkTitle()).to.equal('Visit Google.com');
    });

    it("works with multiple attributes with a plain JS model", function () {
      var target = $("<a data-bind='init, attr: { href: link, title: linkTitle }' href='http://www.google.com' title='Visit Google.com'>Google</a>");
      var model = new Models.PlainJSModel();
      ko.applyBindings(model, target[0]);
      expect($(target).text()).to.equal('Google');
      expect(model.link).to.equal('http://www.google.com');
      expect(model.linkTitle).to.equal('Visit Google.com');
    });

    it("works with multiple attributes with a reactive ES5 model", function () {
      var target = $("<a data-bind='init, attr: { href: link, title: linkTitle }' href='http://www.google.com' title='Visit Google.com'>Google</a>");
      var model = new Models.Es5TrackedModel();
      ko.applyBindings(model, target[0]);
      expect($(target).text()).to.equal('Google');
      expect(model.link).to.equal('http://www.google.com');
      expect(model.linkTitle).to.equal('Visit Google.com');
      model.link = 'http://github.com';
      model.linkTitle = 'Visit GitHub!';
      expect($(target).attr('href')).to.equal('http://github.com');
      expect($(target).attr('title')).to.equal('Visit GitHub!');
    });
 
  });
});