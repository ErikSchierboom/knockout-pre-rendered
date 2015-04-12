# Knockout pre-rendered binding handlers
Adds binding handlers to Knockout (KO) that are initialized using pre-rendered content (HTML).

# Introduction
The main question is: why would you want to initialize a Knockout view model with pre-rendered content? Isn't Knockout supposed to do all the rendering client-side? Well yes, but there are some advantages pre-rendered, server-side content has over Knockout's client-side rendering:

- It allows search engines to index your site better.
- Rendering is faster, especially with a large number of elements.

Ideally, you'd like to combine the benefits server-side, pre-rendered content with Knockout's client-side rendering. That is where this library comes in.

# Usage
When installing this library, four new binding handlers will be added:

- `textInit`: extended [`text` binding](http://knockoutjs.com/documentation/text-binding.html), the observable initialized to the `innerText` property of the element it is bound to.
- `valueInit`: extended [`value` binding](http://knockoutjs.com/documentation/value-binding.html), the observable initialized to the `value` attribute of the `<input>` element it is bound to.
- `foreachInit`: extended [`foreach` binding](http://knockoutjs.com/documentation/foreach-binding.html), the observable array's elements bound to existing elements.
- `init`: initialize the observable to a specified value.

## Extended text binding
Using the `textInit` binding is simple. Just replace the `text` binding with the `textInit` binding. The main difference is that when the binding is applied to an element, it will read the `innerText` 

### Converting 

## Extended value binding
TODO

Note: converting works in exactly the same way as the `textInit` binding.

## Extended foreach binding
TODO

## Init binding
TODO

Note: converting works in exactly the same way as the `textInit` binding.

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

## License
[Apache License 2.0](LICENSE.md)
