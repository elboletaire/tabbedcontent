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
(function($, document, window) {
	"use strict";

	var Tabbedcontent = function(tabcontent, options) {
		var defaults = {
				links         : tabcontent.prev().find('a').length ? tabcontent.prev().find('a') : '.tabs a', // the tabs itself. By default it selects the links contained in the previous wrapper or the links inside ".tabs a" if there's no previous item
				errorSelector : '.error-message', // false to disable
				speed         : false, // speed of the show effect. Set to null or false to disable
				onSwitch      : false, // onSwitch callback
				onInit        : false, // onInit callback
				currentClass  : 'current', // current selected tab class (is set to the <a> element)
				historyState  : 'tabbed' // nothing to worry about..
			},
			saveHistory = true,
			firstTime = true,
			children = tabcontent.children(),
			history = window.history;

		options = $.extend(defaults, options);

		if (!options.links.version) {
			options.links = $(options.links);
		}

		function tabExists(tab) {
			return children.filter(tab).length ? true : false;
		}

		function getTabId(tabNum) {
			return '#' + children.eq(tabNum).attr('id');
		}

		function onShow(tab) {
			if (saveHistory && history !== undefined && history.hasOwnProperty('pushState')) {
				if (firstTime) {
					firstTime = false;
					window.setTimeout(function() {
						history.replaceState(options.historyState, '', tab);
					}, 100);
				} else {
					history.pushState(options.historyState, '', tab);
				}
			}
			// onSwitch callback
			if (options.onSwitch && typeof options.onSwitch === 'function') {
				options.onSwitch(tab);
			}
		}

		function switchTab(tab) {
			if (tab.toString().match(/^[0-9]+$/)) {
				tab = getTabId(tab);
			}
			if (!tabExists(tab)) {
				return false;
			}
			options.links.removeClass(options.currentClass);
			options.links.filter('a[href=' + tab + ']').addClass(options.currentClass);
			children.hide();
			children.filter(tab).show(options.speed, function() {
				if (options.speed) {
					onShow(tab);
				}
			});
			if (!options.speed) {
				onShow(tab);
			}
			return true;
		}

		function hashSwitch(e) {
			if (e.state === options.historyState) {
				saveHistory = false;
			}
			if (tabExists(document.location.hash)) {
				switchTab(document.location.hash);
			}
		}

		function init() {
			// Switch to "first" tab
			if (tabExists(document.location.hash)) {
				switchTab(document.location.hash);
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

			// Bindings
			options.links.bind("click", function(e) {
				switchTab($(this).attr('href'));
				if (history !== undefined && (history.hasOwnProperty('pushState'))) {
					e.preventDefault();
				}
			});

			if (window.hasOwnProperty('onpopstate')) {
				window.onpopstate = hashSwitch;
			} else {
				$(window).bind('hashchange', hashSwitch);
			}

			// onInit callback
			if (options.onInit && typeof options.onInit === 'function') {
				options.onInit();
			}
		}

		init();

		return {
			'switch': switchTab
		};
	};

	$.fn.tabbedContent = function(options) {
		return this.each(function() {
			var tabs = new Tabbedcontent($(this), options);
			$(this).data('api', tabs);
		});
	};

})(jQuery, document, window);
