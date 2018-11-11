var jsdom = require("jsdom").jsdom;
document = jsdom("hello world");
window = document.defaultView;
