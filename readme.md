Easy to use tabs plugin for jQuery & Zepto.js
=============================================

[![Code Climate](https://img.shields.io/codeclimate/github/elboletaire/tabbedcontent.svg?style=flat-square)](https://codeclimate.com/github/elboletaire/tabbedcontent)

TabbedContent is a lightweight* tabs plugin that uses the HTML5 history API to
add your tab navigation to your browser's history.

> \*  3 KB minified, 1.25 KB gzipped/deflated

It is compatible with both jQuery and Zepto.js libraries.

It also has an API that will let you switch between tabs externally.


Online Demos
------------

- [Basic demo](http://elboletaire.github.io/tabbedcontent/demos/demo.html)
- [Bootstrap demo](http://elboletaire.github.io/tabbedcontent/demos/bootstrap.html)
- [Bootstrap demo with multiple tabbed contents](http://elboletaire.github.io/tabbedcontent/demos/bootstrap_multiple.html)
- [Bootstrap + Zepto.js demo](http://elboletaire.github.io/tabbedcontent/demos/bootstrap_and_zeptojs.html)

Installation
------------

### Using bower

```bash
bower install --save tabbedcontent
```

### Using npm

```bash
npm install tabbedcontent
```

Usage
-----

Basic layout:

```html
<ul>
    <li><a href="#tab-1">Tab 1</a></li>
    <li><a href="#tab-2">Tab 2</a></li>
    <li><a href="#tab-3">Tab 3</a></li>
    <li><a href="#tab-n">Tab N</a></li>
</ul>
<div class="tabscontent">
    <div id="tab-1">
        <!-- your first tab content -->
    </div>
    <div id="tab-2">
        <!-- your second tab content -->
    </div>
    <div id="tab-3">
        <!-- your third tab content -->
    </div>
    <div id="tab-n">
        <!-- your n tab content -->
    </div>
</div>
```

The links of the tabs should point to each tab id.

Basic javascript initialization:

```javascript
$('.tabscontent').tabbedContent();
```

By default the plugin will take the links inside the previous wrapper related to the tabs layer; but you can specify your links selector, so you can put your links everywhere:

```html
<ul class="tabs">
    [...]
```

```javascript
$('.tabscontent').tabbedContent({
    links: 'ul.tabs li a' // you can also pass a jquery/zepto object containing the links
})
```

### Using with Zepto.js

You'll need the [`data`](https://github.com/madrobby/zepto/blob/master/src/data.js)
plugin if you want to use the tabbedcontent api.

### Error Detector

This option is very practic if you're working with forms and want the tabs be opened on the first one containing an error.

Simply specify the `errorSelector` selector:

```javascript
$('.tabscontent').tabbedContent({
    errorSelector : '.error-message'
});
```

When the plugin initializes it searches for `errorSelector` inside tabs content, opening the first tab containing it.

> **Note** that this only works when there's no hash present in the url. If a hash is present its tab will be opened.


### Overwriting default tab

If you force a parent's link class to be the one set in `options.currentClass`
you will force that tab to be opened.

```html
<ul>
    <li class="active"><a href="#tab-1">Tab 1</a></li>
    <li><a href="#tab-2">Tab 2</a></li>
    <li><a href="#tab-3">Tab 3</a></li>
    <li><a href="#tab-n">Tab N</a></li>
</ul>
```

This takes priority over `.errorSelector`.

### Callbacks

TabbedContent has two callbacks that may be util to you: `onInit` and `onSwitch`.

```javascript
$('.tabscontent').tabbedContent({
    onInit: function(api) {
        console.log('tabs initialized');
        console.log('Current tab is ' + api.getCurrent());
    },
    onSwitch: function(tab, api) {
        // Init a WYSIWYG editor on the tab (for example..)
        if (!$(tab + ' textarea').data('wysiwyg-initialized')) {
            initWysiwyg(tab + ' textarea');
        }
    }
})
```

### Full configuration

```javascript
$('.tabscontent').tabbedContent({
    links         : '.tabs a', // the tab links
    errorSelector : '.error-message', // false to disable
    speed         : false, // speed of the show effect. Set to null or false to disable
    onSwitch      : false, // onSwitch callback
    onInit        : false, // onInit callback
    currentClass  : 'current', // current selected tab class (is set to link's parent)
    tabErrorClass : 'has-error', // a class to be added to the tab where errorSelector is detected
    history       : true, // set to false to disable HTML5 history
    loop          : false // if set to true will loop between tabs when using the next() and prev() api methods
});
```

### API

TabbedContent has a simple API that will allow you to switch between tabs.
To use it simply call `data('api')`:

```javascript
var mytabs = $('.tabscontent').tabbedContent().data('api');

// now you can use the switch method:
mytabs.switch('#tab-1');

// or using it's index...
mytabs.switch(0); // note that first tab begins at 0

// you can also switch using id (whout #) and jQuery/Zepto objects
mytabs.switch('tab-1');
mytabs.switch($('.tabscontent div#tab-1'));

// you can also switch to next and previous tabs
mytabs.next();
mytabs.prev();

// the previous example won't loop the tabs; to do so you can set loop to true when configuring tabbedContent:
var mytabs = $('.tabscontent').tabbedContent({loop: true}).data('api');
// and / or you can pass it directly to the method:
mytabs.next(true);
mytabs.prev(true);

// check if current tab is first or last
if (mytabs.isFirst()) { /* do stuff */ }
if (mytabs.isLast()) { /* do stuff */ }
```

#### Full API

```javascript
{
    // Switch to tab
    'switch'       : function apiSwitch(tab) {},
    // Switch to tab for old browsers
    'switchTab'    : function apiSwitch(tab) {},
    // Get current tab index
    'getCurrent'   : function getCurrent() {},
    // Get jQuery/Zepto object for specified tab
    'getTab'       : function getTab(tab) {},
    // Go to next tab in the tabs set
    'next'         : function next(loop) {},
    // Go to previous tab in the tabs set
    'prev'         : function prev(loop) {},
    // Returns true if current tab is first tab
    'isFirst'      : function isFirst() {},
    // Returns true if current tab is last tab
    'isLast'       : function isLast() {}
};
```

License
-------

    The MIT License (MIT)

    Copyright (c) 2015 Òscar Casajuana <elboletaire at underave dot net>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

