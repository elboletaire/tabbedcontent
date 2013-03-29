/*
 * Tabs plugin for jQuery created by Òscar Casajuana < elboletaire at underave dot net > 
 * 
 * Copyright 2013 Òscar Casajuana
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function($, document, window, undefined) {
	"use strict";

	var Tabbedcontent = function(tabcontent, options) {
		var defaults = {
				links         : tabcontent.prev().find('a').length ? tabcontent.prev().find('a') : '.tabs a', // the tabs itself. By default it selects the links contained in the previous wrapper or the links inside ".tabs a" if there's no previous item
				errorSelector : '.error-message', // false to disable
				speed         : false, // speed of the show effect. Set to null or false to disable
				onSwitch      : false, // onSwitch callback
				onInit        : false, // onInit callback
				currentClass  : 'current' // current selected tab class (is set to the <a> element)
			},
			firstTime = true,
			children = tabcontent.children(),
			history = window.history,
			loc = document.location;

		options = $.extend(defaults, options);

		if (!options.links.version) {
			options.links = $(options.links);
		}

		function tabExists(tab) {
			return children.filter(tab).length ? true : false;
		}

		function getTabId(tab) {
			if (tab.toString().match(/^[0-9]$/)) {
				return '#' + children.eq(tab).attr('id');
			}
			// asume it's an id without #
			return '#' + tab;
		}

		function onSwitch(tab) {
			if (firstTime && history !== undefined && ('pushState' in history)) {
				firstTime = false;
				window.setTimeout(function() {
					history.replaceState(null, '', tab);
				}, 100);
			}
			if (options.onSwitch && typeof options.onSwitch === 'function') {
				options.onSwitch(tab);
			}
		}

		function switchTab(tab, api) {
			if (!tab.toString().match(/^#/)) {
				tab = getTabId(tab);
			}
			if (!tabExists(tab)) {
				return false;
			}
			options.links.removeClass(options.currentClass);
			options.links.filter('a[href=' + tab + ']').addClass(options.currentClass);
			children.hide();
			if (api) {
				if (history !== undefined && ('pushState' in history)) {
					history.pushState(null, '', tab);
				} else {
					// force hash change to add it to the history
					window.location.hash = tab;
				}
			}
			children.filter(tab).show(options.speed, function() {
				if (options.speed) {
					onSwitch(tab);
				}
			});
			if (!options.speed) {
				onSwitch(tab);
			}
			return true;
		}

		function apiSwitch(tab) {
			return switchTab(tab, true);
		}

		function hashSwitch(e) {
			if (tabExists(loc.hash)) {
				switchTab(loc.hash);
			}
		}

		function init() {
			// Switch to "first" tab
			if (tabExists(loc.hash)) {
				switchTab(loc.hash);
			} else if (options.errorSelector && children.find(options.errorSelector).length) {
				children.each(function() {
					if ($(this).find(options.errorSelector).length) {
						switchTab("#" + $(this).attr("id"));
						return false;
					}
				});
			} else {
				switchTab("#" + tabcontent.children(":first-child").attr("id"));
			}

			// Binding
			if ('onhashchange' in window) {
				$(window).bind('hashchange', hashSwitch);
			} else { // old browsers
				var current_href = loc.href;
				window.setInterval(function() {
					if (current_href !== loc.href) {
						hashSwitch.call(window.event);
						current_href = loc.href;
					}
				}, 100);
			}

			// onInit callback
			if (options.onInit && typeof options.onInit === 'function') {
				options.onInit();
			}
		}

		init();

		return {
			'switch': apiSwitch,
			'switchTab': apiSwitch // for old browsers
		};
	};

	$.fn.tabbedContent = function(options) {
		return this.each(function() {
			var tabs = new Tabbedcontent($(this), options);
			$(this).data('api', tabs);
		});
	};

})(jQuery, document, window);
