# Knockout pre-rendered binding handlers

This library adds four new binding handlers to Knockout that allow observables to be initialized from pre-rendered HTML content:

- `textInit`: wraps the [`text` binding](http://knockoutjs.com/documentation/text-binding.html), with the observable initialized to the `innerText` attribute of the HTML element it is bound to.
- `valueInit`: wraps the [`value` binding](http://knockoutjs.com/documentation/value-binding.html), with the observable initialized to the `value` attribute of the HTML `<input>` element it is bound to.
- `foreachInit`: wraps the [`foreach` binding](http://knockoutjs.com/documentation/foreach-binding.html), with the observable array's elements bound to existing HTML elements.
- `init`: initialize an observable to a specific value.

## Binding #1: textInit  

Suppose we have the following view model:

```javascript
function ViewModel() {
  this.name = ko.observable();
}
```

Normally, you'd bind the `name` observable to an HTML element as follows:

```html
<span data-bind="text: name">Michael Jordan</span>
```

Once the bindings have been applied however, the text within the `<span>` element will be cleared, as the bound observable did not have a value. 

If we use the `textInit` binding handler, first the observable's value will be set to the `innerText` value of the bound element. Then the `text` binding is applied. 

```html
<span data-bind="textInit: name">Michael Jordan</span>
```

Now, the text within the `<span>` element is left unchanged.

### Converting 
By default, the `textInit` binding will set the observable's value to a string  . If you want to convert to a different type, you can specify a convert function:

```html
<span data-bind="textInit: { field: height, convert: parseInt }">198</span>
```

Now, the observable's value will be set to what the `convert` function, with the `innerText` value as its parameter, returns.

#### Custom conversion

It is also possible to use your own, custom conversion function. You could, for example, define it in your view model:

```javascript
function CustomConvertViewModel() {
  this.dateOfBirth = ko.observable();

  this.parseDate = function(innerText) {
    return new Date(Date.parse(innerText));
  }
}
```

You can then use this custom convert function as follows:

```html
<span data-bind="textInit: { field: dateOfBirth, convert: parseDate }">
```

## Binding #2: valueInit

The `valueInit` binding is similar to the `textInit` binding, but acts as a wrapper over the `value` binding instead of the `text` binding:

```html
<input data-bind="valueInit: name" value="Michael Jordan" type="text" />
```

Converting works in the exact same way:

```html
<input data-bind="valueInit: { field: height, convert: parseInt }" value="198" type="text" />
```

## Binding #3: foreachInit
This binding handler wraps the `foreach` binding, but instead of creating new HTML elements, it binds to existing HTML elements. Consider the following view model:

```javascript
function PersonViewModel() {
  this.name = ko.observable();
}

function ForeachViewModel() {
  this.persons = ko.observableArray();

  this.persons.push(new PersonViewModel());
  this.persons.push(new PersonViewModel());
  this.persons.push(new PersonViewModel());
}
```

We can bind the elements in the `persons` observable array to existing HTML elements by using the `foreachInit` binding handler:

```html
<ul data-bind="foreachInit: persons">
  <li data-template data-bind="text: name"></li>
  <li data-init data-bind="textInit: name">Michael Jordan</li>
  <li data-init data-bind="textInit: name">Larry Bird</li>
  <li data-init data-bind="textInit: name">Magic Johnson</li>
</ul>
```

There are several things to note:

1. There must be one child element with the `data-template` attribute. This element will be used as the template when new items are added to the array.
2. Elements to be bound to array items must have the `data-init` attribute.
3. You can use the `textInit` and `valueInit` binding handlers to initialize the array items themselves.

### Template
You can also use a template that is defined elsewhere on the page:

```html
<ul data-bind="foreachInit: { name: 'personTemplate', data: persons }">  
  <li data-init data-bind="textInit: name">Michael Jordan</li>
  <li data-init data-bind="textInit: name">Larry Bird</li>
  <li data-init data-bind="textInit: name">Magic Johnson</li>
</ul>

<script type="text/ko-template" id="personTemplate">
  <li data-template data-bind="text: name"></li>
</script>
```

### Create missing array elements

Up until now, we assumed that the observable array already contained an item for each HTML element bound inside the `foreachInit` section. However, you can also have the `foreachInit` binding handler dynamically add an element for each bound element.

Take the following view model:

```javascript
function ForeachDynamicViewModel() {
  this.persons = ko.observableArray();

  this.addPerson = function() {
    this.persons.push(new PersonViewModel());
  }
}
```

Note that the `persons` observable array does not contain any elements, but that it does have a function to add a new element to the array.

We can use the `foreachInit` binding handler as follows:

```html
<ul data-bind="foreachInit: { name: 'personTemplate', createElement: addPerson }">  
  <li data-template data-bind="text: name"></li>
  <li data-init data-bind="textInit: name">Michael Jordan</li>
  <li data-init data-bind="textInit: name">Larry Bird</li>
  <li data-init data-bind="textInit: name">Magic Johnson</li>
</ul>
```

What happens is that for each element with the `data-init` attribute, the function specified in the `createElement` parameter is called.

## Binding #4: init

This binding handler initializes an observable to a value. It is only really useful if you use one of the previous binding handlers and want to completely initialize your view model from HTML.

You can apply it to an element as follows:

```html
<span data-bind="init: name">Michael Jordan</span>
```

Although this initializes the `name` observable to `"Michael Jordan"`, note that the element's text is not bound to the observable. For that, you should use the `textInit` binding.

Therefore it usually makes more sense to use the `init` binding handler as a virtual element:

```html
<!-- ko init: { field: name } -->Michael Jordan<!-- /ko -->
```

Converting works similar to the `textInit` and `valueInit` bindings:

```html
<!-- ko init: { field: height, convert: parseInt } -->198<!-- /ko -->
```

## Installation
The best way to install this library is using [Bower](http://bower.io/):

    bower install knockout-pre-rendered

## Demos
There is a JSBin demo for each of the binding handlers:

- [`textInit` binding](http://jsbin.com/jazeke)
- [`valueInit` binding](http://jsbin.com/xuluye/)
- [`foreachInit` binding](http://jsbin.com/nocaro)
- [`init` binding](http://jsbin.com/wikaji/)

## History
<table>
  <tr>
     <th>Date</th>
     <th>Version</th>
     <th>Changes</th>
  </tr>
  <tr>
     <td>2014-04-13</td>
     <td>0.2.0</td>
     <td>Added support for automatically creating missing array elements.</td>
  </tr>
  <tr>
     <td>2014-04-12</td>
     <td>0.1.1</td>
     <td>Added Bower support.</td>
  </tr>
  <tr>
     <td>2014-04-11</td>
     <td>0.1.0</td>
     <td>None. Initial version.</td>
  </tr>
</table>

## Acknowledgements
Many thanks go out to [Brian M Hunt](https://github.com/brianmhunt), which [`fastForEach` binding handler](https://github.com/brianmhunt/knockout-fast-foreach) formed the basis of the `foreachInit` binding handler.

## License
[Apache License 2.0](LICENSE.md)
