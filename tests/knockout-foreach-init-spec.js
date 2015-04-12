mocha.setup('bdd')
assert = chai.assert;

// Make the frame animation synchronous; simplifies testing.
function setupSynchronousFrameAnimation () {
  var originalAnimateFrame = InitializedForeach.animateFrame;
  beforeEach(function () {
    originalAnimateFrame = InitializedForeach.animateFrame;
    InitializedForeach.animateFrame = function(frame) { frame() };
  })
  afterEach(function () {
    InitializedForeach.animateFrame = originalAnimateFrame;
  })
}

describe("foreachInit binding", function () {
  setupSynchronousFrameAnimation();

  it("works with a static list", function () {
    var target = $("<ul data-bind='foreachInit: $data'>" +
                      "<li data-bind='text: $data' data-template></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                    "</ul>");
    var list = [1, 2, 3];
    ko.applyBindings(list, target[0]);
    assert.equal(target.html(), '<li data-bind="text: $data" data-init="">1</li>' + 
                                '<li data-bind="text: $data" data-init="">2</li>' +
                                '<li data-bind="text: $data" data-init="">3</li>');
  });

  it("works with an observable array", function () {
    var target = $("<ul data-bind='foreachInit: $data'>" +
                      "<li data-bind='text: $data' data-template></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                    "</ul>");
    var list = [6, 7, 8];
    ko.applyBindings(ko.observableArray(list), target[0]);
    assert.equal(target.html(), '<li data-bind="text: $data" data-init="">6</li>' + 
                                '<li data-bind="text: $data" data-init="">7</li>' +
                                '<li data-bind="text: $data" data-init="">8</li>');
  });

  it("works with a plain observable with an array", function () {
    var target = $("<ul data-bind='foreachInit: $data'>" +
                      "<li data-bind='text: $data' data-template></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                    "</ul>");
    var list = [14, 15, 16];
    ko.applyBindings(ko.observable(list), target[0]);
    assert.equal(target.html(), '<li data-bind="text: $data" data-init="">14</li>' + 
                                '<li data-bind="text: $data" data-init="">15</li>' +
                                '<li data-bind="text: $data" data-init="">16</li>');
  });

  it("works with a computed observable", function () {
    var target = $("<ul data-bind='foreachInit: $data'>" +
                      "<li data-bind='text: $data' data-template></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                    "</ul>");
    var list = [22, 23, 24];
    ko.applyBindings(ko.computed({read: function () { return list }}), target[0]);
    assert.equal(target.html(), '<li data-bind="text: $data" data-init="">22</li>' + 
                                '<li data-bind="text: $data" data-init="">23</li>' +
                                '<li data-bind="text: $data" data-init="">24</li>');
  });

  it("applies bindings to the immediate child", function () {
    var target = $("<ul data-bind='foreachInit: $data'>" +
                      "<li data-bind='text: $data' data-template></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                    "</ul>");
    var list = ['a', 'b', 'c'];
    ko.applyBindings(list, target[0]);
    assert.equal(target.html(), '<li data-bind="text: $data" data-init="">a</li>' + 
                                '<li data-bind="text: $data" data-init="">b</li>' +
                                '<li data-bind="text: $data" data-init="">c</li>');
  });

  it("applies to inner children", function () {
    var target = $("<ul data-bind='foreachInit: $data'>" +
                      "<li data-template><em data-bind='text: $data'></em></li>" +
                      "<li data-init><em data-bind='text: $data'></em></li>" +
                      "<li data-init><em data-bind='text: $data'></em></li>" +
                      "<li data-init><em data-bind='text: $data'></em></li>" +
                    "</ul>");
    var list = ['a', 'b', 'c'];
    ko.applyBindings(list, target[0]);
    assert.equal($(target).html(), '<li data-init=""><em data-bind="text: $data">a</em></li>' +
                                   '<li data-init=""><em data-bind="text: $data">b</em></li>' +
                                   '<li data-init=""><em data-bind="text: $data">c</em></li>')
  });

  it("works with virtual elements", function () {
    var target = $("<div><!-- ko foreachInit: $data -->" + 
                     "<em data-template data-bind='text: $data'></em>" +
                     "<em data-init data-bind='text: $data'></em>" +
                     "<em data-init data-bind='text: $data'></em>" +
                   "<!-- /ko --></div>")
    var list = ['A', 'B'];
    ko.applyBindings(list, target[0]);
    assert.equal($(target).html(), '<!-- ko foreachInit: $data -->' +
                                   '<em data-init="" data-bind="text: $data">A</em>' +
                                   '<em data-init="" data-bind="text: $data">B</em>' +
                                   '<!-- /ko -->')
  });

  it("uses the name/id of a <template>", function () {
    var target = $("<ul data-bind='foreachInit: {name: \"tID\", data: $data}'>" +
                      "<li data-bind='text: $data' data-init></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                    "</ul>");
    var list = ['F1', 'F2'];
    var $template = $("<template id='tID'><li data-bind='text: $data' data-template></li><!--/ko--></template>")
      .appendTo(document.body)
    ko.applyBindings(list, target[0]);
    assert.equal(target.html(), '<li data-bind="text: $data" data-init="">F1</li>' + 
                                '<li data-bind="text: $data" data-init="">F2</li>');
    $template.remove();
  });

  it("uses the name/id of a <script>", function () {
    var target = $("<ul data-bind='foreachInit: {name: \"tID\", data: $data}'>" +
                      "<li data-bind='text: $data' data-init></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                    "</ul>");
    var list = ['G1', 'G2'];
    var $template = $("<script type='text/ko-template' id='tID'><li data-bind='text: $data' data-template></script>")
      .appendTo(document.body)
    ko.applyBindings(list, target[0]);
    assert.equal(target.html(), '<li data-bind="text: $data" data-init="">G1</li>' + 
                                '<li data-bind="text: $data" data-init="">G2</li>');
    $template.remove();
  });

  it("uses the name/id of a <div>", function () {
    var target = $("<ul data-bind='foreachInit: {name: \"tID2\", data: $data}'>" +
                      "<li data-bind='text: $data' data-init></li>" +
                      "<li data-bind='text: $data' data-init></li>" +
                    "</ul>");
    var list = ['H1', 'H2'];
    var $template = $("<div id='tID2'><li data-bind='text: $data' data-template><!--/ko--></div>")
      .appendTo(document.body)
    ko.applyBindings(list, target[0]);
    assert.equal(target.html(), '<li data-bind="text: $data" data-init="">H1</li>' + 
                                '<li data-bind="text: $data" data-init="">H2</li>');
    $template.remove();
  });

  describe("observable array changes", function () {
    setupSynchronousFrameAnimation();
    var div, obs, view;

    beforeEach(function () {
      div = $("<div data-bind='foreachInit: obs'>" + 
                "<i data-template data-bind='text: $data'></i>" + 
                "<i data-init data-bind='text: $data'></i>" +
              "</div>");
      obs = ko.observableArray();
      view = {obs: obs};
    });

    it("adds an item to an empty list", function () {
      ko.applyBindings(view, div[0]);
      obs(['a']);
      assert.equal(div.text(), 'a');
    });

    it("adds an item to the end of a pre-existing list", function () {
      obs(['a'])
      ko.applyBindings(view, div[0]);
      obs.push('b');
      assert.equal(div.text(), 'ab');
    });

    it("adds an item to the beginning of a pre-existing list", function () {
      obs(['a'])
      ko.applyBindings(view, div[0]);
      obs.unshift('b');
      assert.equal(div.text(), 'ba');
    });

    it("adds an item to the middle of a pre-existing list", function () {
      div = $("<div data-bind='foreachInit: obs'>" + 
                "<i data-template data-bind='text: $data'></i>" + 
                "<i data-init data-bind='text: $data'></i>" +
                "<i data-init data-bind='text: $data'></i>" +
              "</div>");
      obs(['a', 'b'])
      ko.applyBindings(view, div[0]);
      obs.splice(1, 0, 'c');
      assert.equal(div.text(), 'acb');
    });

    it("deletes the last item", function () {
      obs(['a'])
      ko.applyBindings(view, div[0]);
      obs([]);
      assert.equal(div.text(), '');
    });

    it("deletes from the beginning", function () {
      div = $("<div data-bind='foreachInit: obs'>" + 
                "<i data-template data-bind='text: $data'></i>" + 
                "<i data-init data-bind='text: $data'></i>" +
                "<i data-init data-bind='text: $data'></i>" +
                "<i data-init data-bind='text: $data'></i>" +
              "</div>");
      obs(['a', 'b', 'c'])
      ko.applyBindings(view, div[0]);
      obs.shift();
      assert.equal(div.text(), 'bc');
    });

    it("deletes from the beginning", function () {
      div = $("<div data-bind='foreachInit: obs'>" + 
                "<i data-template data-bind='text: $data'></i>" + 
                "<i data-init data-bind='text: $data'></i>" +
                "<i data-init data-bind='text: $data'></i>" +
                "<i data-init data-bind='text: $data'></i>" +
              "</div>");
      obs(['a', 'b', 'c'])
      ko.applyBindings(view, div[0]);
      obs.pop();
      assert.equal(div.text(), 'ab');
    });

    it("combines multiple adds and deletes", function () {
      div = $("<div data-bind='foreachInit: obs'>" + 
                "<i data-template data-bind='text: $data'></i>" + 
                "<i data-init data-bind='text: $data'></i>" +
                "<i data-init data-bind='text: $data'></i>" +
                "<i data-init data-bind='text: $data'></i>" +
                "<i data-init data-bind='text: $data'></i>" +
                "<i data-init data-bind='text: $data'></i>" +
                "<i data-init data-bind='text: $data'></i>" +
              "</div>");
      obs(['A', 'B', 'C', 'D', 'E', 'F']);
      ko.applyBindings(view, div[0]);
      obs(['x', 'B', 'C', 'D', 'z', 'F']);
      assert.equal(div.text(), 'xBCDzF');
    });

    it("processes multiple deletes", function () {
      // Per issue #6
      ko.applyBindings(view, div[0]);
      obs([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      assert.equal(div.text(), '0123456789');
      obs([1, 2, 3, 4, 5, 6, 7, 8]);
      assert.equal(div.text(), '12345678');
      obs([2, 3, 4, 5, 6, 7, 8, 9]);
      assert.equal(div.text(), '23456789');
      obs([3, 4, 5, 6, 7, 8, 9]);
      assert.equal(div.text(), '3456789');
      obs([2, 3, 4, 5, 6, 7, 8, 9]);
      assert.equal(div.text(), '23456789');
      obs([6, 7, 8, 9]);
      assert.equal(div.text(), '6789');
      obs([1, 2, 3, 6, 7, 8]);
      assert.equal(div.text(), '123678');
      obs([0, 1, 2, 3, 4]);
      assert.equal(div.text(), '01234');
      obs([1, 2, 3, 4]);
      assert.equal(div.text(), '1234');
      obs([3, 4]);
      assert.equal(div.text(), '34');
      obs([3]);
      assert.equal(div.text(), '3');
      obs([]);
      assert.equal(div.text(), '');
    });

    it("processes numerous changes", function () {
      ko.applyBindings(view, div[0]);
      obs([5, 6, 7, 8, 9]);
      assert.equal(div.text(), '56789');
      obs([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      assert.equal(div.text(), '0123456789');
      obs(['a', 'b', 'c']);
      assert.equal(div.text(), 'abc');
    });

    it("accepts changes via a computed observable", function() {
      var target = $("<div data-bind='foreachInit: $data'>" + 
                        "<i data-template data-bind='text: $data'></i>" + 
                        "<i data-init data-bind='text: $data'></i>" +
                        "<i data-init data-bind='text: $data'></i>" +
                        "<i data-init data-bind='text: $data'></i>" +
                      "</div>");
      var toggle = ko.observable(true);
      var list1 = [1, 2, 3];
      var list2 = [1, 2, 3, 4, 5, 6];
      ko.applyBindings(ko.computed({
        read: function() { return toggle() ? list1 : list2; }
      }), target[0]);
      assert.equal(target.text(), "123");
      toggle(false);
      assert.equal(target.text(), "123456");
    });

  });

  describe("combined with nested initializers", function () {
    setupSynchronousFrameAnimation();
    var model;

    beforeEach(function () {
      model = new ko.observableArray();
      model.push(new CityViewModel());
      model.push(new CityViewModel());
      model.push(new CityViewModel());
    });    

    it("works with textInit", function () {
      var target = $("<ul data-bind='foreachInit: $data'>" +
                        "<li data-bind='text: name' data-template></li>" +
                        "<li data-bind='textInit: name' data-init>London</li>" +
                        "<li data-bind='textInit: name' data-init>Paris</li>" +
                        "<li data-bind='textInit: name' data-init>Amsterdam</li>" +
                      "</ul>");
      ko.applyBindings(model, target[0]);
      assert.equal(target.html(), '<li data-bind="textInit: name" data-init="">London</li>' + 
                                  '<li data-bind="textInit: name" data-init="">Paris</li>' +
                                  '<li data-bind="textInit: name" data-init="">Amsterdam</li>');
      assert.strictEqual(model()[0].name(), 'London');
      assert.strictEqual(model()[1].name(), 'Paris');
      assert.strictEqual(model()[2].name(), 'Amsterdam');
    }); 

    it("works with valueInit", function () {
      var target = $("<div data-bind='foreachInit: $data'>" +
                        "<input data-bind='value: name' data-template></em>" +
                        "<input data-bind='valueInit: name' data-init type='text' value='London' />" +
                        "<input data-bind='valueInit: name' data-init type='text' value='Paris' />" +
                        "<input data-bind='valueInit: name' data-init type='text' value='Amsterdam' />" +
                      "</div>");
      ko.applyBindings(model, target[0]);
      assert.equal(target.html(), '<input data-bind="valueInit: name" data-init="" type="text" value="London">' +
                                  '<input data-bind="valueInit: name" data-init="" type="text" value="Paris">' +
                                  '<input data-bind="valueInit: name" data-init="" type="text" value="Amsterdam">');
      assert.strictEqual(model()[0].name(), 'London');
      assert.strictEqual(model()[1].name(), 'Paris');
      assert.strictEqual(model()[2].name(), 'Amsterdam');
    }); 

    it("works with init", function () {
      var target = $("<div data-bind='foreachInit: $data'>" +
                        "<input data-bind='value: name' data-template></em>" +
                        "<input data-bind='init: name' data-init type='text' value='London' />" +
                        "<input data-bind='init: name' data-init type='text' value='Paris' />" +
                        "<input data-bind='init: name' data-init type='text' value='Amsterdam' />" +
                      "</div>");
      ko.applyBindings(model, target[0]);
      assert.equal(target.html(), '<input data-bind="init: name" data-init="" type="text" value="London">' +
                                  '<input data-bind="init: name" data-init="" type="text" value="Paris">' +
                                  '<input data-bind="init: name" data-init="" type="text" value="Amsterdam">');
      assert.strictEqual(model()[0].name(), 'London');
      assert.strictEqual(model()[1].name(), 'Paris');
      assert.strictEqual(model()[2].name(), 'Amsterdam');
    }); 
  });
})

