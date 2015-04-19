# Easy to use tabs plugin

TabbedContent is a lightweight tabs plugin that uses the HTML5 history API to
add your tab navigation to your browser's history.

It is compatible with both jQuery and Zepto.js libraries.

It also has an API that will let you switch between tabs externally.

## Online Demo

[Check out the online demo!](http://elboletaire.github.io/tabbedcontent)

## Usage

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
	links 		  : '.tabs a', // the tab links
	errorSelector : '.error-message', // false to disable
	speed		  : false, // speed of the show effect. Set to null or false to disable
	onSwitch	  : false, // onSwitch callback
	onInit		  : false, // onInit callback
	currentClass  : 'current', // current selected tab class (is set to the <a> element)
	loop          : false // if set to true will loop between tabs when using the next() and prev() api methods
});
```

### API

TabbedContent has a simple API that will allow you to switch between tabs.
To use it simply call `data('api')`:

```javascript
var mytabs = $('.tabscontent').tabbedContent().data('api');

// now you can use the switch method:
mytabs.switch('#tab-2');

// or using it's index...
mytabs.switch(1); // note that first tab begins at 0

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

## License

	Copyright 2013-2014 Òscar Casajuana (a.k.a. elboletaire)

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	   http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	imitations under the License.
