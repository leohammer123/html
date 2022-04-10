/**
 * @license
 https://github.com/gilmoreorless/css-background-parser
 Copyright © 2015 Gilmore Davidson under the MIT license: http://gilmoreorless.mit-license.org/
 PhotoSwipe - v4.1.3 - 2019-01-08
 http://photoswipe.com
 Copyright (c) 2019 Dmitry Semenov;  PhotoSwipe Default UI - 4.1.3 - 2019-01-08
 http://photoswipe.com
 Copyright (c) 2019 Dmitry Semenov;  skrollr core

 Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr

 Free to use under terms of MIT license
 Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
 JavaScript Cookie v2.2.1
 https://github.com/js-cookie/js-cookie

 Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 Released under the MIT license
 gumshoejs v5.1.2
 A simple, framework-agnostic scrollspy script.
 (c) 2019 Chris Ferdinandi
 MIT License
 http://github.com/cferdinandi/gumshoe
*/
'use strict';
!function(modules) {
  /**
   * @param {number} moduleId
   * @return {?}
   */
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i : moduleId,
      l : false,
      exports : {}
    };
    return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.l = true, module.exports;
  }
  var installedModules = {};
  return __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function(exports, name, n) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {
        configurable : false,
        enumerable : true,
        get : n
      });
    }
  }, __webpack_require__.n = function(module) {
    /** @type {function(): ?} */
    var n = module && module.__esModule ? function getDefault() {
      return module["default"];
    } : function getModuleExports() {
      return module;
    };
    return __webpack_require__.d(n, "a", n), n;
  }, __webpack_require__.o = function(value, name) {
    return Object.prototype.hasOwnProperty.call(value, name);
  }, __webpack_require__.p = "/Content/BundledScripts/", __webpack_require__(__webpack_require__.s = 7908);
}({
  116 : function(task, id, planetsCbk) {
    /**
     * @param {!Object} data
     * @return {undefined}
     */
    function self(data) {
      /** @type {!Object} */
      this.$dom = data;
      this.countdownCommon = new Date(data);
    }
    /** @type {function(!Object): undefined} */
    task.exports = self;
    var Date = planetsCbk(12);
    /**
     * @param {string} e
     * @return {undefined}
     */
    self.prototype.startUpdate = function(e) {
      var rumbleSpeed = this.getUpdateTimeout();
      if (rumbleSpeed) {
        this.update(e, true);
        setInterval(this.update.bind(this), rumbleSpeed, e);
      }
    };
    /**
     * @return {?}
     */
    self.prototype.getUpdateTimeout = function() {
      if (this.countdownCommon.getAfterCountFinished()) {
        return 0;
      }
      var countdownType = this.countdownCommon.getType();
      if ("to-date" === countdownType || "to-time" === countdownType) {
        return 350;
      }
      if ("to-number" === countdownType) {
        var val = this.countdownCommon.getFrequency();
        var s = Date.timeStringToMilliseconds(val);
        return s = Math.max(s, 0), s = Math.min(s, 350);
      }
      return 0;
    };
    /**
     * @param {string} props
     * @param {boolean} index
     * @return {?}
     */
    self.prototype.getAnimationProps = function(props, index) {
      if (index) {
        return {
          animation : "none"
        };
      } else {
        return {
          animation : "runtime" === props && this.countdownCommon.getCountAnimation() || "none",
          animationSpeed : this.getUpdateTimeout()
        };
      }
    };
    /**
     * @param {string} b
     * @param {boolean} e
     * @return {undefined}
     */
    self.prototype.update = function(b, e) {
      if (!this.countdownCommon.getAfterCountFinished()) {
        var countdownType = this.countdownCommon.getType();
        if ("to-date" === countdownType || "to-time" === countdownType) {
          this.updateDateAndTime(b, e);
        }
        if ("to-number" === countdownType) {
          this.updateNumber(b, e);
        }
      }
    };
    /**
     * @param {string} text
     * @param {boolean} start
     * @return {undefined}
     */
    self.prototype.updateDateAndTime = function(text, start) {
      var id = this.countdownCommon.getDate();
      var o = this.getTimeDiff(id);
      if (!this.afterCount(o, text)) {
        var value = this.getAnimationProps(text, start);
        this.countdownCommon.setValue("years", o.years, false, value);
        this.countdownCommon.setValue("days", o.days, false, value);
        this.countdownCommon.setValue("hours", o.hours, false, value);
        this.countdownCommon.setValue("minutes", o.minutes, false, value);
        this.countdownCommon.setValue("seconds", o.seconds, false, value);
        this.countdownCommon.showLabel("years", !!o.years);
        this.countdownCommon.showLabel("days", !!o.days);
      }
    };
    /**
     * @param {string} v
     * @param {boolean} e
     * @return {undefined}
     */
    self.prototype.updateNumber = function(v, e) {
      var value = this.countdownCommon.getNumber();
      var callback = this.countdownCommon.getStartTime();
      var b = this.countdownCommon.getFrequency();
      var cb = this.countdownCommon.calcNumber(value, callback, b);
      if ("per-visitor" === this.countdownCommon.getFor()) {
        var currentDoc = this.countdownCommon.getTimerId();
        callback = this.getStartDate(currentDoc);
        cb = this.countdownCommon.calcNumber(value, callback, b);
      }
      if (!this.afterCount(cb, v)) {
        var value = this.getAnimationProps(v, e);
        this.countdownCommon.setValue("numbers", cb, false, value);
      }
    };
    /**
     * @param {!Date} actual
     * @return {?}
     */
    self.prototype.getTimeDiff = function(actual) {
      if ("everyone" === this.countdownCommon.getFor()) {
        return this.countdownCommon.timeDiff(actual);
      }
      var target = this.getStartDate();
      var value = this.countdownCommon.getTimeLeft();
      return actual = this.countdownCommon.parseTime(value, target), this.countdownCommon.timeDiff(actual);
    };
    /**
     * @return {?}
     */
    self.prototype.getStartDate = function() {
      var key = this.countdownCommon.getTimerKey();
      var s = localStorage.getItem(key);
      if (s) {
        return new Date(s);
      }
      /** @type {!Date} */
      var value = new Date;
      return localStorage.setItem(key, value.toUTCString()), value;
    };
    /**
     * @param {!Object} type
     * @param {!Object} count
     * @return {?}
     */
    self.prototype.afterCount = function(type, count) {
      var i = this.countdownCommon.getDirection();
      var undefined = this.countdownCommon.getAfterCount();
      if (count = count || "", "none" !== undefined && "down" === i && Date.isEmptyDiff(type)) {
        if ("message" === undefined) {
          this.showMessage();
        }
        if ("redirect" === undefined) {
          if (this.$dom.find(".u-countdown-message").text("Redirecting..."), this.showMessage(), "preview" !== count) {
            var downloadHref = this.countdownCommon.getRedirectUrl();
            window.location.href = downloadHref;
          }
        }
        if ("preview" !== count) {
          this.countdownCommon.setAfterCountFinished();
        }
        return true;
      }
      return false;
    };
    /**
     * @return {undefined}
     */
    self.prototype.showMessage = function() {
      if (this.$dom.find(".u-countdown-message").is(".u-hidden")) {
        this.$dom.find(".u-countdown-wrapper").addClass("u-invisible");
        this.$dom.find(".u-countdown-message").removeClass("u-hidden");
      }
    };
    /**
     * @return {undefined}
     */
    self.prototype.hideMessage = function() {
      if (this.$dom.find(".u-countdown-message").not(".u-hidden")) {
        this.$dom.find(".u-countdown-wrapper").removeClass("u-invisible");
        this.$dom.find(".u-countdown-message").addClass("u-hidden");
      }
    };
    /**
     * @return {?}
     */
    self.findAll = function() {
      return $(".u-countdown");
    };
  },
  12 : function(module, metadata, packageSuccess) {
    /**
     * @param {!Object} node
     * @return {undefined}
     */
    function self(node) {
      /** @type {!Object} */
      this.$dom = node;
    }
    /** @type {function(!Object): undefined} */
    module.exports = self;
    var ValidationStream = packageSuccess(179);
    /**
     * @return {?}
     */
    self.prototype.getDate = function() {
      var interpretdYear = this.$dom.attr("data-target-date");
      if (interpretdYear) {
        return new Date(interpretdYear);
      } else {
        return new Date;
      }
    };
    /**
     * @return {?}
     */
    self.prototype.getDirection = function() {
      return this.$dom.attr("data-direction") || "down";
    };
    /**
     * @return {?}
     */
    self.prototype.getTimeLeft = function() {
      return this.$dom.attr("data-time-left") || "750m";
    };
    /**
     * @return {?}
     */
    self.prototype.getNumber = function() {
      var total_pageviews_raw = this.$dom.attr("data-target-number") || "100";
      return parseInt(total_pageviews_raw, 10);
    };
    /**
     * @return {?}
     */
    self.prototype.getStartTime = function() {
      var interpretdYear = this.$dom.attr("data-start-time");
      if (interpretdYear) {
        return new Date(interpretdYear);
      } else {
        return new Date;
      }
    };
    /**
     * @return {?}
     */
    self.prototype.getFrequency = function() {
      return this.$dom.attr("data-frequency") || "1s";
    };
    /**
     * @return {?}
     */
    self.prototype.getTimerId = function() {
      return this.$dom.attr("data-timer-id");
    };
    /**
     * @return {?}
     */
    self.prototype.getTimerKey = function() {
      return "timer-" + this.getTimerId();
    };
    /**
     * @return {?}
     */
    self.prototype.getFor = function() {
      return this.$dom.attr("data-for") || "everyone";
    };
    /**
     * @return {?}
     */
    self.prototype.getType = function() {
      return this.$dom.attr("data-type") || "to-date";
    };
    /**
     * @param {string} name
     * @param {string} values
     * @param {string} obj
     * @param {!Object} params
     * @return {undefined}
     */
    self.prototype.setValue = function(name, values, obj, params) {
      var filteredView = this.$dom.find(".u-countdown-" + name);
      var o = values.toString();
      var index = o.length;
      if ("to-number" === this.getType()) {
        for (; filteredView.find(".u-countdown-number").length < index + 1;) {
          var $curSet = filteredView.find(".u-countdown-number:eq(0)");
          if (!$curSet.length) {
            break;
          }
          $curSet.clone().insertAfter($curSet).text("0");
        }
        for (; filteredView.find(".u-countdown-number").length > index + 1;) {
          filteredView.find(".u-countdown-number:eq(0)").remove();
        }
      }
      var data = filteredView.find(".u-countdown-number");
      if ("hours" === name || "minutes" === name || "seconds" === name || "numbers" === name) {
        for (; o.length < data.length;) {
          /** @type {string} */
          o = "0" + o;
        }
      }
      if (!(index > data.length)) {
        /** @type {number} */
        var i = 0;
        for (; i < data.length; i++) {
          var next = $(data[i]);
          if (this.doSetVal(next, o[i], params), obj && ("years" === name || "days" === name)) {
            next.toggleClass("u-hidden", i >= index);
          }
        }
      }
    };
    /**
     * @param {!Object} t
     * @param {?} i
     * @param {!Object} a
     * @return {undefined}
     */
    self.prototype.doSetVal = function(t, i, a) {
      if ((a = a || {}).animation && "none" !== a.animation) {
        var v = new ValidationStream(t);
        if (v.getOldVal() !== i) {
          v.rollNumber(i, a);
        }
      } else {
        if (t.text() !== i) {
          t.text(i);
        }
      }
    };
    /**
     * @param {string} id
     * @param {boolean} bool
     * @return {undefined}
     */
    self.prototype.showLabel = function(id, bool) {
      var $field = this.$dom.find(".u-countdown-" + id);
      $field.toggleClass("u-hidden", !bool);
      $field.parent().children(".u-countdown-separator").each(function(canCreateDiscussions, href) {
        var clicked = $(href);
        var previousPrevious = clicked.prev(".u-countdown-item");
        var pageTextPicker = clicked.nextAll(".u-countdown-item:not(.u-hidden)");
        clicked.toggleClass("u-hidden", !(previousPrevious.is(":not(.u-hidden)") && pageTextPicker.is(":not(.u-hidden)")));
      });
    };
    /**
     * @return {undefined}
     */
    self.prototype.setAfterCountFinished = function() {
      this.$dom.attr("data-after-count-finished", true);
    };
    /**
     * @return {?}
     */
    self.prototype.getAfterCountFinished = function() {
      var value = this.$dom.attr("data-after-count-finished") || "false";
      return value && "true" === value || false;
    };
    /**
     * @return {?}
     */
    self.prototype.getAfterCount = function() {
      return this.$dom.attr("data-after-count") || "none";
    };
    /**
     * @return {?}
     */
    self.prototype.getRedirectUrl = function() {
      return this.$dom.attr("data-redirect-url") || "https://";
    };
    /**
     * @return {?}
     */
    self.prototype.getCountAnimation = function() {
      return this.$dom.attr("data-count-animation") || "none";
    };
    /**
     * @param {!Date} time
     * @return {?}
     */
    self.prototype.timeDiff = function(time) {
      /** @type {!Date} */
      var e = new Date;
      var i;
      if ("down" === this.getDirection()) {
        return self.calcTimeDiff(time, e);
      } else {
        return self.calcTimeDiff(e, time);
      }
    };
    /**
     * @param {number} date
     * @param {!Date} length
     * @param {string} val
     * @return {?}
     */
    self.prototype.calcNumber = function(date, length, val) {
      var total = self.timeStringToMilliseconds(val);
      if (!total) {
        return 0;
      }
      /** @type {!Date} */
      var newStart = new Date;
      /** @type {number} */
      var curZoom = "up" === this.getDirection() ? 1 : -1;
      var next_planting = date + Math.floor((newStart - length) / total) * curZoom;
      if (next_planting < 0) {
        return 0;
      } else {
        return next_planting;
      }
    };
    /**
     * @param {string} value
     * @param {!Date} start
     * @return {?}
     */
    self.prototype.parseTime = function(value, start) {
      var value2 = self.timeStringToMilliseconds(value);
      /** @type {number} */
      var t = "down" === this.getDirection() ? 1 : -1;
      return new Date(start.getTime() + value2 * t);
    };
    /**
     * @param {!Date} s
     * @param {!Date} e
     * @return {?}
     */
    self.calcTimeDiff = function(s, e) {
      if (s <= e) {
        return self.emptyDiff();
      }
      /** @type {number} */
      var seconds = Math.abs(s - e) / 1E3;
      /** @type {number} */
      var yearRange = Math.floor(seconds / 31536E3);
      /** @type {number} */
      seconds = seconds - 31536E3 * yearRange;
      /** @type {number} */
      var value = Math.floor(seconds / 86400);
      /** @type {number} */
      seconds = seconds - 86400 * value;
      /** @type {number} */
      var millisSubstitution = Math.floor(seconds / 3600) % 24;
      /** @type {number} */
      seconds = seconds - 3600 * millisSubstitution;
      /** @type {number} */
      var minutes = Math.floor(seconds / 60) % 60;
      var l;
      return seconds = seconds - 60 * minutes, {
        years : yearRange,
        days : value,
        hours : millisSubstitution,
        minutes : minutes,
        seconds : Math.floor(seconds)
      };
    };
    /**
     * @return {?}
     */
    self.emptyDiff = function() {
      return {
        years : 0,
        days : 0,
        hours : 0,
        minutes : 0,
        seconds : 0
      };
    };
    /**
     * @param {!Object} data
     * @return {?}
     */
    self.isEmptyDiff = function(data) {
      if ("number" == typeof data) {
        return 0 === data;
      } else {
        return 0 === data.years && 0 === data.days && 0 === data.hours && 0 === data.minutes && 0 === data.seconds;
      }
    };
    /**
     * @param {string} timeString
     * @return {?}
     */
    self.timeStringToMilliseconds = function(timeString) {
      var match = timeString.match(/(\d+)(ms|s|m|h|d|)/);
      if (3 === match.length) {
        /** @type {number} */
        var whiteRating = parseInt(match[1], 10);
        switch(match[2]) {
          case "ms":
            return whiteRating;
          case "s":
            return 1E3 * whiteRating;
          case "m":
            return 60 * whiteRating * 1E3;
          case "h":
            return 3600 * whiteRating * 1E3;
          case "d":
            return 86400 * whiteRating * 1E3;
          default:
            return 0;
        }
      }
      return 0;
    };
  },
  121 : function(module, selector, convertToImages) {
    /**
     * @param {!Object} option
     * @return {undefined}
     */
    function Dialog(option) {
      /** @type {string} */
      this._openClass = "u-dialog-open";
      /** @type {string} */
      this._dialogBlockClass = "u-dialog-block";
      /** @type {string} */
      this._dialogBlockSelector = "." + this._dialogBlockClass;
      this._dialog = option.closest(this._dialogBlockSelector);
    }
    /**
     * @param {!Object} array
     * @return {?}
     */
    function isEmpty(array) {
      if (!window._responsive) {
        return false;
      }
      var previousPrevious = array.find(".u-dialog");
      var currentNick = window._responsive.mode || "XL";
      return previousPrevious.is(".u-hidden, .u-hidden-" + currentNick.toLowerCase());
    }
    /** @type {function(!Object): undefined} */
    module.exports = Dialog;
    /**
     * @param {!Function} callback
     * @return {undefined}
     */
    Dialog.prototype.open = function(callback) {
      this._dialog.each(function(canCreateDiscussions, query) {
        var start = $(query);
        if (!isEmpty(start)) {
          if (start.addClass(this._openClass), "function" == typeof callback) {
            callback(start);
          }
          start.trigger("opened.np.dialog", [this]);
        }
      }.bind(this));
    };
    /**
     * @return {undefined}
     */
    Dialog.prototype.close = function() {
      this._dialog.removeClass(this._openClass);
      this._dialog.trigger("closed.np.dialog", [this]);
    };
    /**
     * @return {?}
     */
    Dialog.prototype.getInterval = function() {
      return this._dialog.attr("data-dialog-show-interval") || 3E3;
    };
  },
  177 : function(context, config, _newfeed) {
    /**
     * @param {!Object} element
     * @param {(number|string)} sections
     * @return {undefined}
     */
    function init(element, sections) {
      if (this.element = element, this.section = sections, this.name = element.getAttribute("data-animation-name"), this.event = "scroll", this.durationRaw = element.getAttribute("data-animation-duration"), this.duration = Number(this.durationRaw), isNaN(this.duration) || !isFinite(this.duration) || this.duration < 0) {
        /** @type {number} */
        this.duration = 0;
      }
      var e = element.getAttribute("data-animation-event");
      if (e) {
        this.event = e;
      }
      if (this.delayRaw = element.getAttribute("data-animation-delay"), this.delay = 0, this.delayRaw) {
        if (this.delay = Number(this.delayRaw), isNaN(this.delay) || !isFinite(this.delay) || this.delay < 0) {
          /** @type {number} */
          this.delay = 0;
        }
      }
      var i = element.getAttribute("data-animation-cycle");
      if (i) {
        if (i = Number(i), !isNaN(i)) {
          /** @type {number} */
          this.animationCycle = i;
        }
      }
      var direction = element.getAttribute("data-animation-direction");
      if (direction && "customAnimationIn" !== this.name) {
        this.direction = direction;
      }
      /** @type {(boolean|number)} */
      this.animationOut = !element.hasAttribute("data-animation-out") || parseFloat(element.getAttribute("data-animation-out"));
      this.infinite = element.classList.contains("infinite");
    }
    /** @type {function(!Object, (number|string)): undefined} */
    context.exports = init;
    /** @type {function(!Object, (number|string)): undefined} */
    window.AnimationInfo = init;
  },
  179 : function(context, selector, convertToImages) {
    /**
     * @param {!Object} node
     * @return {undefined}
     */
    function init(node) {
      if (this.$dom = node, this.$html = this.$dom.find(".counter-animation"), !this.$html.length) {
        var diff_hunk = this.$dom.text();
        this.$html = $('<div class="counter-animation" style="display: none;"></div>');
        this.$html.append('<div class="counter-wrapper"></div>');
        this.$html.find(".counter-wrapper").append('<div class="counter-html"></div>');
        this.$html.find(".counter-html").append($('<div class="old-val"></div>'));
        this.$html.find(".counter-html").append($('<div class="new-val"></div>'));
        this.$dom.empty();
        this.$dom.append($('<span class="start-val"></span>').text(diff_hunk));
        this.$dom.append(this.$html);
      }
      this.onResize();
      $(window).on("resize", function() {
        this.onResize();
      }.bind(this));
    }
    /** @type {function(!Object): undefined} */
    context.exports = init;
    /**
     * @param {?} name
     * @param {!Object} o
     * @return {undefined}
     */
    init.prototype.rollNumber = function(name, o) {
      if (!this.$dom.is(".updating")) {
        this.$dom.addClass("updating");
        var geoJSON_str = this.getOldVal();
        var title = this.$dom.find(".start-val");
        var indicator = this.$dom.find(".counter-animation");
        /** @type {number} */
        var interval_in_elements = 350;
        if (o.animationSpeed) {
          /** @type {number} */
          interval_in_elements = o.animationSpeed > 20 ? o.animationSpeed - 20 : 0;
        }
        this.$html.find(".old-val").text(geoJSON_str);
        this.$html.find(".new-val").text(name);
        this.$html.find(".counter-html").css("top", 0);
        requestAnimationFrame(function() {
          title.css("display", "none");
          indicator.css("display", "flex");
        }.bind(this));
        this.$html.find(".counter-html").animate({
          top : -this.height + "px"
        }, interval_in_elements, "swing", function() {
          requestAnimationFrame(function() {
            title.text(name);
            title.css("display", "inline-block");
            indicator.css("display", "none");
            this.$dom.removeClass("updating");
          }.bind(this));
        }.bind(this));
      }
    };
    /**
     * @return {undefined}
     */
    init.prototype.onResize = function() {
      this.height = this.$dom.height();
      this.$html.find(".counter-wrapper").css("height", this.height + "px");
    };
    /**
     * @return {?}
     */
    init.prototype.getOldVal = function() {
      return this.$dom.find(".start-val").text();
    };
  },
  181 : function(module, args, parseAsUTC) {
    /**
     * @param {string} item
     * @return {undefined}
     */
    function render(item) {
      /** @type {string} */
      this.tabsSelector = ".u-tabs";
      /** @type {string} */
      this.activeClass = "u-tab-active";
      /** @type {string} */
      this.activeSelector = "." + this.activeClass;
      /** @type {string} */
      this.activeLinkClass = "active";
      /** @type {string} */
      this.activeLinkSelector = "." + this.activeLinkClass;
      /** @type {string} */
      this.tabListSelector = ".u-tab-list";
      /** @type {string} */
      this.tabContentSelector = ".u-tab-content";
      /** @type {string} */
      this.tabLinkSelector = ".u-tab-link";
      /** @type {string} */
      this.tabPaneSelector = ".u-tab-pane";
      this._tabLink = this._getLink(item);
      this._tabList = this._tabLink.closest(this.tabListSelector);
      this._tabContent = this._tabLink.closest(this.tabsSelector).children(this.tabContentSelector);
    }
    /**
     * @return {undefined}
     */
    render.prototype.show = function() {
      var hr = this._tabLink;
      if (!hr.is(this.activeLinkSelector)) {
        this._removeActiveLink();
        this._addActiveLink(hr);
        this._activateTabPane(hr);
      }
    };
    /**
     * @param {!Object} label
     * @return {?}
     */
    render.prototype._getLink = function(label) {
      if (label.is(this.tabPaneSelector)) {
        return this._findLinkByPane(label);
      } else {
        return label.is(this.tabLinkSelector) ? label : label.children(this.tabLinkSelector);
      }
    };
    /**
     * @param {!Object} elem
     * @return {?}
     */
    render.prototype._findLinkByPane = function(elem) {
      var tabId = elem.attr("aria-labelledby");
      var tabList;
      return elem.closest(this.tabsSelector).children(this.tabListSelector).find("#" + tabId);
    };
    /**
     * @return {undefined}
     */
    render.prototype._removeActiveLink = function() {
      var $this = this._getActiveLink();
      $this.removeClass(this.activeLinkClass);
      $this.attr("aria-selected", false);
    };
    /**
     * @return {?}
     */
    render.prototype._getActiveLink = function() {
      return this._tabList.find(this.activeLinkSelector);
    };
    /**
     * @param {!Object} tag
     * @return {undefined}
     */
    render.prototype._addActiveLink = function(tag) {
      tag.addClass(this.activeLinkClass);
      tag.attr("aria-selected", true);
    };
    /**
     * @param {!Object} buttonName
     * @return {undefined}
     */
    render.prototype._activateTabPane = function(buttonName) {
      var t;
      var e;
      this._tabContent.children(this.activeSelector).removeClass(this.activeClass);
      this.getTabPane(buttonName).addClass(this.activeClass);
    };
    /**
     * @param {!Object} item
     * @return {?}
     */
    render.prototype.getTabPane = function(item) {
      var link;
      var w = this._getLink(item).attr("href");
      return this._tabContent.children(w);
    };
    /**
     * @return {?}
     */
    render.prototype.getTabLink = function() {
      return this._tabLink;
    };
    /**
     * @return {undefined}
     */
    render.prototype.removeId = function() {
      this._tabList.find(this.tabLinkSelector).removeAttr("id");
      this._tabContent.children().removeAttr("id");
    };
    /** @type {function(string): undefined} */
    module.exports = render;
    /** @type {function(string): undefined} */
    window.TabsControl = render;
  },
  201 : function(context, name, requiredFrom) {
    /**
     * @param {number} tab
     * @param {?} data
     * @return {undefined}
     */
    function init(tab, data) {
      if (tab && tab.length) {
        var vp = tab.children(".u-gallery-inner, .u-repeater");
        if (vp.length) {
          this.viewport = vp;
          var controls = tab.children(".u-gallery-nav");
          if (controls.length) {
            if (this.controls = controls, this.data = {
              offset : 0,
              width : 0,
              scrollWidth : 0,
              maxOffset : 0
            }, data) {
              this._onScroll = this.onScroll.bind(this);
              this._onlazyloaded = this.onlazyloaded.bind(this);
              this.viewport.scroll(this._onScroll);
              this.viewport.find("img.lazyload").each(function(canCreateDiscussions, liveReload) {
                liveReload.onload = this._onlazyloaded;
              }.bind(this));
            }
            if (this.updateInnerData(), data) {
              this.updateControls();
            }
          }
        }
      }
    }
    /** @type {function(number, ?): undefined} */
    context.exports = init;
    /**
     * @return {undefined}
     */
    init.prototype.onScroll = function() {
      this.updateControls();
    };
    /**
     * @return {undefined}
     */
    init.prototype.onlazyloaded = function sync() {
      this.updateInnerData();
      this.updateControls();
    };
    /**
     * @return {undefined}
     */
    init.prototype.updateControls = function() {
      this.updateOffset();
      var parent = this.data;
      this.controls.each(function() {
        var t = $(this);
        /** @type {boolean} */
        var state = t.hasClass("u-gallery-nav-next") ? parent.offset >= parent.maxOffset - 1 : parent.offset <= 0;
        t.toggleClass("u-hidden", state);
      });
    };
    /**
     * @return {undefined}
     */
    init.prototype.updateOffset = function() {
      this.data.offset = this.viewport.scrollLeft();
    };
    /**
     * @return {undefined}
     */
    init.prototype.updateInnerData = function() {
      this.data.scrollWidth = this.viewport[0].scrollWidth;
      this.data.width = this.viewport.innerWidth();
      var x = this.viewport.scrollLeft();
      this.scrollToEnd();
      this.data.maxOffset = this.viewport.scrollLeft();
      this.viewport.scrollLeft(x);
    };
    /**
     * @param {!Object} object
     * @return {undefined}
     */
    init.prototype.navigate = function(object) {
      if (!object.hasClass("u-hidden") && this.viewport) {
        this.updateOffset();
        var x = this.data.offset;
        /** @type {number} */
        var i = this.data.width - 50;
        /** @type {number} */
        var k = .3 * this.data.width;
        var folderNotes = this.viewport.children().toArray().map(function(tickLabelElemA) {
          return x + Math.round($(tickLabelElemA).position().left);
        });
        folderNotes.push(this.data.maxOffset + this.data.width);
        /**
         * @param {number} y
         * @return {?}
         */
        var callback = function(y) {
          return folderNotes.reduce(function(center_y, newy) {
            return Math.abs(newy - y) < Math.abs(center_y - y) ? newy : center_y;
          });
        };
        if (object.hasClass("u-gallery-nav-next")) {
          if (x = callback(x + i) - 1, this.data.scrollWidth - (x + this.data.width) < k) {
            x = this.data.maxOffset + k;
          }
        } else {
          if (x > 0) {
            if ((x = callback(x + this.data.width - i) - this.data.width - 1) < k) {
              /** @type {number} */
              x = 0;
            }
          }
        }
        this.viewport.animate({
          scrollLeft : x
        }, 500 * (Math.abs(this.data.offset - x) / i), "swing");
      }
    };
    /**
     * @return {undefined}
     */
    init.prototype.scrollToEnd = function() {
      if (this.viewport) {
        this.viewport.scrollLeft(this.data.scrollWidth);
      }
    };
    /** @type {function(number, ?): undefined} */
    window._npHorizontalLayoutSlider = init;
  },
  238 : function(mixin, doPost) {
    doPost = void 0;
    mixin = void 0;
    (function() {
      !function(module) {
        /**
         * @param {!Array} a
         * @return {?}
         */
        function F(a) {
          if (!(this instanceof F)) {
            return new F;
          }
          this.backgrounds = a || [];
        }
        /**
         * @param {number} obj
         * @return {?}
         */
        function test(obj) {
          /**
           * @param {string} key
           * @param {string} defaultValue
           * @return {undefined}
           */
          function expect(key, defaultValue) {
            filters[key] = key in obj ? obj[key] : defaultValue;
          }
          if (!(this instanceof test)) {
            return new test(obj);
          }
          obj = obj || {};
          var filters = this;
          expect("color", "");
          expect("image", "");
          expect("attachment", "");
          expect("clip", "");
          expect("origin", "");
          expect("position", "");
          expect("repeat", "");
          expect("size", "");
        }
        /**
         * @param {string} line
         * @return {?}
         */
        function parse(line) {
          /** @type {!Array} */
          var childObjects = [];
          /** @type {!RegExp} */
          var SIMPLE_ANNOTATION_REGEX = /[,\(\)]/;
          /** @type {number} */
          var n = 0;
          /** @type {string} */
          var str = "";
          if (null == line) {
            return childObjects;
          }
          for (; line.length;) {
            /** @type {(Array<string>|null)} */
            var br2 = SIMPLE_ANNOTATION_REGEX.exec(line);
            if (!br2) {
              break;
            }
            var s;
            /** @type {boolean} */
            var dollar = false;
            switch(br2[0]) {
              case ",":
                if (!n) {
                  childObjects.push(str.trim());
                  /** @type {string} */
                  str = "";
                  /** @type {boolean} */
                  dollar = true;
                }
                break;
              case "(":
                n++;
                break;
              case ")":
                n--;
                break;
            }
            /** @type {number} */
            var index = br2.index + 1;
            str = str + line.slice(0, dollar ? index - 1 : index);
            line = line.slice(index);
          }
          if (str.length || line.length) {
            childObjects.push((str + line).trim());
          }
          return childObjects.filter(function(startOption) {
            return "none" !== startOption;
          });
        }
        /**
         * @param {!Object} file
         * @return {?}
         */
        function replaceVersionsInFile(file) {
          return file.trim();
        }
        /**
         * @param {!Object} query
         * @return {?}
         */
        function $(query) {
          return (query || "").split(",").map(replaceVersionsInFile);
        }
        /**
         * @param {!Object} key
         * @return {?}
         */
        F.prototype.toString = function init(key) {
          return this.backgrounds.map(function(_) {
            return _.toString(key);
          }).filter(function(value) {
            return value;
          }).join(", ");
        };
        /**
         * @param {!Object} node
         * @return {?}
         */
        test.prototype.toString = function update(node) {
          node = node || ["image", "repeat", "attachment", "position", "size", "origin", "clip"];
          /** @type {string} */
          var size = (node = Array.isArray(node) ? node : [node]).includes("size") && this.size ? " / " + this.size : "";
          /** @type {!Array} */
          var context = [node.includes("image") ? this.image : "", node.includes("repeat") ? this.repeat : "", node.includes("attachment") ? this.attachment : "", node.includes("position") ? this.position + size : "", node.includes("origin") ? this.origin : "", node.includes("clip") ? this.clip : ""];
          if (this.color) {
            context.unshift(this.color);
          }
          return context.filter(function(namesArrayOfFilesFixed) {
            return namesArrayOfFilesFixed;
          }).join(" ");
        };
        /** @type {function(!Array): ?} */
        module.BackgroundList = F;
        /** @type {function(number): ?} */
        module.Background = test;
        /**
         * @param {!Object} properties
         * @return {?}
         */
        module.parseElementStyle = function(properties) {
          var self = new F;
          if (null == properties) {
            return self;
          }
          var images = parse(properties.backgroundImage);
          var color = properties.backgroundColor;
          var dash = $(properties.backgroundAttachment);
          var icon = $(properties.backgroundClip);
          var data = $(properties.backgroundOrigin);
          var ref = $(properties.backgroundPosition);
          var docs = $(properties.backgroundRepeat);
          var cells = $(properties.backgroundSize);
          var testInstance;
          /** @type {number} */
          var i = 0;
          var length = images.length;
          for (; i < length; i++) {
            if (testInstance = new test({
              image : images[i],
              attachment : dash[i % dash.length],
              clip : icon[i % icon.length],
              origin : data[i % data.length],
              position : ref[i % ref.length],
              repeat : docs[i % docs.length],
              size : cells[i % cells.length]
            }), i === length - 1) {
              testInstance.color = color;
            }
            self.backgrounds.push(testInstance);
          }
          return self;
        };
      }(function(EMSarray) {
        if (void 0 !== mixin && void 0 !== mixin.exports) {
          return mixin.exports;
        } else {
          return EMSarray.cssBgParser = {};
        }
      }(this));
    }).call(window);
  },
  279 : function(task, id, require) {
    /**
     * @param {!Object} name
     * @return {?}
     */
    function n(name) {
      if (name && "counter" === name.name) {
        return new DominarField(name);
      } else {
        return new Record(name);
      }
    }
    var DominarField = require(280);
    var Record = require(283);
    var self = {
      createAnimation : function find(window) {
        var i = n(window);
        return i.hint = self.hint, i;
      },
      setHint : function addEntry(value) {
        /** @type {!Object} */
        self.hint = value;
      }
    };
    task.exports = self;
    window.AnimationFactory = self;
  },
  280 : function(module, metadata, packageSuccess) {
    /**
     * @param {string} obj
     * @param {string} dontParse
     * @return {undefined}
     */
    function Task(obj, dontParse) {
      /** @type {string} */
      this.info = obj;
      /** @type {string} */
      this.hint = dontParse;
      /** @type {null} */
      this.timeoutId = null;
    }
    var Rule = packageSuccess(281);
    /**
     * @return {undefined}
     */
    Task.prototype.init = function init() {
      var c = this.info.element;
      if (!this.countUp && c) {
        /** @type {(Array<string>|null)} */
        var parts = /(\D*)(\d+(?:([.,])(\d+))?)(.*)/.exec(c.innerText);
        /** @type {number} */
        var name = 1;
        /** @type {number} */
        var i = 2;
        /** @type {number} */
        var _j = 3;
        /** @type {number} */
        var k = 4;
        /** @type {number} */
        var j = 5;
        if (null !== parts && parts[i] && !(parts[i].length > 15)) {
          /** @type {string} */
          var date = parts[i];
          if ("," === parts[_j]) {
            /** @type {string} */
            date = date.replace(",", ".");
          }
          if ((date = Number(date)) && !isNaN(date) && isFinite(date)) {
            if (this.hint) {
              this.hint.hintBrowser(this.info);
            }
            /** @type {number} */
            var precision = 0;
            if (parts[k]) {
              /** @type {number} */
              precision = parts[k].length;
            }
            var defaults = {
              element : c,
              prefix : parts[name],
              decimal : parts[_j],
              decimals : precision,
              suffix : parts[j],
              startVal : 0,
              endVal : date,
              duration : this.info.durationRaw,
              cycle : this.info.animationCycle,
              separator : ""
            };
            this.countUp = new Rule(defaults);
          }
        }
      }
    };
    /**
     * @return {?}
     */
    Task.prototype.start = function pause() {
      if (this.countUp) {
        if (this.countUp.reset(), this._timeoutId) {
          clearTimeout(this._timeoutId);
        }
        var callback = function() {
          /** @type {null} */
          this._timeoutId = null;
          this.countUp.start();
        }.bind(this);
        var delay = this.info.delay;
        if (isNaN(delay)) {
          /** @type {number} */
          delay = 0;
        }
        if (!delay) {
          return callback(), void 0;
        }
        /** @type {number} */
        this._timeoutId = setTimeout(callback, delay);
      }
    };
    /**
     * @return {undefined}
     */
    Task.prototype.startOut = function Future() {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
        /** @type {null} */
        this._timeoutId = null;
      }
    };
    /**
     * @return {undefined}
     */
    Task.prototype.reset = function formatter() {
      if (this.countUp) {
        this.countUp.reset();
      }
    };
    /**
     * @return {?}
     */
    Task.prototype.isInOutAnimation = function almost_equals() {
      return true;
    };
    /**
     * @return {?}
     */
    Task.prototype.needOutAnimation = function leadingImageNode() {
      return false;
    };
    /**
     * @return {undefined}
     */
    Task.prototype.clear = function getMixinError() {
      if (this.hint) {
        this.hint.removeHint(this.info);
      }
    };
    /**
     * @return {?}
     */
    Task.prototype.getTime = function sanitiseNewProject() {
      if (!this.info) {
        return 0;
      }
      var c = this.info.duration;
      var offset = this.info.delay;
      if (isNaN(offset)) {
        /** @type {number} */
        offset = 0;
      }
      return offset + c;
    };
    /**
     * @return {?}
     */
    Task.prototype.getOutTime = function leadingImageNode() {
      return 0;
    };
    /** @type {function(string, string): undefined} */
    module.exports = Task;
    /** @type {function(string, string): undefined} */
    window.CounterAnimation = Task;
  },
  281 : function(mixin, options, seriesStackIndexCallback) {
    /**
     * @param {string} data
     * @return {undefined}
     */
    function m(data) {
      this.initialize(data);
    }
    /**
     * @param {!Object} p
     * @param {number} n
     * @param {?} then
     * @return {undefined}
     */
    function update(p, n, then) {
      if (p) {
        if (n = Number(n), isNaN(n) || !isFinite(n) || 0 === n) {
          /** @type {number} */
          n = 1;
        }
        /** @type {number} */
        var i = 0;
        /**
         * @return {undefined}
         */
        var cb = function() {
          if (++i < n) {
            p.reset();
            p.start(cb);
          } else {
            if ("function" == typeof then) {
              then();
            }
          }
        };
        p.start(cb);
      }
    }
    seriesStackIndexCallback(282);
    /**
     * @param {!Object} data
     * @return {undefined}
     */
    m.prototype.initialize = function load(data) {
      if (!this.countUp && data.element) {
        var lat = data.startVal;
        var lon = data.endVal;
        var scale = data.decimals;
        var d = data.duration;
        if ((lat || 0 == +lat) && (lon || 0 == +lon)) {
          if (d) {
            if (d = Number(d) / 1E3, isNaN(d)) {
              d = void 0;
            }
          }
          this.cycle = data.cycle;
          this.countUp = new CountUp(data.element, lat, lon, scale, d, data);
          /** @type {boolean} */
          this.started = false;
        }
      }
    };
    /**
     * @return {undefined}
     */
    m.prototype.reset = function formatter() {
      if (this.started = false, this.countUp) {
        this.countUp.reset();
      }
    };
    /**
     * @return {undefined}
     */
    m.prototype.start = function formatter() {
      if (this.countUp && !this.started) {
        /** @type {boolean} */
        this.started = true;
        update(this.countUp, this.cycle);
      }
    };
    /** @type {function(string): undefined} */
    mixin.exports = m;
  },
  282 : function(module, exports) {
    exports = void 0;
    module = void 0;
    (function() {
      !function(module, factory) {
        if ("function" == typeof define && define.amd) {
          define(factory);
        } else {
          if ("object" == typeof exports) {
            module.exports = factory(require, exports, module);
          } else {
            module.CountUp = factory();
          }
        }
      }(this, function(trusted, mustache, dialogModule) {
        var CountUp;
        return function(id, e, i, min, minWorkers, parsed) {
          /**
           * @param {string} value
           * @return {?}
           */
          function format(value) {
            var x;
            var id;
            var tmp;
            var name;
            var currentNumber;
            var connectNumber;
            if (value = value.toFixed(self.decimals), id = (x = (value = value + "").split("."))[0], tmp = x.length > 1 ? self.options.decimal + x[1] : "", self.options.useGrouping) {
              /** @type {string} */
              name = "";
              /** @type {number} */
              currentNumber = 0;
              /** @type {number} */
              connectNumber = id.length;
              for (; currentNumber < connectNumber; ++currentNumber) {
                if (0 !== currentNumber && currentNumber % 3 == 0) {
                  name = self.options.separator + name;
                }
                name = id[connectNumber - currentNumber - 1] + name;
              }
              id = name;
            }
            if (self.options.numerals.length) {
              id = id.replace(/[0-9]/g, function(canCreateDiscussions) {
                return self.options.numerals[+canCreateDiscussions];
              });
              /** @type {string} */
              tmp = tmp.replace(/[0-9]/g, function(canCreateDiscussions) {
                return self.options.numerals[+canCreateDiscussions];
              });
            }
            return self.options.prefix + id + tmp + self.options.suffix;
          }
          /**
           * @param {number} event
           * @param {number} source
           * @param {number} buffer
           * @param {number} numSamps
           * @return {?}
           */
          function add(event, source, buffer, numSamps) {
            return buffer * (-Math.pow(2, -10 * event / numSamps) + 1) * 1024 / 1023 + source;
          }
          /**
           * @param {number} value
           * @return {?}
           */
          function eq(value) {
            return "number" == typeof value && !isNaN(value);
          }
          var self = this;
          if (self.version = function() {
            return "1.9.2";
          }, self.options = {
            useEasing : true,
            useGrouping : true,
            separator : ",",
            decimal : ".",
            easingFn : add,
            formattingFn : format,
            prefix : "",
            suffix : "",
            numerals : []
          }, parsed && "object" == typeof parsed) {
            var name;
            for (name in self.options) {
              if (parsed.hasOwnProperty(name) && null !== parsed[name]) {
                self.options[name] = parsed[name];
              }
            }
          }
          if ("" === self.options.separator) {
            /** @type {boolean} */
            self.options.useGrouping = false;
          } else {
            /** @type {string} */
            self.options.separator = "" + self.options.separator;
          }
          /** @type {number} */
          var y = 0;
          /** @type {!Array} */
          var vendors = ["webkit", "moz", "ms", "o"];
          /** @type {number} */
          var i = 0;
          for (; i < vendors.length && !window.requestAnimationFrame; ++i) {
            window.requestAnimationFrame = window[vendors[i] + "RequestAnimationFrame"];
            window.cancelAnimationFrame = window[vendors[i] + "CancelAnimationFrame"] || window[vendors[i] + "CancelRequestAnimationFrame"];
          }
          if (!window.requestAnimationFrame) {
            /**
             * @param {!Function} fn
             * @param {number} b
             * @return {?}
             */
            window.requestAnimationFrame = function(fn, b) {
              /** @type {number} */
              var x = (new Date).getTime();
              /** @type {number} */
              var i = Math.max(0, 16 - (x - y));
              var t = window.setTimeout(function() {
                fn(x + i);
              }, i);
              return y = x + i, t;
            };
          }
          if (!window.cancelAnimationFrame) {
            /**
             * @param {!Object} id
             * @return {undefined}
             */
            window.cancelAnimationFrame = function(id) {
              clearTimeout(id);
            };
          }
          if (self.initialize = function() {
            if (self.initialized) {
              return true;
            }
            if (self.error = "", self.d = "string" == typeof id ? document.getElementById(id) : id, !self.d) {
              return self.error = "[CountUp] target is null or undefined", false;
            }
            if (self.startVal = Number(e), self.endVal = Number(i), eq(self.startVal) && eq(self.endVal)) {
              return self.decimals = Math.max(0, min || 0), self.dec = Math.pow(10, self.decimals), self.duration = 1E3 * Number(minWorkers) || 2E3, self.countDown = self.startVal > self.endVal, self.frameVal = self.startVal, self.initialized = true, true;
            } else {
              return self.error = "[CountUp] startVal (" + e + ") or endVal (" + i + ") is not a number", false;
            }
          }, self.printValue = function(value) {
            var result = self.options.formattingFn(value);
            if ("INPUT" === self.d.tagName) {
              this.d.value = result;
            } else {
              if ("text" === self.d.tagName || "tspan" === self.d.tagName) {
                this.d.textContent = result;
              } else {
                this.d.innerHTML = result;
              }
            }
          }, self.count = function(timestamp) {
            if (!self.startTime) {
              /** @type {string} */
              self.startTime = timestamp;
            }
            /** @type {string} */
            self.timestamp = timestamp;
            /** @type {number} */
            var progress = timestamp - self.startTime;
            if (self.remaining = self.duration - progress, self.options.useEasing) {
              if (self.countDown) {
                /** @type {number} */
                self.frameVal = self.startVal - self.options.easingFn(progress, 0, self.startVal - self.endVal, self.duration);
              } else {
                self.frameVal = self.options.easingFn(progress, self.startVal, self.endVal - self.startVal, self.duration);
              }
            } else {
              if (self.countDown) {
                /** @type {number} */
                self.frameVal = self.startVal - (self.startVal - self.endVal) * (progress / self.duration);
              } else {
                self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration);
              }
            }
            if (self.countDown) {
              self.frameVal = self.frameVal < self.endVal ? self.endVal : self.frameVal;
            } else {
              self.frameVal = self.frameVal > self.endVal ? self.endVal : self.frameVal;
            }
            if (self.frameVal = Math.round(self.frameVal * self.dec) / self.dec, self.printValue(self.frameVal), progress < self.duration) {
              /** @type {number} */
              self.rAF = requestAnimationFrame(self.count);
            } else {
              if (self.callback) {
                self.callback();
              }
            }
          }, self.start = function(cb) {
            if (self.initialize()) {
              /** @type {!Function} */
              self.callback = cb;
              /** @type {number} */
              self.rAF = requestAnimationFrame(self.count);
            }
          }, self.pauseResume = function() {
            if (!self.paused) {
              /** @type {boolean} */
              self.paused = true;
              cancelAnimationFrame(self.rAF);
            } else {
              /** @type {boolean} */
              self.paused = false;
              delete self.startTime;
              self.duration = self.remaining;
              self.startVal = self.frameVal;
              requestAnimationFrame(self.count);
            }
          }, self.reset = function() {
            if (self.paused = false, delete self.startTime, self.initialized = false, self.initialize()) {
              cancelAnimationFrame(self.rAF);
              self.printValue(self.startVal);
            }
          }, self.update = function(key) {
            if (self.initialize()) {
              if (!eq(key = Number(key))) {
                return self.error = "[CountUp] update() - new endVal is not a number: " + key, void 0;
              }
              if (self.error = "", key !== self.frameVal) {
                cancelAnimationFrame(self.rAF);
                /** @type {boolean} */
                self.paused = false;
                delete self.startTime;
                self.startVal = self.frameVal;
                /** @type {string} */
                self.endVal = key;
                /** @type {boolean} */
                self.countDown = self.startVal > self.endVal;
                /** @type {number} */
                self.rAF = requestAnimationFrame(self.count);
              }
            }
          }, self.initialize()) {
            self.printValue(self.startVal);
          }
        };
      });
    }).call(window);
  },
  283 : function(mixin, args, parseAsUTC) {
    /**
     * @param {string} o
     * @param {string} f
     * @return {undefined}
     */
    function api(o, f) {
      if (!o) {
        throw new Error("animationInfo is null or undefined");
      }
      if (this.info = o, this.hint = f, this.animatedClass = "animated", this.backstageClass = "backstage", this.animationInClass = this.getAnimationClass(), this.isInOutAnimation()) {
        this.animationOutClass = this.getAnimationOutClass();
      }
      /** @type {null} */
      this._reqestId = null;
      /** @type {null} */
      this._timeoutId = null;
      /** @type {null} */
      this._animationInTimeoutId = null;
      this._handleAnimationEnd = this._handleAnimationEnd.bind(this);
      /** @type {null} */
      this._playing = null;
      /** @type {null} */
      this._playNext = null;
      /** @type {null} */
      this._playNextDuration = null;
    }
    /**
     * @param {number} n
     * @return {?}
     */
    function i(n) {
      if (!n) {
        return null;
      }
      if (n < non_default_count) {
        /** @type {number} */
        n = non_default_count;
      }
      return n + "ms";
    }
    /**
     * @param {!Element} el
     * @param {(number|string)} str
     * @return {undefined}
     */
    function $(el, str) {
      if (str = i(str)) {
        /** @type {(number|string)} */
        el.style["animation-duration"] = str;
      }
    }
    /**
     * @param {?} ev_type
     * @return {?}
     */
    function _swipeDirection(ev_type) {
      switch(ev_type) {
        case "Down":
          return "Up";
        case "Up":
          return "Down";
        default:
          return ev_type;
      }
    }
    /** @type {number} */
    var non_default_count = 100;
    /** @type {number} */
    var value = 500;
    /** @type {string} */
    var injectStart = "In";
    /** @type {string} */
    var result = "Out";
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    api.prototype._handleAnimationEnd = function play(event) {
      if (event.target === this.info.element) {
        if (this._playing = null, $(this.info.element, this.info.duration), this.info.element.classList.contains(this.animationInClass)) {
          this.info.element.classList.remove(this.animationInClass);
          this.info.element.classList.add(this.animationInClass + "-played");
        } else {
          this.info.element.classList.remove(this.animationInClass + "-played");
        }
        if (this._playNext) {
          var source = this._playNext;
          var slice = this._playNextDuration;
          /** @type {null} */
          this._playNext = null;
          /** @type {null} */
          this._playNextDuration = null;
          this._play(source, slice);
        }
      }
    };
    /**
     * @return {undefined}
     */
    api.prototype.subscribe = function Item() {
      this.info.element.addEventListener("animationend", this._handleAnimationEnd);
    };
    /**
     * @return {undefined}
     */
    api.prototype.unsubscribe = function animationEnded() {
      this.info.element.removeEventListener("animationend", this._handleAnimationEnd);
    };
    /**
     * @return {undefined}
     */
    api.prototype.init = function init() {
      if (this.hint) {
        this.hint.hintBrowser(this.info);
      }
      this.subscribe();
      this.reset();
    };
    /**
     * @return {undefined}
     */
    api.prototype.clear = function init() {
      if (this.info) {
        if (this.backstageClass) {
          this.info.element.classList.remove(this.backstageClass);
        }
        if (this.animatedClass) {
          this.info.element.classList.remove(this.animatedClass);
        }
        if (this.animationInClass) {
          this.info.element.classList.remove(this.animationInClass);
        }
        if (this.outAnimatedClass) {
          this.info.element.classList.remove(this.animationOutClass);
        }
        if (this.info.element.style["animation-duration"] = "", this.hint) {
          this.hint.removeHint(this.info);
        }
        if (this._animationInTimeoutId) {
          clearTimeout(this._animationInTimeoutId);
          /** @type {null} */
          this._animationInTimeoutId = null;
        }
        /** @type {null} */
        this._playing = null;
        /** @type {null} */
        this._playNext = null;
        this.unsubscribe();
      }
    };
    /**
     * @param {!Function} callback
     * @return {?}
     */
    api.prototype.requestAnimationFrame = function requestAnimationFrame(callback) {
      if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(callback);
      }
      if (window.mozRequestAnimationFrame) {
        return window.mozRequestAnimationFrame(callback);
      }
      if (window.webkitRequestAnimationFrame) {
        return window.webkitRequestAnimationFrame(callback);
      }
      if (window.msRequestAnimationFrame) {
        return window.msRequestAnimationFrame(callback);
      } else {
        return callback(), void 0;
      }
    };
    /**
     * @param {!Object} id
     * @return {?}
     */
    api.prototype.cancelAnimationFrame = function cancelAnimationFrame(id) {
      if (window.cancelAnimationFrame) {
        return window.cancelAnimationFrame(id), void 0;
      }
      if (window.mozCancelAnimationFrame) {
        window.mozCancelAnimationFrame(id);
      }
    };
    /**
     * @return {?}
     */
    api.prototype.getAnimationClass = function sanitiseNewProject() {
      if (!this.info) {
        return null;
      }
      var name = this.info.name;
      if (this.info.direction) {
        name = name + this.info.direction;
      }
      return name;
    };
    /**
     * @return {?}
     */
    api.prototype.getAnimationOutClass = function end() {
      if (!this.info) {
        return null;
      }
      var ret = this.info.name;
      if (this.isInOutAnimation()) {
        /** @type {string} */
        ret = ret.slice(0, 0 - injectStart.length) + result;
      }
      if (this.info.direction) {
        ret = ret + _swipeDirection(this.info.direction);
      }
      return ret;
    };
    /**
     * @return {?}
     */
    api.prototype.isInOutAnimation = function close() {
      if (!this.info || !this.info.name || !this.info.animationOut) {
        return false;
      } else {
        return this.info.name.indexOf(injectStart) + injectStart.length === this.info.name.length;
      }
    };
    /**
     * @return {?}
     */
    api.prototype.start = function _play() {
      if (this.info) {
        var offset = this.info.delay;
        var trigger = function() {
          /** @type {null} */
          this._animationInTimeoutId = null;
          this._play(this.animationInClass);
        }.bind(this);
        if (this._animationInTimeoutId) {
          clearTimeout(this._animationInTimeoutId);
        }
        if (!offset) {
          return trigger(), void 0;
        }
        /** @type {number} */
        this._animationInTimeoutId = setTimeout(trigger, offset);
      }
    };
    /**
     * @return {?}
     */
    api.prototype.startOut = function _init() {
      if (this.info) {
        if (this.animationOutClass) {
          if (this._animationInTimeoutId) {
            return clearInterval(this._animationInTimeoutId), this._animationInTimeoutId = null, void 0;
          } else {
            return this._play(this.animationOutClass, value), void 0;
          }
        }
      }
    };
    /**
     * @param {number} key
     * @param {number} value
     * @return {?}
     */
    api.prototype._play = function hide(key, value) {
      if (!key) {
        key = this.animationInClass;
      }
      if (value) {
        $(this.info.element, value);
      }
      if (this._playing === key) {
        return this._playNext = null, void 0;
      }
      if (this._playing) {
        return this._playNext = key, this._playNextDuration = value, void 0;
      }
      if (this._playing = key, this._reqestId) {
        this.cancelAnimationFrame(this._reqestId);
      }
      this._reqestId = this.requestAnimationFrame(function() {
        if (this._reqestId = null, this.backstageClass) {
          this.info.element.classList.remove(this.backstageClass);
        }
        if (this.animationOutClass) {
          this.info.element.classList.remove(this.animationOutClass);
        }
        if (this.animationInClass) {
          this.info.element.classList.remove(this.animationInClass);
        }
        if (key) {
          this.info.element.classList.add(key);
        }
      }.bind(this));
    };
    /**
     * @return {undefined}
     */
    api.prototype.reset = function _update() {
      if (this.info) {
        var c = this.info.duration;
        if ($(this.info.element, c), this._playing = null, this._playNext = null, this.backstageClass) {
          this.info.element.classList.add(this.backstageClass);
        }
        if (this.animatedClass) {
          this.info.element.classList.add(this.animatedClass);
        }
      }
    };
    /**
     * @return {?}
     */
    api.prototype.needOutAnimation = function _onNodeChangeHandler() {
      if (!this.isInOutAnimation()) {
        return false;
      }
      if (this._animationInTimeoutId) {
        return true;
      } else {
        return (this.info.element.classList.contains(this.animationInClass) || this.info.element.classList.contains(this.animationInClass + "-played")) && !this.info.element.classList.contains(this.backstageClass);
      }
    };
    /**
     * @return {?}
     */
    api.prototype.getTime = function sanitiseNewProject() {
      if (!this.info) {
        return 0;
      }
      var c = this.info.duration;
      var offset = this.info.delay;
      if (isNaN(offset)) {
        /** @type {number} */
        offset = 0;
      }
      return offset + c;
    };
    /**
     * @return {?}
     */
    api.prototype.getOutTime = function commaStringToArray() {
      if (!this.info || !this.isInOutAnimation()) {
        return 0;
      } else {
        return value;
      }
    };
    /** @type {function(string, string): undefined} */
    mixin.exports = api;
    /** @type {function(string, string): undefined} */
    window.AnimateCssAnimation = api;
  },
  316 : function(formatters, customFormatters) {
  },
  40 : function(module, config, _newfeed) {
    var g;
    g = function() {
      return this;
    }();
    try {
      g = g || Function("return this")() || (1, eval)("this");
    } catch (t) {
      if ("object" == typeof window) {
        /** @type {!Window} */
        g = window;
      }
    }
    module.exports = g;
  },
  465 : function(checkFor, id, require) {
    var Plugin = require(466);
    var ns = {};
    ns.Util = function(type) {
      /**
       * @param {!Object} data
       * @return {?}
       */
      function toArray(data) {
        return data && "object" == typeof data && "default" in data ? data : {
          default : data
        };
      }
      /**
       * @return {?}
       */
      function transitionEndTest() {
        if (window.QUnit) {
          return false;
        }
        /** @type {!Element} */
        var el = document.createElement("bootstrap");
        var name;
        for (name in transEndEventNames) {
          if (void 0 !== el.style[name]) {
            return transEndEventNames[name];
          }
        }
        return false;
      }
      /**
       * @param {string} value
       * @return {?}
       */
      function callback(value) {
        if (null == value) {
          return "" + value;
        } else {
          return {}.toString.call(value).match(/\s([a-z]+)/i)[1].toLowerCase();
        }
      }
      /**
       * @return {?}
       */
      function getSpecialTransitionEndEvent() {
        return {
          bindType : transition,
          delegateType : transition,
          handle : function handle(e) {
            if (events["default"](e.target).is(this)) {
              return e.handleObj.handler.apply(this, arguments);
            }
          }
        };
      }
      /**
       * @param {number} duration
       * @return {?}
       */
      function transitionEndEmulator(duration) {
        var _this2 = this;
        /** @type {boolean} */
        var i = false;
        return events["default"](this).one(Util.TRANSITION_END, function() {
          /** @type {boolean} */
          i = true;
        }), setTimeout(function() {
          if (!i) {
            Util.triggerTransitionEnd(_this2);
          }
        }, duration), this;
      }
      /**
       * @return {undefined}
       */
      function setTransitionEndSupport() {
        transition = transitionEndTest();
        /** @type {function(number): ?} */
        events["default"].fn.emulateTransitionEnd = transitionEndEmulator;
        events["default"].event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
      }
      var events = toArray(type);
      /** @type {boolean} */
      var transition = false;
      /** @type {number} */
      var c = 1E6;
      /** @type {number} */
      var f = 1E3;
      var transEndEventNames = {
        WebkitTransition : "webkitTransitionEnd",
        MozTransition : "transitionend",
        OTransition : "oTransitionEnd otransitionend",
        transition : "transitionend"
      };
      var Util = {
        TRANSITION_END : "bsTransitionEnd",
        getUID : function t(value) {
          do {
            value = value + ~~(Math.random() * c);
          } while (document.getElementById(value));
          return value;
        },
        getSelectorFromElement : function hrefClickHandler(e) {
          var to = e.getAttribute("data-u-target");
          if (!to || "#" === to) {
            var c = e.getAttribute("href");
            to = c && "#" !== c ? c.trim() : "";
          }
          try {
            return document.querySelector(to) ? to : null;
          } catch (t) {
            return null;
          }
        },
        getTransitionDurationFromElement : function init(obj) {
          if (!obj) {
            return 0;
          }
          var style = events["default"](obj).css("transition-duration");
          var b = events["default"](obj).css("transition-delay");
          /** @type {number} */
          var m = parseFloat(style);
          /** @type {number} */
          var a = parseFloat(b);
          if (!m && !a) {
            return 0;
          } else {
            return style = style.split(",")[0], b = b.split(",")[0], (parseFloat(style) + parseFloat(b)) * f;
          }
        },
        reflow : function _toStyleValue(node) {
          return node.offsetHeight;
        },
        triggerTransitionEnd : function castDate(value) {
          events["default"](value).trigger(transition);
        },
        supportsTransitionEnd : function hasDisplayText() {
          return Boolean(transition);
        },
        isElement : function isElement(obj) {
          return (obj[0] || obj).nodeType;
        },
        typeCheckConfig : function fn(type, json, files) {
          var i;
          for (i in files) {
            if (Object.prototype.hasOwnProperty.call(files, i)) {
              var f = files[i];
              var value = json[i];
              var source = value && Util.isElement(value) ? "element" : callback(value);
              if (!(new RegExp(f)).test(source)) {
                throw new Error(type.toUpperCase() + ": " + 'Option "' + i + '" provided type "' + source + '" ' + 'but expected type "' + f + '".');
              }
            }
          }
        },
        findShadowRoot : function closest(node) {
          if (!document.documentElement.attachShadow) {
            return null;
          }
          if ("function" == typeof node.getRootNode) {
            var root = node.getRootNode();
            return root instanceof ShadowRoot ? root : null;
          }
          if (node instanceof ShadowRoot) {
            return node;
          }
          if (!node.parentNode) {
            return null;
          } else {
            return Util.findShadowRoot(node.parentNode);
          }
        }
      };
      return setTransitionEndSupport(), Util;
    }($);
    ns.Carousel = function($, _util) {
      /**
       * @param {!Object} obj
       * @return {?}
       */
      function _interopRequireDefault(obj) {
        return obj && "object" == typeof obj && "default" in obj ? obj : {
          default : obj
        };
      }
      /**
       * @param {!Function} config
       * @param {string} target
       * @return {undefined}
       */
      function get(config, target) {
        /** @type {number} */
        var i = 0;
        for (; i < target.length; i++) {
          var prop = target[i];
          if (prop.enumerable = prop.enumerable || false, prop.configurable = true, "value" in prop) {
            /** @type {boolean} */
            prop.writable = true;
          }
          Object.defineProperty(config, prop.key, prop);
        }
      }
      /**
       * @param {!Function} obj
       * @param {string} proto
       * @param {boolean} object
       * @return {?}
       */
      function create(obj, proto, object) {
        if (proto) {
          get(obj.prototype, proto);
        }
        if (object) {
          get(obj, object);
        }
        return obj;
      }
      /**
       * @return {?}
       */
      function extend() {
        return extend = Object.assign || function(result) {
          /** @type {number} */
          var _i = 1;
          for (; _i < arguments.length; _i++) {
            var r = arguments[_i];
            var i;
            for (i in r) {
              if (Object.prototype.hasOwnProperty.call(r, i)) {
                result[i] = r[i];
              }
            }
          }
          return result;
        }, extend.apply(this, arguments);
      }
      var _runTransitionHook2 = _interopRequireDefault($);
      var _Util = _interopRequireDefault(_util);
      /** @type {string} */
      var NAME = "u-carousel";
      /** @type {string} */
      var f = "4.6.0";
      /** @type {string} */
      var DATA_KEY = "bs.u-carousel";
      /** @type {string} */
      var PROP_NAME = "bs.u-carousel.swipe";
      /** @type {string} */
      var ns = "." + DATA_KEY;
      /** @type {string} */
      var DATA_API_KEY = ".data-u-api";
      var JQUERY_NO_CONFLICT = _runTransitionHook2["default"].fn[NAME];
      /** @type {number} */
      var ARROW_UP = 37;
      /** @type {number} */
      var ARROW_DOWN = 39;
      /** @type {number} */
      var delay = 500;
      /** @type {number} */
      var el = 40;
      var Default = {
        interval : 5E3,
        keyboard : true,
        slide : false,
        pause : "hover",
        wrap : true,
        touch : false,
        swipe : true
      };
      var DefaultType = {
        interval : "(number|boolean)",
        keyboard : "boolean",
        slide : "(boolean|string)",
        pause : "(string|boolean)",
        wrap : "boolean",
        touch : "boolean",
        swipe : "boolean"
      };
      /** @type {string} */
      var next = "next";
      /** @type {string} */
      var prev = "prev";
      /** @type {string} */
      var right = "left";
      /** @type {string} */
      var RIGHT = "right";
      /** @type {string} */
      var i = "u-slide" + ns;
      /** @type {string} */
      var slidEvent = "slid" + ns;
      /** @type {string} */
      var KEYDOWN_NS = "keydown" + ns;
      /** @type {string} */
      var MOUSEENTER = "mouseenter" + ns;
      /** @type {string} */
      var MOUSELEAVE = "mouseleave" + ns;
      /** @type {string} */
      var event = "touchstart" + ns;
      /** @type {string} */
      var touchmove = "touchmove" + ns;
      /** @type {string} */
      var HOVEREVENTS = "touchend" + ns;
      /** @type {string} */
      var type = "pointerdown" + ns;
      /** @type {string} */
      var name = "pointerup" + ns;
      /** @type {string} */
      var dragstart = "dragstart" + ns;
      /** @type {string} */
      var e = "load" + ns + DATA_API_KEY;
      /** @type {string} */
      var table = "click" + ns + DATA_API_KEY;
      /** @type {string} */
      var hidden = "u-carousel";
      /** @type {string} */
      var prefix = "u-active";
      /** @type {string} */
      var W = "u-slide";
      /** @type {string} */
      var plot_or_index = "u-carousel-item-right";
      /** @type {string} */
      var G__4880 = "u-carousel-item-left";
      /** @type {string} */
      var nextIntervalID = "u-carousel-item-next";
      /** @type {string} */
      var a_generic_id = "u-carousel-item-prev";
      /** @type {string} */
      var element = "pointer-event";
      /** @type {string} */
      var freezeSelector = ".u-active";
      /** @type {string} */
      var width = ".u-active.u-carousel-item";
      /** @type {string} */
      var bodyScripts = ".u-carousel-item";
      /** @type {string} */
      var val = ".u-carousel-item img";
      /** @type {string} */
      var containerElement = ".u-carousel-item-next, .u-carousel-item-prev";
      /** @type {string} */
      var canvas = ".u-carousel-indicators, .u-carousel-thumbnails";
      /** @type {string} */
      var m = "[data-u-slide], [data-u-slide-to]";
      /** @type {string} */
      var sel = '[data-u-ride="carousel"]';
      var data = {
        TOUCH : "touch",
        PEN : "pen"
      };
      var Carousel = function() {
        /**
         * @param {!Element} selector
         * @param {!Function} config
         * @return {undefined}
         */
        function Carousel(selector, config) {
          /** @type {null} */
          this._items = null;
          /** @type {null} */
          this._interval = null;
          /** @type {null} */
          this._activeElement = null;
          /** @type {boolean} */
          this._isPaused = false;
          /** @type {boolean} */
          this._isSliding = false;
          /** @type {null} */
          this.touchTimeout = null;
          /** @type {number} */
          this.touchStartX = 0;
          /** @type {number} */
          this.touchDeltaX = 0;
          this._config = this._getConfig(config);
          /** @type {!Element} */
          this._element = selector;
          this._indicatorsElement = this._element.querySelector(canvas);
          /** @type {boolean} */
          this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
          /** @type {boolean} */
          this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);
          this._addEventListeners();
        }
        var self = Carousel.prototype;
        return self.next = function to() {
          if (!this._isSliding) {
            this._slide(next);
          }
        }, self.nextWhenVisible = function expandMenuActions() {
          var $element = _runTransitionHook2["default"](this._element);
          if (!document.hidden && $element.is(":visible") && "hidden" !== $element.css("visibility")) {
            this.next();
          }
        }, self.prev = function to() {
          if (!this._isSliding) {
            this._slide(prev);
          }
        }, self.pause = function pause(force) {
          if (!force) {
            /** @type {boolean} */
            this._isPaused = true;
          }
          if (this._element.querySelector(containerElement)) {
            _Util["default"].triggerTransitionEnd(this._element);
            this.cycle(true);
          }
          clearInterval(this._interval);
          /** @type {null} */
          this._interval = null;
        }, self.cycle = function cycle(i) {
          if (!i) {
            /** @type {boolean} */
            this._isPaused = false;
          }
          if (this._interval) {
            clearInterval(this._interval);
            /** @type {null} */
            this._interval = null;
          }
          if (this._config.interval && !this._isPaused) {
            this._updateInterval();
            /** @type {number} */
            this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
          }
        }, self.to = function to(index) {
          var e = this;
          this._activeElement = this._element.querySelector(width);
          var activeIndex = this._getItemIndex(this._activeElement);
          if (!(index > this._items.length - 1 || index < 0)) {
            if (this._isSliding) {
              return _runTransitionHook2["default"](this._element).one(slidEvent, function() {
                return e.to(index);
              }), void 0;
            }
            if (activeIndex === index) {
              return this.pause(), this.cycle(), void 0;
            }
            /** @type {string} */
            var direction = index > activeIndex ? next : prev;
            this._slide(direction, this._items[index]);
          }
        }, self.dispose = function dispose() {
          if (_runTransitionHook2["default"](this._element).off(ns), _runTransitionHook2["default"].removeData(this._element, DATA_KEY), _runTransitionHook2["default"].removeData(this._element, PROP_NAME), this._items = null, this._config = null, this._element = null, this._interval) {
            clearInterval(this._interval);
          }
          /** @type {null} */
          this._interval = null;
          /** @type {null} */
          this._isPaused = null;
          /** @type {null} */
          this._isSliding = null;
          /** @type {null} */
          this._activeElement = null;
          /** @type {null} */
          this._indicatorsElement = null;
        }, self._getConfig = function _getConfig(config) {
          return config = extend({}, Default, config), _Util["default"].typeCheckConfig(NAME, config, DefaultType), config;
        }, self._handleSwipe = function getJumpTargetRowInput() {
          /** @type {number} */
          var e = Math.abs(this.touchDeltaX);
          if (!(e <= el)) {
            /** @type {number} */
            var e0 = e / this.touchDeltaX;
            if (this.touchDeltaX = 0, e0 > 0) {
              this.prev();
            }
            if (e0 < 0) {
              this.next();
            }
          }
        }, self._addEventListeners = function Application() {
          var that = this;
          if (this._config.keyboard) {
            _runTransitionHook2["default"](this._element).on(KEYDOWN_NS, function(event) {
              return that._keydown(event);
            });
          }
          if ("hover" === this._config.pause) {
            _runTransitionHook2["default"](this._element).on(MOUSEENTER, function(value) {
              return that.pause(value);
            }).on(MOUSELEAVE, function(i) {
              return that.cycle(i);
            });
          }
          if (this._config.touch) {
            this._addTouchEventListeners();
          }
        }, self._addTouchEventListeners = function animate() {
          var self = this;
          if (this._touchSupported) {
            /**
             * @param {!KeyboardEvent} event
             * @return {undefined}
             */
            var performAnimation = function update(event) {
              if (self._pointerEvent && data[event.originalEvent.pointerType.toUpperCase()]) {
                self.touchStartX = event.originalEvent.clientX;
              } else {
                if (!self._pointerEvent) {
                  self.touchStartX = event.originalEvent.touches[0].clientX;
                }
              }
            };
            /**
             * @param {!KeyboardEvent} event
             * @return {undefined}
             */
            var getY = function _onTouchStart(event) {
              if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
                /** @type {number} */
                self.touchDeltaX = 0;
              } else {
                /** @type {number} */
                self.touchDeltaX = event.originalEvent.touches[0].clientX - self.touchStartX;
              }
            };
            /**
             * @param {!KeyboardEvent} e
             * @return {undefined}
             */
            var animate = function update(e) {
              if (self._pointerEvent && data[e.originalEvent.pointerType.toUpperCase()]) {
                /** @type {number} */
                self.touchDeltaX = e.originalEvent.clientX - self.touchStartX;
              }
              if (self._handleSwipe(), "hover" === self._config.pause) {
                if (self.pause(), self.touchTimeout) {
                  clearTimeout(self.touchTimeout);
                }
                /** @type {number} */
                self.touchTimeout = setTimeout(function(i) {
                  return self.cycle(i);
                }, delay + self._config.interval);
              }
            };
            if (_runTransitionHook2["default"](this._element.querySelectorAll(val)).on(dragstart, function(event) {
              return event.preventDefault();
            }), this._pointerEvent) {
              _runTransitionHook2["default"](this._element).on(type, function(move) {
                return performAnimation(move);
              });
              _runTransitionHook2["default"](this._element).on(name, function(area) {
                return animate(area);
              });
              this._element.classList.add(element);
            } else {
              _runTransitionHook2["default"](this._element).on(event, function(move) {
                return performAnimation(move);
              });
              _runTransitionHook2["default"](this._element).on(touchmove, function(e) {
                return getY(e);
              });
              _runTransitionHook2["default"](this._element).on(HOVEREVENTS, function(area) {
                return animate(area);
              });
            }
          }
        }, self._keydown = function handleKeyboardNavigation(event) {
          if (!/input|textarea/i.test(event.target.tagName)) {
            switch(event.which) {
              case ARROW_UP:
                event.preventDefault();
                this.prev();
                break;
              case ARROW_DOWN:
                event.preventDefault();
                this.next();
                break;
            }
          }
        }, self._getItemIndex = function updateLayout(target) {
          return this._items = target && target.parentNode ? [].slice.call(target.parentNode.querySelectorAll(bodyScripts)) : [], this._items.indexOf(target);
        }, self._getItemByDirection = function _getItemByDirection(direction, activeElement) {
          /** @type {boolean} */
          var isNextDirection = direction === next;
          /** @type {boolean} */
          var isPrevDirection = direction === prev;
          var activeIndex = this._getItemIndex(activeElement);
          /** @type {number} */
          var lastItemIndex = this._items.length - 1;
          var l;
          if ((isPrevDirection && 0 === activeIndex || isNextDirection && activeIndex === lastItemIndex) && !this._config.wrap) {
            return activeElement;
          }
          var u;
          /** @type {number} */
          var j = (activeIndex + (direction === prev ? -1 : 1)) % this._items.length;
          return -1 === j ? this._items[this._items.length - 1] : this._items[j];
        }, self._triggerSlideEvent = function show(element, state) {
          var index = this._getItemIndex(element);
          var MY_NUMBER = this._getItemIndex(this._element.querySelector(width));
          var a = _runTransitionHook2["default"].Event(i, {
            relatedTarget : element,
            direction : state,
            from : MY_NUMBER,
            to : index
          });
          return _runTransitionHook2["default"](this._element).trigger(a), a;
        }, self._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
          if (this._indicatorsElement) {
            /** @type {!Array<?>} */
            var hook = [].slice.call(this._indicatorsElement.querySelectorAll(freezeSelector));
            _runTransitionHook2["default"](hook).removeClass(prefix);
            var className = this._indicatorsElement.children[this._getItemIndex(element)];
            if (className) {
              _runTransitionHook2["default"](className).addClass(prefix);
            }
          }
        }, self._updateInterval = function Carousel() {
          var self = this._activeElement || this._element.querySelector(width);
          if (self) {
            /** @type {number} */
            var value = parseInt(self.getAttribute("data-interval"), 10);
            if (value) {
              this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
              /** @type {number} */
              this._config.interval = value;
            } else {
              this._config.interval = this._config.defaultInterval || this._config.interval;
            }
          }
        }, self._slide = function show(direction, element) {
          var _this2 = this;
          var activeElement = this._element.querySelector(width);
          var pos = this._getItemIndex(activeElement);
          var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);
          var index = this._getItemIndex(nextElement);
          /** @type {boolean} */
          var isCycling = Boolean(this._interval);
          var p;
          var id;
          var dir;
          var g;
          if (direction === next) {
            /** @type {string} */
            p = G__4880;
            /** @type {string} */
            id = nextIntervalID;
            /** @type {string} */
            dir = right;
          } else {
            /** @type {string} */
            p = plot_or_index;
            /** @type {string} */
            id = a_generic_id;
            /** @type {string} */
            dir = RIGHT;
          }
          if (nextElement && _runTransitionHook2["default"](nextElement).hasClass(prefix)) {
            return this._isSliding = false, void 0;
          }
          if (!this._triggerSlideEvent(nextElement, dir).isDefaultPrevented()) {
            if (activeElement && nextElement) {
              if (this._isSliding = true, isCycling) {
                this.pause();
              }
              this._setActiveIndicatorElement(nextElement);
              this._activeElement = nextElement;
              var e = _runTransitionHook2["default"].Event(slidEvent, {
                relatedTarget : nextElement,
                direction : dir,
                from : pos,
                to : index
              });
              /** @type {null} */
              var numLights = null;
              if (_runTransitionHook2["default"](this._element).hasClass(hidden)) {
                _runTransitionHook2["default"](nextElement).addClass(id);
                _Util["default"].reflow(nextElement);
                _runTransitionHook2["default"](activeElement).addClass(p);
                _runTransitionHook2["default"](nextElement).addClass(p);
                var amount = _Util["default"].getTransitionDurationFromElement(activeElement);
                var str = this._element.className;
                /** @type {(Array<string>|null)} */
                var rDefs = /u-carousel-duration-(\d+)/.exec(str);
                if (rDefs && 2 === rDefs.length) {
                  /** @type {number} */
                  amount = parseFloat(rDefs[1]) || 0;
                }
                if (isCycling) {
                  var value = parseFloat($(this._element).attr("data-interval")) + amount;
                  if (Number.isFinite(value) && value > 0) {
                    numLights = this._config.interval;
                    this._config.interval = value;
                  }
                }
                _runTransitionHook2["default"](activeElement).one(_Util["default"].TRANSITION_END, function() {
                  _runTransitionHook2["default"](nextElement).removeClass(p + " " + id).addClass(prefix);
                  _runTransitionHook2["default"](activeElement).removeClass(prefix + " " + id + " " + p);
                  /** @type {boolean} */
                  _this2._isSliding = false;
                  setTimeout(function() {
                    return _runTransitionHook2["default"](_this2._element).trigger(e);
                  }, 0);
                }).emulateTransitionEnd(amount);
              } else {
                _runTransitionHook2["default"](activeElement).removeClass(prefix);
                _runTransitionHook2["default"](nextElement).addClass(prefix);
                /** @type {boolean} */
                this._isSliding = false;
                _runTransitionHook2["default"](this._element).trigger(e);
              }
              if (isCycling) {
                this.cycle();
              }
              if (numLights) {
                this._config.interval = numLights;
              }
            }
          }
        }, Carousel._jQueryInterface = function init(type) {
          return this.each(function() {
            var data = _runTransitionHook2["default"](this).data(DATA_KEY);
            var options = extend({}, Default, _runTransitionHook2["default"](this).data());
            if ("object" == typeof type) {
              options = extend({}, options, type);
            }
            var name = "string" == typeof type ? type : options.uSlide;
            if (!data) {
              var o;
              if (data = new Carousel(this, options), _runTransitionHook2["default"](this).data(DATA_KEY, data), !_runTransitionHook2["default"](this).data(PROP_NAME)) {
                _runTransitionHook2["default"](this).data(PROP_NAME, new Plugin(this, options));
              }
            }
            if ("number" == typeof type) {
              data.to(type);
            } else {
              if ("string" == typeof name) {
                if (void 0 === data[name]) {
                  throw new TypeError('No method named "' + name + '"');
                }
                data[name]();
              } else {
                if (options.interval && options.uRide) {
                  data.pause();
                  data.cycle();
                }
              }
            }
          });
        }, Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
          var hook = _Util["default"].getSelectorFromElement(this);
          if (hook) {
            var i = _runTransitionHook2["default"](hook)[0];
            if (i && _runTransitionHook2["default"](i).hasClass(hidden)) {
              var e = extend({}, _runTransitionHook2["default"](i).data(), _runTransitionHook2["default"](this).data());
              var t = this.getAttribute("data-u-slide-to");
              if (t) {
                /** @type {boolean} */
                e.interval = false;
              }
              if (Carousel._jQueryInterface.call(_runTransitionHook2["default"](i), e), t) {
                _runTransitionHook2["default"](i).data(DATA_KEY).to(t);
              }
              event.preventDefault();
            }
          }
        }, create(Carousel, null, [{
          key : "VERSION",
          get : function makeServerListenFunc() {
            return f;
          }
        }, {
          key : "Default",
          get : function get() {
            return Default;
          }
        }]), Carousel;
      }();
      return _runTransitionHook2["default"](document).on(table, m, Carousel._dataApiClickHandler), _runTransitionHook2["default"](window).on(e, function() {
        /** @type {!Array<?>} */
        var transitionHooks = [].slice.call(document.querySelectorAll(sel));
        /** @type {number} */
        var index = 0;
        /** @type {number} */
        var blockLength = transitionHooks.length;
        for (; index < blockLength; index++) {
          var comboPathName = _runTransitionHook2["default"](transitionHooks[index]);
          Carousel._jQueryInterface.call(comboPathName, comboPathName.data());
        }
      }), _runTransitionHook2["default"].fn[NAME] = Carousel._jQueryInterface, _runTransitionHook2["default"].fn[NAME].Constructor = Carousel, _runTransitionHook2["default"].fn[NAME].noConflict = function() {
        return _runTransitionHook2["default"].fn[NAME] = JQUERY_NO_CONFLICT, Carousel._jQueryInterface;
      }, Carousel;
    }($, ns.Util);
    window.bootstrap = ns;
  },
  466 : function(blob, id, require) {
    /**
     * @param {string} element
     * @return {undefined}
     */
    function CarouselSwipe(element) {
      this.$element = $(element);
      this.carousel = this.$element.data("bs.u-carousel");
      this.options = $.extend({}, CarouselSwipe.DEFAULTS, this.carousel._config);
      /** @type {null} */
      this.startX = null;
      /** @type {null} */
      this.startY = null;
      /** @type {null} */
      this.startTime = null;
      /** @type {null} */
      this.cycling = null;
      /** @type {null} */
      this.$active = null;
      /** @type {null} */
      this.$items = null;
      /** @type {null} */
      this.$next = null;
      /** @type {null} */
      this.$prev = null;
      /** @type {null} */
      this.dx = null;
      /** @type {boolean} */
      this.sliding = false;
      this.$element.on("touchstart.bs.u-carousel", this.touchstart.bind(this)).on("touchmove.bs.u-carousel", this.touchmove.bind(this)).on("touchend.bs.u-carousel", this.touchend.bind(this)).on("u-slide.bs.u-carousel", this.startSliding.bind(this)).on("slid.bs.u-carousel", this.stopSliding.bind(this));
    }
    /** @type {function(string): undefined} */
    blob.exports = CarouselSwipe;
    var $ = require(6);
    CarouselSwipe.DEFAULTS = {
      swipe : 50
    };
    /**
     * @return {undefined}
     */
    CarouselSwipe.prototype.startSliding = function() {
      /** @type {boolean} */
      this.sliding = true;
    };
    /**
     * @return {undefined}
     */
    CarouselSwipe.prototype.stopSliding = function() {
      /** @type {boolean} */
      this.sliding = false;
    };
    /**
     * @param {!Object} event
     * @return {undefined}
     */
    CarouselSwipe.prototype.touchstart = function(event) {
      if (!this.sliding && this.options.swipe) {
        var evt = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
        /** @type {number} */
        this.dx = 0;
        this.startX = evt.pageX;
        this.startY = evt.pageY;
        /** @type {null} */
        this.cycling = null;
        this.width = this.$element.width();
        this.startTime = event.timeStamp;
      }
    };
    /**
     * @param {!Object} event
     * @return {undefined}
     */
    CarouselSwipe.prototype.touchmove = function(event) {
      if (!this.sliding && this.options.swipe && this.startTime) {
        var evt = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
        /** @type {number} */
        var dx = evt.pageX - this.startX;
        /** @type {number} */
        var dy = evt.pageY - this.startY;
        if (!(Math.abs(dx) < Math.abs(dy))) {
          if (null === this.cycling) {
            if (this.cycling = !!this.carousel.interval, this.cycling) {
              this.carousel.pause();
            }
          }
          event.preventDefault();
          /** @type {number} */
          this.dx = dx / (this.width || 1) * 100;
          this.swipe(this.dx);
        }
      }
    };
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    CarouselSwipe.prototype.touchend = function(event) {
      if (!this.sliding && this.options.swipe && this.startTime) {
        if (this.$active) {
          var e = $().add(this.$active).add(this.$prev).add(this.$next).carousel_transition(true);
          /** @type {number} */
          var dt = (event.timeStamp - this.startTime) / 1E3;
          /** @type {number} */
          var speed = Math.abs(this.dx / dt);
          if (this.dx > 40 || this.dx > 0 && speed > this.options.swipe) {
            this.carousel.prev();
          } else {
            if (this.dx < -40 || this.dx < 0 && speed > this.options.swipe) {
              this.carousel.next();
            } else {
              this.$active.one($.support.transition.end, function() {
                e.removeClass("u-carousel-item-prev u-carousel-item-next");
              }).emulateTransitionEnd(1E3 * this.$active.css("transition-duration").slice(0, -1));
            }
          }
          if (e.css("transform", ""), this.cycling) {
            this.carousel.cycle();
          }
          /** @type {null} */
          this.$active = null;
          /** @type {null} */
          this.startTime = null;
        }
      }
    };
    /**
     * @param {number} val
     * @return {undefined}
     */
    CarouselSwipe.prototype.swipe = function(val) {
      var $active = this.$active || this.getActive();
      if (val < 0) {
        if (this.$prev.css("transform", "translate3d(0,0,0)").removeClass("u-carousel-item-prev").carousel_transition(true), !this.$next.length || this.$next.hasClass("u-active")) {
          return;
        }
        this.$next.carousel_transition(false).addClass("u-carousel-item-next").css("transform", "translate3d(" + (val + 100) + "%,0,0)");
      } else {
        if (this.$next.css("transform", "").removeClass("u-carousel-item-next").carousel_transition(true), !this.$prev.length || this.$prev.hasClass("u-active")) {
          return;
        }
        this.$prev.carousel_transition(false).addClass("u-carousel-item-prev").css("transform", "translate3d(" + (val - 100) + "%,0,0)");
      }
      $active.carousel_transition(false).css("transform", "translate3d(" + val + "%, 0, 0)");
    };
    /**
     * @return {?}
     */
    CarouselSwipe.prototype.getActive = function() {
      if (this.$active = this.$element.find(".u-carousel-item.u-active"), this.$items = this.$active.parent().children(), this.$next = this.$active.next(), !this.$next.length && this.options.wrap) {
        this.$next = this.$items.first();
      }
      if (this.$prev = this.$active.prev(), !this.$prev.length && this.options.wrap) {
        this.$prev = this.$items.last();
      }
      return this.$active;
    };
    /**
     * @param {boolean} enable
     * @return {?}
     */
    $.fn.carousel_transition = function(enable) {
      return enable = enable ? "" : "none", this.each(function() {
        $(this).css("transition", enable);
      });
    };
  },
  475 : function(branchData, beforeZero, afterZero) {
    /**
     * @param {!Object} target
     * @return {undefined}
     */
    function init(target) {
      var result = target.attr("data-map");
      if (result) {
        result = Utility.decodeJsonAttribute(result);
        var document = target.contents()[0];
        var script = document.createElement("script");
        /** @type {string} */
        script.type = "text/javascript";
        /** @type {string} */
        script.innerHTML = "var data = " + JSON.stringify(result) + ";\n;" + "var mapIframeApiReady = function () {\n" + '   parent.mapIframeApiReady(google, document.getElementById("map"), data);\n' + "}";
        var oScript = document.createElement("script");
        if (oScript.type = "text/javascript", oScript.src = "//maps.google.com/maps/api/js?key=" + result.apiKey + "&callback=mapIframeApiReady", result.lang) {
          oScript.src += "&language=" + result.lang;
        }
        document.head.appendChild(script);
        document.head.appendChild(oScript);
        $(document.body).append("<style>" + "   #map { width: 100%; height: 100%; }" + "   body { margin: 0; }" + "   .marker-internal { width: 180px; font-weight: normal; }" + "   .marker-internal a { text-decoration: none; color:#427fed; }" + "   .marker-internal strong { font-weight: 500; font-size: 14px; }" + "</style>" + '<div id="map"></div>');
      }
    }
    /**
     * @param {!Object} obj
     * @return {?}
     */
    function handler(obj) {
      /** @type {string} */
      var css = "";
      if (obj.title) {
        /** @type {string} */
        css = css + ("<strong>" + obj.title + "</strong>");
      }
      if (obj.description) {
        /** @type {string} */
        css = css + ("<div>" + obj.description.replace(/\n/g, "<br>") + "</div>");
      }
      if (obj.linkUrl) {
        var url;
        var i;
        /** @type {string} */
        css = css + ('<a href="' + obj.linkUrl + '" target="_blank"><span>' + (obj.linkCaption || obj.linkUrl) + "</span></a>");
      }
      if (css) {
        /** @type {string} */
        css = '<div class="marker-internal">' + css + "</div>";
      }
      return css;
    }
    var YM = {};
    /**
     * @return {undefined}
     */
    window.loadMapsContent = function() {
      $("iframe.map-content").each(function() {
        var self = $(this);
        if (0 === self.contents().find("#map").length) {
          init(self);
        }
      });
    };
    /**
     * @param {!Object} google
     * @param {?} div
     * @param {!Object} options
     * @return {undefined}
     */
    window.mapIframeApiReady = function(google, div, options) {
      options.markers = options.markers || [];
      var zoom = options.zoom;
      if (!zoom && 1 === options.markers.length) {
        zoom = options.markers[0].zoom;
      }
      if (!zoom) {
        /** @type {number} */
        zoom = 14;
      }
      if (zoom = parseInt(zoom, 10), options.map = options.map || {}, options.map.zoom = zoom, options.map.mapTypeId = "satellite" === options.typeId ? google.maps.MapTypeId.HYBRID : google.maps.MapTypeId.ROADMAP, options.markers.length) {
        options.map.center = options.markers[0].position;
      }
      var map = new google.maps.Map(div, options.map || {});
      var eventsBounds = new google.maps.LatLngBounds;
      if (options.markers.forEach(function(options) {
        options.map = map;
        var collection = new google.maps.Marker(options);
        eventsBounds.extend(new google.maps.LatLng(options.position.lat, options.position.lng));
        var result = handler(options);
        if (result) {
          var path = new google.maps.InfoWindow({
            content : $("<textarea/>").html(result).text()
          });
          collection.addListener("click", function() {
            path.open(collection.get("map"), collection);
          });
        }
      }), options.markers.length > 1 && zoom && !isNaN(zoom)) {
        map.fitBounds(eventsBounds);
        var projection_changed = google.maps.event.addListener(map, "zoom_changed", function() {
          if (google.maps.event.removeListener(projection_changed), map.getZoom() > zoom || 0 === map.getZoom()) {
            map.setZoom(zoom);
          }
        });
      }
    };
    window.MapsLoader = YM;
  },
  476 : function(module, selector, convertToImages) {
    /**
     * @param {string} dataSet
     * @param {!Object} err
     * @return {undefined}
     */
    function self(dataSet, err) {
      /** @type {string} */
      this.responsive = dataSet;
      this.root = err || $("body");
      this.init();
    }
    /** @type {function(string, !Object): undefined} */
    module.exports = self;
    var $ = window.jQuery;
    /**
     * @return {undefined}
     */
    self.prototype.init = function init() {
      if (this.root.is("body")) {
        this.subscribe();
      }
      this.initStyles();
    };
    /**
     * @return {undefined}
     */
    self.prototype.subscribe = function init() {
      this.root.on("click", ".u-menu .menu-collapse", function(event) {
        event.preventDefault();
        var id = $(event.currentTarget).closest(".u-menu");
        if (self.isActive(id)) {
          this.close(id);
        } else {
          this.open(id);
        }
      }.bind(this));
      this.root.on("click", ".u-menu .u-menu-close", function(event) {
        event.preventDefault();
        var id = $(event.currentTarget).closest(".u-menu");
        this.close(id);
      }.bind(this));
      this.root.on("click", ".u-menu .u-menu-overlay", function(event) {
        var id = $(event.currentTarget).closest(".u-menu.open");
        this.close(id);
      }.bind(this));
      this.root.find(".u-menu").on("click", ".u-nav-container-collapse .u-nav-link", function(event) {
        var $_this = $(event.currentTarget);
        var i;
        if (!$_this.siblings(".u-nav-popup").length) {
          var valueHref = $_this.attr("href");
          if (valueHref && -1 !== valueHref.indexOf("#")) {
            var id = $(event.currentTarget).closest(".u-menu");
            this.close(id);
          }
        }
      }.bind(this));
      this.root.find(".u-menu:not(.u-menu-one-level)").on("click", ".u-nav-container-collapse .u-nav-link", function(event) {
        var element = $(event.currentTarget).siblings(".u-nav-popup");
        var nav;
        var indent_string = element.closest(".u-menu").attr("data-submenu-level") || "on-click";
        if (element.length && "on-click" === indent_string) {
          event.preventDefault();
          event.stopPropagation();
          /** @type {boolean} */
          event.returnValue = false;
          element.one("transitionend webkitTransitionEnd oTransitionEnd", function(event) {
            event.stopPropagation();
            element.removeClass("animating");
            element.toggleClass("open");
            element.css({
              "max-height" : element.is(".open") ? "none" : "",
              visibility : ""
            });
            element.find(".open").removeClass("open").css("max-height", "");
          });
          element.css({
            "max-height" : "none",
            visibility : "visible"
          });
          var position = element.outerHeight();
          element.css("max-height", element.is(".open") ? position : 0);
          element.addClass("animating");
          element[0].offsetHeight;
          element.css("max-height", element.is(".open") ? 0 : position);
        }
      });
      $(window).on("resize", function() {
        $(".u-menu.open").each(function(canCreateDiscussions, index) {
          this.close($(index));
        }.bind(this));
      }.bind(this));
      $(document).keyup(function(event) {
        if (27 === event.keyCode) {
          $(".u-menu.open").each(function(canCreateDiscussions, index) {
            this.close($(index));
          }.bind(this));
        }
      }.bind(this));
      $(this.root).on("mouseenter touchstart", ".u-nav-container ul > li", function(event) {
        self.fixDirection(this.root, $(event.currentTarget));
      }.bind(this));
    };
    /**
     * @return {undefined}
     */
    self.prototype.initStyles = function getGroupVals() {
      this.root.find(".u-menu").each(function() {
        var menu = $(this);
        var style = menu.find(".offcanvas-style");
        var t = menu.find(".u-nav-container-collapse .u-sidenav").attr("data-offcanvas-width") || 250;
        if (!style.length) {
          style = $('<style class="offcanvas-style"></style>');
          menu.append(style);
        }
        style.html("            .u-offcanvas .u-sidenav { flex-basis: {width} !important; }            .u-offcanvas:not(.u-menu-open-right) .u-sidenav { margin-left: -{width}; }            .u-offcanvas.u-menu-open-right .u-sidenav { margin-right: -{width}; }            @keyframes menu-shift-left    { from { left: 0;        } to { left: {width};  } }            @keyframes menu-unshift-left  { from { left: {width};  } to { left: 0;        } }            @keyframes menu-shift-right   { from { right: 0;       } to { right: {width}; } }            @keyframes menu-unshift-right { from { right: {width}; } to { right: 0;       } }            ".replace(/\{width\}/g, 
        t + "px"));
      });
    };
    /**
     * @return {undefined}
     */
    self.prototype.onResponsiveResize = function factory() {
      $(".u-menu").each(function(canCreateDiscussions, parent) {
        var scales = $(parent).attr("data-responsive-from") || "MD";
        var scale = this.responsive.modes.indexOf(scales);
        var res = this.responsive.modes.slice(scale);
        self.toggleResponsive(parent, -1 !== res.indexOf(this.responsive.mode));
        this.megaResize(parent, 1);
      }.bind(this));
    };
    /**
     * @param {!Object} elem
     * @param {boolean} seq
     * @return {undefined}
     */
    self.toggleResponsive = function editor_update_input_group(elem, seq) {
      $(elem).toggleClass("u-enable-responsive", seq);
    };
    /**
     * @param {string} e
     * @param {?} m
     * @return {undefined}
     */
    self.prototype.close = function update(e, m) {
      if (!window.app || !window.app.modes) {
        if (self.isActive(e)) {
          this.closeMenu(e, m);
        }
      } else {
        if (this.closeMenu(e, m), this.setOverlayOpacity(e), self.isOffcanvasMode(e)) {
          app.modes().resetOffCanvas();
        }
      }
    };
    /**
     * @param {!Object} node
     * @param {?} player
     * @return {undefined}
     */
    self.prototype.closeMenu = function onError(node, player) {
      if (this.enableScroll(), self.isOffcanvasMode(node)) {
        this.offcanvasMenuClose(node);
      } else {
        this.overlayMenuClose(node);
      }
      this.root.removeClass("menu-overlay");
      this.hideOverlay(node, player);
    };
    /**
     * @param {string} id
     * @return {undefined}
     */
    self.prototype.open = function click(id) {
      if (this.root.addClass("menu-overlay"), !window.app || !window.app.modes) {
        if (!self.isActive(id)) {
          this.openMenu(id);
        }
      } else {
        if (this.setOverlayOpacity(id), this.openMenu(id), self.isOffcanvasMode(id)) {
          app.modes().setOffCanvas();
        }
      }
    };
    /**
     * @param {string} e
     * @return {undefined}
     */
    self.prototype.setOverlayOpacity = function onEnterSlideset(e) {
      e.find(".u-menu-overlay").css("opacity", "");
    };
    /**
     * @param {!Object} elem
     * @return {undefined}
     */
    self.prototype.openMenu = function update_cb(elem) {
      if (this.disableScroll(), self.isOffcanvasMode(elem)) {
        this.offcanvasMenuOpen(elem);
      } else {
        this.overlayMenuOpen(elem);
      }
      this.showOverlay(elem);
    };
    /**
     * @param {!Object} sender
     * @return {undefined}
     */
    self.prototype.offcanvasMenuOpen = function showvars_click(sender) {
      var curNode = this.root;
      if (sender.addClass("open"), curNode.addClass("u-offcanvas-opened"), sender.is(".u-offcanvas-shift")) {
        curNode.addClass("u-offcanvas-shifted-" + (sender.hasClass("u-menu-open-right") ? "right" : "left"));
      }
    };
    /**
     * @param {!Object} menu
     * @return {undefined}
     */
    self.prototype.offcanvasMenuClose = function showvars_click(menu) {
      if (menu.removeClass("open"), this.root.removeClass("u-offcanvas-opened u-offcanvas-shifted-left u-offcanvas-shifted-right"), menu.is(".u-offcanvas-shift")) {
        this.root.addClass("u-offcanvas-unshifted-" + (menu.hasClass("u-menu-open-right") ? "right" : "left"));
      }
    };
    /**
     * @param {!Object} li
     * @param {number} data
     * @return {undefined}
     */
    self.prototype.megaResize = function adjustCategoryHeights(li, data) {
      if (li = $(li), data = data || 1, li.hasClass("u-menu-mega")) {
        li.outerHeight();
        li.each(function() {
          var $form_body = $(this);
          $form_body.find(".u-mega-popup").each(function() {
            var $item = $(this);
            var undefined = $item.attr("data-mega-width");
            if ("custom" !== undefined) {
              var $attachTo = "sheet" === undefined ? $form_body.closest(".u-sheet, .u-body") : $form_body.closest("body, .u-body");
              var elpos = $attachTo.offset();
              var strip_width = $attachTo.outerWidth();
              if ($item.css({
                left : "",
                width : ""
              }), $item.removeClass("u-popup-left u-popup-right"), $item.addClass("u-hidden"), $form_body.outerHeight(), $item.removeClass("u-hidden"), $form_body.outerHeight(), "content" === undefined) {
                return $item.css("width", "auto"), void 0;
              }
              var cpos = $item.offset();
              /** @type {number} */
              var myTop = (elpos.left - cpos.left) / data;
              $item.css({
                left : Math.round(myTop) + "px",
                width : strip_width + "px"
              });
            }
          });
        });
      }
    };
    /**
     * @param {!Object} element
     * @param {?} controller
     * @return {undefined}
     */
    self.prototype.hideOverlay = function link(element, controller) {
      var accountSection = element.find(".u-menu-overlay");
      var showRequests = function() {
        if (!self.isActive(element)) {
          element.find(".u-nav-container-collapse").css("width", "");
          this.root.filter("body").find("header.u-sticky").css("top", "");
        }
      }.bind(this);
      if (controller) {
        showRequests();
      } else {
        accountSection.fadeOut(500, showRequests);
      }
    };
    /**
     * @param {!Object} event
     * @return {undefined}
     */
    self.prototype.showOverlay = function ruler_mouseEnterHandler(event) {
      var $hideStageButton = event.find(".u-menu-overlay");
      event.find(".u-nav-container-collapse").css("width", "100%");
      $hideStageButton.fadeIn(500);
    };
    /**
     * @return {undefined}
     */
    self.prototype.disableScroll = function _addOverflowToBody() {
      if (this.root.is("body")) {
        /** @type {string} */
        document.documentElement.style.overflow = "hidden";
      }
    };
    /**
     * @return {undefined}
     */
    self.prototype.enableScroll = function getBrowserQuirks() {
      if (this.root.is("body")) {
        /** @type {string} */
        document.documentElement.style.overflow = "";
      }
    };
    /**
     * @param {!Object} text
     * @return {undefined}
     */
    self.prototype.overlayMenuOpen = function fbOpen(text) {
      text.addClass("open");
    };
    /**
     * @param {!Object} page
     * @return {undefined}
     */
    self.prototype.overlayMenuClose = function createSubCommand(page) {
      page.removeClass("open");
    };
    /**
     * @param {!Object} str
     * @return {?}
     */
    self.isOffcanvasMode = function(str) {
      return str.is(".u-offcanvas");
    };
    /**
     * @param {!Object} e
     * @return {?}
     */
    self.isActive = function(e) {
      return e.hasClass("open");
    };
    /**
     * @param {?} items
     * @param {number} x
     * @return {undefined}
     */
    self.fixDirection = function init(items, x) {
      if (x && x.length) {
        items = $(items);
        /** @type {string} */
        var type = "u-popup-left";
        /** @type {string} */
        var className = "u-popup-right";
        var a;
        $(x).children(".u-nav-popup").each(function() {
          var element = $(this);
          if (element.removeClass(type + " " + className), "content" === element.attr("data-mega-width")) {
            /** @type {string} */
            var name = "";
            if (element.parents("." + type).length) {
              /** @type {string} */
              name = type;
            } else {
              if (element.parents("." + className).length) {
                /** @type {string} */
                name = className;
              }
            }
            if (name) {
              element.addClass(name);
            } else {
              var box = element[0].getBoundingClientRect();
              var viewport = items[0].getBoundingClientRect();
              var columns = "undefined" == typeof app ? 1 : app.editor.preview.scale;
              if (box.right > viewport.right) {
                element.css("left", (viewport.right - box.right) / columns + "px");
                element.css("right", "auto");
                element.addClass(type);
              } else {
                if (box.left < viewport.left) {
                  element.css("left", "0px");
                  element.css("right", "auto");
                  element.addClass(className);
                }
              }
            }
          }
        });
      }
    };
    /** @type {function(string, !Object): undefined} */
    window.ResponsiveMenu = self;
  },
  6 : function(module, data) {
    module.exports = jQuery;
  },
  7908 : function(data, linkedEntities, force) {
    force(7909);
    force(7953);
  },
  7909 : function(data, linkedEntities, force) {
    force(7910);
  },
  7910 : function(data, linkedEntities, force) {
    force(7911);
    force(7912);
    force(238);
    force(7913);
    force(7914);
    force(7915);
    force(465);
    force(475);
    force(7916);
    force(7924);
    force(7925);
    force(7927);
    force(7929);
    force(7930);
    force(7931);
    force(7932);
    force(316);
    force(7933);
    force(7938);
    force(7939);
    force(7941);
    force(7942);
    force(7944);
    force(7946);
    force(7947);
    force(7949);
    force(7950);
    force(7951);
    force(7952);
  },
  7911 : function(branchData, beforeZero, afterZero) {
    /**
     * @return {undefined}
     */
    function render() {
      if (window && document && "complete" !== document.readyState) {
        /** @type {!HTMLBodyElement} */
        var node = document.body;
        if (node && node.classList && "function" == typeof node.classList.add && "function" == typeof node.classList.remove && "function" == typeof node.appendChild && "function" == typeof document.createElement && "function" == typeof window.addEventListener) {
          /** @type {string} */
          var element = "u-disable-duration";
          node.classList.add(element);
          /** @type {!Element} */
          var styleNode = document.createElement("style");
          /** @type {string} */
          styleNode.innerHTML = ".u-disable-duration * {transition-duration: 0s !important;}";
          node.appendChild(styleNode);
          window.addEventListener("load", function() {
            node.classList.remove(element);
          });
        }
      }
    }
    render();
  },
  7912 : function(branchData, beforeZero, afterZero) {
    if (!("CSS" in window)) {
      window.CSS = {};
    }
    if (!("supports" in window.CSS)) {
      "use strict";
      window.CSS._cacheSupports = {};
      /**
       * @param {string} propertyName
       * @param {string} value
       * @return {?}
       */
      window.CSS.supports = function(propertyName, value) {
        /**
         * @param {string} propertyName
         * @param {?} value
         * @return {?}
         */
        function cssSupports(propertyName, value) {
          /** @type {!CSSStyleDeclaration} */
          var style = document.createElement("div").style;
          if (void 0 === value) {
            /**
             * @param {string} propertyName
             * @param {!RegExp} reg
             * @return {?}
             */
            var mergeOdd = function(propertyName, reg) {
              var param = propertyName.split(reg);
              if (param.length > 1) {
                return param.map(function(value, index, prop) {
                  return index % 2 == 0 ? value + prop[index + 1] : "";
                }).filter(Boolean);
              }
            };
            var arrOr = mergeOdd(propertyName, /([)])\s*or\s*([(])/gi);
            if (arrOr) {
              return arrOr.some(function(supportsCondition) {
                return window.CSS.supports(supportsCondition);
              });
            }
            var arrAnd = mergeOdd(propertyName, /([)])\s*and\s*([(])/gi);
            if (arrAnd) {
              return arrAnd.every(function(supportsCondition) {
                return window.CSS.supports(supportsCondition);
              });
            }
            style.cssText = propertyName.replace("(", "").replace(/[)]$/, "");
          } else {
            /** @type {string} */
            style.cssText = propertyName + ":" + value;
          }
          return !!style.length;
        }
        /** @type {string} */
        var key = [propertyName, value].toString();
        if (key in window.CSS._cacheSupports) {
          return window.CSS._cacheSupports[key];
        } else {
          return window.CSS._cacheSupports[key] = cssSupports(propertyName, value);
        }
      };
    }
  },
  7913 : function(onerror, define, require) {
    /**
     * @param {number} options
     * @return {undefined}
     */
    function render(options) {
      if (this.prevMode = "", this.resizeTimeout = 50, this.sheet = {
        XS : 340,
        SM : 540,
        MD : 720,
        LG : 940,
        XL : 1140,
        XXL : 1320
      }, this.mediaMax = {
        XS : 575,
        SM : 767,
        MD : 991,
        LG : 1199
      }, this.modes = ["XL", "LG", "MD", "SM", "XS"], this.defaultMode = "XL", document.body.classList.contains("u-xxl-mode")) {
        /** @type {number} */
        this.mediaMax.XXL = 1399;
        /** @type {string} */
        this.defaultMode = "XXL";
        this.modes.splice(0, 0, "XXL");
      }
      /** @type {!Array} */
      this._handlers = [];
      this.modes.forEach(function(docName) {
        /** @type {string} */
        var e = document.body.style.getPropertyValue("--theme-sheet-width-" + docName.toLowerCase());
        if (e = parseFloat(e), Number.isFinite(e)) {
          /** @type {number} */
          this.sheet[docName] = e;
        }
      });
      this.init(options || []);
    }
    var TagHourlyStat = require(476);
    var $ = require(6);
    Object.defineProperty(render.prototype, "mode", {
      get : function() {
        /** @type {number} */
        var page = (document.documentElement || document.body).clientWidth || window.innerWidth;
        if (this.scrolbar) {
          document.documentElement.setAttribute("style", "overflow-y:hidden");
          /** @type {number} */
          page = (document.documentElement || document.body).clientWidth || window.innerWidth;
          document.documentElement.removeAttribute("style");
        }
        var category;
        for (category in this.mediaMax) {
          if (this.mediaMax.hasOwnProperty(category)) {
            if (page <= this.mediaMax[category]) {
              return category;
            }
          }
        }
        return this.defaultMode;
      }
    });
    /**
     * @param {!Array} b
     * @return {undefined}
     */
    render.prototype.init = function init(b) {
      $(function() {
        this.update(true);
        /** @type {boolean} */
        this.scrolbar = !!(document.body && document.body.clientWidth !== document.body.scrollWidth);
      }.bind(this));
      $(window).on("resize", function() {
        this.update(true);
      }.bind(this));
      b.forEach(function(Swiped) {
        this._handlers.push(new Swiped(this));
      }, this);
      this.update();
    };
    /**
     * @param {string} b
     * @return {undefined}
     */
    render.prototype.update = function load(b) {
      var callback = function() {
        if (this.mode !== this.prevMode || this.getContentWidth() < this.sheet[this.mode]) {
          this._handlers.forEach(function(canCreateDiscussions) {
            if ("function" == typeof canCreateDiscussions.onResponsiveBefore) {
              canCreateDiscussions.onResponsiveBefore();
            }
          });
          this.responsiveClass($("html"));
          this._handlers.forEach(function(canCreateDiscussions) {
            if ("function" == typeof canCreateDiscussions.onResponsiveAfter) {
              canCreateDiscussions.onResponsiveAfter();
            }
          });
          this.prevMode = this.mode;
        }
        this._handlers.forEach(function(canCreateDiscussions) {
          if ("function" == typeof canCreateDiscussions.onResponsiveResize) {
            canCreateDiscussions.onResponsiveResize();
          }
        });
      }.bind(this);
      if (b) {
        clearTimeout(this._timeoutId);
        /** @type {number} */
        this._timeoutId = setTimeout(callback, this.resizeTimeout);
      } else {
        callback();
      }
    };
    /**
     * @param {!Object} inp
     * @return {undefined}
     */
    render.prototype.responsiveClass = function _update(inp) {
      /** @type {string} */
      var style = Object.keys(this.sheet).map(function(p_Interval) {
        return "u-responsive-" + p_Interval.toLowerCase();
      }).join(" ");
      inp.removeClass(style);
      inp.addClass("u-responsive-" + this.mode.toLowerCase());
    };
    /**
     * @return {?}
     */
    render.prototype.getContentWidth = function() {
      return $(".u-body section:first").parent().width();
    };
    $(function() {
      window._responsive = new render([TagHourlyStat]);
      $(document).on("click", "[data-href]:not(.u-back-to-top), [data-post-link]", function(event) {
        if (!event.isDefaultPrevented()) {
          var $this = $(this);
          var url = $this.attr("data-href") || $this.attr("data-post-link");
          var target = $this.attr("data-target") || "";
          if (target) {
            window.open(url, target);
          } else {
            window.location.href = url;
          }
        }
      });
    });
  },
  7914 : function(onerror, define, require) {
    /**
     * @return {?}
     */
    function main() {
      /**
       * @param {!Object} node
       * @param {string} value
       * @return {undefined}
       */
      function callback(node, value) {
        var branchName = node.find("input[name=name]").val();
        var email = node.find("input[name=email]").val();
        var data = {
          Email : email,
          EMAIL : email
        };
        console.log(data)
        if (branchName) {
          data.Name = branchName;
          data.FNAME = branchName;
        }
        var fields_to_add = node.find("input, textarea");
        $.each(fields_to_add, function(index, selobj) {
          var b = $(selobj).attr("name");
          var i = $(selobj).val();
          if (b && i) {
            data[b.toUpperCase()] = i;
          }
        });
        var i = (value = value.replace("/post?", "/post-json?") + "&c=?").indexOf("u=") + 2;
        i = value.substring(i, value.indexOf("&", i));
        var index = value.indexOf("id=") + 3;
        index = value.substring(index, value.indexOf("&", index));
        /** @type {string} */
        data["b_" + i + "_" + index] = "";

        $.ajax({
          url : value,
          data : data,
          dataType : "jsonp"
        }).done(function(data) {
          var o;
          if ("success" === data.result || /already/.test(data.msg)) {
            reset(node);
            start(node);
          } else {
            fn(node, data.msg);
          }
        }).fail(function() {
          fn(node);
        });
      }
      /**
       * @param {!Object} options
       * @return {undefined}
       */
      function start(options) {
        var dialog;
        (new Player(options)).close();
      }
      /**
       * @param {!Object} element
       * @return {undefined}
       */
      function reset(element) {
        element.trigger("reset");
        var $innerblock = element.find(".u-form-send-success");
        $innerblock.show();
        setTimeout(function() {
          $innerblock.hide();
        }, 2E3);
      }
      /**
       * @param {!Object} el
       * @param {?} t
       * @return {undefined}
       */
      function fn(el, t) {
        var tt = t ? el.find(".u-form-send-error").clone() : el.find(".u-form-send-error");
        if (t) {
          tt.text(t);
          el.find(".u-form-send-error").parent().append(tt);
        }
        tt.show();
        setTimeout(function() {
          if (tt.hide(), t) {
            tt.remove();
          }
        }, 2E3);
      }
      return {
        submit : function(event) {
          event.preventDefault();
          event.stopPropagation();
          var key = $(this).attr("action");
          var _type = $(this).attr("method") || "POST";
          /** @type {string} */
          var value = "";
          if (("email" === $(this).attr("source") || "customphp" === $(this).attr("source")) && "true" === $(this).attr("redirect")) {
            value = $(this).attr("redirect-url") && !$.isNumeric($(this).attr("redirect-url")) ? $(this).attr("redirect-url") : $(this).attr("redirect-address");
          }
          if (/list-manage[1-9]?.com/i.test(key)) {
            return callback($(this), key), void 0;
          }
          var name = $(this);
          $.ajax({
            type : _type,
            url : key,
            data : $(this).serialize(),
            dataType : "json"
          }).done(function(options) {
            if (options && (options.success || options.ok)) {
              if (reset(name), value) {
                window.location.replace(value);
              } else {
                start(name);
              }
            } else {
              fn(name, options.error);
            }
          }).fail(function() {
            fn(name);
          });
        },
        click : function(event) {
          var form;
          event.preventDefault();
          event.stopPropagation();
          $(this).find(".u-form-send-success").hide();
          $(this).find(".u-form-send-error").hide();
          $(this).closest("form").find(":submit").click();
        }
      };
    }
    var $ = require(6);
    var Player = require(121);
    $(function() {
      var form = new main;
      $("form.u-form-vertical:not(.u-form-custom-backend), form.u-form-horizontal:not(.u-form-custom-backend)").submit(form.submit);
      $(".u-form .u-form-submit a").click(form.click);
    });
    /** @type {function(): ?} */
    window.MailChimpForm = main;
  },
  7915 : function(onerror, define, require) {
    /**
     * @param {!Object} toggle_callback
     * @return {undefined}
     */
    function init(toggle_callback) {
      var video;
      toggle_callback.find(".u-video .embed-responsive-item").each(function() {
        if (this.matches("video")) {
          this.pause();
        } else {
          if (this.matches("iframe")) {
            var t = this.getAttribute("src");
            this.setAttribute("src", t.replace(/autoplay=1?/gi, ""));
          }
        }
      });
    }
    /**
     * @param {!Object} day
     * @return {undefined}
     */
    function dayHovering(day) {
      var video;
      (day.hasClass("u-video") ? day : day.find(".u-video")).find(".embed-responsive-item[data-autoplay]").each(function() {
        render($(this).closest(".u-video"));
      });
    }
    /**
     * @param {!Object} _nc
     * @return {undefined}
     */
    function render(_nc) {
      if (!_nc.closest(".u-dialog-block:not(.u-dialog-open)").length) {
        var iframe = _nc.find("iframe");
        var id = iframe.attr("data-src") || iframe.attr("src");
        var domVideos = _nc.find("video");
        if (id) {
          _nc.addClass("active");
          /** @type {string} */
          id = id + ((-1 === id.indexOf("?") ? "?" : "&") + "autoplay=1");
          iframe.attr("src", id);
        } else {
          if (domVideos.length) {
            _nc.addClass("active");
            var audio_element = domVideos[0];
            if (audio_element.paused) {
              audio_element.play();
            } else {
              audio_element.pause();
            }
          }
        }
      }
    }
    var $ = require(6);
    $(document).on("click", ".u-video-poster, .u-video video", function(event) {
      var e;
      var video;
      event.preventDefault();
      render($(this).closest(".u-video"));
    });
    $(function() {
      $(".u-video-background .u-video-poster, .u-video-background .u-video video").each(function() {
        render($(this).closest(".u-video"));
      });
      $(".u-video .embed-responsive-item:not(.lazyloading, .lazyloaded) + .u-video-poster").each(function() {
        var src = this.getAttribute("data-src");
        if (src) {
          /** @type {string} */
          this.style.backgroundImage = "url(" + src + ")";
        }
        dayHovering($(this).closest(".u-video"));
      });
    });
    $(document).on("opened.np.dialog", ".u-dialog-block", function(event) {
      dayHovering($(event.currentTarget));
    });
    $(document).on("closed.np.dialog", ".u-dialog-block", function(event) {
      init($(event.currentTarget));
    });
  },
  7916 : function(data, linkedEntities, FbmNoise2) {
    var ruggedNoise = FbmNoise2(6);
    var erodeNoise = FbmNoise2(7917);
    ruggedNoise(function() {
      (new erodeNoise).init();
    });
  },
  7917 : function(task, id, require) {
    /**
     * @return {undefined}
     */
    function self() {
      /** @type {null} */
      this.galleries = null;
      /** @type {null} */
      this._pswpElement = null;
      /** @type {!Array} */
      this._listeners = [];
      this._onItemClick = this.onItemClick.bind(this);
    }
    var url = require(7918);
    var obj = require(7919);
    var opts = require(7920);
    var o = require(7921);
    var $ = require(6);
    var Session = require(7922);
    var server = require(7923);
    /** @type {function(): undefined} */
    task.exports = self;
    Object.defineProperty(self.prototype, "pswpElement", {
      get : function() {
        if (!this._pswpElement) {
          this._pswpElement = $(".pswp")[0];
        }
        if (!this._pswpElement) {
          var t = $(opts.PSWP_TEMPLATE).appendTo(".u-body");
          this._pswpElement = t[0];
        }
        return this._pswpElement;
      }
    });
    /**
     * @return {undefined}
     */
    self.prototype.init = function() {
      this.initGallery();
      this.subscribe();
      this.checkHashUrl();
    };
    /**
     * @return {undefined}
     */
    self.prototype.initGallery = function() {
      var all_events = {};
      $(opts.LIGHTBOX_SELECTOR).each(function(nodeLabelIdPrefix) {
        $(this).attr("data-pswp-uid", nodeLabelIdPrefix + 1);
      });
      $(opts.GALLERY_ITEM_SELECTOR).each(function() {
        var t = this.closest(opts.LIGHTBOX_SELECTOR);
        if (t && this !== t) {
          var id = t.getAttribute("data-pswp-uid");
          var item = all_events[id];
          if (!item) {
            item = {
              dom : t,
              items : []
            };
          }
          this.setAttribute("data-pswp-item-id", item.items.length);
          this.setAttribute("data-gallery-uid", id);
          item.items.push(this);
          all_events[id] = item;
        }
      });
      this.galleries = all_events;
    };
    /**
     * @return {undefined}
     */
    self.prototype.subscribe = function() {
      /** @type {!Array<string>} */
      var crossfilterable_layers = Object.keys(this.galleries);
      /** @type {number} */
      var layer_i = 0;
      for (; layer_i < crossfilterable_layers.length; layer_i++) {
        /** @type {string} */
        var layer = crossfilterable_layers[layer_i];
        var obj = this.galleries[layer];
        /** @type {number} */
        var i = 0;
        for (; i < obj.items.length; i++) {
          var tool = obj.items[i];
          $(tool).on("click", this._onItemClick);
        }
      }
    };
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    self.prototype.onItemClick = function(event) {
      var target = event.currentTarget;
      if (!target.matches("[data-href]")) {
        event.preventDefault();
        event.stopPropagation();
        /** @type {boolean} */
        event.returnValue = false;
        var index = target.getAttribute("data-pswp-item-id");
        var repeaterId = target.getAttribute("data-gallery-uid");
        var items = this.galleries[repeaterId];
        if (items && index >= 0) {
          this.openOnClick(index, items);
        }
      }
    };
    /**
     * @param {string} name
     * @param {!Function} fn
     * @return {undefined}
     */
    self.prototype.listen = function(name, fn) {
      this._listeners.push({
        event : name,
        func : fn
      });
    };
    /**
     * @return {undefined}
     */
    self.prototype.checkHashUrl = function() {
      var hashData = url.parseHash();
      if (hashData.pid && hashData.gid) {
        this.openFromUrl(hashData.pid, this.galleries[hashData.gid]);
      }
    };
    /**
     * @param {?} name
     * @param {!Object} args
     * @return {undefined}
     */
    self.prototype.openOnClick = function(name, args) {
      var options = args.dom.getAttribute("data-pswp-uid");
      obj.gallery(args, function(n) {
        var o = this.buildOptions(options, n);
        /** @type {number} */
        o.index = parseFloat(name);
        o.showPreviews = args.dom.classList.contains("u-product-control");
        this.showPswp(n, o);
      }, this);
    };
    /**
     * @param {?} id
     * @param {!Object} args
     * @return {undefined}
     */
    self.prototype.openFromUrl = function(id, args) {
      var path = args.dom.getAttribute("data-pswp-uid");
      obj.gallery(args, function(settings) {
        var options = this.buildOptions(path, settings);
        if (options.showAnimationDuration = 0, options.index = parseFloat(id) - 1, options.showPreviews = args.dom.classList.contains("u-product-control"), options.galleryPIDs) {
          /** @type {number} */
          var i = 0;
          for (; i < settings.length; i++) {
            if (settings[i].pid == id) {
              /** @type {number} */
              options.index = i;
              break;
            }
          }
        }
        this.showPswp(settings, options);
      }, this);
    };
    /**
     * @param {?} options
     * @param {?} opts
     * @return {undefined}
     */
    self.prototype.showPswp = function(options, opts) {
      if (Number.isFinite(opts.index)) {
        var s = new Session(this.pswpElement, server, options, opts);
        o.init(s, opts);
        this._listeners.forEach(function(self) {
          s.listen(self.event, self.func);
        });
        s.init();
      }
    };
    /**
     * @param {string} options
     * @param {!Array} o
     * @return {?}
     */
    self.prototype.buildOptions = function(options, o) {
      var e;
      return {
        galleryUID : options,
        getThumbBoundsFn : function(index) {
          /** @type {number} */
          var topMargin = window.pageYOffset || document.documentElement.scrollTop;
          var rect = o[index].el.getBoundingClientRect();
          return {
            x : rect.left,
            y : rect.top + topMargin,
            w : rect.width
          };
        },
        addCaptionHTMLFn : function(item, captionEl, isFake) {
          if (isFake) {
            return captionEl.children[0].innerHTML = "<br><br>", true;
          }
          if (!item.title) {
            return captionEl.children[0].innerHTML = "", false;
          }
          var title = item.title;
          if (item.desc) {
            /** @type {string} */
            title = title + ("<br><small>" + item.desc + "</small>");
          }
          return captionEl.children[0].innerHTML = title, true;
        },
        showHideOpacity : true,
        history : window.location === window.parent.location
      };
    };
    /** @type {function(): undefined} */
    window.Lightbox = self;
  },
  7918 : function(mixin, args, parseAsUTC) {
    var Utils;
    /**
     * @return {?}
     */
    (mixin.exports = {}).parseHash = function remove() {
      /** @type {string} */
      var menupath = window.location.hash.substring(1);
      var result = {};
      if (menupath.length < 5) {
        return result;
      }
      /** @type {!Array<string>} */
      var strCookies = menupath.split("&");
      /** @type {number} */
      var i = 0;
      for (; i < strCookies.length; i++) {
        if (strCookies[i]) {
          /** @type {!Array<string>} */
          var _arr2 = strCookies[i].split("=");
          if (!(_arr2.length < 2)) {
            /** @type {string} */
            result[_arr2[0]] = _arr2[1];
          }
        }
      }
      if (result.gid) {
        /** @type {number} */
        result.gid = parseInt(result.gid, 10);
      }
      return result;
    };
  },
  7919 : function(mixin, doPost, __webpack_require__) {
    /**
     * @param {!Object} $el
     * @return {?}
     */
    function init($el) {
      return new Promise(function(template, PL$58) {
        if ($el.is(".u-background-effect ~ .u-container-layout")) {
          init($el.prev(".u-background-effect").find(".u-background-effect-image")).then(function(listItm) {
            template(listItm);
          }, PL$58);
        } else {
          if ($el.is("img")) {
            var width = $el[0].naturalWidth || $el.attr("data-image-width") || $el.attr("imgwidth") || $el.width();
            var hour = $el[0].naturalHeight || $el.attr("data-image-height") || $el.attr("imgheight") || $el.height();
            template({
              el : $el[0],
              src : $el.attr("src"),
              msrc : $el.attr("src"),
              w : parseFloat(width),
              h : parseFloat(hour)
            });
          } else {
            if ($el.is(".u-video")) {
              template({
                el : $el[0],
                html : $el.find(".u-background-video").get(0).outerHTML
              });
            } else {
              if ($el.is(".u-gallery-item")) {
                init($el.find(".u-back-slide")).then(function(listItm) {
                  template(listItm);
                }, PL$58);
              } else {
                if ($el.is(".u-back-slide")) {
                  init($el.find(".u-back-image")).then(function(data) {
                    var dir = $el.siblings(".u-over-slide");
                    var helperLocked = $el.closest(".u-gallery").is(".u-layout-thumbnails");
                    if (dir.length && !helperLocked) {
                      data.title = dir.find(".u-gallery-heading").html();
                      data.desc = dir.find(".u-gallery-text").html();
                    }
                    template(data);
                  }, PL$58);
                } else {
                  callback($el).then(function(v) {
                    template({
                      el : $el[0],
                      src : v.src,
                      msrc : v.src,
                      w : v.width,
                      h : v.height
                    });
                  }, PL$58);
                }
              }
            }
          }
        }
      });
    }
    /**
     * @param {!Object} $element
     * @return {?}
     */
    function callback($element) {
      var s = $element.css("background-image");
      var aImages = s.match(/url\(['"]?(.+?)['"]?\)/);
      return new Promise(function(q, callback) {
        if (aImages) {
          /** @type {!Image} */
          var img = new Image;
          img.onload = q.bind(null, img);
          img.onerror = img.onabort = callback;
          img.src = aImages[1];
        } else {
          callback(new Error("Invalid source: " + s));
        }
      });
    }
    var normalize = __webpack_require__(6);
    var s;
    /**
     * @param {?} init
     * @param {!Function} validator
     * @param {string} name
     * @return {undefined}
     */
    (mixin.exports = {}).gallery = function init(init, validator, name) {
      name = name || null;
      var settingPromises = init.items.map(function(jsonDOM) {
        return init(jsonDOM = normalize(jsonDOM));
      });
      Promise.all(settingPromises).then(validator.bind(name), console.log);
    };
  },
  7920 : function(mixin, args, parseAsUTC) {
    var n = mixin.exports = {};
    /** @type {string} */
    n.LIGHTBOX_SELECTOR = ".u-lightbox";
    /** @type {string} */
    n.GALLERY_ITEM_SELECTOR = [".u-image:not(.u-carousel-thumbnail-image):not(.u-background-effect-image)", ".u-gallery-item", ".u-background-effect ~ .u-container-layout"].join(", ");
    /** @type {string} */
    n.PSWP_TEMPLATE = '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">\n' + '  <div class="pswp__bg"></div>\n' + '  <div class="pswp__scroll-wrap">\n' + '    <div class="pswp__container">\n' + '     <div class="pswp__item"></div>\n' + '     <div class="pswp__item"></div>\n' + '      <div class="pswp__item"></div>\n' + "    </div>\n" + '    <div class="pswp__ui pswp__ui--hidden">\n' + '      <div class="pswp__top-bar">\n ' + '       <div class="pswp__counter"></div>\n' + '        <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>\n' + 
    '        <button class="pswp__button pswp__button--share" title="Share"></button>\n' + '        <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>\n' + '        <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>\n' + '        <div class="pswp__preloader">\n' + '          <div class="pswp__preloader__icn">\n' + '            <div class="pswp__preloader__cut">\n' + '              <div class="pswp__preloader__donut"></div>\n' + "            </div>\n" + 
    "          </div>\n" + "        </div>\n" + "      </div>\n" + '      <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">\n' + '        <div class="pswp__share-tooltip"></div>\n' + "      </div>\n" + '      <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>\n' + '      <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>\n' + '      <div class="pswp__previews" data-previews="data-previews" style="display: none"></div>' + 
    '      <div class="pswp__caption">\n' + '        <div class="pswp__caption__center"></div>\n' + "      </div>\n" + "    </div>\n" + "  </div>\n" + "</div>";
  },
  7921 : function(module, selector, convertToImages) {
    /**
     * @param {!Object} options
     * @param {string} selector
     * @return {undefined}
     */
    function showMraidCloseButton(options, selector) {
      var t = options.scrollWrap;
      var mainNav = t.querySelector(selector);
      var i;
      /** @type {string} */
      t.querySelector(".pswp__caption").style.display = "none";
      /** @type {string} */
      mainNav.style.display = "";
    }
    /**
     * @param {!Object} options
     * @param {string} selector
     * @return {undefined}
     */
    function toggleCodeSection(options, selector) {
      var t = options.scrollWrap;
      var mainNav = t.querySelector(selector);
      var i;
      /** @type {string} */
      t.querySelector(".pswp__caption").style.display = "";
      /** @type {string} */
      mainNav.style.display = "none";
    }
    /**
     * @param {!Object} options
     * @param {string} selector
     * @return {undefined}
     */
    function add(options, selector) {
      var t = options.scrollWrap;
      var items = options.items;
      var e = t.querySelector(selector);
      items.forEach(function(item) {
        var type = item.msrc;
        /** @type {!Element} */
        var i = document.createElement("img");
        i.setAttribute("src", type);
        i.addEventListener("click", function() {
          options.goTo(items.indexOf(item));
        });
        e.appendChild(i);
      });
    }
    /**
     * @param {!Object} options
     * @param {string} nodeId
     * @return {undefined}
     */
    function remove(options, nodeId) {
      var t;
      var e;
      /** @type {string} */
      options.scrollWrap.querySelector(nodeId).innerHTML = "";
    }
    /**
     * @param {!Object} options
     * @param {string} container
     * @return {undefined}
     */
    function build(options, container) {
      var t = options.scrollWrap;
      var e;
      var error = options.currItem.msrc;
      var i;
      var n;
      t.querySelector(container).querySelectorAll("img").forEach(function(element) {
        var e;
        /** @type {string} */
        var active = "active";
        if (element.getAttribute("src") === error) {
          element.classList.add(active);
          element.scrollIntoView({
            behavior : "smooth"
          });
        } else {
          element.classList.remove(active);
        }
      });
    }
    var s;
    /**
     * @param {!Object} target
     * @param {?} o
     * @return {undefined}
     */
    module.exports.init = function init(target, o) {
      /** @type {boolean} */
      var geom = false;
      target.listen("gettingData", function() {
        if (!geom) {
          if (geom = true, o.showPreviews) {
            showMraidCloseButton(target, "[data-previews]");
          } else {
            toggleCodeSection(target, "[data-previews]");
          }
          add(target, "[data-previews]");
        }
      });
      target.listen("close", function() {
        remove(target, "[data-previews]");
      });
      target.listen("afterChange", function() {
        build(target, "[data-previews]");
      });
    };
  },
  7922 : function(root, path, e) {
    var exports;
    var Codd;
    !function(root, factory) {
      if (true) {
        !(void 0 !== (Codd = "function" == typeof(exports = factory) ? exports.call(path, e, path, root) : exports) && (root.exports = Codd));
      } else {
        if ("object" == typeof path) {
          root.exports = factory();
        } else {
          root.PhotoSwipe = factory();
        }
      }
    }(this, function() {
      /**
       * @param {!Object} template
       * @param {!Object} UiClass
       * @param {!Object} items
       * @param {!Object} options
       * @return {undefined}
       */
      var PhotoSwipe = function(template, UiClass, items, options) {
        var framework = {
          features : null,
          bind : function(target, type, listener, unbind) {
            /** @type {string} */
            var methodName = (unbind ? "remove" : "add") + "EventListener";
            type = type.split(" ");
            /** @type {number} */
            var i = 0;
            for (; i < type.length; i++) {
              if (type[i]) {
                target[methodName](type[i], listener, false);
              }
            }
          },
          isArray : function(value) {
            return value instanceof Array;
          },
          createEl : function(classes, tag) {
            /** @type {!Element} */
            var el = document.createElement(tag || "div");
            if (classes) {
              /** @type {string} */
              el.className = classes;
            }
            return el;
          },
          getScrollY : function() {
            /** @type {number} */
            var offset = window.pageYOffset;
            return void 0 !== offset ? offset : document.documentElement.scrollTop;
          },
          unbind : function(el, type, listener) {
            framework.bind(el, type, listener, true);
          },
          removeClass : function(el, className) {
            /** @type {!RegExp} */
            var regex_delimiters = new RegExp("(\\s|^)" + className + "(\\s|$)");
            el.className = el.className.replace(regex_delimiters, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
          },
          addClass : function(name, className) {
            if (!framework.hasClass(name, className)) {
              name.className += (name.className ? " " : "") + className;
            }
          },
          hasClass : function(value, className) {
            return value.className && (new RegExp("(^|\\s)" + className + "(\\s|$)")).test(value.className);
          },
          getChildByClass : function(parentEl, childClassName) {
            var node = parentEl.firstChild;
            for (; node;) {
              if (framework.hasClass(node, childClassName)) {
                return node;
              }
              node = node.nextSibling;
            }
          },
          arraySearch : function(array, value, key) {
            var i = array.length;
            for (; i--;) {
              if (array[i][key] === value) {
                return i;
              }
            }
            return -1;
          },
          extend : function(target, obj, options) {
            var name;
            for (name in obj) {
              if (obj.hasOwnProperty(name)) {
                if (options && target.hasOwnProperty(name)) {
                  continue;
                }
                target[name] = obj[name];
              }
            }
          },
          easing : {
            sine : {
              out : function(f) {
                return Math.sin(f * (Math.PI / 2));
              },
              inOut : function(t) {
                return -(Math.cos(Math.PI * t) - 1) / 2;
              }
            },
            cubic : {
              out : function(t) {
                return --t * t * t + 1;
              }
            }
          },
          detectFeatures : function() {
            if (framework.features) {
              return framework.features;
            }
            var t;
            var form = framework.createEl().style;
            /** @type {string} */
            var prefix = "";
            var features = {};
            if (features.oldIE = document.all && !document.addEventListener, features.touch = "ontouchstart" in window, window.requestAnimationFrame) {
              features.raf = window.requestAnimationFrame;
              features.caf = window.cancelAnimationFrame;
            }
            if (features.pointerEvent = !!window.PointerEvent || navigator.msPointerEnabled, !features.pointerEvent) {
              /** @type {string} */
              var ua = navigator.userAgent;
              if (/iP(hone|od)/.test(navigator.platform)) {
                /** @type {(Array<string>|null)} */
                var formValueTime = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                if (formValueTime && formValueTime.length > 0) {
                  if ((formValueTime = parseInt(formValueTime[1], 10)) >= 1 && formValueTime < 8) {
                    /** @type {boolean} */
                    features.isOldIOSPhone = true;
                  }
                }
              }
              /** @type {(Array<string>|null)} */
              var match = ua.match(/Android\s([0-9\.]*)/);
              /** @type {(number|string)} */
              var androidversion = match ? match[1] : 0;
              if ((androidversion = parseFloat(androidversion)) >= 1) {
                if (androidversion < 4.4) {
                  /** @type {boolean} */
                  features.isOldAndroid = true;
                }
                /** @type {number} */
                features.androidVersion = androidversion;
              }
              /** @type {boolean} */
              features.isMobileOpera = /opera mini|opera mobi/i.test(ua);
            }
            /** @type {!Array} */
            var styleChecks = ["transform", "perspective", "animationName"];
            /** @type {!Array} */
            var prefixes = ["", "webkit", "Moz", "ms", "O"];
            var i;
            var f;
            /** @type {number} */
            var _k = 0;
            for (; _k < 4; _k++) {
              prefix = prefixes[_k];
              /** @type {number} */
              var lookupString = 0;
              for (; lookupString < 3; lookupString++) {
                if (i = styleChecks[lookupString], f = prefix + (prefix ? i.charAt(0).toUpperCase() + i.slice(1) : i), !features[i] && f in form) {
                  features[i] = f;
                }
              }
              if (prefix && !features.raf) {
                if (prefix = prefix.toLowerCase(), features.raf = window[prefix + "RequestAnimationFrame"], features.raf) {
                  features.caf = window[prefix + "CancelAnimationFrame"] || window[prefix + "CancelRequestAnimationFrame"];
                }
              }
            }
            if (!features.raf) {
              /** @type {number} */
              var expected = 0;
              /**
               * @param {!Function} fn
               * @return {?}
               */
              features.raf = function(fn) {
                /** @type {number} */
                var msg = (new Date).getTime();
                /** @type {number} */
                var i = Math.max(0, 16 - (msg - expected));
                var fn = window.setTimeout(function() {
                  fn(msg + i);
                }, i);
                return expected = msg + i, fn;
              };
              /**
               * @param {!Object} id
               * @return {undefined}
               */
              features.caf = function(id) {
                clearTimeout(id);
              };
            }
            return features.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, framework.features = features, features;
          }
        };
        if (framework.detectFeatures(), framework.features.oldIE) {
          /**
           * @param {!Object} target
           * @param {!Object} type
           * @param {!Function} listener
           * @param {string} unbind
           * @return {?}
           */
          framework.bind = function(target, type, listener, unbind) {
            type = type.split(" ");
            /** @type {string} */
            var methodName = (unbind ? "detach" : "attach") + "Event";
            var evName;
            /**
             * @return {undefined}
             */
            var _handleEv = function() {
              listener.handleEvent.call(listener);
            };
            /** @type {number} */
            var i = 0;
            for (; i < type.length; i++) {
              if (evName = type[i]) {
                if ("object" == typeof listener && listener.handleEvent) {
                  if (!unbind) {
                    /** @type {function(): undefined} */
                    listener["oldIE" + evName] = _handleEv;
                  } else {
                    if (!listener["oldIE" + evName]) {
                      return false;
                    }
                  }
                  target[methodName]("on" + evName, listener["oldIE" + evName]);
                } else {
                  target[methodName]("on" + evName, listener);
                }
              }
            }
          };
        }
        var self = this;
        /** @type {number} */
        var o = 25;
        /** @type {number} */
        var NUM_HOLDERS = 3;
        var _options = {
          allowPanToNext : true,
          spacing : .12,
          bgOpacity : 1,
          mouseUsed : false,
          loop : true,
          pinchToClose : true,
          closeOnScroll : true,
          closeOnVerticalDrag : true,
          verticalDragRange : .75,
          hideAnimationDuration : 333,
          showAnimationDuration : 333,
          showHideOpacity : false,
          focus : true,
          escKey : true,
          arrowKeys : true,
          mainScrollEndFriction : .35,
          panEndFriction : .35,
          isClickableElement : function($target) {
            return "A" === $target.tagName;
          },
          getDoubleTapZoom : function(prepare, item) {
            if (prepare) {
              return 1;
            } else {
              return item.initialZoomLevel < .7 ? 1 : 1.33;
            }
          },
          maxSpreadZoom : 1.33,
          modal : true,
          scaleMode : "fit"
        };
        framework.extend(_options, options);
        /**
         * @return {?}
         */
        var _getZeroBounds = function() {
          return {
            x : 0,
            y : 0
          };
        };
        var hasSongChanged;
        var isReplayingSong;
        var _closedByScroll;
        var _currentItemIndex;
        var _containerStyle;
        var _containerShiftIndex;
        var offset = {
          x : 0,
          y : 0
        };
        var _startPanOffset = {
          x : 0,
          y : 0
        };
        var _panOffset = {
          x : 0,
          y : 0
        };
        var _upMoveEvents;
        var _downEvents;
        var _globalEventHandlers;
        var _viewportSize = {};
        var _currZoomLevel;
        var _startZoomLevel;
        var _translatePrefix;
        var _translateSufix;
        var initializeCheckTimer;
        var _itemsNeedUpdate;
        /** @type {number} */
        var _currPositionIndex = 0;
        var _offset = {};
        var _slideSize = {
          x : 0,
          y : 0
        };
        var _itemHolders;
        var _prevItemIndex;
        /** @type {number} */
        var _indexDiff = 0;
        var _dragStartEvent;
        var _dragMoveEvent;
        var _dragEndEvent;
        var _dragCancelEvent;
        var _transformKey;
        var _pointerEventEnabled;
        /** @type {boolean} */
        var _isFixedPosition = true;
        var _likelyTouchDevice;
        /** @type {!Array} */
        var _modules = [];
        var _requestAF;
        var _cancelAF;
        var _initalClassName;
        var _initalWindowScrollY;
        var _oldIE;
        var _currentWindowScrollY;
        var _features;
        var _windowVisibleSize = {};
        /** @type {boolean} */
        var _renderMaxResolution = false;
        var paintNodesTimeout;
        /**
         * @param {string} name
         * @param {?} module
         * @return {undefined}
         */
        var _registerModule = function(name, module) {
          framework.extend(self, module.publicMethods);
          _modules.push(name);
        };
        /**
         * @param {number} index
         * @return {?}
         */
        var _getLoopedId = function(index) {
          var numSlides = _getNumItems();
          if (index > numSlides - 1) {
            return index - numSlides;
          } else {
            if (index < 0) {
              return numSlides + index;
            }
          }
          return index;
        };
        var errors = {};
        /**
         * @param {string} name
         * @param {!Function} fn
         * @return {?}
         */
        var _listen = function(name, fn) {
          if (!errors[name]) {
            /** @type {!Array} */
            errors[name] = [];
          }
          return errors[name].push(fn);
        };
        /**
         * @param {string} name
         * @return {undefined}
         */
        var _shout = function(name) {
          var val = errors[name];
          if (val) {
            /** @type {!Array<?>} */
            var cmd_args = Array.prototype.slice.call(arguments);
            cmd_args.shift();
            /** @type {number} */
            var i = 0;
            for (; i < val.length; i++) {
              val[i].apply(self, cmd_args);
            }
          }
        };
        /**
         * @return {?}
         */
        var _getCurrentTime = function() {
          return (new Date).getTime();
        };
        /**
         * @param {number} opacity
         * @return {undefined}
         */
        var _applyBgOpacity = function(opacity) {
          /** @type {number} */
          _bgOpacity = opacity;
          /** @type {number} */
          self.bg.style.opacity = opacity * _options.bgOpacity;
        };
        /**
         * @param {!Node} styleObj
         * @param {number} x
         * @param {number} y
         * @param {number} zoom
         * @param {boolean} item
         * @return {undefined}
         */
        var _applyZoomTransform = function(styleObj, x, y, zoom, item) {
          if (!_renderMaxResolution || item && item !== self.currItem) {
            /** @type {number} */
            zoom = zoom / (item ? item.fitRatio : self.currItem.fitRatio);
          }
          /** @type {string} */
          styleObj[_transformKey] = _translatePrefix + x + "px, " + y + "px" + _translateSufix + " scale(" + zoom + ")";
        };
        /**
         * @param {boolean} allowRenderResolution
         * @return {undefined}
         */
        var _applyCurrentZoomPan = function(allowRenderResolution) {
          if (_currZoomElementStyle) {
            if (allowRenderResolution) {
              if (_currZoomLevel > self.currItem.fitRatio) {
                if (!_renderMaxResolution) {
                  _setImageSize(self.currItem, false, true);
                  /** @type {boolean} */
                  _renderMaxResolution = true;
                }
              } else {
                if (_renderMaxResolution) {
                  _setImageSize(self.currItem);
                  /** @type {boolean} */
                  _renderMaxResolution = false;
                }
              }
            }
            _applyZoomTransform(_currZoomElementStyle, _panOffset.x, _panOffset.y, _currZoomLevel);
          }
        };
        /**
         * @param {!Object} item
         * @return {undefined}
         */
        var _applyZoomPanToItem = function(item) {
          if (item.container) {
            _applyZoomTransform(item.container.style, item.initialPosition.x, item.initialPosition.y, item.initialZoomLevel, item);
          }
        };
        /**
         * @param {number} x
         * @param {!Node} elStyle
         * @return {undefined}
         */
        var _setTranslateX = function(x, elStyle) {
          elStyle[_transformKey] = _translatePrefix + x + "px, 0px" + _translateSufix;
        };
        /**
         * @param {number} x
         * @param {boolean} dragging
         * @return {undefined}
         */
        var _moveMainScroll = function(x, dragging) {
          if (!_options.loop && dragging) {
            var newSlideIndexOffset = _currentItemIndex + (_slideSize.x * _currPositionIndex - x) / _slideSize.x;
            /** @type {number} */
            var delta = Math.round(x - _mainScrollPos.x);
            if (newSlideIndexOffset < 0 && delta > 0 || newSlideIndexOffset >= _getNumItems() - 1 && delta < 0) {
              /** @type {number} */
              x = _mainScrollPos.x + delta * _options.mainScrollEndFriction;
            }
          }
          /** @type {number} */
          _mainScrollPos.x = x;
          _setTranslateX(x, _containerStyle);
        };
        /**
         * @param {string} axis
         * @param {number} zoomLevel
         * @return {?}
         */
        var _calculatePanOffset = function(axis, zoomLevel) {
          /** @type {number} */
          var m = edge[axis] - _offset[axis];
          return _startPanOffset[axis] + offset[axis] + m - m * (zoomLevel / _startZoomLevel);
        };
        /**
         * @param {!Object} p1
         * @param {!Object} p2
         * @return {undefined}
         */
        var _equalizePoints = function(p1, p2) {
          if (p1.x = p2.x, p1.y = p2.y, p2.id) {
            p1.id = p2.id;
          }
        };
        /**
         * @param {!Object} p
         * @return {undefined}
         */
        var _roundPoint = function(p) {
          /** @type {number} */
          p.x = Math.round(p.x);
          /** @type {number} */
          p.y = Math.round(p.y);
        };
        /** @type {null} */
        var k2pdfoptTestTimeout = null;
        /**
         * @return {undefined}
         */
        var _onFirstMouseMove = function() {
          if (k2pdfoptTestTimeout) {
            framework.unbind(document, "mousemove", _onFirstMouseMove);
            framework.addClass(template, "pswp--has_mouse");
            /** @type {boolean} */
            _options.mouseUsed = true;
            _shout("mouseUsed");
          }
          /** @type {number} */
          k2pdfoptTestTimeout = setTimeout(function() {
            /** @type {null} */
            k2pdfoptTestTimeout = null;
          }, 100);
        };
        /**
         * @return {undefined}
         */
        var _bindEvents = function() {
          if (framework.bind(document, "keydown", self), _features.transform) {
            framework.bind(self.scrollWrap, "click", self);
          }
          if (!_options.mouseUsed) {
            framework.bind(document, "mousemove", _onFirstMouseMove);
          }
          framework.bind(window, "resize scroll orientationchange", self);
          _shout("bindEvents");
        };
        /**
         * @return {undefined}
         */
        var _unbindEvents = function() {
          if (framework.unbind(window, "resize scroll orientationchange", self), framework.unbind(window, "scroll", _globalEventHandlers.scroll), framework.unbind(document, "keydown", self), framework.unbind(document, "mousemove", _onFirstMouseMove), _features.transform) {
            framework.unbind(self.scrollWrap, "click", self);
          }
          if (_isDragging) {
            framework.unbind(window, _upMoveEvents, self);
          }
          clearTimeout(paintNodesTimeout);
          _shout("unbindEvents");
        };
        /**
         * @param {number} zoomLevel
         * @param {boolean} update
         * @return {?}
         */
        var _calculatePanBounds = function(zoomLevel, update) {
          var bounds = _calculateItemSize(self.currItem, _viewportSize, zoomLevel);
          if (update) {
            _currPanBounds = bounds;
          }
          return bounds;
        };
        /**
         * @param {?} item
         * @return {?}
         */
        var _getMinZoomLevel = function(item) {
          if (!item) {
            item = self.currItem;
          }
          return item.initialZoomLevel;
        };
        /**
         * @param {!Object} item
         * @return {?}
         */
        var _getMaxZoomLevel = function(item) {
          if (!item) {
            item = self.currItem;
          }
          return item.w > 0 ? _options.maxSpreadZoom : 1;
        };
        /**
         * @param {string} axis
         * @param {!Object} destPanBounds
         * @param {!Object} destPanOffset
         * @param {number} destZoomLevel
         * @return {?}
         */
        var _modifyDestPanOffset = function(axis, destPanBounds, destPanOffset, destZoomLevel) {
          if (destZoomLevel === self.currItem.initialZoomLevel) {
            return destPanOffset[axis] = self.currItem.initialPosition[axis], true;
          } else {
            if (destPanOffset[axis] = _calculatePanOffset(axis, destZoomLevel), destPanOffset[axis] > destPanBounds.min[axis]) {
              return destPanOffset[axis] = destPanBounds.min[axis], true;
            } else {
              if (destPanOffset[axis] < destPanBounds.max[axis]) {
                return destPanOffset[axis] = destPanBounds.max[axis], true;
              }
            }
          }
          return false;
        };
        /**
         * @return {?}
         */
        var _setupTransforms = function() {
          if (_transformKey) {
            var has3d = _features.perspective && !_likelyTouchDevice;
            return _translatePrefix = "translate" + (has3d ? "3d(" : "("), _translateSufix = _features.perspective ? ", 0px)" : ")", void 0;
          }
          /** @type {string} */
          _transformKey = "left";
          framework.addClass(template, "pswp--ie");
          /**
           * @param {number} x
           * @param {!Object} elStyle
           * @return {undefined}
           */
          _setTranslateX = function(x, elStyle) {
            /** @type {string} */
            elStyle.left = x + "px";
          };
          /**
           * @param {!Object} item
           * @return {undefined}
           */
          _applyZoomPanToItem = function(item) {
            var zoomRatio = item.fitRatio > 1 ? 1 : item.fitRatio;
            var s = item.container.style;
            /** @type {number} */
            var w = zoomRatio * item.w;
            /** @type {number} */
            var h = zoomRatio * item.h;
            /** @type {string} */
            s.width = w + "px";
            /** @type {string} */
            s.height = h + "px";
            /** @type {string} */
            s.left = item.initialPosition.x + "px";
            /** @type {string} */
            s.top = item.initialPosition.y + "px";
          };
          /**
           * @return {undefined}
           */
          _applyCurrentZoomPan = function() {
            if (_currZoomElementStyle) {
              var s = _currZoomElementStyle;
              var item = self.currItem;
              var zoomRatio = item.fitRatio > 1 ? 1 : item.fitRatio;
              /** @type {number} */
              var w = zoomRatio * item.w;
              /** @type {number} */
              var h = zoomRatio * item.h;
              /** @type {string} */
              s.width = w + "px";
              /** @type {string} */
              s.height = h + "px";
              /** @type {string} */
              s.left = _panOffset.x + "px";
              /** @type {string} */
              s.top = _panOffset.y + "px";
            }
          };
        };
        /**
         * @param {!Event} event
         * @return {undefined}
         */
        var _onKeyDown = function(event) {
          /** @type {string} */
          var action = "";
          if (_options.escKey && 27 === event.keyCode) {
            /** @type {string} */
            action = "close";
          } else {
            if (_options.arrowKeys) {
              if (37 === event.keyCode) {
                /** @type {string} */
                action = "prev";
              } else {
                if (39 === event.keyCode) {
                  /** @type {string} */
                  action = "next";
                }
              }
            }
          }
          if (action) {
            if (!(event.ctrlKey || event.altKey || event.shiftKey || event.metaKey)) {
              if (event.preventDefault) {
                event.preventDefault();
              } else {
                /** @type {boolean} */
                event.returnValue = false;
              }
              self[action]();
            }
          }
        };
        /**
         * @param {!Object} e
         * @return {undefined}
         */
        var _onGlobalClick = function(e) {
          if (e) {
            if (_moved || _zoomStarted || _mainScrollAnimating || _verticalDragInitiated) {
              e.preventDefault();
              e.stopPropagation();
            }
          }
        };
        /**
         * @return {undefined}
         */
        var _updatePageScrollOffset = function() {
          self.setScrollOffset(0, framework.getScrollY());
        };
        var _animations = {};
        /** @type {number} */
        var _numAnimations = 0;
        /**
         * @param {string} name
         * @return {undefined}
         */
        var _stopAnimation = function(name) {
          if (_animations[name]) {
            if (_animations[name].raf) {
              _cancelAF(_animations[name].raf);
            }
            _numAnimations--;
            delete _animations[name];
          }
        };
        /**
         * @param {string} name
         * @return {undefined}
         */
        var _registerStartAnimation = function(name) {
          if (_animations[name]) {
            _stopAnimation(name);
          }
          if (!_animations[name]) {
            _numAnimations++;
            _animations[name] = {};
          }
        };
        /**
         * @return {undefined}
         */
        var _stopAllAnimations = function() {
          var prop;
          for (prop in _animations) {
            if (_animations.hasOwnProperty(prop)) {
              _stopAnimation(prop);
            }
          }
        };
        /**
         * @param {string} name
         * @param {number} b
         * @param {number} endProp
         * @param {number} d
         * @param {!Function} easingFn
         * @param {!Function} onUpdate
         * @param {!Function} onComplete
         * @return {undefined}
         */
        var _animateProp = function(name, b, endProp, d, easingFn, onUpdate, onComplete) {
          var startAnimTime = _getCurrentTime();
          var t;
          _registerStartAnimation(name);
          /**
           * @return {undefined}
           */
          var animloop = function() {
            if (_animations[name]) {
              if ((t = _getCurrentTime() - startAnimTime) >= d) {
                if (_stopAnimation(name), onUpdate(endProp), onComplete) {
                  onComplete();
                }
                return;
              }
              onUpdate((endProp - b) * easingFn(t / d) + b);
              _animations[name].raf = _requestAF(animloop);
            }
          };
          animloop();
        };
        var publicMethods = {
          shout : _shout,
          listen : _listen,
          viewportSize : _viewportSize,
          options : _options,
          isMainScrollAnimating : function() {
            return _mainScrollAnimating;
          },
          getZoomLevel : function() {
            return _currZoomLevel;
          },
          getCurrentIndex : function() {
            return _currentItemIndex;
          },
          isDragging : function() {
            return _isDragging;
          },
          isZooming : function() {
            return _isZooming;
          },
          setScrollOffset : function(x, y) {
            /** @type {!Object} */
            _offset.x = x;
            _currentWindowScrollY = _offset.y = y;
            _shout("updateScrollOffset", _offset);
          },
          applyZoomPan : function(zoomLevel, panX, panY, allowRenderResolution) {
            /** @type {number} */
            _panOffset.x = panX;
            /** @type {number} */
            _panOffset.y = panY;
            /** @type {number} */
            _currZoomLevel = zoomLevel;
            _applyCurrentZoomPan(allowRenderResolution);
          },
          init : function() {
            if (!hasSongChanged && !isReplayingSong) {
              var i;
              self.framework = framework;
              /** @type {!Object} */
              self.template = template;
              self.bg = framework.getChildByClass(template, "pswp__bg");
              _initalClassName = template.className;
              /** @type {boolean} */
              hasSongChanged = true;
              _features = framework.detectFeatures();
              _requestAF = _features.raf;
              _cancelAF = _features.caf;
              _transformKey = _features.transform;
              _oldIE = _features.oldIE;
              self.scrollWrap = framework.getChildByClass(template, "pswp__scroll-wrap");
              self.container = framework.getChildByClass(self.scrollWrap, "pswp__container");
              _containerStyle = self.container.style;
              /** @type {!Array} */
              self.itemHolders = _itemHolders = [{
                el : self.container.children[0],
                wrap : 0,
                index : -1
              }, {
                el : self.container.children[1],
                wrap : 0,
                index : -1
              }, {
                el : self.container.children[2],
                wrap : 0,
                index : -1
              }];
              /** @type {string} */
              _itemHolders[0].el.style.display = _itemHolders[2].el.style.display = "none";
              _setupTransforms();
              _globalEventHandlers = {
                resize : self.updateSize,
                orientationchange : function() {
                  clearTimeout(paintNodesTimeout);
                  /** @type {number} */
                  paintNodesTimeout = setTimeout(function() {
                    if (_viewportSize.x !== self.scrollWrap.clientWidth) {
                      self.updateSize();
                    }
                  }, 500);
                },
                scroll : _updatePageScrollOffset,
                keydown : _onKeyDown,
                click : _onGlobalClick
              };
              var o = _features.isOldIOSPhone || _features.isOldAndroid || _features.isMobileOpera;
              if (!_features.animationName || !_features.transform || o) {
                /** @type {number} */
                _options.showAnimationDuration = _options.hideAnimationDuration = 0;
              }
              /** @type {number} */
              i = 0;
              for (; i < _modules.length; i++) {
                self["init" + _modules[i]]();
              }
              if (UiClass) {
                var l;
                (self.ui = new UiClass(self, framework)).init();
              }
              if (_shout("firstUpdate"), _currentItemIndex = _currentItemIndex || _options.index || 0, isNaN(_currentItemIndex) || _currentItemIndex < 0 || _currentItemIndex >= _getNumItems()) {
                /** @type {number} */
                _currentItemIndex = 0;
              }
              if (self.currItem = _getItemAt(_currentItemIndex), _features.isOldIOSPhone || _features.isOldAndroid) {
                /** @type {boolean} */
                _isFixedPosition = false;
              }
              if (template.setAttribute("aria-hidden", "false"), _options.modal) {
                if (!_isFixedPosition) {
                  /** @type {string} */
                  template.style.position = "absolute";
                  /** @type {string} */
                  template.style.top = framework.getScrollY() + "px";
                } else {
                  /** @type {string} */
                  template.style.position = "fixed";
                }
              }
              if (void 0 === _currentWindowScrollY) {
                _shout("initialLayout");
                _currentWindowScrollY = _initalWindowScrollY = framework.getScrollY();
              }
              /** @type {string} */
              var rootClasses = "pswp--open ";
              if (_options.mainClass) {
                /** @type {string} */
                rootClasses = rootClasses + (_options.mainClass + " ");
              }
              if (_options.showHideOpacity) {
                /** @type {string} */
                rootClasses = rootClasses + "pswp--animate_opacity ";
              }
              /** @type {string} */
              rootClasses = rootClasses + (_likelyTouchDevice ? "pswp--touch" : "pswp--notouch");
              /** @type {string} */
              rootClasses = rootClasses + (_features.animationName ? " pswp--css_animation" : "");
              /** @type {string} */
              rootClasses = rootClasses + (_features.svg ? " pswp--svg" : "");
              framework.addClass(template, rootClasses);
              self.updateSize();
              /** @type {number} */
              _containerShiftIndex = -1;
              /** @type {null} */
              _indexDiff = null;
              /** @type {number} */
              i = 0;
              for (; i < NUM_HOLDERS; i++) {
                _setTranslateX((i + _containerShiftIndex) * _slideSize.x, _itemHolders[i].el.style);
              }
              if (!_oldIE) {
                framework.bind(self.scrollWrap, _downEvents, self);
              }
              if (_listen("initialZoomInEnd", function() {
                if (self.setContent(_itemHolders[0], _currentItemIndex - 1), self.setContent(_itemHolders[2], _currentItemIndex + 1), _itemHolders[0].el.style.display = _itemHolders[2].el.style.display = "block", _options.focus) {
                  template.focus();
                }
                _bindEvents();
              }), self.setContent(_itemHolders[1], _currentItemIndex), self.updateCurrItem(), _shout("afterInit"), !_isFixedPosition) {
                /** @type {number} */
                initializeCheckTimer = setInterval(function() {
                  if (!_numAnimations && !_isDragging && !_isZooming && _currZoomLevel === self.currItem.initialZoomLevel) {
                    self.updateSize();
                  }
                }, 1E3);
              }
              framework.addClass(template, "pswp--visible");
            }
          },
          close : function() {
            if (hasSongChanged) {
              /** @type {boolean} */
              hasSongChanged = false;
              /** @type {boolean} */
              isReplayingSong = true;
              _shout("close");
              _unbindEvents();
              _showOrHide(self.currItem, null, true, self.destroy);
            }
          },
          destroy : function() {
            if (_shout("destroy"), _showOrHideTimeout) {
              clearTimeout(_showOrHideTimeout);
            }
            if (template.setAttribute("aria-hidden", "true"), template.className = _initalClassName, initializeCheckTimer) {
              clearInterval(initializeCheckTimer);
            }
            framework.unbind(self.scrollWrap, _downEvents, self);
            framework.unbind(window, "scroll", self);
            _stopDragUpdateLoop();
            _stopAllAnimations();
            /** @type {null} */
            errors = null;
          },
          panTo : function(x, y, lonlat) {
            if (!lonlat) {
              if (x > _currPanBounds.min.x) {
                x = _currPanBounds.min.x;
              } else {
                if (x < _currPanBounds.max.x) {
                  x = _currPanBounds.max.x;
                }
              }
              if (y > _currPanBounds.min.y) {
                y = _currPanBounds.min.y;
              } else {
                if (y < _currPanBounds.max.y) {
                  y = _currPanBounds.max.y;
                }
              }
            }
            /** @type {!Object} */
            _panOffset.x = x;
            /** @type {number} */
            _panOffset.y = y;
            _applyCurrentZoomPan();
          },
          handleEvent : function(e) {
            if (e = e || window.event, _globalEventHandlers[e.type]) {
              _globalEventHandlers[e.type](e);
            }
          },
          goTo : function(index) {
            /** @type {number} */
            var diff = (index = _getLoopedId(index)) - _currentItemIndex;
            /** @type {number} */
            _indexDiff = diff;
            /** @type {number} */
            _currentItemIndex = index;
            self.currItem = _getItemAt(_currentItemIndex);
            /** @type {number} */
            _currPositionIndex = _currPositionIndex - diff;
            _moveMainScroll(_slideSize.x * _currPositionIndex);
            _stopAllAnimations();
            /** @type {boolean} */
            _mainScrollAnimating = false;
            self.updateCurrItem();
          },
          next : function() {
            self.goTo(_currentItemIndex + 1);
          },
          prev : function() {
            self.goTo(_currentItemIndex - 1);
          },
          updateCurrZoomItem : function(emulateSetContent) {
            if (emulateSetContent) {
              _shout("beforeChange", 0);
            }
            if (_itemHolders[1].el.children.length) {
              var zoomElement = _itemHolders[1].el.children[0];
              if (framework.hasClass(zoomElement, "pswp__zoom-wrap")) {
                _currZoomElementStyle = zoomElement.style;
              } else {
                /** @type {null} */
                _currZoomElementStyle = null;
              }
            } else {
              /** @type {null} */
              _currZoomElementStyle = null;
            }
            if (_currPanBounds = self.currItem.bounds, _startZoomLevel = _currZoomLevel = self.currItem.initialZoomLevel, _panOffset.x = _currPanBounds.center.x, _panOffset.y = _currPanBounds.center.y, emulateSetContent) {
              _shout("afterChange");
            }
          },
          invalidateCurrItems : function() {
            /** @type {boolean} */
            _itemsNeedUpdate = true;
            /** @type {number} */
            var i = 0;
            for (; i < NUM_HOLDERS; i++) {
              if (_itemHolders[i].item) {
                /** @type {boolean} */
                _itemHolders[i].item.needsUpdate = true;
              }
            }
          },
          updateCurrItem : function(beforeAnimation) {
            if (0 !== _indexDiff) {
              /** @type {number} */
              var diffAbs = Math.abs(_indexDiff);
              var tempHolder;
              if (!(beforeAnimation && diffAbs < 2)) {
                if (self.currItem = _getItemAt(_currentItemIndex), _renderMaxResolution = false, _shout("beforeChange", _indexDiff), diffAbs >= NUM_HOLDERS) {
                  _containerShiftIndex = _containerShiftIndex + (_indexDiff + (_indexDiff > 0 ? -NUM_HOLDERS : NUM_HOLDERS));
                  /** @type {number} */
                  diffAbs = NUM_HOLDERS;
                }
                /** @type {number} */
                var i = 0;
                for (; i < diffAbs; i++) {
                  if (_indexDiff > 0) {
                    tempHolder = _itemHolders.shift();
                    _itemHolders[NUM_HOLDERS - 1] = tempHolder;
                    _containerShiftIndex++;
                    _setTranslateX((_containerShiftIndex + 2) * _slideSize.x, tempHolder.el.style);
                    self.setContent(tempHolder, _currentItemIndex - diffAbs + i + 1 + 1);
                  } else {
                    tempHolder = _itemHolders.pop();
                    _itemHolders.unshift(tempHolder);
                    _containerShiftIndex--;
                    _setTranslateX(_containerShiftIndex * _slideSize.x, tempHolder.el.style);
                    self.setContent(tempHolder, _currentItemIndex + diffAbs - i - 1 - 1);
                  }
                }
                if (_currZoomElementStyle && 1 === Math.abs(_indexDiff)) {
                  var prevItem = _getItemAt(_prevItemIndex);
                  if (prevItem.initialZoomLevel !== _currZoomLevel) {
                    _calculateItemSize(prevItem, _viewportSize);
                    _setImageSize(prevItem);
                    _applyZoomPanToItem(prevItem);
                  }
                }
                /** @type {number} */
                _indexDiff = 0;
                self.updateCurrZoomItem();
                _prevItemIndex = _currentItemIndex;
                _shout("afterChange");
              }
            }
          },
          updateSize : function(callback) {
            if (!_isFixedPosition && _options.modal) {
              var windowScrollY = framework.getScrollY();
              if (_currentWindowScrollY !== windowScrollY) {
                /** @type {string} */
                template.style.top = windowScrollY + "px";
                _currentWindowScrollY = windowScrollY;
              }
              if (!callback && _windowVisibleSize.x === window.innerWidth && _windowVisibleSize.y === window.innerHeight) {
                return;
              }
              _windowVisibleSize.x = window.innerWidth;
              /** @type {number} */
              _windowVisibleSize.y = window.innerHeight;
              /** @type {string} */
              template.style.height = _windowVisibleSize.y + "px";
            }
            if (_viewportSize.x = self.scrollWrap.clientWidth, _viewportSize.y = self.scrollWrap.clientHeight, _updatePageScrollOffset(), _slideSize.x = _viewportSize.x + Math.round(_viewportSize.x * _options.spacing), _slideSize.y = _viewportSize.y, _moveMainScroll(_slideSize.x * _currPositionIndex), _shout("beforeResize"), void 0 !== _containerShiftIndex) {
              var holder;
              var item;
              var hIndex;
              /** @type {number} */
              var i = 0;
              for (; i < NUM_HOLDERS; i++) {
                if (holder = _itemHolders[i], _setTranslateX((i + _containerShiftIndex) * _slideSize.x, holder.el.style), hIndex = _currentItemIndex + i - 1, _options.loop && _getNumItems() > 2) {
                  hIndex = _getLoopedId(hIndex);
                }
                if ((item = _getItemAt(hIndex)) && (_itemsNeedUpdate || item.needsUpdate || !item.bounds)) {
                  if (self.cleanSlide(item), self.setContent(holder, hIndex), 1 === i) {
                    self.currItem = item;
                    self.updateCurrZoomItem(true);
                  }
                  /** @type {boolean} */
                  item.needsUpdate = false;
                } else {
                  if (-1 === holder.index && hIndex >= 0) {
                    self.setContent(holder, hIndex);
                  }
                }
                if (item && item.container) {
                  _calculateItemSize(item, _viewportSize);
                  _setImageSize(item);
                  _applyZoomPanToItem(item);
                }
              }
              /** @type {boolean} */
              _itemsNeedUpdate = false;
            }
            if (_startZoomLevel = _currZoomLevel = self.currItem.initialZoomLevel, _currPanBounds = self.currItem.bounds) {
              _panOffset.x = _currPanBounds.center.x;
              _panOffset.y = _currPanBounds.center.y;
              _applyCurrentZoomPan(true);
            }
            _shout("resize");
          },
          zoomTo : function(destZoomLevel, value, duration, easingFn, updateFn) {
            if (value) {
              _startZoomLevel = _currZoomLevel;
              /** @type {number} */
              edge.x = Math.abs(value.x) - _panOffset.x;
              /** @type {number} */
              edge.y = Math.abs(value.y) - _panOffset.y;
              _equalizePoints(_startPanOffset, _panOffset);
            }
            var destPanBounds = _calculatePanBounds(destZoomLevel, false);
            var destPanOffset = {};
            _modifyDestPanOffset("x", destPanBounds, destPanOffset, destZoomLevel);
            _modifyDestPanOffset("y", destPanBounds, destPanOffset, destZoomLevel);
            var initialZoomLevel = _currZoomLevel;
            var dx = _panOffset.x;
            var initalPanY = _panOffset.y;
            _roundPoint(destPanOffset);
            /**
             * @param {number} now
             * @return {undefined}
             */
            var onUpdate = function(now) {
              if (1 === now) {
                /** @type {number} */
                _currZoomLevel = destZoomLevel;
                _panOffset.x = destPanOffset.x;
                _panOffset.y = destPanOffset.y;
              } else {
                _currZoomLevel = (destZoomLevel - initialZoomLevel) * now + initialZoomLevel;
                _panOffset.x = (destPanOffset.x - dx) * now + dx;
                _panOffset.y = (destPanOffset.y - initalPanY) * now + initalPanY;
              }
              if (updateFn) {
                updateFn(now);
              }
              _applyCurrentZoomPan(1 === now);
            };
            if (duration) {
              _animateProp("customZoomTo", 0, 1, duration, easingFn || framework.easing.sine.inOut, onUpdate);
            } else {
              onUpdate(1);
            }
          }
        };
        /** @type {number} */
        var MIN_SWIPE_DISTANCE = 30;
        /** @type {number} */
        var end = 10;
        var _gestureStartTime;
        var _gestureCheckSpeedTime;
        var p = {};
        var p2 = {};
        var delta = {};
        var _currPoint = {};
        var _startPoint = {};
        /** @type {!Array} */
        var _currPointers = [];
        var _startMainScrollPos = {};
        var _releaseAnimData;
        /** @type {!Array} */
        var lines = [];
        var _tempPoint = {};
        var _isZoomingIn;
        var _verticalDragInitiated;
        var _takingTooLongTimeout;
        /** @type {number} */
        var _currZoomedItemIndex = 0;
        var _centerPoint = {
          x : 0,
          y : 0
        };
        /** @type {number} */
        var startAnimTime = 0;
        var _isDragging;
        var _isMultitouch;
        var _zoomStarted;
        var _moved;
        var _dragAnimFrame;
        var _mainScrollShifted;
        var _currentPoints;
        var _isZooming;
        var _currPointsDistance;
        var _startPointsDistance;
        var _currPanBounds;
        var _mainScrollPos = {
          x : 0,
          y : 0
        };
        var _currZoomElementStyle;
        var _mainScrollAnimating;
        var edge = {
          x : 0,
          y : 0
        };
        var _currCenterPoint = {
          x : 0,
          y : 0
        };
        var _direction;
        var _isFirstMove;
        var _opacityChanged;
        var _bgOpacity;
        var _wasOverInitialZoom;
        /**
         * @param {!Object} p1
         * @param {!Object} p2
         * @return {?}
         */
        var _isEqualPoints = function(p1, p2) {
          return p1.x === p2.x && p1.y === p2.y;
        };
        /**
         * @param {!Object} touch0
         * @param {!Object} touch1
         * @return {?}
         */
        var _isNearbyPoints = function(touch0, touch1) {
          return Math.abs(touch0.x - touch1.x) < o && Math.abs(touch0.y - touch1.y) < o;
        };
        /**
         * @param {!Object} p1
         * @param {!Object} p2
         * @return {?}
         */
        var _calculatePointsDistance = function(p1, p2) {
          return _tempPoint.x = Math.abs(p1.x - p2.x), _tempPoint.y = Math.abs(p1.y - p2.y), Math.sqrt(_tempPoint.x * _tempPoint.x + _tempPoint.y * _tempPoint.y);
        };
        /**
         * @return {undefined}
         */
        var _stopDragUpdateLoop = function() {
          if (_dragAnimFrame) {
            _cancelAF(_dragAnimFrame);
            /** @type {null} */
            _dragAnimFrame = null;
          }
        };
        /**
         * @return {undefined}
         */
        var _dragUpdateLoop = function() {
          if (_isDragging) {
            _dragAnimFrame = _requestAF(_dragUpdateLoop);
            _renderMovement();
          }
        };
        /**
         * @return {?}
         */
        var _canPan = function() {
          return !("fit" === _options.scaleMode && _currZoomLevel === self.currItem.initialZoomLevel);
        };
        /**
         * @param {!Object} el
         * @param {!Function} fn
         * @return {?}
         */
        var _closestElement = function(el, fn) {
          if (!el || el === document) {
            return false;
          }
          if (el.getAttribute("class") && el.getAttribute("class").indexOf("pswp__scroll-wrap") > -1) {
            return false;
          }
          if (fn(el)) {
            return el;
          } else {
            return _closestElement(el.parentNode, fn);
          }
        };
        var _preventObj = {};
        /**
         * @param {!Object} e
         * @param {boolean} isDown
         * @return {?}
         */
        var _preventDefaultEventBehaviour = function(e, isDown) {
          return _preventObj.prevent = !_closestElement(e.target, _options.isClickableElement), _shout("preventDragEvent", e, isDown, _preventObj), _preventObj.prevent;
        };
        /**
         * @param {!Object} touch
         * @param {!Object} event
         * @return {?}
         */
        var render = function(touch, event) {
          return event.x = touch.pageX, event.y = touch.pageY, event.id = touch.identifier, event;
        };
        /**
         * @param {!Object} p1
         * @param {!Object} p2
         * @param {!Object} pCenter
         * @return {undefined}
         */
        var _findCenterOfPoints = function(p1, p2, pCenter) {
          /** @type {number} */
          pCenter.x = .5 * (p1.x + p2.x);
          /** @type {number} */
          pCenter.y = .5 * (p1.y + p2.y);
        };
        /**
         * @param {?} time
         * @param {number} x
         * @param {number} y
         * @return {undefined}
         */
        var _pushPosPoint = function(time, x, y) {
          if (time - _gestureCheckSpeedTime > 50) {
            var start = lines.length > 2 ? lines.shift() : {};
            /** @type {number} */
            start.x = x;
            /** @type {number} */
            start.y = y;
            lines.push(start);
            _gestureCheckSpeedTime = time;
          }
        };
        /**
         * @return {?}
         */
        var _calculateVerticalDragOpacityRatio = function() {
          /** @type {number} */
          var avgda = _panOffset.y - self.currItem.initialPosition.y;
          return 1 - Math.abs(avgda / (_viewportSize.y / 2));
        };
        var data = {};
        var values = {};
        /** @type {!Array} */
        var ret = [];
        var Ge;
        /**
         * @param {!Object} e
         * @return {?}
         */
        var _getTouchPoints = function(e) {
          for (; ret.length > 0;) {
            ret.pop();
          }
          if (!_pointerEventEnabled) {
            if (e.type.indexOf("touch") > -1) {
              if (e.touches && e.touches.length > 0) {
                if (ret[0] = render(e.touches[0], data), e.touches.length > 1) {
                  ret[1] = render(e.touches[1], values);
                }
              }
            } else {
              data.x = e.pageX;
              data.y = e.pageY;
              /** @type {string} */
              data.id = "";
              ret[0] = data;
            }
          } else {
            /** @type {number} */
            Ge = 0;
            _currPointers.forEach(function(value) {
              if (0 === Ge) {
                ret[0] = value;
              } else {
                if (1 === Ge) {
                  ret[1] = value;
                }
              }
              Ge++;
            });
          }
          return ret;
        };
        /**
         * @param {string} axis
         * @param {!Object} delta
         * @return {?}
         */
        var _panOrMoveMainScroll = function(axis, delta) {
          var panFriction;
          /** @type {number} */
          var overDiff = 0;
          var newOffset = _panOffset[axis] + delta[axis];
          var startOverDiff;
          /** @type {boolean} */
          var u = delta[axis] > 0;
          var newMainScrollPosition = _mainScrollPos.x + delta.x;
          /** @type {number} */
          var mainScrollDiff = _mainScrollPos.x - _startMainScrollPos.x;
          var newPanPos;
          var newMainScrollPos;
          if (newOffset > _currPanBounds.min[axis] || newOffset < _currPanBounds.max[axis]) {
            /** @type {number} */
            panFriction = _options.panEndFriction;
          } else {
            /** @type {number} */
            panFriction = 1;
          }
          if (newOffset = _panOffset[axis] + delta[axis] * panFriction, _options.allowPanToNext || _currZoomLevel === self.currItem.initialZoomLevel) {
            if (!_currZoomElementStyle) {
              newMainScrollPos = newMainScrollPosition;
            } else {
              if ("h" === _direction && "x" === axis && !_zoomStarted) {
                if (u) {
                  if (newOffset > _currPanBounds.min[axis]) {
                    /** @type {number} */
                    panFriction = _options.panEndFriction;
                    /** @type {number} */
                    overDiff = _currPanBounds.min[axis] - newOffset;
                    /** @type {number} */
                    startOverDiff = _currPanBounds.min[axis] - _startPanOffset[axis];
                  }
                  if ((startOverDiff <= 0 || mainScrollDiff < 0) && _getNumItems() > 1) {
                    if (newMainScrollPos = newMainScrollPosition, mainScrollDiff < 0 && newMainScrollPosition > _startMainScrollPos.x) {
                      newMainScrollPos = _startMainScrollPos.x;
                    }
                  } else {
                    if (_currPanBounds.min.x !== _currPanBounds.max.x) {
                      newPanPos = newOffset;
                    }
                  }
                } else {
                  if (newOffset < _currPanBounds.max[axis]) {
                    /** @type {number} */
                    panFriction = _options.panEndFriction;
                    /** @type {number} */
                    overDiff = newOffset - _currPanBounds.max[axis];
                    /** @type {number} */
                    startOverDiff = _startPanOffset[axis] - _currPanBounds.max[axis];
                  }
                  if ((startOverDiff <= 0 || mainScrollDiff > 0) && _getNumItems() > 1) {
                    if (newMainScrollPos = newMainScrollPosition, mainScrollDiff > 0 && newMainScrollPosition < _startMainScrollPos.x) {
                      newMainScrollPos = _startMainScrollPos.x;
                    }
                  } else {
                    if (_currPanBounds.min.x !== _currPanBounds.max.x) {
                      newPanPos = newOffset;
                    }
                  }
                }
              }
            }
            if ("x" === axis) {
              if (void 0 !== newMainScrollPos) {
                if (_moveMainScroll(newMainScrollPos, true), newMainScrollPos === _startMainScrollPos.x) {
                  /** @type {boolean} */
                  _mainScrollShifted = false;
                } else {
                  /** @type {boolean} */
                  _mainScrollShifted = true;
                }
              }
              if (_currPanBounds.min.x !== _currPanBounds.max.x) {
                if (void 0 !== newPanPos) {
                  _panOffset.x = newPanPos;
                } else {
                  if (!_mainScrollShifted) {
                    _panOffset.x += delta.x * panFriction;
                  }
                }
              }
              return void 0 !== newMainScrollPos;
            }
          }
          if (!_mainScrollAnimating) {
            if (!_mainScrollShifted) {
              if (_currZoomLevel > self.currItem.fitRatio) {
                _panOffset[axis] += delta[axis] * panFriction;
              }
            }
          }
        };
        /**
         * @param {!Object} e
         * @return {?}
         */
        var _onDragStart = function(e) {
          if (!("mousedown" === e.type && e.button > 0)) {
            if (_initialZoomRunning) {
              return e.preventDefault(), void 0;
            }
            if (!_takingTooLongTimeout || "mousedown" !== e.type) {
              if (_preventDefaultEventBehaviour(e, true)) {
                e.preventDefault();
              }
              if (_shout("pointerDown"), _pointerEventEnabled) {
                var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, "id");
                if (pointerIndex < 0) {
                  /** @type {number} */
                  pointerIndex = _currPointers.length;
                }
                _currPointers[pointerIndex] = {
                  x : e.pageX,
                  y : e.pageY,
                  id : e.pointerId
                };
              }
              var startPointsList = _getTouchPoints(e);
              var numPoints = startPointsList.length;
              if (_currentPoints = null, _stopAllAnimations(), !_isDragging || 1 === numPoints) {
                /** @type {boolean} */
                _isDragging = _isFirstMove = true;
                framework.bind(window, _upMoveEvents, self);
                /** @type {boolean} */
                _isZoomingIn = _wasOverInitialZoom = _opacityChanged = _verticalDragInitiated = _mainScrollShifted = _moved = _isMultitouch = _zoomStarted = false;
                /** @type {null} */
                _direction = null;
                _shout("firstTouchStart", startPointsList);
                _equalizePoints(_startPanOffset, _panOffset);
                /** @type {number} */
                offset.x = offset.y = 0;
                _equalizePoints(_currPoint, startPointsList[0]);
                _equalizePoints(_startPoint, _currPoint);
                /** @type {number} */
                _startMainScrollPos.x = _slideSize.x * _currPositionIndex;
                /** @type {!Array} */
                lines = [{
                  x : _currPoint.x,
                  y : _currPoint.y
                }];
                _gestureCheckSpeedTime = _gestureStartTime = _getCurrentTime();
                _calculatePanBounds(_currZoomLevel, true);
                _stopDragUpdateLoop();
                _dragUpdateLoop();
              }
              if (!_isZooming && numPoints > 1 && !_mainScrollAnimating && !_mainScrollShifted) {
                _startZoomLevel = _currZoomLevel;
                /** @type {boolean} */
                _zoomStarted = false;
                /** @type {boolean} */
                _isZooming = _isMultitouch = true;
                /** @type {number} */
                offset.y = offset.x = 0;
                _equalizePoints(_startPanOffset, _panOffset);
                _equalizePoints(p, startPointsList[0]);
                _equalizePoints(p2, startPointsList[1]);
                _findCenterOfPoints(p, p2, _currCenterPoint);
                /** @type {number} */
                edge.x = Math.abs(_currCenterPoint.x) - _panOffset.x;
                /** @type {number} */
                edge.y = Math.abs(_currCenterPoint.y) - _panOffset.y;
                _currPointsDistance = _startPointsDistance = _calculatePointsDistance(p, p2);
              }
            }
          }
        };
        /**
         * @param {!Object} e
         * @return {undefined}
         */
        var _onDragMove = function(e) {
          if (e.preventDefault(), _pointerEventEnabled) {
            var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, "id");
            if (pointerIndex > -1) {
              var p = _currPointers[pointerIndex];
              p.x = e.pageX;
              p.y = e.pageY;
            }
          }
          if (_isDragging) {
            var touchesList = _getTouchPoints(e);
            if (!_direction && !_moved && !_isZooming) {
              if (_mainScrollPos.x !== _slideSize.x * _currPositionIndex) {
                /** @type {string} */
                _direction = "h";
              } else {
                /** @type {number} */
                var i = Math.abs(touchesList[0].x - _currPoint.x) - Math.abs(touchesList[0].y - _currPoint.y);
                if (Math.abs(i) >= end) {
                  /** @type {string} */
                  _direction = i > 0 ? "h" : "v";
                  _currentPoints = touchesList;
                }
              }
            } else {
              _currentPoints = touchesList;
            }
          }
        };
        /**
         * @return {?}
         */
        var _renderMovement = function() {
          if (_currentPoints) {
            var numPoints = _currentPoints.length;
            if (0 !== numPoints) {
              if (_equalizePoints(p, _currentPoints[0]), delta.x = p.x - _currPoint.x, delta.y = p.y - _currPoint.y, _isZooming && numPoints > 1) {
                if (_currPoint.x = p.x, _currPoint.y = p.y, !delta.x && !delta.y && _isEqualPoints(_currentPoints[1], p2)) {
                  return;
                }
                if (_equalizePoints(p2, _currentPoints[1]), !_zoomStarted) {
                  /** @type {boolean} */
                  _zoomStarted = true;
                  _shout("zoomGestureStarted");
                }
                var pointsDistance = _calculatePointsDistance(p, p2);
                var zoomLevel = _calculateZoomLevel(pointsDistance);
                if (zoomLevel > self.currItem.initialZoomLevel + self.currItem.initialZoomLevel / 15) {
                  /** @type {boolean} */
                  _wasOverInitialZoom = true;
                }
                /** @type {number} */
                var zoomFriction = 1;
                var minZoomLevel = _getMinZoomLevel();
                var maxZoomLevel = _getMaxZoomLevel();
                if (zoomLevel < minZoomLevel) {
                  if (_options.pinchToClose && !_wasOverInitialZoom && _startZoomLevel <= self.currItem.initialZoomLevel) {
                    var u;
                    /** @type {number} */
                    var opacityRatio = 1 - (minZoomLevel - zoomLevel) / (minZoomLevel / 1.2);
                    _applyBgOpacity(opacityRatio);
                    _shout("onPinchClose", opacityRatio);
                    /** @type {boolean} */
                    _opacityChanged = true;
                  } else {
                    if ((zoomFriction = (minZoomLevel - zoomLevel) / minZoomLevel) > 1) {
                      /** @type {number} */
                      zoomFriction = 1;
                    }
                    /** @type {number} */
                    zoomLevel = minZoomLevel - zoomFriction * (minZoomLevel / 3);
                  }
                } else {
                  if (zoomLevel > maxZoomLevel) {
                    if ((zoomFriction = (zoomLevel - maxZoomLevel) / (6 * minZoomLevel)) > 1) {
                      /** @type {number} */
                      zoomFriction = 1;
                    }
                    zoomLevel = maxZoomLevel + zoomFriction * minZoomLevel;
                  }
                }
                if (zoomFriction < 0) {
                  /** @type {number} */
                  zoomFriction = 0;
                }
                _currPointsDistance = pointsDistance;
                _findCenterOfPoints(p, p2, _centerPoint);
                offset.x += _centerPoint.x - _currCenterPoint.x;
                offset.y += _centerPoint.y - _currCenterPoint.y;
                _equalizePoints(_currCenterPoint, _centerPoint);
                _panOffset.x = _calculatePanOffset("x", zoomLevel);
                _panOffset.y = _calculatePanOffset("y", zoomLevel);
                /** @type {boolean} */
                _isZoomingIn = zoomLevel > _currZoomLevel;
                _currZoomLevel = zoomLevel;
                _applyCurrentZoomPan();
              } else {
                if (!_direction) {
                  return;
                }
                if (_isFirstMove) {
                  if (_isFirstMove = false, Math.abs(delta.x) >= end) {
                    delta.x -= _currentPoints[0].x - _startPoint.x;
                  }
                  if (Math.abs(delta.y) >= end) {
                    delta.y -= _currentPoints[0].y - _startPoint.y;
                  }
                }
                if (_currPoint.x = p.x, _currPoint.y = p.y, 0 === delta.x && 0 === delta.y) {
                  return;
                }
                if ("v" === _direction && _options.closeOnVerticalDrag) {
                  if (!_canPan()) {
                    offset.y += delta.y;
                    _panOffset.y += delta.y;
                    var opacityRatio = _calculateVerticalDragOpacityRatio();
                    return _verticalDragInitiated = true, _shout("onVerticalDrag", opacityRatio), _applyBgOpacity(opacityRatio), _applyCurrentZoomPan(), void 0;
                  }
                }
                var h;
                if (_pushPosPoint(_getCurrentTime(), p.x, p.y), _moved = true, _currPanBounds = self.currItem.bounds, !_panOrMoveMainScroll("x", delta)) {
                  _panOrMoveMainScroll("y", delta);
                  _roundPoint(_panOffset);
                  _applyCurrentZoomPan();
                }
              }
            }
          }
        };
        /**
         * @param {!Object} e
         * @return {?}
         */
        var _onDragRelease = function(e) {
          if (_features.isOldAndroid) {
            if (_takingTooLongTimeout && "mouseup" === e.type) {
              return;
            }
            if (e.type.indexOf("touch") > -1) {
              clearTimeout(_takingTooLongTimeout);
              /** @type {number} */
              _takingTooLongTimeout = setTimeout(function() {
                /** @type {number} */
                _takingTooLongTimeout = 0;
              }, 600);
            }
          }
          if (_shout("pointerUp"), _preventDefaultEventBehaviour(e, false)) {
            e.preventDefault();
          }
          var releasePoint;
          if (_pointerEventEnabled) {
            var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, "id");
            if (pointerIndex > -1) {
              if (releasePoint = _currPointers.splice(pointerIndex, 1)[0], navigator.msPointerEnabled) {
                var MSPOINTER_TYPES = {
                  4 : "mouse",
                  2 : "touch",
                  3 : "pen"
                };
                if (releasePoint.type = MSPOINTER_TYPES[e.pointerType], !releasePoint.type) {
                  releasePoint.type = e.pointerType || "mouse";
                }
              } else {
                releasePoint.type = e.pointerType || "mouse";
              }
            }
          }
          var touchList = _getTouchPoints(e);
          var gestureType;
          var numPoints = touchList.length;
          if ("mouseup" === e.type) {
            /** @type {number} */
            numPoints = 0;
          }
          if (2 === numPoints) {
            return _currentPoints = null, true;
          }
          if (1 === numPoints) {
            _equalizePoints(_startPoint, touchList[0]);
          }
          if (0 === numPoints && !_direction && !_mainScrollAnimating) {
            if (!releasePoint) {
              if ("mouseup" === e.type) {
                releasePoint = {
                  x : e.pageX,
                  y : e.pageY,
                  type : "mouse"
                };
              } else {
                if (e.changedTouches && e.changedTouches[0]) {
                  releasePoint = {
                    x : e.changedTouches[0].pageX,
                    y : e.changedTouches[0].pageY,
                    type : "touch"
                  };
                }
              }
            }
            _shout("touchRelease", e, releasePoint);
          }
          /** @type {number} */
          var t = -1;
          if (0 === numPoints) {
            if (_isDragging = false, framework.unbind(window, _upMoveEvents, self), _stopDragUpdateLoop(), _isZooming) {
              /** @type {number} */
              t = 0;
            } else {
              if (-1 !== startAnimTime) {
                /** @type {number} */
                t = _getCurrentTime() - startAnimTime;
              }
            }
          }
          if (startAnimTime = 1 === numPoints ? _getCurrentTime() : -1, -1 !== t && t < 150) {
            /** @type {string} */
            gestureType = "zoom";
          } else {
            /** @type {string} */
            gestureType = "swipe";
          }
          if (_isZooming && numPoints < 2) {
            if (_isZooming = false, 1 === numPoints) {
              /** @type {string} */
              gestureType = "zoomPointerUp";
            }
            _shout("zoomGestureEnded");
          }
          if (_currentPoints = null, _moved || _zoomStarted || _mainScrollAnimating || _verticalDragInitiated) {
            if (_stopAllAnimations(), !_releaseAnimData) {
              _releaseAnimData = _initDragReleaseAnimationData();
            }
            if (_releaseAnimData.calculateSwipeSpeed("x"), !_verticalDragInitiated) {
              if ((_mainScrollShifted || _mainScrollAnimating) && 0 === numPoints) {
                var h;
                if (_finishSwipeMainScrollGesture(gestureType, _releaseAnimData)) {
                  return;
                }
                /** @type {string} */
                gestureType = "zoomPointerUp";
              }
              if (!_mainScrollAnimating) {
                if ("swipe" !== gestureType) {
                  return _completeZoomGesture(), void 0;
                }
                if (!_mainScrollShifted && _currZoomLevel > self.currItem.fitRatio) {
                  _completePanGesture(_releaseAnimData);
                }
              }
            } else {
              var p;
              if (_calculateVerticalDragOpacityRatio() < _options.verticalDragRange) {
                self.close();
              } else {
                var initalPanY = _panOffset.y;
                var initialOpacity = _bgOpacity;
                _animateProp("verticalDrag", 0, 1, 300, framework.easing.cubic.out, function(now) {
                  _panOffset.y = (self.currItem.initialPosition.y - initalPanY) * now + initalPanY;
                  _applyBgOpacity((1 - initialOpacity) * now + initialOpacity);
                  _applyCurrentZoomPan();
                });
                _shout("onVerticalDrag", 1);
              }
            }
          }
        };
        /**
         * @return {?}
         */
        var _initDragReleaseAnimationData = function() {
          var lastFlickDuration;
          var tempReleasePos;
          var s = {
            lastFlickOffset : {},
            lastFlickDist : {},
            lastFlickSpeed : {},
            slowDownRatio : {},
            slowDownRatioReverse : {},
            speedDecelerationRatio : {},
            speedDecelerationRatioAbs : {},
            distanceOffset : {},
            backAnimDestination : {},
            backAnimStarted : {},
            calculateSwipeSpeed : function(axis) {
              if (lines.length > 1) {
                /** @type {number} */
                lastFlickDuration = _getCurrentTime() - _gestureCheckSpeedTime + 50;
                tempReleasePos = lines[lines.length - 2][axis];
              } else {
                /** @type {number} */
                lastFlickDuration = _getCurrentTime() - _gestureStartTime;
                tempReleasePos = _startPoint[axis];
              }
              if (s.lastFlickOffset[axis] = _currPoint[axis] - tempReleasePos, s.lastFlickDist[axis] = Math.abs(s.lastFlickOffset[axis]), s.lastFlickDist[axis] > 20) {
                /** @type {number} */
                s.lastFlickSpeed[axis] = s.lastFlickOffset[axis] / lastFlickDuration;
              } else {
                /** @type {number} */
                s.lastFlickSpeed[axis] = 0;
              }
              if (Math.abs(s.lastFlickSpeed[axis]) < .1) {
                /** @type {number} */
                s.lastFlickSpeed[axis] = 0;
              }
              /** @type {number} */
              s.slowDownRatio[axis] = .95;
              /** @type {number} */
              s.slowDownRatioReverse[axis] = 1 - s.slowDownRatio[axis];
              /** @type {number} */
              s.speedDecelerationRatio[axis] = 1;
            },
            calculateOverBoundsAnimOffset : function(axis, speed) {
              if (!s.backAnimStarted[axis]) {
                if (_panOffset[axis] > _currPanBounds.min[axis]) {
                  s.backAnimDestination[axis] = _currPanBounds.min[axis];
                } else {
                  if (_panOffset[axis] < _currPanBounds.max[axis]) {
                    s.backAnimDestination[axis] = _currPanBounds.max[axis];
                  }
                }
                if (void 0 !== s.backAnimDestination[axis]) {
                  if (s.slowDownRatio[axis] = .7, s.slowDownRatioReverse[axis] = 1 - s.slowDownRatio[axis], s.speedDecelerationRatioAbs[axis] < .05) {
                    /** @type {number} */
                    s.lastFlickSpeed[axis] = 0;
                    /** @type {boolean} */
                    s.backAnimStarted[axis] = true;
                    _animateProp("bounceZoomPan" + axis, _panOffset[axis], s.backAnimDestination[axis], speed || 300, framework.easing.sine.out, function(pos) {
                      _panOffset[axis] = pos;
                      _applyCurrentZoomPan();
                    });
                  }
                }
              }
            },
            calculateAnimOffset : function(axis) {
              if (!s.backAnimStarted[axis]) {
                /** @type {number} */
                s.speedDecelerationRatio[axis] = s.speedDecelerationRatio[axis] * (s.slowDownRatio[axis] + s.slowDownRatioReverse[axis] - s.slowDownRatioReverse[axis] * s.timeDiff / 10);
                /** @type {number} */
                s.speedDecelerationRatioAbs[axis] = Math.abs(s.lastFlickSpeed[axis] * s.speedDecelerationRatio[axis]);
                /** @type {number} */
                s.distanceOffset[axis] = s.lastFlickSpeed[axis] * s.speedDecelerationRatio[axis] * s.timeDiff;
                _panOffset[axis] += s.distanceOffset[axis];
              }
            },
            panAnimLoop : function() {
              if (_animations.zoomPan) {
                if (_animations.zoomPan.raf = _requestAF(s.panAnimLoop), s.now = _getCurrentTime(), s.timeDiff = s.now - s.lastNow, s.lastNow = s.now, s.calculateAnimOffset("x"), s.calculateAnimOffset("y"), _applyCurrentZoomPan(), s.calculateOverBoundsAnimOffset("x"), s.calculateOverBoundsAnimOffset("y"), s.speedDecelerationRatioAbs.x < .05 && s.speedDecelerationRatioAbs.y < .05) {
                  return _panOffset.x = Math.round(_panOffset.x), _panOffset.y = Math.round(_panOffset.y), _applyCurrentZoomPan(), _stopAnimation("zoomPan"), void 0;
                }
              }
            }
          };
          return s;
        };
        /**
         * @param {?} animData
         * @return {?}
         */
        var _completePanGesture = function(animData) {
          if (animData.calculateSwipeSpeed("y"), _currPanBounds = self.currItem.bounds, animData.backAnimDestination = {}, animData.backAnimStarted = {}, Math.abs(animData.lastFlickSpeed.x) <= .05 && Math.abs(animData.lastFlickSpeed.y) <= .05) {
            return animData.speedDecelerationRatioAbs.x = animData.speedDecelerationRatioAbs.y = 0, animData.calculateOverBoundsAnimOffset("x"), animData.calculateOverBoundsAnimOffset("y"), true;
          }
          _registerStartAnimation("zoomPan");
          animData.lastNow = _getCurrentTime();
          animData.panAnimLoop();
        };
        /**
         * @param {!Object} gestureType
         * @param {?} _releaseAnimData
         * @return {?}
         */
        var _finishSwipeMainScrollGesture = function(gestureType, _releaseAnimData) {
          var itemChanged;
          var itemsDiff;
          var nextCircle;
          if (!_mainScrollAnimating) {
            _currZoomedItemIndex = _currentItemIndex;
          }
          if ("swipe" === gestureType) {
            /** @type {number} */
            var totalShiftDist = _currPoint.x - _startPoint.x;
            /** @type {boolean} */
            var isFastLastFlick = _releaseAnimData.lastFlickDist.x < 10;
            if (totalShiftDist > MIN_SWIPE_DISTANCE && (isFastLastFlick || _releaseAnimData.lastFlickOffset.x > 20)) {
              /** @type {number} */
              itemsDiff = -1;
            } else {
              if (totalShiftDist < -MIN_SWIPE_DISTANCE && (isFastLastFlick || _releaseAnimData.lastFlickOffset.x < -20)) {
                /** @type {number} */
                itemsDiff = 1;
              }
            }
          }
          if (itemsDiff) {
            if ((_currentItemIndex = _currentItemIndex + itemsDiff) < 0) {
              /** @type {number} */
              _currentItemIndex = _options.loop ? _getNumItems() - 1 : 0;
              /** @type {boolean} */
              nextCircle = true;
            } else {
              if (_currentItemIndex >= _getNumItems()) {
                /** @type {number} */
                _currentItemIndex = _options.loop ? 0 : _getNumItems() - 1;
                /** @type {boolean} */
                nextCircle = true;
              }
            }
            if (!nextCircle || _options.loop) {
              _indexDiff = _indexDiff + itemsDiff;
              /** @type {number} */
              _currPositionIndex = _currPositionIndex - itemsDiff;
              /** @type {boolean} */
              itemChanged = true;
            }
          }
          /** @type {number} */
          var animateToX = _slideSize.x * _currPositionIndex;
          /** @type {number} */
          var p = Math.abs(animateToX - _mainScrollPos.x);
          var finishAnimDuration;
          if (!itemChanged && animateToX > _mainScrollPos.x != _releaseAnimData.lastFlickSpeed.x > 0) {
            /** @type {number} */
            finishAnimDuration = 333;
          } else {
            /** @type {number} */
            finishAnimDuration = Math.abs(_releaseAnimData.lastFlickSpeed.x) > 0 ? p / Math.abs(_releaseAnimData.lastFlickSpeed.x) : 333;
            /** @type {number} */
            finishAnimDuration = Math.min(finishAnimDuration, 400);
            /** @type {number} */
            finishAnimDuration = Math.max(finishAnimDuration, 250);
          }
          if (_currZoomedItemIndex === _currentItemIndex) {
            /** @type {boolean} */
            itemChanged = false;
          }
          if (_mainScrollAnimating = true, _shout("mainScrollAnimStart"), _animateProp("mainScroll", _mainScrollPos.x, animateToX, finishAnimDuration, framework.easing.cubic.out, _moveMainScroll, function() {
            if (_stopAllAnimations(), _mainScrollAnimating = false, _currZoomedItemIndex = -1, itemChanged || _currZoomedItemIndex !== _currentItemIndex) {
              self.updateCurrItem();
            }
            _shout("mainScrollAnimComplete");
          }), itemChanged) {
            self.updateCurrItem(true);
          }
          return itemChanged;
        };
        /**
         * @param {number} touchesDistance
         * @return {?}
         */
        var _calculateZoomLevel = function(touchesDistance) {
          return 1 / _startPointsDistance * touchesDistance * _startZoomLevel;
        };
        /**
         * @return {?}
         */
        var _completeZoomGesture = function() {
          var destZoomLevel = _currZoomLevel;
          var minZoomLevel = _getMinZoomLevel();
          var maxZoomLevel = _getMaxZoomLevel();
          if (_currZoomLevel < minZoomLevel) {
            destZoomLevel = minZoomLevel;
          } else {
            if (_currZoomLevel > maxZoomLevel) {
              destZoomLevel = maxZoomLevel;
            }
          }
          /** @type {number} */
          var destOpacity = 1;
          var onUpdate;
          var initialOpacity = _bgOpacity;
          if (_opacityChanged && !_isZoomingIn && !_wasOverInitialZoom && _currZoomLevel < minZoomLevel) {
            return self.close(), true;
          }
          if (_opacityChanged) {
            /**
             * @param {number} now
             * @return {undefined}
             */
            onUpdate = function(now) {
              _applyBgOpacity((destOpacity - initialOpacity) * now + initialOpacity);
            };
          }
          return self.zoomTo(destZoomLevel, 0, 200, framework.easing.cubic.out, onUpdate), true;
        };
        _registerModule("Gestures", {
          publicMethods : {
            initGestures : function() {
              /**
               * @param {string} pref
               * @param {string} down
               * @param {string} move
               * @param {string} up
               * @param {string} cancel
               * @return {undefined}
               */
              var addEventNames = function(pref, down, move, up, cancel) {
                if (_dragStartEvent = pref + down, _dragMoveEvent = pref + move, _dragEndEvent = pref + up, cancel) {
                  _dragCancelEvent = pref + cancel;
                } else {
                  /** @type {string} */
                  _dragCancelEvent = "";
                }
              };
              if ((_pointerEventEnabled = _features.pointerEvent) && _features.touch) {
                /** @type {boolean} */
                _features.touch = false;
              }
              if (_pointerEventEnabled) {
                if (navigator.msPointerEnabled) {
                  addEventNames("MSPointer", "Down", "Move", "Up", "Cancel");
                } else {
                  addEventNames("pointer", "down", "move", "up", "cancel");
                }
              } else {
                if (_features.touch) {
                  addEventNames("touch", "start", "move", "end", "cancel");
                  /** @type {boolean} */
                  _likelyTouchDevice = true;
                } else {
                  addEventNames("mouse", "down", "move", "up");
                }
              }
              if (_upMoveEvents = _dragMoveEvent + " " + _dragEndEvent + " " + _dragCancelEvent, _downEvents = _dragStartEvent, _pointerEventEnabled && !_likelyTouchDevice) {
                /** @type {boolean} */
                _likelyTouchDevice = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1;
              }
              if (self.likelyTouchDevice = _likelyTouchDevice, _globalEventHandlers[_dragStartEvent] = _onDragStart, _globalEventHandlers[_dragMoveEvent] = _onDragMove, _globalEventHandlers[_dragEndEvent] = _onDragRelease, _dragCancelEvent) {
                _globalEventHandlers[_dragCancelEvent] = _globalEventHandlers[_dragEndEvent];
              }
              if (_features.touch) {
                /** @type {string} */
                _downEvents = _downEvents + " mousedown";
                /** @type {string} */
                _upMoveEvents = _upMoveEvents + " mousemove mouseup";
                _globalEventHandlers.mousedown = _globalEventHandlers[_dragStartEvent];
                _globalEventHandlers.mousemove = _globalEventHandlers[_dragMoveEvent];
                _globalEventHandlers.mouseup = _globalEventHandlers[_dragEndEvent];
              }
              if (!_likelyTouchDevice) {
                /** @type {boolean} */
                _options.allowPanToNext = false;
              }
            }
          }
        });
        var _showOrHideTimeout;
        /**
         * @param {!Object} item
         * @param {?} img
         * @param {!Object} out
         * @param {?} completeFn
         * @return {undefined}
         */
        var _showOrHide = function(item, img, out, completeFn) {
          if (_showOrHideTimeout) {
            clearTimeout(_showOrHideTimeout);
          }
          var thumbBounds;
          if (_initialZoomRunning = true, _initialContentSet = true, item.initialLayout) {
            thumbBounds = item.initialLayout;
            /** @type {null} */
            item.initialLayout = null;
          } else {
            thumbBounds = _options.getThumbBoundsFn && _options.getThumbBoundsFn(_currentItemIndex);
          }
          /** @type {number} */
          var duration = out ? _options.hideAnimationDuration : _options.showAnimationDuration;
          /**
           * @return {undefined}
           */
          var onComplete = function() {
            if (_stopAnimation("initialZoom"), !out) {
              if (_applyBgOpacity(1), img) {
                /** @type {string} */
                img.style.display = "block";
              }
              framework.addClass(template, "pswp--animated-in");
              _shout("initialZoom" + (out ? "OutEnd" : "InEnd"));
            } else {
              self.template.removeAttribute("style");
              self.bg.removeAttribute("style");
            }
            if (completeFn) {
              completeFn();
            }
            /** @type {boolean} */
            _initialZoomRunning = false;
          };
          if (duration && thumbBounds && void 0 !== thumbBounds.x) {
            var p;
            (function() {
              var closeWithRaf = _closedByScroll;
              var fadeEverything = !self.currItem.src || self.currItem.loadError || _options.showHideOpacity;
              if (item.miniImg) {
                /** @type {string} */
                item.miniImg.style.webkitBackfaceVisibility = "hidden";
              }
              if (!out) {
                /** @type {number} */
                _currZoomLevel = thumbBounds.w / item.w;
                _panOffset.x = thumbBounds.x;
                /** @type {number} */
                _panOffset.y = thumbBounds.y - _initalWindowScrollY;
                /** @type {number} */
                self[fadeEverything ? "template" : "bg"].style.opacity = .001;
                _applyCurrentZoomPan();
              }
              if (_registerStartAnimation("initialZoom"), out && !closeWithRaf) {
                framework.removeClass(template, "pswp--animated-in");
              }
              if (fadeEverything) {
                if (out) {
                  framework[(closeWithRaf ? "remove" : "add") + "Class"](template, "pswp--animate_opacity");
                } else {
                  setTimeout(function() {
                    framework.addClass(template, "pswp--animate_opacity");
                  }, 30);
                }
              }
              /** @type {number} */
              _showOrHideTimeout = setTimeout(function() {
                if (_shout("initialZoom" + (out ? "Out" : "In")), !out) {
                  if (_currZoomLevel = item.initialZoomLevel, _equalizePoints(_panOffset, item.initialPosition), _applyCurrentZoomPan(), _applyBgOpacity(1), fadeEverything) {
                    /** @type {number} */
                    template.style.opacity = 1;
                  } else {
                    _applyBgOpacity(1);
                  }
                  /** @type {number} */
                  _showOrHideTimeout = setTimeout(onComplete, duration + 20);
                } else {
                  /** @type {number} */
                  var destZoomLevel = thumbBounds.w / item.w;
                  var initialPanOffset = {
                    x : _panOffset.x,
                    y : _panOffset.y
                  };
                  var initialZoomLevel = _currZoomLevel;
                  var initalBgOpacity = _bgOpacity;
                  /**
                   * @param {number} now
                   * @return {undefined}
                   */
                  var onUpdate = function(now) {
                    if (1 === now) {
                      /** @type {number} */
                      _currZoomLevel = destZoomLevel;
                      _panOffset.x = thumbBounds.x;
                      /** @type {number} */
                      _panOffset.y = thumbBounds.y - _currentWindowScrollY;
                    } else {
                      _currZoomLevel = (destZoomLevel - initialZoomLevel) * now + initialZoomLevel;
                      _panOffset.x = (thumbBounds.x - initialPanOffset.x) * now + initialPanOffset.x;
                      _panOffset.y = (thumbBounds.y - _currentWindowScrollY - initialPanOffset.y) * now + initialPanOffset.y;
                    }
                    if (_applyCurrentZoomPan(), fadeEverything) {
                      /** @type {number} */
                      template.style.opacity = 1 - now;
                    } else {
                      _applyBgOpacity(initalBgOpacity - now * initalBgOpacity);
                    }
                  };
                  if (closeWithRaf) {
                    _animateProp("initialZoom", 0, 1, duration, framework.easing.cubic.out, onUpdate, onComplete);
                  } else {
                    onUpdate(1);
                    /** @type {number} */
                    _showOrHideTimeout = setTimeout(onComplete, duration + 20);
                  }
                }
              }, out ? 25 : 90);
            })();
          } else {
            if (_shout("initialZoom" + (out ? "Out" : "In")), _currZoomLevel = item.initialZoomLevel, _equalizePoints(_panOffset, item.initialPosition), _applyCurrentZoomPan(), template.style.opacity = out ? 0 : 1, _applyBgOpacity(1), duration) {
              setTimeout(function() {
                onComplete();
              }, duration);
            } else {
              onComplete();
            }
          }
        };
        var _items;
        var _tempPanAreaSize = {};
        /** @type {!Array} */
        var _imagesToAppendPool = [];
        var _initialContentSet;
        var _initialZoomRunning;
        var _controllerDefaultOptions = {
          index : 0,
          errorMsg : '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
          forceProgressiveLoading : false,
          preload : [1, 1],
          getNumItemsFn : function() {
            return _items.length;
          }
        };
        var _getItemAt;
        var _getNumItems;
        var _initialIsLoop;
        /**
         * @return {?}
         */
        var _getEmptyPoint = function() {
          return {
            center : {
              x : 0,
              y : 0
            },
            max : {
              x : 0,
              y : 0
            },
            min : {
              x : 0,
              y : 0
            }
          };
        };
        /**
         * @param {!Object} item
         * @param {!Object} realPanElementW
         * @param {!Object} realPanElementH
         * @return {undefined}
         */
        var _calculateSingleItemPanBounds = function(item, realPanElementW, realPanElementH) {
          var bounds = item.bounds;
          /** @type {number} */
          bounds.center.x = Math.round((_tempPanAreaSize.x - realPanElementW) / 2);
          bounds.center.y = Math.round((_tempPanAreaSize.y - realPanElementH) / 2) + item.vGap.top;
          /** @type {number} */
          bounds.max.x = realPanElementW > _tempPanAreaSize.x ? Math.round(_tempPanAreaSize.x - realPanElementW) : bounds.center.x;
          bounds.max.y = realPanElementH > _tempPanAreaSize.y ? Math.round(_tempPanAreaSize.y - realPanElementH) + item.vGap.top : bounds.center.y;
          /** @type {number} */
          bounds.min.x = realPanElementW > _tempPanAreaSize.x ? 0 : bounds.center.x;
          bounds.min.y = realPanElementH > _tempPanAreaSize.y ? item.vGap.top : bounds.center.y;
        };
        /**
         * @param {!Object} item
         * @param {!Object} viewportSize
         * @param {number} zoomLevel
         * @return {?}
         */
        var _calculateItemSize = function(item, viewportSize, zoomLevel) {
          if (item.src && !item.loadError) {
            /** @type {boolean} */
            var isInitial = !zoomLevel;
            if (isInitial) {
              if (!item.vGap) {
                item.vGap = {
                  top : 0,
                  bottom : 0
                };
              }
              _shout("parseVerticalMargin", item);
            }
            if (_tempPanAreaSize.x = viewportSize.x, _tempPanAreaSize.y = viewportSize.y - item.vGap.top - item.vGap.bottom, isInitial) {
              /** @type {number} */
              var hRatio = _tempPanAreaSize.x / item.w;
              /** @type {number} */
              var vRatio = _tempPanAreaSize.y / item.h;
              /** @type {number} */
              item.fitRatio = hRatio < vRatio ? hRatio : vRatio;
              /** @type {string} */
              var scaleMode = _options.scaleMode;
              if ("orig" === scaleMode) {
                /** @type {number} */
                zoomLevel = 1;
              } else {
                if ("fit" === scaleMode) {
                  /** @type {number} */
                  zoomLevel = item.fitRatio;
                }
              }
              if (zoomLevel > 1) {
                /** @type {number} */
                zoomLevel = 1;
              }
              if (item.initialZoomLevel = zoomLevel, !item.bounds) {
                item.bounds = {
                  center : {
                    x : 0,
                    y : 0
                  },
                  max : {
                    x : 0,
                    y : 0
                  },
                  min : {
                    x : 0,
                    y : 0
                  }
                };
              }
            }
            if (!zoomLevel) {
              return;
            }
            if (_calculateSingleItemPanBounds(item, item.w * zoomLevel, item.h * zoomLevel), isInitial && zoomLevel === item.initialZoomLevel) {
              item.initialPosition = item.bounds.center;
            }
            return item.bounds;
          } else {
            return item.w = item.h = 0, item.initialZoomLevel = item.fitRatio = 1, item.bounds = {
              center : {
                x : 0,
                y : 0
              },
              max : {
                x : 0,
                y : 0
              },
              min : {
                x : 0,
                y : 0
              }
            }, item.initialPosition = item.bounds.center, item.bounds;
          }
        };
        /**
         * @param {number} index
         * @param {!Object} item
         * @param {!Object} baseDiv
         * @param {!Array} img
         * @param {boolean} preventAnimation
         * @param {boolean} keepPlaceholder
         * @return {undefined}
         */
        var _appendImage = function(index, item, baseDiv, img, preventAnimation, keepPlaceholder) {
          if (!item.loadError) {
            if (img) {
              if (item.imageAppended = true, _setImageSize(item, img, item === self.currItem && _renderMaxResolution), baseDiv.appendChild(img), keepPlaceholder) {
                setTimeout(function() {
                  if (item && item.loaded && item.placeholder) {
                    /** @type {string} */
                    item.placeholder.style.display = "none";
                    /** @type {null} */
                    item.placeholder = null;
                  }
                }, 500);
              }
            }
          }
        };
        /**
         * @param {!Object} item
         * @return {?}
         */
        var _preloadImage = function(item) {
          /** @type {boolean} */
          item.loading = true;
          /** @type {boolean} */
          item.loaded = false;
          var img = item.img = framework.createEl("pswp__img", "img");
          /**
           * @return {undefined}
           */
          var onComplete = function() {
            if (item.loading = false, item.loaded = true, item.loadComplete) {
              item.loadComplete(item);
            } else {
              /** @type {null} */
              item.img = null;
            }
            /** @type {null} */
            img.onload = img.onerror = null;
            /** @type {null} */
            img = null;
          };
          return img.onload = onComplete, img.onerror = function() {
            /** @type {boolean} */
            item.loadError = true;
            onComplete();
          }, img.src = item.src, img;
        };
        /**
         * @param {!Object} item
         * @param {boolean} cleanUp
         * @return {?}
         */
        var _checkForError = function(item, cleanUp) {
          if (item.src && item.loadError && item.container) {
            if (cleanUp) {
              /** @type {string} */
              item.container.innerHTML = "";
            }
            return item.container.innerHTML = _options.errorMsg.replace("%url%", item.src), true;
          }
        };
        /**
         * @param {!Object} item
         * @param {?} img
         * @param {number} maxRes
         * @return {undefined}
         */
        var _setImageSize = function(item, img, maxRes) {
          if (item.src) {
            if (!img) {
              img = item.container.lastChild;
            }
            var w = maxRes ? item.w : Math.round(item.w * item.fitRatio);
            var h = maxRes ? item.h : Math.round(item.h * item.fitRatio);
            if (item.placeholder && !item.loaded) {
              /** @type {string} */
              item.placeholder.style.width = w + "px";
              /** @type {string} */
              item.placeholder.style.height = h + "px";
            }
            /** @type {string} */
            img.style.width = w + "px";
            /** @type {string} */
            img.style.height = h + "px";
          }
        };
        /**
         * @return {undefined}
         */
        var _appendImagesPool = function() {
          if (_imagesToAppendPool.length) {
            var poolItem;
            /** @type {number} */
            var i = 0;
            for (; i < _imagesToAppendPool.length; i++) {
              if ((poolItem = _imagesToAppendPool[i]).holder.index === poolItem.index) {
                _appendImage(poolItem.index, poolItem.item, poolItem.baseDiv, poolItem.img, false, poolItem.clearPlaceholder);
              }
            }
            /** @type {!Array} */
            _imagesToAppendPool = [];
          }
        };
        _registerModule("Controller", {
          publicMethods : {
            lazyLoadItem : function(index) {
              index = _getLoopedId(index);
              var item = _getItemAt(index);
              if (item && (!item.loaded && !item.loading || _itemsNeedUpdate)) {
                if (_shout("gettingData", index, item), item.src) {
                  _preloadImage(item);
                }
              }
            },
            initController : function() {
              if (framework.extend(_options, _controllerDefaultOptions, true), self.items = _items = items, _getItemAt = self.getItemAt, _getNumItems = _options.getNumItemsFn, _initialIsLoop = _options.loop, _getNumItems() < 3) {
                /** @type {boolean} */
                _options.loop = false;
              }
              _listen("beforeChange", function(diff) {
                var p = _options.preload;
                /** @type {boolean} */
                var isNext = null === diff ? true : diff >= 0;
                /** @type {number} */
                var preloadAfter = Math.min(p[0], _getNumItems());
                /** @type {number} */
                var preloadBefore = Math.min(p[1], _getNumItems());
                var i;
                /** @type {number} */
                i = 1;
                for (; i <= (isNext ? preloadBefore : preloadAfter); i++) {
                  self.lazyLoadItem(_currentItemIndex + i);
                }
                /** @type {number} */
                i = 1;
                for (; i <= (isNext ? preloadAfter : preloadBefore); i++) {
                  self.lazyLoadItem(_currentItemIndex - i);
                }
              });
              _listen("initialLayout", function() {
                self.currItem.initialLayout = _options.getThumbBoundsFn && _options.getThumbBoundsFn(_currentItemIndex);
              });
              _listen("mainScrollAnimComplete", _appendImagesPool);
              _listen("initialZoomInEnd", _appendImagesPool);
              _listen("destroy", function() {
                var item;
                /** @type {number} */
                var i = 0;
                for (; i < _items.length; i++) {
                  if ((item = _items[i]).container) {
                    /** @type {null} */
                    item.container = null;
                  }
                  if (item.placeholder) {
                    /** @type {null} */
                    item.placeholder = null;
                  }
                  if (item.img) {
                    /** @type {null} */
                    item.img = null;
                  }
                  if (item.preloader) {
                    /** @type {null} */
                    item.preloader = null;
                  }
                  if (item.loadError) {
                    /** @type {boolean} */
                    item.loaded = item.loadError = false;
                  }
                }
                /** @type {null} */
                _imagesToAppendPool = null;
              });
            },
            getItemAt : function(index) {
              if (index >= 0) {
                return void 0 !== _items[index] ? _items[index] : false;
              } else {
                return false;
              }
            },
            allowProgressiveImg : function() {
              return _options.forceProgressiveLoading || !_likelyTouchDevice || _options.mouseUsed || screen.width > 1200;
            },
            setContent : function(holder, index) {
              if (_options.loop) {
                index = _getLoopedId(index);
              }
              var subREGL = self.getItemAt(holder.index);
              if (subREGL) {
                /** @type {null} */
                subREGL.container = null;
              }
              var item = self.getItemAt(index);
              var img;
              if (!item) {
                return holder.el.innerHTML = "", void 0;
              }
              _shout("gettingData", index, item);
              /** @type {number} */
              holder.index = index;
              holder.item = item;
              var baseDiv = item.container = framework.createEl("pswp__zoom-wrap");
              if (!item.src && item.html) {
                if (item.html.tagName) {
                  baseDiv.appendChild(item.html);
                } else {
                  baseDiv.innerHTML = item.html;
                }
              }
              if (_checkForError(item), _calculateItemSize(item, _viewportSize), item.src && !item.loadError && !item.loaded) {
                if (item.loadComplete = function(item) {
                  if (hasSongChanged) {
                    if (holder && holder.index === index) {
                      if (_checkForError(item, true)) {
                        if (item.loadComplete = item.img = null, _calculateItemSize(item, _viewportSize), _applyZoomPanToItem(item), holder.index === _currentItemIndex) {
                          self.updateCurrZoomItem();
                        }
                        return;
                      }
                      if (!item.imageAppended) {
                        if (_features.transform && (_mainScrollAnimating || _initialZoomRunning)) {
                          _imagesToAppendPool.push({
                            item : item,
                            baseDiv : baseDiv,
                            img : item.img,
                            index : index,
                            holder : holder,
                            clearPlaceholder : true
                          });
                        } else {
                          _appendImage(index, item, baseDiv, item.img, _mainScrollAnimating || _initialZoomRunning, true);
                        }
                      } else {
                        if (!_initialZoomRunning && item.placeholder) {
                          /** @type {string} */
                          item.placeholder.style.display = "none";
                          /** @type {null} */
                          item.placeholder = null;
                        }
                      }
                    }
                    /** @type {null} */
                    item.loadComplete = null;
                    /** @type {null} */
                    item.img = null;
                    _shout("imageLoadComplete", index, item);
                  }
                }, framework.features.transform) {
                  /** @type {string} */
                  var placeholderClassName = "pswp__img pswp__img--placeholder";
                  /** @type {string} */
                  placeholderClassName = placeholderClassName + (item.msrc ? "" : " pswp__img--placeholder--blank");
                  var placeholder = framework.createEl(placeholderClassName, item.msrc ? "img" : "");
                  if (item.msrc) {
                    placeholder.src = item.msrc;
                  }
                  _setImageSize(item, placeholder);
                  baseDiv.appendChild(placeholder);
                  item.placeholder = placeholder;
                }
                if (!item.loading) {
                  _preloadImage(item);
                }
                if (self.allowProgressiveImg()) {
                  if (!_initialContentSet && _features.transform) {
                    _imagesToAppendPool.push({
                      item : item,
                      baseDiv : baseDiv,
                      img : item.img,
                      index : index,
                      holder : holder
                    });
                  } else {
                    _appendImage(index, item, baseDiv, item.img, true, true);
                  }
                }
              } else {
                if (item.src && !item.loadError) {
                  /** @type {number} */
                  (img = framework.createEl("pswp__img", "img")).style.opacity = 1;
                  img.src = item.src;
                  _setImageSize(item, img);
                  _appendImage(index, item, baseDiv, img, true);
                }
              }
              if (!_initialContentSet && index === _currentItemIndex) {
                _currZoomElementStyle = baseDiv.style;
                _showOrHide(item, img || item.img);
              } else {
                _applyZoomPanToItem(item);
              }
              /** @type {string} */
              holder.el.innerHTML = "";
              holder.el.appendChild(baseDiv);
            },
            cleanSlide : function(item) {
              if (item.img) {
                /** @type {null} */
                item.img.onload = item.img.onerror = null;
              }
              /** @type {boolean} */
              item.loaded = item.loading = item.img = item.imageAppended = false;
            }
          }
        });
        var timeoutId;
        var tapReleasePoint = {};
        /**
         * @param {!Event} origEvent
         * @param {!Object} releasePoint
         * @param {string} pointerType
         * @return {undefined}
         */
        var _dispatchTapEvent = function(origEvent, releasePoint, pointerType) {
          /** @type {(Event|null)} */
          var e = document.createEvent("CustomEvent");
          var eDetail = {
            origEvent : origEvent,
            target : origEvent.target,
            releasePoint : releasePoint,
            pointerType : pointerType || "touch"
          };
          e.initCustomEvent("pswpTap", true, true, eDetail);
          origEvent.target.dispatchEvent(e);
        };
        var _wheelDelta;
        _registerModule("Tap", {
          publicMethods : {
            initTap : function() {
              _listen("firstTouchStart", self.onTapStart);
              _listen("touchRelease", self.onTapRelease);
              _listen("destroy", function() {
                tapReleasePoint = {};
                /** @type {null} */
                timeoutId = null;
              });
            },
            onTapStart : function(touchList) {
              if (touchList.length > 1) {
                clearTimeout(timeoutId);
                /** @type {null} */
                timeoutId = null;
              }
            },
            onTapRelease : function(e, releasePoint) {
              if (releasePoint) {
                if (!_moved && !_isMultitouch && !_numAnimations) {
                  /** @type {!Object} */
                  var p0 = releasePoint;
                  var o;
                  if (timeoutId) {
                    if (clearTimeout(timeoutId), timeoutId = null, _isNearbyPoints(p0, tapReleasePoint)) {
                      return _shout("doubleTap", p0), void 0;
                    }
                  }
                  if ("mouse" === releasePoint.type) {
                    return _dispatchTapEvent(e, releasePoint, "mouse"), void 0;
                  }
                  if ("BUTTON" === e.target.tagName.toUpperCase() || framework.hasClass(e.target, "pswp__single-tap")) {
                    return _dispatchTapEvent(e, releasePoint), void 0;
                  }
                  _equalizePoints(tapReleasePoint, p0);
                  /** @type {number} */
                  timeoutId = setTimeout(function() {
                    _dispatchTapEvent(e, releasePoint);
                    /** @type {null} */
                    timeoutId = null;
                  }, 300);
                }
              }
            }
          }
        });
        _registerModule("DesktopZoom", {
          publicMethods : {
            initDesktopZoom : function() {
              if (!_oldIE) {
                if (_likelyTouchDevice) {
                  _listen("mouseUsed", function() {
                    self.setupDesktopZoom();
                  });
                } else {
                  self.setupDesktopZoom(true);
                }
              }
            },
            setupDesktopZoom : function(onInit) {
              _wheelDelta = {};
              /** @type {string} */
              var _upMoveEvents = "wheel mousewheel DOMMouseScroll";
              _listen("bindEvents", function() {
                framework.bind(template, _upMoveEvents, self.handleMouseWheel);
              });
              _listen("unbindEvents", function() {
                if (_wheelDelta) {
                  framework.unbind(template, _upMoveEvents, self.handleMouseWheel);
                }
              });
              /** @type {boolean} */
              self.mouseZoomedIn = false;
              var e;
              /**
               * @return {undefined}
               */
              var updateZoomable = function() {
                if (self.mouseZoomedIn) {
                  framework.removeClass(template, "pswp--zoomed-in");
                  /** @type {boolean} */
                  self.mouseZoomedIn = false;
                }
                if (_currZoomLevel < 1) {
                  framework.addClass(template, "pswp--zoom-allowed");
                } else {
                  framework.removeClass(template, "pswp--zoom-allowed");
                }
                removeDraggingClass();
              };
              /**
               * @return {undefined}
               */
              var removeDraggingClass = function() {
                if (e) {
                  framework.removeClass(template, "pswp--dragging");
                  /** @type {boolean} */
                  e = false;
                }
              };
              if (_listen("resize", updateZoomable), _listen("afterChange", updateZoomable), _listen("pointerDown", function() {
                if (self.mouseZoomedIn) {
                  /** @type {boolean} */
                  e = true;
                  framework.addClass(template, "pswp--dragging");
                }
              }), _listen("pointerUp", removeDraggingClass), !onInit) {
                updateZoomable();
              }
            },
            handleMouseWheel : function(e) {
              if (_currZoomLevel <= self.currItem.fitRatio) {
                if (_options.modal) {
                  if (!_options.closeOnScroll || _numAnimations || _isDragging) {
                    e.preventDefault();
                  } else {
                    if (_transformKey && Math.abs(e.deltaY) > 2) {
                      /** @type {boolean} */
                      _closedByScroll = true;
                      self.close();
                    }
                  }
                }
                return true;
              }
              if (e.stopPropagation(), _wheelDelta.x = 0, "deltaX" in e) {
                if (1 === e.deltaMode) {
                  /** @type {number} */
                  _wheelDelta.x = 18 * e.deltaX;
                  /** @type {number} */
                  _wheelDelta.y = 18 * e.deltaY;
                } else {
                  _wheelDelta.x = e.deltaX;
                  _wheelDelta.y = e.deltaY;
                }
              } else {
                if ("wheelDelta" in e) {
                  if (e.wheelDeltaX) {
                    /** @type {number} */
                    _wheelDelta.x = -.16 * e.wheelDeltaX;
                  }
                  if (e.wheelDeltaY) {
                    /** @type {number} */
                    _wheelDelta.y = -.16 * e.wheelDeltaY;
                  } else {
                    /** @type {number} */
                    _wheelDelta.y = -.16 * e.wheelDelta;
                  }
                } else {
                  if ("detail" in e) {
                    _wheelDelta.y = e.detail;
                  } else {
                    return;
                  }
                }
              }
              _calculatePanBounds(_currZoomLevel, true);
              /** @type {number} */
              var newPanX = _panOffset.x - _wheelDelta.x;
              /** @type {number} */
              var newPanY = _panOffset.y - _wheelDelta.y;
              if (_options.modal || newPanX <= _currPanBounds.min.x && newPanX >= _currPanBounds.max.x && newPanY <= _currPanBounds.min.y && newPanY >= _currPanBounds.max.y) {
                e.preventDefault();
              }
              self.panTo(newPanX, newPanY);
            },
            toggleDesktopZoom : function(position) {
              position = position || {
                x : _viewportSize.x / 2 + _offset.x,
                y : _viewportSize.y / 2 + _offset.y
              };
              var doubleTapZoomLevel = _options.getDoubleTapZoom(true, self.currItem);
              /** @type {boolean} */
              var zoomOut = _currZoomLevel === doubleTapZoomLevel;
              /** @type {boolean} */
              self.mouseZoomedIn = !zoomOut;
              self.zoomTo(zoomOut ? self.currItem.initialZoomLevel : doubleTapZoomLevel, position, 333);
              framework[(!zoomOut ? "add" : "remove") + "Class"](template, "pswp--zoomed-in");
            }
          }
        });
        var _historyDefaultOptions = {
          history : true,
          galleryUID : 1
        };
        var _historyUpdateTimeout;
        var appendTrackTimer;
        var _hashAnimCheckTimeout;
        var $i;
        var Hi;
        var qi;
        var value;
        var rp;
        var Wi;
        var Zi;
        var location;
        var _supportsPushState;
        /**
         * @return {?}
         */
        var _getHash = function() {
          return location.hash.substring(1);
        };
        /**
         * @return {undefined}
         */
        var _cleanHistoryTimeouts = function() {
          if (_historyUpdateTimeout) {
            clearTimeout(_historyUpdateTimeout);
          }
          if (_hashAnimCheckTimeout) {
            clearTimeout(_hashAnimCheckTimeout);
          }
        };
        /**
         * @return {?}
         */
        var _parseItemIndexFromURL = function() {
          var hash = _getHash();
          var params = {};
          if (hash.length < 5) {
            return params;
          }
          var i;
          var paramsSplit = hash.split("&");
          /** @type {number} */
          i = 0;
          for (; i < paramsSplit.length; i++) {
            if (paramsSplit[i]) {
              var resultSplit = paramsSplit[i].split("=");
              if (!(resultSplit.length < 2)) {
                params[resultSplit[0]] = resultSplit[1];
              }
            }
          }
          if (_options.galleryPIDs) {
            var searchfor = params.pid;
            /** @type {number} */
            params.pid = 0;
            /** @type {number} */
            i = 0;
            for (; i < _items.length; i++) {
              if (_items[i].pid === searchfor) {
                /** @type {number} */
                params.pid = i;
                break;
              }
            }
          } else {
            /** @type {number} */
            params.pid = parseInt(params.pid, 10) - 1;
          }
          if (params.pid < 0) {
            /** @type {number} */
            params.pid = 0;
          }
          return params;
        };
        /**
         * @return {?}
         */
        var _updateHash = function() {
          if (_hashAnimCheckTimeout) {
            clearTimeout(_hashAnimCheckTimeout);
          }
          if (_numAnimations || _isDragging) {
            return _hashAnimCheckTimeout = setTimeout(_updateHash, 500), void 0;
          }
          if ($i) {
            clearTimeout(appendTrackTimer);
          } else {
            /** @type {boolean} */
            $i = true;
          }
          var pid = _currentItemIndex + 1;
          var item = _getItemAt(_currentItemIndex);
          if (item.hasOwnProperty("pid")) {
            pid = item.pid;
          }
          /** @type {string} */
          var newHash = value + "&" + "gid=" + _options.galleryUID + "&" + "pid=" + pid;
          if (!rp) {
            if (-1 === location.hash.indexOf(newHash)) {
              /** @type {boolean} */
              Zi = true;
            }
          }
          /** @type {string} */
          var path = location.href.split("#")[0] + "#" + newHash;
          if (_supportsPushState) {
            if ("#" + newHash !== window.location.hash) {
              history[rp ? "replaceState" : "pushState"]("", document.title, path);
            }
          } else {
            if (rp) {
              location.replace(path);
            } else {
              /** @type {string} */
              location.hash = newHash;
            }
          }
          /** @type {boolean} */
          rp = true;
          /** @type {number} */
          appendTrackTimer = setTimeout(function() {
            /** @type {boolean} */
            $i = false;
          }, 60);
        };
        _registerModule("History", {
          publicMethods : {
            initHistory : function() {
              if (framework.extend(_options, _historyDefaultOptions, true), _options.history) {
                if (location = window.location, Zi = false, Wi = false, rp = false, value = _getHash(), _supportsPushState = "pushState" in history, value.indexOf("gid=") > -1) {
                  value = (value = value.split("&gid=")[0]).split("?gid=")[0];
                }
                _listen("afterChange", self.updateURL);
                _listen("unbindEvents", function() {
                  framework.unbind(window, "hashchange", self.onHashChange);
                });
                /**
                 * @return {undefined}
                 */
                var returnToOriginal = function() {
                  if (qi = true, !Wi) {
                    if (Zi) {
                      history.back();
                    } else {
                      if (value) {
                        location.hash = value;
                      } else {
                        if (_supportsPushState) {
                          history.pushState("", document.title, location.pathname + location.search);
                        } else {
                          /** @type {string} */
                          location.hash = "";
                        }
                      }
                    }
                  }
                  _cleanHistoryTimeouts();
                };
                _listen("unbindEvents", function() {
                  if (_closedByScroll) {
                    returnToOriginal();
                  }
                });
                _listen("destroy", function() {
                  if (!qi) {
                    returnToOriginal();
                  }
                });
                _listen("firstUpdate", function() {
                  _currentItemIndex = _parseItemIndexFromURL().pid;
                });
                var caretIdx = value.indexOf("pid=");
                if (caretIdx > -1) {
                  if ("&" === (value = value.substring(0, caretIdx)).slice(-1)) {
                    value = value.slice(0, -1);
                  }
                }
                setTimeout(function() {
                  if (hasSongChanged) {
                    framework.bind(window, "hashchange", self.onHashChange);
                  }
                }, 40);
              }
            },
            onHashChange : function() {
              if (_getHash() === value) {
                return Wi = true, self.close(), void 0;
              }
              if (!$i) {
                /** @type {boolean} */
                Hi = true;
                self.goTo(_parseItemIndexFromURL().pid);
                /** @type {boolean} */
                Hi = false;
              }
            },
            updateURL : function() {
              if (_cleanHistoryTimeouts(), !Hi) {
                if (!rp) {
                  _updateHash();
                } else {
                  /** @type {number} */
                  _historyUpdateTimeout = setTimeout(_updateHash, 800);
                }
              }
            }
          }
        });
        framework.extend(self, publicMethods);
      };
      return PhotoSwipe;
    });
  },
  7923 : function(root, path, e) {
    var exports;
    var Codd;
    !function(root, factory) {
      if (true) {
        !(void 0 !== (Codd = "function" == typeof(exports = factory) ? exports.call(path, e, path, root) : exports) && (root.exports = Codd));
      } else {
        if ("object" == typeof path) {
          root.exports = factory();
        } else {
          root.PhotoSwipeUI_Default = factory();
        }
      }
    }(this, function() {
      var t;
      return function(pswp, framework) {
        var ui = this;
        /** @type {boolean} */
        var n = false;
        /** @type {boolean} */
        var _controlsVisible = true;
        var _fullscrenAPI;
        var _controls;
        var _captionContainer;
        var _fakeCaptionContainer;
        var inlineElement;
        var _shareButton;
        var _shareModal;
        /** @type {boolean} */
        var _shareModalHidden = true;
        var _initalCloseOnScrollValue;
        var _isIdle;
        var _listen;
        var _loadingIndicator;
        var _loadingIndicatorHidden;
        var _takingTooLongTimeout;
        var lastTrackInfoUrl;
        var _options;
        var _defaultUIOptions = {
          barsSize : {
            top : 44,
            bottom : "auto"
          },
          closeElClasses : ["item", "caption", "zoom-wrap", "ui", "top-bar"],
          timeToIdle : 4e3,
          timeToIdleOutside : 1e3,
          loadingIndicatorDelay : 1e3,
          addCaptionHTMLFn : function(item, captionEl) {
            if (!item.title) {
              return captionEl.children[0].innerHTML = "", false;
            } else {
              return captionEl.children[0].innerHTML = item.title, true;
            }
          },
          closeEl : true,
          captionEl : true,
          fullscreenEl : true,
          zoomEl : true,
          shareEl : true,
          counterEl : true,
          arrowEl : true,
          preloaderEl : true,
          tapToClose : false,
          tapToToggleControls : true,
          clickToCloseNonZoomable : true,
          shareButtons : [{
            id : "facebook",
            label : "Share on Facebook",
            url : "https://www.facebook.com/sharer/sharer.php?u={{url}}"
          }, {
            id : "twitter",
            label : "Tweet",
            url : "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
          }, {
            id : "pinterest",
            label : "Pin it",
            url : "http://www.pinterest.com/pin/create/button/" + "?url={{url}}&media={{image_url}}&description={{text}}"
          }, {
            id : "download",
            label : "Download image",
            url : "{{raw_image_url}}",
            download : true
          }],
          getImageURLForShare : function() {
            return pswp.currItem.src || "";
          },
          getPageURLForShare : function() {
            return window.location.href;
          },
          getTextForShare : function() {
            return pswp.currItem.title || "";
          },
          indexIndicatorSep : " / ",
          fitControlsWidth : 1200
        };
        var T;
        var _lastFooter;
        /**
         * @param {!Object} e
         * @return {?}
         */
        var _onControlsTap = function(e) {
          if (T) {
            return true;
          }
          if (e = e || window.event, _options.timeToIdle && _options.mouseUsed && !_isIdle) {
            listener();
          }
          var i;
          var uiElement;
          var clickedClass = (e.target || e.srcElement).getAttribute("class") || "";
          var a;
          /** @type {number} */
          var layer_i = 0;
          for (; layer_i < crossfilterable_layers.length; layer_i++) {
            if ((uiElement = crossfilterable_layers[layer_i]).onTap && clickedClass.indexOf("pswp__" + uiElement.name) > -1) {
              uiElement.onTap();
              /** @type {boolean} */
              a = true;
            }
          }
          if (a) {
            if (e.stopPropagation) {
              e.stopPropagation();
            }
            /** @type {boolean} */
            T = true;
            /** @type {number} */
            var options = framework.features.isOldAndroid ? 600 : 30;
            /** @type {number} */
            _lastFooter = setTimeout(function() {
              /** @type {boolean} */
              T = false;
            }, options);
          }
        };
        /**
         * @return {?}
         */
        var _fitControlsInViewport = function() {
          return !pswp.likelyTouchDevice || _options.mouseUsed || screen.width > _options.fitControlsWidth;
        };
        /**
         * @param {?} el
         * @param {string} cName
         * @param {string} add
         * @return {undefined}
         */
        var _togglePswpClass = function(el, cName, add) {
          framework[(add ? "add" : "remove") + "Class"](el, "pswp__" + cName);
        };
        /**
         * @return {undefined}
         */
        var _countNumItems = function() {
          /** @type {boolean} */
          var trackInfoUrl = 1 === _options.getNumItemsFn();
          if (trackInfoUrl !== lastTrackInfoUrl) {
            _togglePswpClass(_controls, "ui--one-slide", trackInfoUrl);
            /** @type {boolean} */
            lastTrackInfoUrl = trackInfoUrl;
          }
        };
        /**
         * @return {undefined}
         */
        var _toggleShareModalClass = function() {
          _togglePswpClass(_shareModal, "share-modal--hidden", _shareModalHidden);
        };
        /**
         * @return {?}
         */
        var _toggleShareModal = function() {
          if (!(_shareModalHidden = !_shareModalHidden)) {
            _toggleShareModalClass();
            setTimeout(function() {
              if (!_shareModalHidden) {
                framework.addClass(_shareModal, "pswp__share-modal--fade-in");
              }
            }, 30);
          } else {
            framework.removeClass(_shareModal, "pswp__share-modal--fade-in");
            setTimeout(function() {
              if (_shareModalHidden) {
                _toggleShareModalClass();
              }
            }, 300);
          }
          if (!_shareModalHidden) {
            _updateShareURLs();
          }
          return false;
        };
        /**
         * @param {!Object} e
         * @return {?}
         */
        var _openWindowPopup = function(e) {
          var target = (e = e || window.event).target || e.srcElement;
          if (pswp.shout("shareLinkClick", e, target), !target.href) {
            return false;
          }
          if (target.hasAttribute("download")) {
            return true;
          }
          if (window.open(target.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no," + "location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)), !_shareModalHidden) {
            _toggleShareModal();
          }
          return false;
        };
        /**
         * @return {undefined}
         */
        var _updateShareURLs = function() {
          /** @type {string} */
          var shareButtonOut = "";
          var shareButtonData;
          var layer_i;
          var image_url;
          var page_url;
          var share_text;
          /** @type {number} */
          var i = 0;
          for (; i < _options.shareButtons.length; i++) {
            if (shareButtonData = _options.shareButtons[i], image_url = _options.getImageURLForShare(shareButtonData), page_url = _options.getPageURLForShare(shareButtonData), share_text = _options.getTextForShare(shareButtonData), shareButtonOut = shareButtonOut + ('<a href="' + (layer_i = shareButtonData.url.replace("{{url}}", encodeURIComponent(page_url)).replace("{{image_url}}", encodeURIComponent(image_url)).replace("{{raw_image_url}}", image_url).replace("{{text}}", encodeURIComponent(share_text))) + 
            '" target="_blank" ' + 'class="pswp__share--' + shareButtonData.id + '"' + (shareButtonData.download ? "download" : "") + ">" + shareButtonData.label + "</a>"), _options.parseShareButtonOut) {
              shareButtonOut = _options.parseShareButtonOut(shareButtonData, shareButtonOut);
            }
          }
          _shareModal.children[0].innerHTML = shareButtonOut;
          /** @type {function(!Object): ?} */
          _shareModal.children[0].onclick = _openWindowPopup;
        };
        /**
         * @param {string} target
         * @return {?}
         */
        var _hasCloseClass = function(target) {
          /** @type {number} */
          var i = 0;
          for (; i < _options.closeElClasses.length; i++) {
            if (framework.hasClass(target, "pswp__" + _options.closeElClasses[i])) {
              return true;
            }
          }
        };
        var initializeCheckTimer;
        var e;
        /** @type {number} */
        var o = 0;
        /**
         * @return {undefined}
         */
        var listener = function() {
          if (clearTimeout(e), o = 0, _isIdle) {
            ui.setIdle(false);
          }
        };
        /**
         * @param {!Object} e
         * @return {undefined}
         */
        var _onMouseLeaveWindow = function(e) {
          var docEl = (e = e ? e : window.event).relatedTarget || e.toElement;
          if (!docEl || "HTML" === docEl.nodeName) {
            clearTimeout(e);
            /** @type {number} */
            e = setTimeout(function() {
              ui.setIdle(true);
            }, _options.timeToIdleOutside);
          }
        };
        /**
         * @return {undefined}
         */
        var _setupFullscreenAPI = function() {
          if (_options.fullscreenEl && !framework.features.isOldAndroid) {
            if (!_fullscrenAPI) {
              _fullscrenAPI = ui.getFullscreenAPI();
            }
            if (_fullscrenAPI) {
              framework.bind(document, _fullscrenAPI.eventK, ui.updateFullscreen);
              ui.updateFullscreen();
              framework.addClass(pswp.template, "pswp--supports-fs");
            } else {
              framework.removeClass(pswp.template, "pswp--supports-fs");
            }
          }
        };
        /**
         * @return {undefined}
         */
        var _setupLoadingIndicator = function() {
          if (_options.preloaderEl) {
            _toggleLoadingIndicator(true);
            _listen("beforeChange", function() {
              clearTimeout(_takingTooLongTimeout);
              /** @type {number} */
              _takingTooLongTimeout = setTimeout(function() {
                if (pswp.currItem && pswp.currItem.loading) {
                  if (!pswp.allowProgressiveImg() || pswp.currItem.img && !pswp.currItem.img.naturalWidth) {
                    _toggleLoadingIndicator(false);
                  }
                } else {
                  _toggleLoadingIndicator(true);
                }
              }, _options.loadingIndicatorDelay);
            });
            _listen("imageLoadComplete", function(index, item) {
              if (pswp.currItem === item) {
                _toggleLoadingIndicator(true);
              }
            });
          }
        };
        /**
         * @param {boolean} hide
         * @return {undefined}
         */
        var _toggleLoadingIndicator = function(hide) {
          if (_loadingIndicatorHidden !== hide) {
            _togglePswpClass(_loadingIndicator, "preloader--active", !hide);
            /** @type {boolean} */
            _loadingIndicatorHidden = hide;
          }
        };
        /**
         * @param {!Object} item
         * @return {undefined}
         */
        var _applyNavBarGaps = function(item) {
          var gap = item.vGap;
          if (_fitControlsInViewport()) {
            var bars = _options.barsSize;
            if (_options.captionEl && "auto" === bars.bottom) {
              if (!_fakeCaptionContainer) {
                (_fakeCaptionContainer = framework.createEl("pswp__caption pswp__caption--fake")).appendChild(framework.createEl("pswp__caption__center"));
                _controls.insertBefore(_fakeCaptionContainer, _captionContainer);
                framework.addClass(_controls, "pswp__ui--fit");
              }
              if (_options.addCaptionHTMLFn(item, _fakeCaptionContainer, true)) {
                var captionSize = _fakeCaptionContainer.clientHeight;
                /** @type {number} */
                gap.bottom = parseInt(captionSize, 10) || 44;
              } else {
                gap.bottom = bars.top;
              }
            } else {
              gap.bottom = "auto" === bars.bottom ? 0 : bars.bottom;
            }
            gap.top = bars.top;
          } else {
            /** @type {number} */
            gap.top = gap.bottom = 0;
          }
        };
        /**
         * @return {undefined}
         */
        var _setupIdle = function() {
          if (_options.timeToIdle) {
            _listen("mouseUsed", function() {
              framework.bind(document, "mousemove", listener);
              framework.bind(document, "mouseout", _onMouseLeaveWindow);
              /** @type {number} */
              initializeCheckTimer = setInterval(function() {
                if (2 === ++o) {
                  ui.setIdle(true);
                }
              }, _options.timeToIdle / 2);
            });
          }
        };
        /**
         * @return {undefined}
         */
        var _setupHidingControlsDuringGestures = function() {
          var pinchControlsHidden;
          _listen("onVerticalDrag", function(now) {
            if (_controlsVisible && now < .95) {
              ui.hideControls();
            } else {
              if (!_controlsVisible && now >= .95) {
                ui.showControls();
              }
            }
          });
          _listen("onPinchClose", function(now) {
            if (_controlsVisible && now < .9) {
              ui.hideControls();
              /** @type {boolean} */
              pinchControlsHidden = true;
            } else {
              if (pinchControlsHidden && !_controlsVisible && now > .9) {
                ui.showControls();
              }
            }
          });
          _listen("zoomGestureEnded", function() {
            if ((pinchControlsHidden = false) && !_controlsVisible) {
              ui.showControls();
            }
          });
        };
        /** @type {!Array} */
        var crossfilterable_layers = [{
          name : "caption",
          option : "captionEl",
          onInit : function(el) {
            _captionContainer = el;
          }
        }, {
          name : "share-modal",
          option : "shareEl",
          onInit : function(el) {
            /** @type {!Object} */
            _shareModal = el;
          },
          onTap : function() {
            _toggleShareModal();
          }
        }, {
          name : "button--share",
          option : "shareEl",
          onInit : function(el) {
            /** @type {!Object} */
            _shareButton = el;
          },
          onTap : function() {
            _toggleShareModal();
          }
        }, {
          name : "button--zoom",
          option : "zoomEl",
          onTap : pswp.toggleDesktopZoom
        }, {
          name : "counter",
          option : "counterEl",
          onInit : function(el) {
            /** @type {!Function} */
            inlineElement = el;
          }
        }, {
          name : "button--close",
          option : "closeEl",
          onTap : pswp.close
        }, {
          name : "button--arrow--left",
          option : "arrowEl",
          onTap : pswp.prev
        }, {
          name : "button--arrow--right",
          option : "arrowEl",
          onTap : pswp.next
        }, {
          name : "button--fs",
          option : "fullscreenEl",
          onTap : function() {
            if (_fullscrenAPI.isFullscreen()) {
              _fullscrenAPI.exit();
            } else {
              _fullscrenAPI.enter();
            }
          }
        }, {
          name : "preloader",
          option : "preloaderEl",
          onInit : function(el) {
            _loadingIndicator = el;
          }
        }];
        /**
         * @return {undefined}
         */
        var _setupUIElements = function() {
          var item;
          var classAttr;
          var uiElement;
          /**
           * @param {!NodeList} sChildren
           * @return {undefined}
           */
          var loopThroughChildElements = function(sChildren) {
            if (sChildren) {
              var l = sChildren.length;
              /** @type {number} */
              var i = 0;
              for (; i < l; i++) {
                item = sChildren[i];
                classAttr = item.className;
                /** @type {number} */
                var layer_i = 0;
                for (; layer_i < crossfilterable_layers.length; layer_i++) {
                  if (uiElement = crossfilterable_layers[layer_i], classAttr.indexOf("pswp__" + uiElement.name) > -1) {
                    if (_options[uiElement.option]) {
                      if (framework.removeClass(item, "pswp__element--disabled"), uiElement.onInit) {
                        uiElement.onInit(item);
                      }
                    } else {
                      framework.addClass(item, "pswp__element--disabled");
                    }
                  }
                }
              }
            }
          };
          loopThroughChildElements(_controls.children);
          var topBar = framework.getChildByClass(_controls, "pswp__top-bar");
          if (topBar) {
            loopThroughChildElements(topBar.children);
          }
        };
        /**
         * @return {undefined}
         */
        ui.init = function() {
          if (framework.extend(pswp.options, _defaultUIOptions, true), _options = pswp.options, _controls = framework.getChildByClass(pswp.scrollWrap, "pswp__ui"), _listen = pswp.listen, _setupHidingControlsDuringGestures(), _listen("beforeChange", ui.update), _listen("doubleTap", function(point) {
            var initialZoomLevel = pswp.currItem.initialZoomLevel;
            if (pswp.getZoomLevel() !== initialZoomLevel) {
              pswp.zoomTo(initialZoomLevel, point, 333);
            } else {
              pswp.zoomTo(_options.getDoubleTapZoom(false, pswp.currItem), point, 333);
            }
          }), _listen("preventDragEvent", function(event, canCreateDiscussions, data) {
            var node = event.target || event.srcElement;
            if (node && node.getAttribute("class") && event.type.indexOf("mouse") > -1 && (node.getAttribute("class").indexOf("__caption") > 0 || /(SMALL|STRONG|EM)/i.test(node.tagName))) {
              /** @type {boolean} */
              data.prevent = false;
            }
          }), _listen("bindEvents", function() {
            if (framework.bind(_controls, "pswpTap click", _onControlsTap), framework.bind(pswp.scrollWrap, "pswpTap", ui.onGlobalTap), !pswp.likelyTouchDevice) {
              framework.bind(pswp.scrollWrap, "mouseover", ui.onMouseOver);
            }
          }), _listen("unbindEvents", function() {
            if (!_shareModalHidden) {
              _toggleShareModal();
            }
            if (initializeCheckTimer) {
              clearInterval(initializeCheckTimer);
            }
            if (framework.unbind(document, "mouseout", _onMouseLeaveWindow), framework.unbind(document, "mousemove", listener), framework.unbind(_controls, "pswpTap click", _onControlsTap), framework.unbind(pswp.scrollWrap, "pswpTap", ui.onGlobalTap), framework.unbind(pswp.scrollWrap, "mouseover", ui.onMouseOver), _fullscrenAPI) {
              if (framework.unbind(document, _fullscrenAPI.eventK, ui.updateFullscreen), _fullscrenAPI.isFullscreen()) {
                /** @type {number} */
                _options.hideAnimationDuration = 0;
                _fullscrenAPI.exit();
              }
              /** @type {null} */
              _fullscrenAPI = null;
            }
          }), _listen("destroy", function() {
            if (_options.captionEl) {
              if (_fakeCaptionContainer) {
                _controls.removeChild(_fakeCaptionContainer);
              }
              framework.removeClass(_captionContainer, "pswp__caption--empty");
            }
            if (_shareModal) {
              /** @type {null} */
              _shareModal.children[0].onclick = null;
            }
            framework.removeClass(_controls, "pswp__ui--over-close");
            framework.addClass(_controls, "pswp__ui--hidden");
            ui.setIdle(false);
          }), !_options.showAnimationDuration) {
            framework.removeClass(_controls, "pswp__ui--hidden");
          }
          if (_listen("initialZoomIn", function() {
            if (_options.showAnimationDuration) {
              framework.removeClass(_controls, "pswp__ui--hidden");
            }
          }), _listen("initialZoomOut", function() {
            framework.addClass(_controls, "pswp__ui--hidden");
          }), _listen("parseVerticalMargin", _applyNavBarGaps), _setupUIElements(), _options.shareEl && _shareButton && _shareModal) {
            /** @type {boolean} */
            _shareModalHidden = true;
          }
          _countNumItems();
          _setupIdle();
          _setupFullscreenAPI();
          _setupLoadingIndicator();
        };
        /**
         * @param {string} isIdle
         * @return {undefined}
         */
        ui.setIdle = function(isIdle) {
          /** @type {string} */
          _isIdle = isIdle;
          _togglePswpClass(_controls, "ui--idle", isIdle);
        };
        /**
         * @return {undefined}
         */
        ui.update = function() {
          if (_controlsVisible && pswp.currItem) {
            if (ui.updateIndexIndicator(), _options.captionEl) {
              _options.addCaptionHTMLFn(pswp.currItem, _captionContainer);
              _togglePswpClass(_captionContainer, "caption--empty", !pswp.currItem.title);
            }
            /** @type {boolean} */
            n = true;
          } else {
            /** @type {boolean} */
            n = false;
          }
          if (!_shareModalHidden) {
            _toggleShareModal();
          }
          _countNumItems();
        };
        /**
         * @param {?} $container
         * @return {undefined}
         */
        ui.updateFullscreen = function($container) {
          if ($container) {
            setTimeout(function() {
              pswp.setScrollOffset(0, framework.getScrollY());
            }, 50);
          }
          framework[(_fullscrenAPI.isFullscreen() ? "add" : "remove") + "Class"](pswp.template, "pswp--fs");
        };
        /**
         * @return {undefined}
         */
        ui.updateIndexIndicator = function() {
          if (_options.counterEl) {
            inlineElement.innerHTML = pswp.getCurrentIndex() + 1 + _options.indexIndicatorSep + _options.getNumItemsFn();
          }
        };
        /**
         * @param {!Object} e
         * @return {?}
         */
        ui.onGlobalTap = function(e) {
          var target = (e = e || window.event).target || e.srcElement;
          if (!T) {
            if (e.detail && "mouse" === e.detail.pointerType) {
              if (_hasCloseClass(target)) {
                return pswp.close(), void 0;
              }
              if (framework.hasClass(target, "pswp__img")) {
                if (1 === pswp.getZoomLevel() && pswp.getZoomLevel() <= pswp.currItem.fitRatio) {
                  if (_options.clickToCloseNonZoomable) {
                    pswp.close();
                  }
                } else {
                  pswp.toggleDesktopZoom(e.detail.releasePoint);
                }
              }
            } else {
              if (_options.tapToToggleControls) {
                if (_controlsVisible) {
                  ui.hideControls();
                } else {
                  ui.showControls();
                }
              }
              if (_options.tapToClose && (framework.hasClass(target, "pswp__img") || _hasCloseClass(target))) {
                return pswp.close(), void 0;
              }
            }
          }
        };
        /**
         * @param {!Object} event
         * @return {undefined}
         */
        ui.onMouseOver = function(event) {
          var target = (event = event || window.event).target || event.srcElement;
          _togglePswpClass(_controls, "ui--over-close", _hasCloseClass(target));
        };
        /**
         * @return {undefined}
         */
        ui.hideControls = function() {
          framework.addClass(_controls, "pswp__ui--hidden");
          /** @type {boolean} */
          _controlsVisible = false;
        };
        /**
         * @return {undefined}
         */
        ui.showControls = function() {
          if (_controlsVisible = true, !n) {
            ui.update();
          }
          framework.removeClass(_controls, "pswp__ui--hidden");
        };
        /**
         * @return {?}
         */
        ui.supportsFullscreen = function() {
          /** @type {!HTMLDocument} */
          var doc = document;
          return !!(doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen);
        };
        /**
         * @return {?}
         */
        ui.getFullscreenAPI = function() {
          /** @type {!Element} */
          var element = document.documentElement;
          var api;
          /** @type {string} */
          var tF = "fullscreenchange";
          if (element.requestFullscreen) {
            api = {
              enterK : "requestFullscreen",
              exitK : "exitFullscreen",
              elementK : "fullscreenElement",
              eventK : tF
            };
          } else {
            if (element.mozRequestFullScreen) {
              api = {
                enterK : "mozRequestFullScreen",
                exitK : "mozCancelFullScreen",
                elementK : "mozFullScreenElement",
                eventK : "moz" + tF
              };
            } else {
              if (element.webkitRequestFullscreen) {
                api = {
                  enterK : "webkitRequestFullscreen",
                  exitK : "webkitExitFullscreen",
                  elementK : "webkitFullscreenElement",
                  eventK : "webkit" + tF
                };
              } else {
                if (element.msRequestFullscreen) {
                  api = {
                    enterK : "msRequestFullscreen",
                    exitK : "msExitFullscreen",
                    elementK : "msFullscreenElement",
                    eventK : "MSFullscreenChange"
                  };
                }
              }
            }
          }
          if (api) {
            /**
             * @return {?}
             */
            api.enter = function() {
              if (_initalCloseOnScrollValue = _options.closeOnScroll, _options.closeOnScroll = false, "webkitRequestFullscreen" === this.enterK) {
                pswp.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT);
              } else {
                return pswp.template[this.enterK]();
              }
            };
            /**
             * @return {?}
             */
            api.exit = function() {
              return _options.closeOnScroll = _initalCloseOnScrollValue, document[this.exitK]();
            };
            /**
             * @return {?}
             */
            api.isFullscreen = function() {
              return document[this.elementK];
            };
          }
          return api;
        };
      };
    });
  },
  7924 : function(data, linkedEntities, force) {
    var enableCompatibilityMode = force(6);
    if (!window.Utility) {
      window.Utility = {};
    }
    /**
     * @param {?} data
     * @return {?}
     */
    Utility.decodeJsonAttribute = function(data) {
      return JSON.parse(decodeURIComponent(atob(data)));
    };
    enableCompatibilityMode(window.loadMapsContent);
  },
  7925 : function(value, global, Symbol) {
    var S = Symbol(6);
    Symbol(7926);
    S(window).on("load", function() {
      var t;
      if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || navigator.vendor || window.opera)) {
        var dropdown = S(".u-parallax");
        if (dropdown.length > 0) {
          dropdown.each(function() {
            var $this = S(this);
            if ($this.css("background-attachment", "fixed"), $this.hasClass("u-shading")) {
              $this.attr("data-bottom-top", "background-position: 50% 0, 50% 10vh;");
              $this.attr("data-top-bottom", "background-position: 50% 0, 50% -10vh;");
            } else {
              $this.attr("data-bottom-top", "background-position: 50% 10vh;");
              $this.attr("data-top-bottom", "background-position: 50% -10vh;");
            }
          });
          var options = {
            forceHeight : false
          };
          skrollr.init(options);
        }
      }
    });
  },
  7926 : function(module, data) {
    data = void 0;
    module = void 0;
    (function() {
      !function(window, document, undefined) {
        /**
         * @param {!Object} options
         * @return {?}
         */
        function render(options) {
          if (html = document.documentElement, body = document.body, getPrefix(), view = this, audio = (options = options || {}).constants || {}, options.easing) {
            var key;
            for (key in options.easing) {
              settings[key] = options.easing[key];
            }
          }
          if (obj = options.edgeStrategy || "set", results = {
            beforerender : options.beforerender,
            render : options.render,
            keyframe : options.keyframe
          }, isModern = false !== options.forceHeight) {
            SCALE_NEW_WINDOW_FACTOR = options.scale || 1;
          }
          if (sy = options.mobileDeceleration || sx, step = false !== options.smoothScrolling, duration = options.smoothScrollingDuration || DEFAULT_DURATION, line = {
            targetTop : view.getScrollTop()
          }, isMobile = (options.mobileCheck || function() {
            return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || window.opera);
          })()) {
            if (element = document.getElementById(options.skrollrBody || id)) {
              transform3DSupported();
            }
            init();
            replace(html, [item, selected], [tmpPath]);
          } else {
            replace(html, [item, count], [tmpPath]);
          }
          view.refresh();
          wrapBlacklistedEventsFromElement(window, "resize orientationchange", function() {
            var w = html.clientWidth;
            var h = html.clientHeight;
            if (h !== eH || w !== eW) {
              eH = h;
              eW = w;
              /** @type {boolean} */
              Wt = true;
            }
          });
          var o = next();
          return !function t() {
            run();
            n = o(t);
          }(), view;
        }
        var self = {
          get : function() {
            return view;
          },
          init : function(b) {
            return view || new render(b);
          },
          VERSION : "0.6.30"
        };
        /** @type {function(this:Object, *): boolean} */
        var hasOwn = Object.prototype.hasOwnProperty;
        var Math = window.Math;
        var getComputedStyle = window.getComputedStyle;
        var html;
        var body;
        /** @type {string} */
        var type = "touchstart";
        /** @type {string} */
        var DOM_MOUSE_SCROLL = "touchmove";
        /** @type {string} */
        var CANCEL_EV = "touchcancel";
        /** @type {string} */
        var RESIZE_EV = "touchend";
        /** @type {string} */
        var index = "skrollable";
        /** @type {string} */
        var a = index + "-before";
        /** @type {string} */
        var lunation = index + "-between";
        /** @type {string} */
        var b = index + "-after";
        /** @type {string} */
        var item = "skrollr";
        /** @type {string} */
        var tmpPath = "no-" + item;
        /** @type {string} */
        var count = item + "-desktop";
        /** @type {string} */
        var selected = item + "-mobile";
        /** @type {string} */
        var easing = "linear";
        /** @type {number} */
        var MULTIVIEW_ANIMATION_DURATION = 1e3;
        /** @type {number} */
        var sx = .004;
        /** @type {string} */
        var id = "skrollr-body";
        /** @type {number} */
        var DEFAULT_DURATION = 200;
        /** @type {string} */
        var root = "start";
        /** @type {string} */
        var baz = "end";
        /** @type {string} */
        var undefined = "center";
        /** @type {string} */
        var none = "bottom";
        /** @type {string} */
        var prop = "___skrollable_id";
        /** @type {!RegExp} */
        var re = /^(?:input|textarea|button|select)$/i;
        /** @type {!RegExp} */
        var _digitExpr = /^\s+|\s+$/g;
        /** @type {!RegExp} */
        var r1 = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/;
        /** @type {!RegExp} */
        var _this2 = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi;
        /** @type {!RegExp} */
        var test = /^(@?[a-z\-]+)\[(\w+)\]$/;
        /** @type {!RegExp} */
        var rbreakright = /-([a-z0-9_])/g;
        /**
         * @param {?} _
         * @param {string} prefix
         * @return {?}
         */
        var guid = function(_, prefix) {
          return prefix.toUpperCase();
        };
        /** @type {!RegExp} */
        var allEscRegex = /[\-+]?[\d]*\.?[\d]+/g;
        /** @type {!RegExp} */
        var multiple_slash_re = /\{\?\}/g;
        /** @type {!RegExp} */
        var paramReplacer = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g;
        /** @type {!RegExp} */
        var rxIds = /[a-z\-]+-gradient/g;
        /** @type {string} */
        var theCSSPrefix = "";
        /** @type {string} */
        var prefix = "";
        /**
         * @return {?}
         */
        var getPrefix = function() {
          /** @type {!RegExp} */
          var rxPrefixes = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
          if (getComputedStyle) {
            var style = getComputedStyle(body, null);
            var k;
            for (k in style) {
              if (theCSSPrefix = k.match(rxPrefixes) || +k == k && style[k].match(rxPrefixes)) {
                break;
              }
            }
            if (!theCSSPrefix) {
              return theCSSPrefix = prefix = "", void 0;
            }
            if ("-" === (theCSSPrefix = theCSSPrefix[0]).slice(0, 1)) {
              prefix = theCSSPrefix;
              theCSSPrefix = {
                "-webkit-" : "webkit",
                "-moz-" : "Moz",
                "-ms-" : "ms",
                "-o-" : "O"
              }[theCSSPrefix];
            } else {
              /** @type {string} */
              prefix = "-" + theCSSPrefix.toLowerCase() + "-";
            }
          }
        };
        /**
         * @return {?}
         */
        var next = function() {
          var next = window.requestAnimationFrame || window[theCSSPrefix.toLowerCase() + "RequestAnimationFrame"];
          /** @type {number} */
          var start = getTime();
          if (isMobile || !next) {
            /**
             * @param {!Function} fn
             * @return {?}
             */
            next = function(fn) {
              /** @type {number} */
              var delta = getTime() - start;
              var renewTokenIn = Math.max(0, 1e3 / 60 - delta);
              return window.setTimeout(function() {
                /** @type {number} */
                start = getTime();
                fn();
              }, renewTokenIn);
            };
          }
          return next;
        };
        /**
         * @return {?}
         */
        var setupRequestAnimationFrame = function() {
          var cancelAnimationFrame = window.cancelAnimationFrame || window[theCSSPrefix.toLowerCase() + "CancelAnimationFrame"];
          if (isMobile || !cancelAnimationFrame) {
            /**
             * @param {!Object} id
             * @return {?}
             */
            cancelAnimationFrame = function(id) {
              return window.clearTimeout(id);
            };
          }
          return cancelAnimationFrame;
        };
        var settings = {
          begin : function() {
            return 0;
          },
          end : function() {
            return 1;
          },
          linear : function(p) {
            return p;
          },
          quadratic : function(value) {
            return value * value;
          },
          cubic : function(y1) {
            return y1 * y1 * y1;
          },
          swing : function(p) {
            return -Math.cos(p * Math.PI) / 2 + .5;
          },
          sqrt : function(n) {
            return Math.sqrt(n);
          },
          outCubic : function(b) {
            return Math.pow(b - 1, 3) + 1;
          },
          bounce : function(b) {
            var right;
            if (b <= .5083) {
              /** @type {number} */
              right = 3;
            } else {
              if (b <= .8489) {
                /** @type {number} */
                right = 9;
              } else {
                if (b <= .96208) {
                  /** @type {number} */
                  right = 27;
                } else {
                  if (b <= .99981) {
                    /** @type {number} */
                    right = 91;
                  } else {
                    return 1;
                  }
                }
              }
            }
            return 1 - Math.abs(3 * Math.cos(b * right * 1.028) / right);
          }
        };
        /**
         * @param {string} results
         * @return {?}
         */
        render.prototype.refresh = function(results) {
          var i;
          var failures;
          /** @type {boolean} */
          var css = false;
          if (results === undefined) {
            /** @type {boolean} */
            css = true;
            /** @type {!Array} */
            cache = [];
            /** @type {number} */
            _sortDepth = 0;
            /** @type {!NodeList<Element>} */
            results = document.getElementsByTagName("*");
          } else {
            if (results.length === undefined) {
              /** @type {!Array} */
              results = [results];
            }
          }
          /** @type {number} */
          i = 0;
          failures = results.length;
          for (; i < failures; i++) {
            var el = results[i];
            var G__26636_26639 = el;
            /** @type {!Array} */
            var commandColumns = [];
            var SOLVE_MODE_STEP = step;
            var name = obj;
            /** @type {boolean} */
            var f = false;
            if (css && prop in el) {
              delete el[prop];
            }
            if (el.attributes) {
              /** @type {number} */
              var value = 0;
              var startLevel = el.attributes.length;
              for (; value < startLevel; value++) {
                var item = el.attributes[value];
                if ("data-anchor-target" !== item.name) {
                  if ("data-smooth-scrolling" !== item.name) {
                    if ("data-edge-strategy" !== item.name) {
                      if ("data-emit-events" !== item.name) {
                        var o = item.name.match(r1);
                        if (null !== o) {
                          var options = {
                            props : item.value,
                            element : el,
                            eventType : item.name.replace(rbreakright, guid)
                          };
                          commandColumns.push(options);
                          var s = o[1];
                          if (s) {
                            options.constant = s.substr(1);
                          }
                          var url = o[2];
                          if (/p$/.test(url)) {
                            /** @type {boolean} */
                            options.isPercentage = true;
                            /** @type {number} */
                            options.offset = (0 | url.slice(0, -1)) / 100;
                          } else {
                            /** @type {number} */
                            options.offset = 0 | url;
                          }
                          var type = o[3];
                          var ta = o[4] || type;
                          if (!type || type === root || type === baz) {
                            if (options.mode = "absolute", type === baz) {
                              /** @type {boolean} */
                              options.isEnd = true;
                            } else {
                              if (!options.isPercentage) {
                                /** @type {number} */
                                options.offset = options.offset * SCALE_NEW_WINDOW_FACTOR;
                              }
                            }
                          } else {
                            /** @type {string} */
                            options.mode = "relative";
                            /** @type {!Array} */
                            options.anchors = [type, ta];
                          }
                        }
                      } else {
                        /** @type {boolean} */
                        f = true;
                      }
                    } else {
                      name = item.value;
                    }
                  } else {
                    /** @type {boolean} */
                    SOLVE_MODE_STEP = "off" !== item.value;
                  }
                } else {
                  if (null === (G__26636_26639 = document.querySelector(item.value))) {
                    throw 'Unable to find anchor target "' + item.value + '"';
                  }
                }
              }
              if (commandColumns.length) {
                var genStyle;
                var drop_el;
                var id;
                if (!css && prop in el) {
                  id = el[prop];
                  genStyle = cache[id].styleAttr;
                  drop_el = cache[id].classAttr;
                } else {
                  /** @type {number} */
                  id = el[prop] = _sortDepth++;
                  genStyle = el.style.cssText;
                  drop_el = $(el);
                }
                cache[id] = {
                  element : el,
                  styleAttr : genStyle,
                  classAttr : drop_el,
                  anchorTarget : G__26636_26639,
                  keyFrames : commandColumns,
                  smoothScrolling : SOLVE_MODE_STEP,
                  edgeStrategy : name,
                  emitEvents : f,
                  lastFrameIndex : -1
                };
                replace(el, [index], []);
              }
            }
          }
          copy();
          /** @type {number} */
          i = 0;
          failures = results.length;
          for (; i < failures; i++) {
            var val = cache[results[i][prop]];
            if (val !== undefined) {
              o(val);
              parseFileDetails(val);
            }
          }
          return view;
        };
        /**
         * @param {!Object} t
         * @param {string} url
         * @param {string} content
         * @return {?}
         */
        render.prototype.relativeToAbsolute = function(t, url, content) {
          var h = html.clientHeight;
          var properties = t.getBoundingClientRect();
          var i = properties.top;
          /** @type {number} */
          var step = properties.bottom - properties.top;
          if (url === none) {
            /** @type {number} */
            i = i - h;
          } else {
            if (url === undefined) {
              /** @type {number} */
              i = i - h / 2;
            }
          }
          if (content === none) {
            i = i + step;
          } else {
            if (content === undefined) {
              i = i + step / 2;
            }
          }
          return (i = i + view.getScrollTop()) + .5 | 0;
        };
        /**
         * @param {number} callback
         * @param {!Object} args
         * @return {?}
         */
        render.prototype.animateTo = function(callback, args) {
          args = args || {};
          /** @type {number} */
          var startTime = getTime();
          var startTopPos = view.getScrollTop();
          var duration = args.duration === undefined ? MULTIVIEW_ANIMATION_DURATION : args.duration;
          if (!(options = {
            startTop : startTopPos,
            topDiff : callback - startTopPos,
            targetTop : callback,
            duration : duration,
            startTime : startTime,
            endTime : startTime + duration,
            easing : settings[args.easing || easing],
            done : args.done
          }).topDiff) {
            if (options.done) {
              options.done.call(view, false);
            }
            /** @type {!Object} */
            options = undefined;
          }
          return view;
        };
        /**
         * @return {undefined}
         */
        render.prototype.stopAnimateTo = function() {
          if (options && options.done) {
            options.done.call(view, true);
          }
          /** @type {!Object} */
          options = undefined;
        };
        /**
         * @return {?}
         */
        render.prototype.isAnimatingTo = function() {
          return !!options;
        };
        /**
         * @return {?}
         */
        render.prototype.isMobile = function() {
          return isMobile;
        };
        /**
         * @param {number} top
         * @param {boolean} mode
         * @return {?}
         */
        render.prototype.setScrollTop = function(top, mode) {
          if (_isEdit = true === mode, isMobile) {
            start = Math.min(Math.max(top, 0), x);
          } else {
            window.scrollTo(0, top);
          }
          return view;
        };
        /**
         * @return {?}
         */
        render.prototype.getScrollTop = function() {
          if (isMobile) {
            return start;
          } else {
            return window.pageYOffset || html.scrollTop || body.scrollTop || 0;
          }
        };
        /**
         * @return {?}
         */
        render.prototype.getMaxScrollTop = function() {
          return x;
        };
        /**
         * @param {string} type
         * @param {string} fn
         * @return {?}
         */
        render.prototype.on = function(type, fn) {
          return results[type] = fn, view;
        };
        /**
         * @param {string} name
         * @return {?}
         */
        render.prototype.off = function(name) {
          return delete results[name], view;
        };
        /**
         * @return {undefined}
         */
        render.prototype.destroy = function() {
          var t;
          setupRequestAnimationFrame()(n);
          clearForcedTemplates();
          replace(html, [tmpPath], [item, count, selected]);
          /** @type {number} */
          var s = 0;
          var size = cache.length;
          for (; s < size; s++) {
            runTest(cache[s].element);
          }
          if (html.style.overflow = body.style.overflow = "", html.style.height = body.style.height = "", element) {
            self.setStyle(element, "transform", "none");
          }
          /** @type {!Object} */
          view = undefined;
          /** @type {!Object} */
          element = undefined;
          /** @type {!Object} */
          results = undefined;
          /** @type {!Object} */
          isModern = undefined;
          /** @type {number} */
          x = 0;
          /** @type {number} */
          SCALE_NEW_WINDOW_FACTOR = 1;
          /** @type {!Object} */
          audio = undefined;
          /** @type {!Object} */
          sy = undefined;
          /** @type {string} */
          direction = "down";
          /** @type {number} */
          lastScrollTop = -1;
          /** @type {number} */
          eW = 0;
          /** @type {number} */
          eH = 0;
          /** @type {boolean} */
          Wt = false;
          /** @type {!Object} */
          options = undefined;
          /** @type {!Object} */
          step = undefined;
          /** @type {!Object} */
          duration = undefined;
          /** @type {!Object} */
          line = undefined;
          /** @type {!Object} */
          _isEdit = undefined;
          /** @type {number} */
          _sortDepth = 0;
          /** @type {!Object} */
          obj = undefined;
          /** @type {boolean} */
          isMobile = false;
          /** @type {number} */
          start = 0;
          /** @type {!Object} */
          value = undefined;
        };
        /**
         * @return {undefined}
         */
        var init = function() {
          var field;
          var canvas_height;
          var canvasWidth;
          var element;
          var height;
          var width;
          var cropHeight;
          var margin;
          var currentNumber;
          var connectNumber;
          var concurency;
          var listBaseIndent;
          wrapBlacklistedEventsFromElement(html, [type, DOM_MOUSE_SCROLL, CANCEL_EV, RESIZE_EV].join(" "), function(e) {
            var target = e.changedTouches[0];
            element = e.target;
            for (; 3 === element.nodeType;) {
              element = element.parentNode;
            }
            if (height = target.clientY, width = target.clientX, connectNumber = e.timeStamp, !re.test(element.tagName)) {
              e.preventDefault();
            }
            switch(e.type) {
              case type:
                if (field) {
                  field.blur();
                }
                view.stopAnimateTo();
                field = element;
                canvas_height = cropHeight = height;
                canvasWidth = width;
                currentNumber = connectNumber;
                break;
              case DOM_MOUSE_SCROLL:
                if (re.test(element.tagName) && document.activeElement !== element) {
                  e.preventDefault();
                }
                /** @type {number} */
                margin = height - cropHeight;
                /** @type {number} */
                listBaseIndent = connectNumber - concurency;
                view.setScrollTop(start - margin, true);
                cropHeight = height;
                concurency = connectNumber;
                break;
              default:
              case CANCEL_EV:
              case RESIZE_EV:
                /** @type {number} */
                var lightJ = canvas_height - height;
                /** @type {number} */
                var lightI = canvasWidth - width;
                var S;
                if (lightI * lightI + lightJ * lightJ < 49) {
                  if (!re.test(field.tagName)) {
                    field.focus();
                    /** @type {(Event|null)} */
                    var ev = document.createEvent("MouseEvents");
                    ev.initMouseEvent("click", true, true, e.view, 1, target.screenX, target.screenY, target.clientX, target.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
                    field.dispatchEvent(ev);
                  }
                  return;
                }
                /** @type {!Object} */
                field = undefined;
                /** @type {number} */
                var value = margin / listBaseIndent;
                value = Math.max(Math.min(value, 3), -3);
                var dt = Math.abs(value / sy);
                /** @type {number} */
                var scale = value * dt + .5 * sy * dt * dt;
                /** @type {number} */
                var y = view.getScrollTop() - scale;
                /** @type {number} */
                var containerWidth = 0;
                if (y > x) {
                  /** @type {number} */
                  containerWidth = (x - y) / scale;
                  y = x;
                } else {
                  if (y < 0) {
                    /** @type {number} */
                    containerWidth = -y / scale;
                    /** @type {number} */
                    y = 0;
                  }
                }
                /** @type {number} */
                dt = dt * (1 - containerWidth);
                view.animateTo(y + .5 | 0, {
                  easing : "outCubic",
                  duration : dt
                });
                break;
            }
          });
          window.scrollTo(0, 0);
          /** @type {string} */
          html.style.overflow = body.style.overflow = "hidden";
        };
        /**
         * @return {undefined}
         */
        var parse = function() {
          var h = html.clientHeight;
          var query = parseQuery();
          var me;
          var c;
          var min;
          var a;
          var i;
          var tableslen;
          var options;
          var j;
          var cacheLen;
          var val;
          var delta;
          /** @type {number} */
          j = 0;
          cacheLen = cache.length;
          for (; j < cacheLen; j++) {
            c = (me = cache[j]).element;
            min = me.anchorTarget;
            /** @type {number} */
            i = 0;
            tableslen = (a = me.keyFrames).length;
            for (; i < tableslen; i++) {
              if (val = (options = a[i]).offset, delta = query[options.constant] || 0, options.frame = val, options.isPercentage) {
                /** @type {number} */
                val = val * h;
                options.frame = val;
              }
              if ("relative" === options.mode) {
                runTest(c);
                /** @type {number} */
                options.frame = view.relativeToAbsolute(min, options.anchors[0], options.anchors[1]) - val;
                runTest(c, true);
              }
              if (options.frame += delta, isModern) {
                if (!options.isEnd && options.frame > x) {
                  x = options.frame;
                }
              }
            }
          }
          x = Math.max(x, func());
          /** @type {number} */
          j = 0;
          cacheLen = cache.length;
          for (; j < cacheLen; j++) {
            /** @type {number} */
            i = 0;
            tableslen = (a = (me = cache[j]).keyFrames).length;
            for (; i < tableslen; i++) {
              if (delta = query[(options = a[i]).constant] || 0, options.isEnd) {
                options.frame = x - options.offset + delta;
              }
            }
            me.keyFrames.sort(sortByIMDBRating);
          }
        };
        /**
         * @param {number} top
         * @param {number} left
         * @return {undefined}
         */
        var hide = function(top, left) {
          /** @type {number} */
          var index = 0;
          var n = cache.length;
          for (; index < n; index++) {
            var options = cache[index];
            var el = options.element;
            var frame = options.smoothScrolling ? top : left;
            var list = options.keyFrames;
            var m = list.length;
            var entry = list[0];
            var event = list[list.length - 1];
            /** @type {boolean} */
            var isUserShare = frame < entry.frame;
            /** @type {boolean} */
            var isGuestShare = frame > event.frame;
            var data = isUserShare ? entry : event;
            var matrix = options.emitEvents;
            var i = options.lastFrameIndex;
            var name;
            var v;
            if (isUserShare || isGuestShare) {
              if (isUserShare && -1 === options.edge || isGuestShare && 1 === options.edge) {
                continue;
              }
              if (isUserShare) {
                if (replace(el, [a], [b, lunation]), matrix && i > -1) {
                  listener(el, entry.eventType, direction);
                  /** @type {number} */
                  options.lastFrameIndex = -1;
                }
              } else {
                if (replace(el, [b], [a, lunation]), matrix && i < m) {
                  listener(el, event.eventType, direction);
                  options.lastFrameIndex = m;
                }
              }
              switch(options.edge = isUserShare ? -1 : 1, options.edgeStrategy) {
                case "reset":
                  runTest(el);
                  continue;
                case "ease":
                  frame = data.frame;
                  break;
                default:
                case "set":
                  var props = data.props;
                  for (name in props) {
                    if (hasOwn.call(props, name)) {
                      if (v = changeType(props[name].value), 0 === name.indexOf("@")) {
                        el.setAttribute(name.substr(1), v);
                      } else {
                        self.setStyle(el, name, v);
                      }
                    }
                  }
                  continue;
              }
            } else {
              if (0 !== options.edge) {
                replace(el, [index, lunation], [a, b]);
                /** @type {number} */
                options.edge = 0;
              }
            }
            /** @type {number} */
            var j = 0;
            for (; j < m - 1; j++) {
              if (frame >= list[j].frame && frame <= list[j + 1].frame) {
                var entry = list[j];
                var event = list[j + 1];
                for (name in entry.props) {
                  if (hasOwn.call(entry.props, name)) {
                    /** @type {number} */
                    var i = (frame - entry.frame) / (event.frame - entry.frame);
                    if (i = entry.props[name].easing(i), v = setGlobalObject(entry.props[name].value, event.props[name].value, i), v = changeType(v), 0 === name.indexOf("@")) {
                      el.setAttribute(name.substr(1), v);
                    } else {
                      self.setStyle(el, name, v);
                    }
                  }
                }
                if (matrix) {
                  if (i !== j) {
                    if ("down" === direction) {
                      listener(el, entry.eventType, direction);
                    } else {
                      listener(el, event.eventType, direction);
                    }
                    /** @type {number} */
                    options.lastFrameIndex = j;
                  }
                }
                break;
              }
            }
          }
        };
        /**
         * @return {undefined}
         */
        var run = function() {
          if (Wt) {
            /** @type {boolean} */
            Wt = false;
            copy();
          }
          var scrollTop = view.getScrollTop();
          var done;
          /** @type {number} */
          var time = getTime();
          var indentation;
          if (options) {
            if (time >= options.endTime) {
              scrollTop = options.targetTop;
              done = options.done;
              /** @type {!Object} */
              options = undefined;
            } else {
              indentation = options.easing((time - options.startTime) / options.duration);
              /** @type {number} */
              scrollTop = options.startTop + indentation * options.topDiff | 0;
            }
            view.setScrollTop(scrollTop, true);
          } else {
            if (!_isEdit) {
              var s;
              if (line.targetTop - scrollTop) {
                line = {
                  startTop : lastScrollTop,
                  topDiff : scrollTop - lastScrollTop,
                  targetTop : scrollTop,
                  startTime : startTime,
                  endTime : startTime + duration
                };
              }
              if (time <= line.endTime) {
                indentation = settings.sqrt((time - line.startTime) / duration);
                /** @type {number} */
                scrollTop = line.startTop + indentation * line.topDiff | 0;
              }
            }
          }
          if (_isEdit || lastScrollTop !== scrollTop) {
            /** @type {boolean} */
            _isEdit = false;
            var controls = {
              curTop : scrollTop,
              lastTop : lastScrollTop,
              maxTop : x,
              direction : direction = scrollTop > lastScrollTop ? "down" : scrollTop < lastScrollTop ? "up" : direction
            };
            var u;
            if (false !== (results.beforerender && results.beforerender.call(view, controls))) {
              if (hide(scrollTop, view.getScrollTop()), isMobile && element) {
                self.setStyle(element, "transform", "translate(0, " + -start + "px) " + value);
              }
              if (lastScrollTop = scrollTop, results.render) {
                results.render.call(view, controls);
              }
            }
            if (done) {
              done.call(view, false);
            }
          }
          /** @type {number} */
          startTime = time;
        };
        /**
         * @param {?} object
         * @return {undefined}
         */
        var o = function(object) {
          /** @type {number} */
          var k = 0;
          var len__ = object.keyFrames.length;
          for (; k < len__; k++) {
            var a = object.keyFrames[k];
            var callback;
            var i;
            var j;
            var props = {};
            var ofs;
            for (; null !== (ofs = _this2.exec(a.props));) {
              if (j = ofs[1], i = ofs[2], null !== (callback = j.match(test))) {
                /** @type {string} */
                j = callback[1];
                /** @type {string} */
                callback = callback[2];
              } else {
                /** @type {string} */
                callback = easing;
              }
              i = i.indexOf("!") ? match(i) : [i.slice(1)];
              props[j] = {
                value : i,
                easing : settings[callback]
              };
            }
            a.props = props;
          }
        };
        /**
         * @param {string} msg
         * @return {?}
         */
        var match = function(msg) {
          /** @type {!Array} */
          var params = [];
          if (paramReplacer.lastIndex = 0, msg = msg.replace(paramReplacer, function(text) {
            return text.replace(allEscRegex, function(canCreateDiscussions) {
              return canCreateDiscussions / 255 * 100 + "%";
            });
          }), prefix) {
            /** @type {number} */
            rxIds.lastIndex = 0;
            msg = msg.replace(rxIds, function(dword) {
              return prefix + dword;
            });
          }
          return msg = msg.replace(allEscRegex, function(b) {
            return params.push(+b), "{?}";
          }), params.unshift(msg), params;
        };
        /**
         * @param {?} parameters
         * @return {undefined}
         */
        var parseFileDetails = function(parameters) {
          var nberr = {};
          var i;
          var tableslen;
          /** @type {number} */
          i = 0;
          tableslen = parameters.keyFrames.length;
          for (; i < tableslen; i++) {
            extend(parameters.keyFrames[i], nberr);
          }
          nberr = {};
          /** @type {number} */
          i = parameters.keyFrames.length - 1;
          for (; i >= 0; i--) {
            extend(parameters.keyFrames[i], nberr);
          }
        };
        /**
         * @param {!Object} o
         * @param {!Array} e
         * @return {undefined}
         */
        var extend = function(o, e) {
          var i;
          for (i in e) {
            if (!hasOwn.call(o.props, i)) {
              o.props[i] = e[i];
            }
          }
          for (i in o.props) {
            e[i] = o.props[i];
          }
        };
        /**
         * @param {!Object} value
         * @param {!Object} buffer
         * @param {number} i
         * @return {?}
         */
        var setGlobalObject = function(value, buffer, i) {
          var index;
          var offset = value.length;
          if (offset !== buffer.length) {
            throw "Can't interpolate between \"" + value[0] + '" and "' + buffer[0] + '"';
          }
          /** @type {!Array} */
          var functionValuesY = [value[0]];
          /** @type {number} */
          index = 1;
          for (; index < offset; index++) {
            functionValuesY[index] = value[index] + (buffer[index] - value[index]) * i;
          }
          return functionValuesY;
        };
        /**
         * @param {!Object} y
         * @return {?}
         */
        var changeType = function(y) {
          /** @type {number} */
          var j = 1;
          return multiple_slash_re.lastIndex = 0, y[0].replace(multiple_slash_re, function() {
            return y[j++];
          });
        };
        /**
         * @param {number} t
         * @param {boolean} highWaterMark
         * @return {undefined}
         */
        var runTest = function(t, highWaterMark) {
          var result;
          var item;
          /** @type {number} */
          var o = 0;
          /** @type {number} */
          var numOverloads = (t = [].concat(t)).length;
          for (; o < numOverloads; o++) {
            if (item = t[o], result = cache[item[prop]]) {
              if (highWaterMark) {
                item.style.cssText = result.dirtyStyleAttr;
                replace(item, result.dirtyClassAttr);
              } else {
                result.dirtyStyleAttr = item.style.cssText;
                result.dirtyClassAttr = $(item);
                item.style.cssText = result.styleAttr;
                replace(item, result.classAttr);
              }
            }
          }
        };
        /**
         * @return {undefined}
         */
        var transform3DSupported = function() {
          /** @type {string} */
          value = "translateZ(0)";
          self.setStyle(element, "transform", value);
          var elementStyle = getComputedStyle(element);
          var authType = elementStyle.getPropertyValue("transform");
          var deploymentsSortOrder = elementStyle.getPropertyValue(prefix + "transform");
          var n;
          if (!(authType && "none" !== authType || deploymentsSortOrder && "none" !== deploymentsSortOrder)) {
            /** @type {string} */
            value = "";
          }
        };
        /**
         * @param {!Element} element
         * @param {string} name
         * @param {number} value
         * @return {undefined}
         */
        self.setStyle = function(element, name, value) {
          var style = element.style;
          if ("zIndex" === (name = name.replace(rbreakright, guid).replace("-", ""))) {
            if (isNaN(value)) {
              /** @type {number} */
              style[name] = value;
            } else {
              /** @type {string} */
              style[name] = "" + (0 | value);
            }
          } else {
            if ("float" === name) {
              style.styleFloat = style.cssFloat = value;
            } else {
              try {
                if (theCSSPrefix) {
                  /** @type {number} */
                  style[theCSSPrefix + name.slice(0, 1).toUpperCase() + name.slice(1)] = value;
                }
                /** @type {number} */
                style[name] = value;
              } catch (t) {
              }
            }
          }
        };
        /** @type {function(!Element, string, !Function): undefined} */
        var wrapBlacklistedEventsFromElement = self.addEvent = function(element, object, callback) {
          /**
           * @param {!Object} event
           * @return {?}
           */
          var eventHandle = function(event) {
            if (!(event = event || window.event).target) {
              event.target = event.srcElement;
            }
            if (!event.preventDefault) {
              /**
               * @return {undefined}
               */
              event.preventDefault = function() {
                /** @type {boolean} */
                event.returnValue = false;
                /** @type {boolean} */
                event.defaultPrevented = true;
              };
            }
            return callback.call(this, event);
          };
          var method;
          /** @type {number} */
          var i = 0;
          var ncells = (object = object.split(" ")).length;
          for (; i < ncells; i++) {
            if (method = object[i], element.addEventListener) {
              element.addEventListener(method, callback, false);
            } else {
              element.attachEvent("on" + method, eventHandle);
            }
            d.push({
              element : element,
              name : method,
              listener : callback
            });
          }
        };
        /** @type {function(!Element, string, ?): undefined} */
        var remove = self.removeEvent = function(el, type, fn) {
          /** @type {number} */
          var i = 0;
          var patchLen = (type = type.split(" ")).length;
          for (; i < patchLen; i++) {
            if (el.removeEventListener) {
              el.removeEventListener(type[i], fn, false);
            } else {
              el.detachEvent("on" + type[i], fn);
            }
          }
        };
        /**
         * @return {undefined}
         */
        var clearForcedTemplates = function() {
          var v;
          /** @type {number} */
          var i = 0;
          var xmaxidx = d.length;
          for (; i < xmaxidx; i++) {
            v = d[i];
            remove(v.element, v.name, v.listener);
          }
          /** @type {!Array} */
          d = [];
        };
        /**
         * @param {?} e
         * @param {?} sender
         * @param {string} name
         * @return {undefined}
         */
        var listener = function(e, sender, name) {
          if (results.keyframe) {
            results.keyframe.call(view, e, sender, name);
          }
        };
        /**
         * @return {undefined}
         */
        var copy = function() {
          var scrollTop = view.getScrollTop();
          if (x = 0, isModern && !isMobile) {
            /** @type {string} */
            body.style.height = "";
          }
          if (parse(), isModern && !isMobile) {
            /** @type {string} */
            body.style.height = x + html.clientHeight + "px";
          }
          if (isMobile) {
            view.setScrollTop(Math.min(view.getScrollTop(), x));
          } else {
            view.setScrollTop(scrollTop, true);
          }
          /** @type {boolean} */
          _isEdit = true;
        };
        /**
         * @return {?}
         */
        var parseQuery = function() {
          var h = html.clientHeight;
          var obj = {};
          var k;
          var v;
          for (k in audio) {
            if ("function" == typeof(v = audio[k])) {
              v = v.call(view);
            } else {
              if (/p$/.test(v)) {
                /** @type {number} */
                v = v.slice(0, -1) / 100 * h;
              }
            }
            obj[k] = v;
          }
          return obj;
        };
        /**
         * @return {?}
         */
        var func = function() {
          /** @type {number} */
          var t1 = 0;
          var e;
          if (element) {
            t1 = Math.max(element.offsetHeight, element.scrollHeight);
          }
          return (e = Math.max(t1, body.scrollHeight, body.offsetHeight, html.scrollHeight, html.offsetHeight, html.clientHeight)) - html.clientHeight;
        };
        /**
         * @param {string} el
         * @return {?}
         */
        var $ = function(el) {
          /** @type {string} */
          var name = "className";
          if (window.SVGElement && el instanceof window.SVGElement) {
            el = el[name];
            /** @type {string} */
            name = "baseVal";
          }
          return el[name];
        };
        /**
         * @param {!Element} el
         * @param {!Array} val
         * @param {!Object} data
         * @return {?}
         */
        var replace = function(el, val, data) {
          /** @type {string} */
          var name = "className";
          if (window.SVGElement && el instanceof window.SVGElement) {
            el = el[name];
            /** @type {string} */
            name = "baseVal";
          }
          if (data === undefined) {
            return el[name] = val, void 0;
          }
          var value = el[name];
          /** @type {number} */
          var j = 0;
          var num_arrays = data.length;
          for (; j < num_arrays; j++) {
            value = filter(value).replace(filter(data[j]), " ");
          }
          value = evaluate(value);
          /** @type {number} */
          var i = 0;
          var newPartNum = val.length;
          for (; i < newPartNum; i++) {
            if (-1 === filter(value).indexOf(filter(val[i]))) {
              value = value + (" " + val[i]);
            }
          }
          el[name] = evaluate(value);
        };
        /**
         * @param {string} item
         * @return {?}
         */
        var evaluate = function(item) {
          return item.replace(_digitExpr, "");
        };
        /**
         * @param {string} inplace
         * @return {?}
         */
        var filter = function(inplace) {
          return " " + inplace + " ";
        };
        /** @type {function(): number} */
        var getTime = Date.now || function() {
          return +new Date;
        };
        /**
         * @param {?} clip
         * @param {?} at_time
         * @return {?}
         */
        var sortByIMDBRating = function(clip, at_time) {
          return clip.frame - at_time.frame;
        };
        var view;
        var cache;
        var element;
        var results;
        var isModern;
        /** @type {number} */
        var x = 0;
        /** @type {number} */
        var SCALE_NEW_WINDOW_FACTOR = 1;
        var audio;
        var sy;
        /** @type {string} */
        var direction = "down";
        /** @type {number} */
        var lastScrollTop = -1;
        /** @type {number} */
        var startTime = getTime();
        /** @type {number} */
        var eW = 0;
        /** @type {number} */
        var eH = 0;
        /** @type {boolean} */
        var Wt = false;
        var options;
        var step;
        var duration;
        var line;
        var _isEdit;
        /** @type {number} */
        var _sortDepth = 0;
        var obj;
        /** @type {boolean} */
        var isMobile = false;
        /** @type {number} */
        var start = 0;
        var value;
        /** @type {!Array} */
        var d = [];
        var n;
        if ("function" == typeof define && define.amd) {
          define([], function() {
            return self;
          });
        } else {
          if (void 0 !== module && module.exports) {
            module.exports = self;
          } else {
            window.skrollr = self;
          }
        }
      }(window, document);
    }).call(window);
  },
  7927 : function(data, linkedEntities, force) {
    /**
     * @param {!Object} data
     * @return {undefined}
     */
    function ZoomPreview(data) {
      this.initialize(data);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    function func(item) {
      if (!window.getComputedStyle) {
        return null;
      }
      /** @type {string} */
      var transform = getComputedStyle(item).transform;
      /** @type {(Array<string>|null)} */
      var rows = /matrix\(([^)]+)\)/.exec(transform);
      if (!rows || rows.length < 2) {
        return null;
      }
      if ((rows = rows[1].split(",")).length < 6) {
        return null;
      } else {
        return {
          a : parseFloat(rows[0], 10),
          b : parseFloat(rows[1], 10),
          c : parseFloat(rows[2], 10),
          d : parseFloat(rows[3], 10),
          tx : parseFloat(rows[4], 10),
          ty : parseFloat(rows[5], 10)
        };
      }
    }
    /**
     * @param {!Window} settings
     * @param {?} title
     * @param {string} e
     * @param {number} width
     * @return {?}
     */
    function callback(settings, title, e, width) {
      var t = func(title);
      /** @type {number} */
      var mx = 0;
      /** @type {number} */
      var actual = 0;
      var y;
      var x;
      if (t && !isNaN(t.tx)) {
        mx = t.tx;
      }
      if (t && !isNaN(t.ty)) {
        actual = t.ty;
      }
      if ("horizontal" === e) {
        y = settings.innerWidth();
        x = mx;
      } else {
        y = settings.innerHeight();
        x = actual;
      }
      return Math.ceil(y * width + x);
    }
    /**
     * @param {!Object} data
     * @return {?}
     */
    function load(data) {
      if (!data && !data.element) {
        return false;
      }
      var currentNick = data.element.getAttribute("data-animation-name");
      if (currentNick && "slidein" === currentNick.toLowerCase()) {
        return true;
      } else {
        return false;
      }
    }
    /**
     * @param {!Object} f
     * @return {?}
     */
    function parse(f) {
      if (!load(f)) {
        return f;
      }
      var a = f.offset;
      if ("string" == typeof a) {
        if (a = parseFloat(a), f.offset.indexOf("%") > -1) {
          /** @type {number} */
          a = a / 100;
        }
      }
      return (f = $.extend({}, f)).offset = function() {
        return callback(this.context, this.element, this.axis, a);
      }, f;
    }
    force(7928);
    /**
     * @param {!Object} options
     * @return {undefined}
     */
    ZoomPreview.prototype.initialize = function route(options) {
      if (!this.waypoint) {
        if (options && options.element && "function" == typeof options.handler) {
          options = parse(options);
          this.waypoint = new Waypoint(options);
        }
      }
    };
    /**
     * @return {undefined}
     */
    ZoomPreview.prototype.destroy = function resume() {
      if (this.waypoint) {
        this.waypoint.destroy();
        /** @type {null} */
        this.waypoint = null;
      }
    };
    /** @type {function(!Object): undefined} */
    window.WaypointAdapter = ZoomPreview;
  },
  7928 : function(formatters, customFormatters) {
    customFormatters = void 0;
    formatters = void 0;
    (function() {
      !function() {
        /**
         * @param {!Object} options
         * @return {undefined}
         */
        function Waypoint(options) {
          if (!options) {
            throw new Error("No options passed to Waypoint constructor");
          }
          if (!options.element) {
            throw new Error("No element option passed to Waypoint constructor");
          }
          if (!options.handler) {
            throw new Error("No handler option passed to Waypoint constructor");
          }
          if (this.key = "waypoint-" + keyCounter, this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options), this.element = this.options.element, this.adapter = new Waypoint.Adapter(this.element), this.callback = options.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = Waypoint.Group.findOrCreate({
            name : this.options.group,
            axis : this.axis
          }), this.context = Waypoint.Context.findOrCreateByElement(this.options.context), Waypoint.offsetAliases[this.options.offset]) {
            this.options.offset = Waypoint.offsetAliases[this.options.offset];
          }
          this.group.add(this);
          this.context.add(this);
          data[this.key] = this;
          keyCounter = keyCounter + 1;
        }
        /** @type {number} */
        var keyCounter = 0;
        var data = {};
        /**
         * @param {?} direction
         * @return {undefined}
         */
        Waypoint.prototype.queueTrigger = function(direction) {
          this.group.queueTrigger(this, direction);
        };
        /**
         * @param {string} value
         * @return {undefined}
         */
        Waypoint.prototype.trigger = function(value) {
          if (this.enabled) {
            if (this.callback) {
              this.callback.apply(this, value);
            }
          }
        };
        /**
         * @return {undefined}
         */
        Waypoint.prototype.destroy = function() {
          this.context.remove(this);
          this.group.remove(this);
          delete data[this.key];
        };
        /**
         * @return {?}
         */
        Waypoint.prototype.disable = function() {
          return this.enabled = false, this;
        };
        /**
         * @return {?}
         */
        Waypoint.prototype.enable = function() {
          return this.context.refresh(), this.enabled = true, this;
        };
        /**
         * @return {?}
         */
        Waypoint.prototype.next = function() {
          return this.group.next(this);
        };
        /**
         * @return {?}
         */
        Waypoint.prototype.previous = function() {
          return this.group.previous(this);
        };
        /**
         * @param {string} method
         * @return {undefined}
         */
        Waypoint.invokeAll = function(method) {
          /** @type {!Array} */
          var result = [];
          var type;
          for (type in data) {
            result.push(data[type]);
          }
          /** @type {number} */
          var i = 0;
          /** @type {number} */
          var length = result.length;
          for (; i < length; i++) {
            result[i][method]();
          }
        };
        /**
         * @return {undefined}
         */
        Waypoint.destroyAll = function() {
          Waypoint.invokeAll("destroy");
        };
        /**
         * @return {undefined}
         */
        Waypoint.disableAll = function() {
          Waypoint.invokeAll("disable");
        };
        /**
         * @return {?}
         */
        Waypoint.enableAll = function() {
          var id;
          for (id in Waypoint.Context.refreshAll(), data) {
            /** @type {boolean} */
            data[id].enabled = true;
          }
          return this;
        };
        /**
         * @return {undefined}
         */
        Waypoint.refreshAll = function() {
          Waypoint.Context.refreshAll();
        };
        /**
         * @return {?}
         */
        Waypoint.viewportHeight = function() {
          return window.innerHeight || document.documentElement.clientHeight;
        };
        /**
         * @return {?}
         */
        Waypoint.viewportWidth = function() {
          return document.documentElement.clientWidth;
        };
        /** @type {!Array} */
        Waypoint.adapters = [];
        Waypoint.defaults = {
          context : window,
          continuous : true,
          enabled : true,
          group : "default",
          horizontal : false,
          offset : 0
        };
        Waypoint.offsetAliases = {
          "bottom-in-view" : function() {
            return this.context.innerHeight() - this.adapter.outerHeight();
          },
          "right-in-view" : function() {
            return this.context.innerWidth() - this.adapter.outerWidth();
          }
        };
        /** @type {function(!Object): undefined} */
        window.Waypoint = Waypoint;
      }();
      (function() {
        /**
         * @param {!Function} fn
         * @return {undefined}
         */
        function init(fn) {
          window.setTimeout(fn, 1e3 / 60);
        }
        /**
         * @param {!Object} element
         * @return {undefined}
         */
        function Context(element) {
          if (this.element = element, this.Adapter = Waypoint.Adapter, this.adapter = new this.Adapter(element), this.key = "waypoint-context-" + keyCounter, this.didScroll = false, this.didResize = false, this.oldScroll = {
            x : this.adapter.scrollLeft(),
            y : this.adapter.scrollTop()
          }, this.waypoints = {
            vertical : {},
            horizontal : {}
          }, element.waypointContextKey = this.key, contexts[element.waypointContextKey] = this, keyCounter = keyCounter + 1, !Waypoint.windowContext) {
            /** @type {boolean} */
            Waypoint.windowContext = true;
            Waypoint.windowContext = new Context(window);
          }
          this.createThrottledScrollHandler();
          this.createThrottledResizeHandler();
        }
        /** @type {number} */
        var keyCounter = 0;
        var contexts = {};
        var Waypoint = window.Waypoint;
        /** @type {function(): undefined} */
        var oldonload = window.onload;
        /**
         * @param {string} data
         * @return {undefined}
         */
        Context.prototype.add = function(data) {
          /** @type {string} */
          var axis = data.options.horizontal ? "horizontal" : "vertical";
          /** @type {string} */
          this.waypoints[axis][data.key] = data;
          this.refresh();
        };
        /**
         * @return {undefined}
         */
        Context.prototype.checkEmpty = function() {
          var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal);
          var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical);
          /** @type {boolean} */
          var isWindow = this.element == this.element.window;
          if (horizontalEmpty && verticalEmpty && !isWindow) {
            this.adapter.off(".waypoints");
            delete contexts[this.key];
          }
        };
        /**
         * @return {undefined}
         */
        Context.prototype.createThrottledResizeHandler = function() {
          /**
           * @return {undefined}
           */
          function resizeHandler() {
            _this.handleResize();
            /** @type {boolean} */
            _this.didResize = false;
          }
          var _this = this;
          this.adapter.on("resize.waypoints", function() {
            if (!_this.didResize) {
              /** @type {boolean} */
              _this.didResize = true;
              Waypoint.requestAnimationFrame(resizeHandler);
            }
          });
        };
        /**
         * @return {undefined}
         */
        Context.prototype.createThrottledScrollHandler = function() {
          /**
           * @return {undefined}
           */
          function scrollHandler() {
            self.handleScroll();
            /** @type {boolean} */
            self.didScroll = false;
          }
          var self = this;
          this.adapter.on("scroll.waypoints", function() {
            if (!self.didScroll || Waypoint.isTouch) {
              /** @type {boolean} */
              self.didScroll = true;
              Waypoint.requestAnimationFrame(scrollHandler);
            }
          });
        };
        /**
         * @return {undefined}
         */
        Context.prototype.handleResize = function() {
          Waypoint.Context.refreshAll();
        };
        /**
         * @return {undefined}
         */
        Context.prototype.handleScroll = function() {
          var triggeredGroups = {};
          var axes = {
            horizontal : {
              newScroll : this.adapter.scrollLeft(),
              oldScroll : this.oldScroll.x,
              forward : "right",
              backward : "left"
            },
            vertical : {
              newScroll : this.adapter.scrollTop(),
              oldScroll : this.oldScroll.y,
              forward : "down",
              backward : "up"
            }
          };
          var i;
          for (i in axes) {
            var axis = axes[i];
            var o;
            var direction = axis.newScroll > axis.oldScroll ? axis.forward : axis.backward;
            var key;
            for (key in this.waypoints[i]) {
              var waypoint = this.waypoints[i][key];
              if (null !== waypoint.triggerPoint) {
                /** @type {boolean} */
                var hasColStyle = axis.oldScroll < waypoint.triggerPoint;
                /** @type {boolean} */
                var hasStyle = axis.newScroll >= waypoint.triggerPoint;
                var f;
                var u;
                if (hasColStyle && hasStyle || !hasColStyle && !hasStyle) {
                  waypoint.queueTrigger(direction);
                  triggeredGroups[waypoint.group.id] = waypoint.group;
                }
              }
            }
          }
          var groupKey;
          for (groupKey in triggeredGroups) {
            triggeredGroups[groupKey].flushTriggers();
          }
          this.oldScroll = {
            x : axes.horizontal.newScroll,
            y : axes.vertical.newScroll
          };
        };
        /**
         * @return {?}
         */
        Context.prototype.innerHeight = function() {
          if (this.element == this.element.window) {
            return Waypoint.viewportHeight();
          } else {
            return this.adapter.innerHeight();
          }
        };
        /**
         * @param {!Object} item
         * @return {undefined}
         */
        Context.prototype.remove = function(item) {
          delete this.waypoints[item.axis][item.key];
          this.checkEmpty();
        };
        /**
         * @return {?}
         */
        Context.prototype.innerWidth = function() {
          if (this.element == this.element.window) {
            return Waypoint.viewportWidth();
          } else {
            return this.adapter.innerWidth();
          }
        };
        /**
         * @return {undefined}
         */
        Context.prototype.destroy = function() {
          /** @type {!Array} */
          var allWaypoints = [];
          var axis;
          for (axis in this.waypoints) {
            var waypointKey;
            for (waypointKey in this.waypoints[axis]) {
              allWaypoints.push(this.waypoints[axis][waypointKey]);
            }
          }
          /** @type {number} */
          var i = 0;
          /** @type {number} */
          var end = allWaypoints.length;
          for (; i < end; i++) {
            allWaypoints[i].destroy();
          }
        };
        /**
         * @return {?}
         */
        Context.prototype.refresh = function() {
          /** @type {boolean} */
          var isWindow = this.element == this.element.window;
          var contextOffset = isWindow ? void 0 : this.adapter.offset();
          var triggeredGroups = {};
          var axes;
          var axisKey;
          for (axisKey in this.handleScroll(), axes = {
            horizontal : {
              contextOffset : isWindow ? 0 : contextOffset.left,
              contextScroll : isWindow ? 0 : this.oldScroll.x,
              contextDimension : this.innerWidth(),
              oldScroll : this.oldScroll.x,
              forward : "right",
              backward : "left",
              offsetProp : "left"
            },
            vertical : {
              contextOffset : isWindow ? 0 : contextOffset.top,
              contextScroll : isWindow ? 0 : this.oldScroll.y,
              contextDimension : this.innerHeight(),
              oldScroll : this.oldScroll.y,
              forward : "down",
              backward : "up",
              offsetProp : "top"
            }
          }) {
            var axis = axes[axisKey];
            var waypointKey;
            for (waypointKey in this.waypoints[axisKey]) {
              var waypoint = this.waypoints[axisKey][waypointKey];
              var adjustment = waypoint.options.offset;
              var oldTriggerPoint = waypoint.triggerPoint;
              /** @type {number} */
              var elementOffset = 0;
              /** @type {boolean} */
              var p = null == oldTriggerPoint;
              var contextModifier;
              var wasBeforeScroll;
              var nowAfterScroll;
              var triggeredBackward;
              var targetUrl;
              if (waypoint.element !== waypoint.element.window) {
                elementOffset = waypoint.adapter.offset()[axis.offsetProp];
              }
              if ("function" == typeof adjustment) {
                adjustment = adjustment.apply(waypoint);
              } else {
                if ("string" == typeof adjustment) {
                  if (adjustment = parseFloat(adjustment), waypoint.options.offset.indexOf("%") > -1) {
                    /** @type {number} */
                    adjustment = Math.ceil(axis.contextDimension * adjustment / 100);
                  }
                }
              }
              if (contextModifier = axis.contextScroll - axis.contextOffset, waypoint.triggerPoint = Math.floor(elementOffset + contextModifier - adjustment), wasBeforeScroll = oldTriggerPoint < axis.oldScroll, nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll, targetUrl = !wasBeforeScroll && !nowAfterScroll, !p && (triggeredBackward = wasBeforeScroll && nowAfterScroll)) {
                waypoint.queueTrigger(axis.backward);
                triggeredGroups[waypoint.group.id] = waypoint.group;
              } else {
                if (!p && targetUrl) {
                  waypoint.queueTrigger(axis.forward);
                  triggeredGroups[waypoint.group.id] = waypoint.group;
                } else {
                  if (p && axis.oldScroll >= waypoint.triggerPoint) {
                    waypoint.queueTrigger(axis.forward);
                    triggeredGroups[waypoint.group.id] = waypoint.group;
                  }
                }
              }
            }
          }
          return Waypoint.requestAnimationFrame(function() {
            var groupKey;
            for (groupKey in triggeredGroups) {
              triggeredGroups[groupKey].flushTriggers();
            }
          }), this;
        };
        /**
         * @param {?} element
         * @return {?}
         */
        Context.findOrCreateByElement = function(element) {
          return Context.findByElement(element) || new Context(element);
        };
        /**
         * @return {undefined}
         */
        Context.refreshAll = function() {
          var id;
          for (id in contexts) {
            contexts[id].refresh();
          }
        };
        /**
         * @param {?} element
         * @return {?}
         */
        Context.findByElement = function(element) {
          return contexts[element.waypointContextKey];
        };
        /**
         * @return {undefined}
         */
        window.onload = function() {
          if (oldonload) {
            oldonload();
          }
          Context.refreshAll();
        };
        /**
         * @param {!Function} fn
         * @return {undefined}
         */
        Waypoint.requestAnimationFrame = function(fn) {
          var i;
          (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || init).call(window, fn);
        };
        /** @type {function(!Object): undefined} */
        Waypoint.Context = Context;
      })();
      (function() {
        /**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function byTriggerPoint(a, b) {
          return a.triggerPoint - b.triggerPoint;
        }
        /**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function byReverseTriggerPoint(a, b) {
          return b.triggerPoint - a.triggerPoint;
        }
        /**
         * @param {!Object} options
         * @return {undefined}
         */
        function Group(options) {
          this.name = options.name;
          this.axis = options.axis;
          /** @type {string} */
          this.id = this.name + "-" + this.axis;
          /** @type {!Array} */
          this.waypoints = [];
          this.clearTriggerQueues();
          groups[this.axis][this.name] = this;
        }
        var groups = {
          vertical : {},
          horizontal : {}
        };
        var Waypoint = window.Waypoint;
        /**
         * @param {string} index
         * @return {undefined}
         */
        Group.prototype.add = function(index) {
          this.waypoints.push(index);
        };
        /**
         * @return {undefined}
         */
        Group.prototype.clearTriggerQueues = function() {
          this.triggerQueues = {
            up : [],
            down : [],
            left : [],
            right : []
          };
        };
        /**
         * @return {undefined}
         */
        Group.prototype.flushTriggers = function() {
          var direction;
          for (direction in this.triggerQueues) {
            var waypoints = this.triggerQueues[direction];
            /** @type {boolean} */
            var reverse = "up" === direction || "left" === direction;
            waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint);
            /** @type {number} */
            var i = 0;
            var end = waypoints.length;
            for (; i < end; i = i + 1) {
              var waypoint = waypoints[i];
              if (waypoint.options.continuous || i === waypoints.length - 1) {
                waypoint.trigger([direction]);
              }
            }
          }
          this.clearTriggerQueues();
        };
        /**
         * @param {string} value
         * @return {?}
         */
        Group.prototype.next = function(value) {
          this.waypoints.sort(byTriggerPoint);
          var index = Waypoint.Adapter.inArray(value, this.waypoints);
          var i;
          return index === this.waypoints.length - 1 ? null : this.waypoints[index + 1];
        };
        /**
         * @param {string} fn
         * @return {?}
         */
        Group.prototype.previous = function(fn) {
          this.waypoints.sort(byTriggerPoint);
          var index = Waypoint.Adapter.inArray(fn, this.waypoints);
          return index ? this.waypoints[index - 1] : null;
        };
        /**
         * @param {?} waypoint
         * @param {?} direction
         * @return {undefined}
         */
        Group.prototype.queueTrigger = function(waypoint, direction) {
          this.triggerQueues[direction].push(waypoint);
        };
        /**
         * @param {string} item
         * @return {undefined}
         */
        Group.prototype.remove = function(item) {
          var index = Waypoint.Adapter.inArray(item, this.waypoints);
          if (index > -1) {
            this.waypoints.splice(index, 1);
          }
        };
        /**
         * @return {?}
         */
        Group.prototype.first = function() {
          return this.waypoints[0];
        };
        /**
         * @return {?}
         */
        Group.prototype.last = function() {
          return this.waypoints[this.waypoints.length - 1];
        };
        /**
         * @param {!Object} options
         * @return {?}
         */
        Group.findOrCreate = function(options) {
          return groups[options.axis][options.name] || new Group(options);
        };
        /** @type {function(!Object): undefined} */
        Waypoint.Group = Group;
      })();
      (function() {
        /**
         * @param {!Object} t
         * @return {?}
         */
        function getComputedStyle(t) {
          return t === t.window;
        }
        /**
         * @param {!Object} obj
         * @return {?}
         */
        function getWindow(obj) {
          if (getComputedStyle(obj)) {
            return obj;
          } else {
            return obj.defaultView;
          }
        }
        /**
         * @param {!Node} element
         * @return {undefined}
         */
        function NoFrameworkAdapter(element) {
          /** @type {!Node} */
          this.element = element;
          this.handlers = {};
        }
        var Waypoint = window.Waypoint;
        /**
         * @return {?}
         */
        NoFrameworkAdapter.prototype.innerHeight = function() {
          var e;
          return getComputedStyle(this.element) ? this.element.innerHeight : this.element.clientHeight;
        };
        /**
         * @return {?}
         */
        NoFrameworkAdapter.prototype.innerWidth = function() {
          var e;
          return getComputedStyle(this.element) ? this.element.innerWidth : this.element.clientWidth;
        };
        /**
         * @param {string} types
         * @param {!Function} selector
         * @return {undefined}
         */
        NoFrameworkAdapter.prototype.off = function(types, selector) {
          /**
           * @param {!Element} o
           * @param {!NodeList} all
           * @param {!Function} key
           * @return {undefined}
           */
          function callback(o, all, key) {
            /** @type {number} */
            var n = 0;
            /** @type {number} */
            var tDeformVecticesLen = all.length - 1;
            for (; n < tDeformVecticesLen; n++) {
              var a = all[n];
              if (!key || key === a) {
                o.removeEventListener(a);
              }
            }
          }
          var split = types.split(".");
          var i = split[0];
          var namespace = split[1];
          var e = this.element;
          if (namespace && this.handlers[namespace] && i) {
            callback(e, this.handlers[namespace][i], selector);
            /** @type {!Array} */
            this.handlers[namespace][i] = [];
          } else {
            if (i) {
              var eventType;
              for (eventType in this.handlers) {
                callback(e, this.handlers[eventType][i] || [], selector);
                /** @type {!Array} */
                this.handlers[eventType][i] = [];
              }
            } else {
              if (namespace && this.handlers[namespace]) {
                var type;
                for (type in this.handlers[namespace]) {
                  callback(e, this.handlers[namespace][type], selector);
                }
                this.handlers[namespace] = {};
              }
            }
          }
        };
        /**
         * @return {?}
         */
        NoFrameworkAdapter.prototype.offset = function() {
          if (!this.element.ownerDocument) {
            return null;
          }
          var doc = this.element.ownerDocument.documentElement;
          var win = getWindow(this.element.ownerDocument);
          var box = {
            top : 0,
            left : 0
          };
          if (this.element.getBoundingClientRect) {
            box = this.element.getBoundingClientRect();
          }
          return {
            top : box.top + win.pageYOffset - doc.clientTop,
            left : box.left + win.pageXOffset - doc.clientLeft
          };
        };
        /**
         * @param {string} type
         * @param {string} fn
         * @return {undefined}
         */
        NoFrameworkAdapter.prototype.on = function(type, fn) {
          var eventParts = type.split(".");
          var eventType = eventParts[0];
          var namespace = eventParts[1] || "__default";
          var eventFactoryViewport = this.handlers[namespace] = this.handlers[namespace] || {};
          var s;
          (eventFactoryViewport[eventType] = eventFactoryViewport[eventType] || []).push(fn);
          this.element.addEventListener(eventType, fn);
        };
        /**
         * @param {boolean} bool
         * @return {?}
         */
        NoFrameworkAdapter.prototype.outerHeight = function(bool) {
          var height = this.innerHeight();
          var style;
          if (bool && !getComputedStyle(this.element)) {
            style = window.getComputedStyle(this.element);
            height = height + parseInt(style.marginTop, 10);
            height = height + parseInt(style.marginBottom, 10);
          }
          return height;
        };
        /**
         * @param {boolean} useMargin
         * @return {?}
         */
        NoFrameworkAdapter.prototype.outerWidth = function(useMargin) {
          var width = this.innerWidth();
          var style;
          if (useMargin && !getComputedStyle(this.element)) {
            style = window.getComputedStyle(this.element);
            width = width + parseInt(style.marginLeft, 10);
            width = width + parseInt(style.marginRight, 10);
          }
          return width;
        };
        /**
         * @return {?}
         */
        NoFrameworkAdapter.prototype.scrollLeft = function() {
          var win = getWindow(this.element);
          return win ? win.pageXOffset : this.element.scrollLeft;
        };
        /**
         * @return {?}
         */
        NoFrameworkAdapter.prototype.scrollTop = function() {
          var win = getWindow(this.element);
          return win ? win.pageYOffset : this.element.scrollTop;
        };
        /**
         * @return {?}
         */
        NoFrameworkAdapter.extend = function() {
          /**
           * @param {!Object} a
           * @param {!Object} r
           * @return {?}
           */
          function merge(a, r) {
            if ("object" == typeof a && "object" == typeof r) {
              var i;
              for (i in r) {
                if (r.hasOwnProperty(i)) {
                  a[i] = r[i];
                }
              }
            }
            return a;
          }
          /** @type {!Array<?>} */
          var streams = Array.prototype.slice.call(arguments);
          /** @type {number} */
          var j = 1;
          /** @type {number} */
          var i = streams.length;
          for (; j < i; j++) {
            merge(streams[0], streams[j]);
          }
          return streams[0];
        };
        /**
         * @param {string} data
         * @param {string} object
         * @param {?} value
         * @return {?}
         */
        NoFrameworkAdapter.inArray = function(data, object, value) {
          return null == object ? -1 : object.indexOf(data, value);
        };
        /**
         * @param {?} object
         * @return {?}
         */
        NoFrameworkAdapter.isEmptyObject = function(object) {
          var name;
          for (name in object) {
            return false;
          }
          return true;
        };
        Waypoint.adapters.push({
          name : "noframework",
          Adapter : NoFrameworkAdapter
        });
        /** @type {function(!Node): undefined} */
        Waypoint.Adapter = NoFrameworkAdapter;
      })();
    }).call(window);
  },
  7929 : function(onerror, define, require) {
    var $ = require(6);
    $(document).ready(function() {
      /**
       * @param {!Object} element
       * @return {?}
       */
      function getHeight(element) {
        return isEmpty() ? 0 : get(element);
      }
      /**
       * @return {?}
       */
      function isEmpty() {
        return a.hasClass("u-overlap");
      }
      /**
       * @param {!Object} placeholder
       * @return {?}
       */
      function get(placeholder) {
        var rect;
        return placeholder[0].getBoundingClientRect().height;
      }
      var o = $("header.u-sticky");
      if (o.length && !o.closest(".u-overlap").length && !CSS.supports("position", "sticky") && !CSS.supports("position", "-webkit-sticky")) {
        o.css("width", "100%");
        /**
         * @return {undefined}
         */
        var render = function() {
          o.each(function() {
            var t = $(this);
            var count = t.height();
            var num = t.data("additionalMargin") || 0;
            if (count !== num) {
              t.data("additionalMargin", count);
              var node = t;
              do {
                node = node.next();
              } while (node.length > 0 && "none" === node.css("display"));
              node.css("margin-top", parseFloat(node.css("margin-top")) - num + count + "px");
            }
          });
        };
        render();
        $(window).load(render);
        $(window).resize(render);
      }
      var a = $(".u-body");
      if (a.hasClass("u-overlap-transparent")) {
        a.data("overlap-transparent", true);
      }
      if (a.hasClass("u-overlap-contrast")) {
        a.data("overlap-contrast", true);
      }
      $(window).scroll(function bindEvents() {
        $("header.u-sticky").each(function() {
          var $element = $(this);
          var areaSatBrightness = $element.nextAll(":visible:first");
          if (areaSatBrightness.length) {
            var offsetTop = areaSatBrightness.offset().top;
            var scrollTop = $element.offset().top;
            var l;
            /** @type {boolean} */
            var isShowingSpinner = scrollTop + getHeight($element) > offsetTop;
            var c;
            if (a.toggleClass("u-sticky-fixed", isShowingSpinner), scrollTop > offsetTop) {
              a.addClass("u-sticky-scroll");
              a.removeClass("u-overlap-transparent u-overlap-contrast");
            } else {
              a.toggleClass("u-overlap-transparent", !!a.data("overlap-transparent"));
              a.toggleClass("u-overlap-contrast", !!a.data("overlap-contrast"));
              a.removeClass("u-sticky-scroll");
            }
          }
        });
      });
    });
  },
  7930 : function(onerror, define, require) {
    /**
     * @param {!Object} props
     * @return {?}
     */
    function link(props) {
      /**
       * @return {undefined}
       */
      function setupACPSearch() {
        /** @type {!Array} */
        result = [];
        var offset = $("html").scrollTop();
        props.each(function() {
          var s = this.getBoundingClientRect();
          result.push({
            height : s.height,
            top : s.top + offset
          });
        });
      }
      /**
       * @param {number} value
       * @return {?}
       */
      function i(value) {
        /** @type {number} */
        var value = 0;
        /** @type {number} */
        var j = 0;
        for (; j < value; j++) {
          var n;
          if (props.eq(j).hasClass(f)) {
            var rect;
            value = value + ((result[j] || {}).height || 0);
          }
        }
        return value;
      }
      /**
       * @return {undefined}
       */
      function n() {
        currentSplitter.refresh();
      }
      /**
       * @return {undefined}
       */
      function init() {
        clearTimeout(_takingTooLongTimeout);
        /** @type {number} */
        _takingTooLongTimeout = setTimeout(function() {
          /** @type {number} */
          var i = 0;
          for (; i < props.length; i++) {
            var n;
            move(props.eq(i));
          }
          setupACPSearch();
          currentSplitter.refresh();
        }, 25);
      }
      /**
       * @param {!Object} item
       * @param {number} pos
       * @param {number} value
       * @return {undefined}
       */
      function add(item, pos, value) {
        if (!(item = $(item)).hasClass(f)) {
          var image = $("<div></div>");
          image.addClass(h);
          image.css("height", pos + "px");
          item.after(image);
          item.addClass(f);
          item.css("top", value + "px");
        }
      }
      /**
       * @param {!Object} item
       * @return {undefined}
       */
      function move(item) {
        (item = $(item)).nextAll("." + h).remove();
        item.removeClass(f);
        item.css("top", "");
      }
      var currentSplitter = {};
      /** @type {!Array} */
      var result = [];
      /** @type {string} */
      var f = "u-sticky-fixed";
      /** @type {string} */
      var h = "u-sticky-placeholder";
      /** @type {null} */
      var _takingTooLongTimeout = null;
      return currentSplitter.init = function init() {
        $(window).on("scroll", n);
        $(window).on("resize", init);
        setupACPSearch();
      }, currentSplitter.destroy = function _eventsOff() {
        $(window).off("scroll", n);
        $(window).off("resize", init);
      }, currentSplitter.refresh = function draw() {
        var y = $("html").scrollTop();
        props.each(function(key, dir) {
          var m = i(key);
          if (y + m > result[key].top) {
            add(dir, result[key].height, m);
          } else {
            move(dir);
          }
        });
      }, currentSplitter;
    }
    var $ = require(6);
    $(window).on("load", function() {
      var t;
      var cell = link($(".u-section-row.u-sticky"));
      cell.init();
      cell.refresh();
    });
    /** @type {function(!Object): ?} */
    window._npStickyStack = link;
  },
  7931 : function(onerror, define, require) {
    var $ = require(6);
    $(function() {
      $(".u-nav-container .u-nav-link").each(function() {
        window._npInitMenuLink($(this));
      });
      $(".u-nav-container-collapse .u-nav-link").each(function() {
        window._npInitMenuLink($(this), true);
      });
    });
    /**
     * @param {!Object} e
     * @param {boolean} value
     * @return {undefined}
     */
    window._npInitMenuLink = function done(e, value) {
      var watch_el = $("body");
      /** @type {!RegExp} */
      var id = /#.*?$/;
      var inputWin = watch_el.attr("data-home-page-name");
      var keyName = watch_el.attr("data-home-page");
      var winRef = $("title").text().trim();
      var $btnFollow = e.closest(".u-menu");
      var varin = $btnFollow.attr("data-submenu-level") || "on-click";
      var arg = $btnFollow.is(".u-menu-mega");
      var f = e.attr("href") || "";
      var home = (e[0].href || "").replace(id, "");
      var key = f.replace(id, "");
      var navigationItem = inputWin || winRef;
      var currentNavigationItem = e.text().trim();
      var history = f.replace(/^[^#]+/, "");
      if (!history || "#" === history || !$(history).length) {
        if (key && window.location.href.toString() === home || currentNavigationItem && navigationItem === currentNavigationItem || keyName && key === keyName) {
          /** @type {!Object} */
          var panel = e;
          if (!arg || value) {
            panel = e.parents(".u-nav-item").children(".u-nav-link");
          }
          if (panel.addClass("active"), "with-reload" === varin && value) {
            panel.siblings(".u-nav-popup").addClass("open").css("max-height", "none");
          }
        }
      }
    };
  },
  7932 : function(onerror, define, require) {
    var $ = require(6);
    var o;
    if ("Microsoft Internet Explorer" === navigator.appName || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || void 0 !== $.browser && 1 === $.browser.msie) {
      $(function() {
        $(".u-social-icons").each(function(canCreateDiscussions, e) {
          var i = $(e);
          var size = i.css("height");
          i.find(".u-svg-link").css("width", size);
        });
      });
    }
  },
  7933 : function(onerror, define, require) {
    var SelectorManager = require(7934);
    window.uAnimation = (new SelectorManager).init();
  },
  7934 : function(module, id, require) {
    /**
     * @return {undefined}
     */
    function Animation() {
      /** @type {null} */
      this.animationElements = null;
      /** @type {!Array} */
      this.animationEvents = [];
      /** @type {null} */
      this._section = null;
      /** @type {null} */
      this._sliderNode = null;
      /** @type {null} */
      this._slideNumber = null;
      /** @type {null} */
      this._slideEvent = null;
      /** @type {null} */
      this._animationInfo = null;
      /** @type {null} */
      this._animation = null;
      /** @type {!Array} */
      this._subscribeQueue = [];
      /** @type {string} */
      this.status = "loading";
      this._onDOMContentLoaded = this._onDOMContentLoaded.bind(this);
      this._onLoadingComplete = this._onLoadingComplete.bind(this);
    }
    /**
     * @param {!Function} opt_logFunction
     * @return {?}
     */
    function init(opt_logFunction) {
      var real_windowOpen = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      if (!real_windowOpen) {
        return opt_logFunction(), void 0;
      }
      real_windowOpen.apply(window, arguments);
    }
    /**
     * @param {!Object} elem
     * @return {?}
     */
    function predicate(elem) {
      return "string" == typeof elem.name && -1 !== related_node_ids.indexOf(elem.name.toLowerCase());
    }
    /**
     * @param {!Object} props
     * @return {?}
     */
    function createElement(props) {
      return "string" == typeof props.direction && -1 !== directions.indexOf(props.direction.toLowerCase());
    }
    /**
     * @param {!HTMLElement} table
     * @param {number} array
     * @return {undefined}
     */
    function resize(table, array) {
      if (array && array.length) {
        if (render()) {
          /** @type {number} */
          var i = 0;
          for (; i < array.length; i++) {
            if (createElement(array[i]) || predicate(array[i])) {
              /** @type {string} */
              table.style.overflow = "hidden";
              break;
            }
          }
        }
      }
    }
    /**
     * @return {?}
     */
    function render() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || navigator.vendor || window.opera);
    }
    var Layer = require(177);
    var input = require(279);
    var mockEvent = require(7935);
    var DB = require(7936);
    var message = require(7937);
    /**
     * @return {?}
     */
    Animation.prototype.init = function WjsProto() {
      if ("loading" !== document.readyState) {
        return this._onDOMContentLoaded(), void 0;
      } else {
        return document.addEventListener("DOMContentLoaded", this._onDOMContentLoaded), this;
      }
    };
    /**
     * @return {undefined}
     */
    Animation.prototype.start = function loadFormattedCourseInput() {
      var deprecatedStylingMethods = this._subscribeQueue;
      init(function() {
        deprecatedStylingMethods.forEach(function(obj) {
          if (obj.event && obj.animation) {
            obj.event.subscribe(obj.animation);
          }
        });
        /** @type {number} */
        deprecatedStylingMethods.length = 0;
      });
    };
    /**
     * @param {!Object} section
     * @return {?}
     */
    Animation.prototype.visitSection = function get(section) {
      if (section.classList.contains("u-carousel")) {
        return this.visitSlider(section), void 0;
      }
      /** @type {!Object} */
      this._section = section;
      this._visitElementsInContentSlider(section);
      this._visitElementsNotInSlider(section);
      /** @type {null} */
      this._section = null;
    };
    /**
     * @param {!Object} context
     * @return {undefined}
     */
    Animation.prototype._visitElementsInContentSlider = function(context) {
      var keywordResults = context.querySelectorAll(".u-carousel");
      /** @type {number} */
      var i = 0;
      for (; i < keywordResults.length; i++) {
        this.visitSlider(keywordResults[i]);
      }
    };
    /**
     * @param {!HTMLElement} value
     * @return {undefined}
     */
    Animation.prototype._visitElementsNotInSlider = function(value) {
      /** @type {!Array} */
      var output = [];
      var crossfilterable_layers = value.querySelectorAll("[data-animation-name]");
      /** @type {number} */
      var layer_i = 0;
      for (; layer_i < crossfilterable_layers.length; layer_i++) {
        var a = crossfilterable_layers[layer_i];
        if (a.closest && null === a.closest(".u-carousel") && a.getAttribute("data-animation-name")) {
          this.visitAnimatedElement(a);
          output.push(this._animationInfo);
          this._subscribeQueue.push({
            animation : this._animation,
            event : mockEvent
          });
          init(this._animation.init.bind(this._animation));
        }
      }
      resize(value, output);
    };
    /**
     * @param {!Object} context
     * @return {undefined}
     */
    Animation.prototype.visitSlider = function restore_test_input(context) {
      /** @type {!Object} */
      this._sliderNode = context;
      var crossfilterable_layers = context.querySelectorAll(".u-carousel-item");
      /** @type {number} */
      var layer_i = 0;
      for (; layer_i < crossfilterable_layers.length; layer_i++) {
        /** @type {number} */
        this._slideNumber = layer_i;
        this.visitSlide(crossfilterable_layers[layer_i]);
      }
    };
    /**
     * @param {!HTMLElement} options
     * @return {undefined}
     */
    Animation.prototype.visitSlide = function update(options) {
      var dataConnRdoBtn = options.querySelectorAll("[data-animation-name]");
      /** @type {!Array} */
      var output = [];
      this._slideEvent = new DB(this._sliderNode, options, this._slideNumber);
      /** @type {number} */
      var i = 0;
      for (; i < dataConnRdoBtn.length; i++) {
        if (dataConnRdoBtn[i].getAttribute("data-animation-name")) {
          this.visitAnimatedElement(dataConnRdoBtn[i]);
          output.push(this._animationInfo);
          this._animation.init();
          this._slideEvent.animations.push(this._animation);
        }
      }
      this._slideEvent.init();
      resize(options, output);
    };
    /**
     * @param {string} name
     * @return {undefined}
     */
    Animation.prototype.visitAnimatedElement = function Viewer(name) {
      this._animationInfo = new Layer(name, this._section);
      this._animation = input.createAnimation(this._animationInfo);
      this.animationElements.push(this._animation);
    };
    /**
     * @return {?}
     */
    Animation.prototype._onDOMContentLoaded = function() {
      if (this.status = "DOMContentLoaded", document.removeEventListener("DOMContentLoaded", this._onDOMContentLoaded), !this.animationElements) {
        /** @type {!Array} */
        this.animationElements = [];
        input.setHint(message);
        var sections = $("section, header, footer");
        var sectionLength = sections.length;
        if (sections.each(function(index, childSection) {
          if (this.visitSection(childSection), !--sectionLength) {
            input.setHint(null);
          }
        }.bind(this)), "interactive" !== document.readyState) {
          return this._onLoadingComplete(), void 0;
        }
        window.addEventListener("load", this._onLoadingComplete);
      }
    };
    /**
     * @return {undefined}
     */
    Animation.prototype._onLoadingComplete = function() {
      /** @type {string} */
      this.status = "complete";
      window.removeEventListener("load", this._onLoadingComplete);
      this.start();
    };
    /** @type {!Array} */
    var related_node_ids = ["lightspeedin", "flipin", "flipout"];
    /** @type {!Array} */
    var directions = ["right", "downright", "upright"];
    /** @type {function(): undefined} */
    module.exports = Animation;
    /** @type {function(): undefined} */
    window.Animation = Animation;
  },
  7935 : function(t, xgh2, xgh3) {
    /**
     * @param {!Object} self
     * @return {undefined}
     */
    function init(self) {
      if (self.start(), !self.isInOutAnimation() && !self.info.infinite) {
        var duration = self.info.duration;
        var delay = self.info.delay;
        setTimeout(function() {
          self.clear();
        }, duration + delay);
      }
    }
    /**
     * @param {!Object} callback
     * @return {undefined}
     */
    function ajaxSaveCaseExecution(callback) {
      if (callback.isInOutAnimation()) {
        callback.startOut();
      }
    }
    var user = {
      subscribe : function Node(opts) {
        var query = opts && opts.info || {};
        var this_area = query.section || query.element;
        opts.info.eventObject = new WaypointAdapter({
          element : this_area,
          handler : function(name) {
            if (opts) {
              if ("up" === name) {
                return ajaxSaveCaseExecution(opts), void 0;
              } else {
                return init(opts), void 0;
              }
            }
          },
          offset : "70%"
        });
      }
    };
    t.exports = user;
    window.AnimationEventScroll = user;
  },
  7936 : function(module, selector, convertToImages) {
    /**
     * @param {string} target
     * @param {?} element
     * @param {?} options
     * @return {undefined}
     */
    function Carousel(target, element, options) {
      this.carousel = $(target);
      this.slide = $(element);
      this.slideNum = options;
      /** @type {!Array} */
      this.animations = [];
      /** @type {!Array} */
      this._delays = [];
      /** @type {boolean} */
      this._autoplayPaused = false;
      this._handleSlide = layout_ondblclick.bind(this);
      this._handleSlid = a.bind(this);
    }
    /**
     * @param {!Object} event
     * @return {undefined}
     */
    function layout_ondblclick(event) {
      if (event) {
        if (event.from === this.slideNum) {
          this.slideOut(event);
        }
      }
    }
    /**
     * @param {!Object} state
     * @return {undefined}
     */
    function a(state) {
      if (state && state.to === this.slideNum) {
        this.pauseAutoplayWhileInAnimation();
        this.startInAnimation();
      }
    }
    /**
     * @return {undefined}
     */
    Carousel.prototype.init = function initialize() {
      if ($(this.carousel).on("u-slide.bs.u-carousel", this._handleSlide), $(this.carousel).on("slid.bs.u-carousel", this._handleSlid), this.slide.is(".u-active")) {
        if (this._isAutoplayOnStart()) {
          this.pauseAutoplayWhileInAnimation();
        }
        this.startInAnimation();
      }
    };
    /**
     * @return {undefined}
     */
    Carousel.prototype.deinit = function unbindKeypress() {
      $(this.carousel).off("slid.bs.u-carousel", this._handleSlid);
      $(this.carousel).off("u-slide.bs.u-carousel", this._handleSlide);
    };
    /**
     * @return {undefined}
     */
    Carousel.prototype.resetAnimations = function init() {
      /** @type {number} */
      var i = 0;
      for (; i < this.animations.length; i++) {
        if (this.animations[i].reset) {
          this.animations[i].reset();
        }
      }
    };
    /**
     * @return {undefined}
     */
    Carousel.prototype.pauseAutoplayWhileInAnimation = function start() {
      var callback = this.countMaxInAnimationTime();
      if (callback > 0) {
        this._pauseAutoplay();
        this._delay(callback, function() {
          this._continueAutoplay();
          this._clearDelays();
        }.bind(this));
      }
    };
    /**
     * @return {undefined}
     */
    Carousel.prototype.startInAnimation = function spawn() {
      this.animations.forEach(function(thisWalker) {
        thisWalker.start();
      }.bind(this));
    };
    /**
     * @return {?}
     */
    Carousel.prototype.needOutAnimation = function lookup() {
      /** @type {number} */
      var i = 0;
      var lng = this.animations.length;
      for (; i < lng; i++) {
        if (this.animations[i].needOutAnimation && this.animations[i].needOutAnimation()) {
          return true;
        }
      }
      return false;
    };
    /**
     * @return {undefined}
     */
    Carousel.prototype.startOutAnimations = function handleHoverHit() {
      /** @type {number} */
      var i = 0;
      for (; i < this.animations.length; i++) {
        if (this.animations[i].startOut) {
          this.animations[i].startOut();
        }
      }
    };
    /**
     * @return {?}
     */
    Carousel.prototype.countMaxOutAnimationTime = function init() {
      if (!this.animations || !this.animations.length) {
        return 0;
      }
      var searchPipeline = this.animations.map(function(preferences) {
        return preferences.getOutTime();
      });
      return Math.max.apply(null, searchPipeline);
    };
    /**
     * @return {?}
     */
    Carousel.prototype.countMaxInAnimationTime = function init() {
      if (!this.animations || !this.animations.length) {
        return 0;
      }
      var searchPipeline = this.animations.map(function(a_big_year) {
        return a_big_year.getTime();
      });
      return Math.max.apply(null, searchPipeline);
    };
    /**
     * @param {!Object} event
     * @return {?}
     */
    Carousel.prototype.slideOut = function init(event) {
      if (this._delays.length > 0) {
        this._cancelDelays();
      }
      if (this._continueAutoplay(), !this.needOutAnimation()) {
        return this.resetAnimations(), void 0;
      }
      event.preventDefault();
      var ngiScroll_timeout = this.countMaxOutAnimationTime();
      /** @type {(null|number)} */
      var n = "number" == typeof event.to ? event.to : null;
      var direction = event.direction;
      setTimeout(function() {
        if (this.resetAnimations(), null !== n) {
          return $(event.target)["u-carousel"](n), void 0;
        }
        if ("left" === direction) {
          return $(event.target)["u-carousel"]("next"), void 0;
        }
        if ("right" === direction) {
          $(event.target)["u-carousel"]("prev");
        }
      }.bind(this), ngiScroll_timeout);
      this.startOutAnimations();
    };
    /**
     * @param {?} next
     * @param {!Function} parse
     * @return {undefined}
     */
    Carousel.prototype._delay = function read(next, parse) {
      this._delays.push(setTimeout(function() {
        parse();
      }, next));
    };
    /**
     * @return {undefined}
     */
    Carousel.prototype._cancelDelays = function setChatBubble() {
      this._delays.forEach(function(id) {
        clearTimeout(id);
      });
      /** @type {number} */
      this._delays.length = 0;
    };
    /**
     * @return {undefined}
     */
    Carousel.prototype._clearDelays = function writeTextArgs() {
      /** @type {number} */
      this._delays.length = 0;
    };
    /**
     * @return {?}
     */
    Carousel.prototype._isAutoplayOnStart = function clickHandler() {
      var currentNick = this.carousel.attr("data-u-ride");
      if (!currentNick) {
        return false;
      } else {
        return "carousel" === (currentNick = currentNick.toLowerCase());
      }
    };
    /**
     * @return {undefined}
     */
    Carousel.prototype._pauseAutoplay = function init() {
      this.carousel["u-carousel"]("pause");
      /** @type {boolean} */
      this._autoplayPaused = true;
    };
    /**
     * @return {undefined}
     */
    Carousel.prototype._continueAutoplay = function Animation() {
      if (this._autoplayPaused) {
        this.carousel["u-carousel"]("cycle");
        /** @type {boolean} */
        this._autoplayPaused = false;
      }
    };
    /** @type {function(string, ?, ?): undefined} */
    module.exports = Carousel;
    /** @type {function(string, ?, ?): undefined} */
    window.AnimationEventSlider = Carousel;
  },
  7937 : function(module, selector, convertToImages) {
    /**
     * @param {!Object} data
     * @return {?}
     */
    function init(data) {
      /** @type {!Array} */
      var text = [];
      if (-1 !== actions.indexOf(data.name) || data.direction) {
        text.push("transform");
      }
      if (-1 !== methods.indexOf(data.name)) {
        text.push("opacity");
      }
      if (-1 !== l.indexOf(data.name)) {
        text.push("contents");
      }
      if (0 === text.length) {
        text.push("auto");
      }
      return text.join(", ");
    }
    var self = {};
    /** @type {!Array} */
    var actions = ["bounce", "headShake", "heartBeat", "jello", "pulse", "rubberBand", "shake", "swing", "tada", "wobble", "bounceIn", "flip", "flipInX", "flipInY", "flipOutX", "flipOutY", "lightSpeedIn", "rotateIn", "slideIn", "hinge", "jackInTheBox", "rollIn", "zoomIn", "customAnimationIn", "customAnimationOut"];
    /** @type {!Array} */
    var methods = ["flash", "bounceIn", "fadeIn", "flipInX", "flipInY", "flipOutX", "flipOutY", "lightSpeedIn", "rotateIn", "hinge", "jackInTheBox", "rollIn", "zoomIn", "customAnimationIn", "customAnimationOut"];
    /** @type {!Array} */
    var l = ["counter"];
    /**
     * @param {!Object} line
     * @return {undefined}
     */
    self.hintBrowser = function imageTargetFinish(line) {
      if (line && line.element) {
        line.element.style.willChange = init(line);
      }
    };
    /**
     * @param {!Object} event
     * @return {undefined}
     */
    self.removeHint = function imageTargetFinish(event) {
      /** @type {string} */
      event.element.style.willChange = "auto";
    };
    module.exports = self;
    window.WillChangeHint = self;
  },
  7938 : function(onerror, define, require) {
    /**
     * @return {undefined}
     */
    function Plugin() {
    }
    var $ = require(6);
    /**
     * @param {!Object} step
     * @return {undefined}
     */
    Plugin.prototype.scroll = function(step) {
      var menuHeight = $(".u-sticky").toArray().reduce(function(canCreateDiscussions, elemSelector) {
        return canCreateDiscussions + ($(elemSelector).outerHeight(true) || 0);
      }, 0);
      $("html, body").animate({
        scrollTop : step.offset().top - menuHeight
      });
    };
    /**
     * @return {undefined}
     */
    Plugin.prototype.scrollTop = function() {
      $("html, body").animate({
        scrollTop : 0
      });
    };
    /**
     * @param {!Object} e
     * @return {undefined}
     */
    Plugin.prototype.update = function(e) {
      var value = "string" == typeof e ? e : $(e.currentTarget).attr("href");
      if ((value = (value || "").replace(/^[^#]+/, "")).match(/^#[\d\w-_]+$/i)) {
        var day = $(value);
        if (day.length) {
          if (e.preventDefault) {
            e.preventDefault();
          }
          this.scroll(day);
        }
      }
    };
    window._npScrollAnchor = new Plugin;
    $(window).on("load", function() {
      window._npScrollAnchor.update(window.location.hash);
      $("body").on("click", "a:not([data-u-slide], [data-u-slide-to], [data-toggle], .u-tab-link, .u-quantity-button)", function(t) {
        if (!$(this).is(".u-dialog-link")) {
          window._npScrollAnchor.update(t);
        }
      });
      $("body").on("click", ".u-back-to-top", function() {
        window._npScrollAnchor.scrollTop();
      });
    });
  },
  7939 : function(willFail, result, return_function) {
    var util_pref_li = return_function(6);
    var res = return_function(7940);
    /** @type {string} */
    var command = "u-gdpr-cookie";
    /** @type {string} */
    var _nav_buttons = "u-cookies-consent";
    /** @type {string} */
    var ii = "u-button-confirm";
    /** @type {string} */
    var k = "u-button-decline";
    /** @type {string} */
    var shouldHydrateName = "_u_GDPRConfirmCode";
    util_pref_li(function() {
      var enabled;
      try {
        enabled = res.get(command);
      } catch (e) {
        /** @type {boolean} */
        enabled = false;
      }
      var gotoNewOfflinePage = window[shouldHydrateName] || function() {
      };
      if (!enabled) {
        var data = util_pref_li("." + _nav_buttons);
        data.addClass("show");
        data.find("." + ii).on("click", function(event) {
          event.preventDefault();
          res.set(command, true, {
            expires : 365,
            secure : true
          });
          data.removeClass("show");
          gotoNewOfflinePage();
        });
        data.find("." + k).on("click", function(event) {
          event.preventDefault();
          res.set(command, false, {
            expires : 365,
            secure : false
          });
          data.removeClass("show");
        });
      } else {
        if ("true" === enabled) {
          gotoNewOfflinePage();
        }
      }
    });
  },
  7940 : function(root, n, e) {
    var exports;
    var Codd;
    !function(factory) {
      var a;
      if (true) {
        !(void 0 !== (Codd = "function" == typeof(exports = factory) ? exports.call(n, e, n, root) : exports) && (root.exports = Codd));
        /** @type {boolean} */
        a = true;
      }
      if (true) {
        root.exports = factory();
        /** @type {boolean} */
        a = true;
      }
      if (!a) {
        var OldCookies = window.Cookies;
        var Simg = window.Cookies = factory();
        /**
         * @return {?}
         */
        Simg.noConflict = function() {
          return window.Cookies = OldCookies, Simg;
        };
      }
    }(function() {
      /**
       * @return {?}
       */
      function extend() {
        /** @type {number} */
        var i = 0;
        var obj = {};
        for (; i < arguments.length; i++) {
          var source = arguments[i];
          var prop;
          for (prop in source) {
            obj[prop] = source[prop];
          }
        }
        return obj;
      }
      /**
       * @param {string} name
       * @return {?}
       */
      function get(name) {
        return name.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
      }
      /**
       * @param {!Object} options
       * @return {?}
       */
      function init(options) {
        /**
         * @return {undefined}
         */
        function api() {
        }
        /**
         * @param {string} key
         * @param {string} value
         * @param {!Object} props
         * @return {?}
         */
        function set(key, value, props) {
          if ("undefined" != typeof document) {
            if ("number" == typeof(props = extend({
              path : "/"
            }, api.defaults, props)).expires) {
              /** @type {!Date} */
              props.expires = new Date(1 * new Date + 864e5 * props.expires);
            }
            props.expires = props.expires ? props.expires.toUTCString() : "";
            try {
              /** @type {string} */
              var s = JSON.stringify(value);
              if (/^[\{\[]/.test(s)) {
                /** @type {string} */
                value = s;
              }
            } catch (t) {
            }
            value = options.write ? options.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
            /** @type {string} */
            key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
            /** @type {string} */
            var prefix = "";
            var i;
            for (i in props) {
              if (props[i]) {
                if (prefix = prefix + ("; " + i), true !== props[i]) {
                  /** @type {string} */
                  prefix = prefix + ("=" + props[i].split(";")[0]);
                }
              }
            }
            return document.cookie = key + "=" + value + prefix;
          }
        }
        /**
         * @param {!Object} name
         * @param {boolean} t
         * @return {?}
         */
        function parse(name, t) {
          if ("undefined" != typeof document) {
            var data = {};
            /** @type {!Array} */
            var paramsSplit = document.cookie ? document.cookie.split("; ") : [];
            /** @type {number} */
            var i = 0;
            for (; i < paramsSplit.length; i++) {
              var deps = paramsSplit[i].split("=");
              var label = deps.slice(1).join("=");
              if (!t && '"' === label.charAt(0)) {
                label = label.slice(1, -1);
              }
              try {
                var id = get(deps[0]);
                if (label = (options.read || options)(label, id) || get(label), t) {
                  try {
                    /** @type {*} */
                    label = JSON.parse(label);
                  } catch (t) {
                  }
                }
                if (data[id] = label, name === id) {
                  break;
                }
              } catch (t) {
              }
            }
            return name ? data[name] : data;
          }
        }
        return api.set = set, api.get = function(key) {
          return parse(key, false);
        }, api.getJSON = function(name) {
          return parse(name, true);
        }, api.remove = function(item, klass) {
          set(item, "", extend(klass, {
            expires : -1
          }));
        }, api.defaults = {}, api.withConverter = init, api;
      }
      return init(function() {
      });
    });
  },
  7941 : function(branchData, beforeZero, afterZero) {
    $(function() {
      /** @type {string} */
      var scrollup = ".u-back-to-top";
      $(scrollup).hide();
      $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
          $(scrollup).fadeIn().css("display", "block");
        } else {
          $(scrollup).fadeOut();
        }
      });
    });
  },
  7942 : function(onerror, define, require) {
    var $ = require(6);
    var callback = require(7943);
    /**
     * @return {undefined}
     */
    window._npScrollSpyInit = function() {
      /** @type {string} */
      var query = '.u-menu .u-nav-container .u-nav-link[href*="#"]';
      /** @type {string} */
      var credential_list = '.u-menu .u-nav-container-collapse .u-nav-link[href*="#"]';
      var i;
      if (document.querySelectorAll(query).length) {
        try {
          callback(query, {
            nested : true,
            offset : function() {
              return $(".u-header.u-sticky").outerHeight(true) || 0;
            }
          });
          callback(credential_list, {
            nested : true,
            offset : function() {
              return $(".u-header.u-sticky").outerHeight(true) || 0;
            }
          });
        } catch (t) {
          console.warn("ScrollSpy: has no items");
        }
      }
    };
    document.addEventListener("gumshoeActivate", function(event) {
      var link;
      event.detail.link.classList.add("active");
    }, false);
    document.addEventListener("gumshoeDeactivate", function(event) {
      var link;
      event.detail.link.classList.remove("active");
    }, false);
    $(function() {
      window._npScrollSpyInit();
    });
  },
  7943 : function(global, obj, generator) {
    (function(undefined) {
      var result;
      var o;
      !function(window, factory) {
        if (true) {
          !(void 0 !== (o = function() {
            return factory(window);
          }.apply(obj, result = [])) && (global.exports = o));
        } else {
          if ("object" == typeof obj) {
            global.exports = factory(window);
          } else {
            window.Gumshoe = factory(window);
          }
        }
      }(void 0 !== undefined ? undefined : "undefined" != typeof window ? window : this, function(window) {
        var data = {
          navClass : "active",
          contentClass : "active",
          nested : false,
          nestedClass : "active",
          offset : 0,
          reflow : false,
          events : true
        };
        /**
         * @return {?}
         */
        var wrap = function() {
          var result = {};
          return Array.prototype.forEach.call(arguments, function(vals) {
            var i;
            for (i in vals) {
              if (vals.hasOwnProperty(i)) {
                result[i] = vals[i];
              }
            }
          }), result;
        };
        /**
         * @param {string} name
         * @param {!EventTarget} widget
         * @param {!Object} data
         * @return {undefined}
         */
        var select = function(name, widget, data) {
          if (data.settings.events) {
            /** @type {!CustomEvent} */
            var event = new CustomEvent(name, {
              bubbles : true,
              cancelable : true,
              detail : data
            });
            widget.dispatchEvent(event);
          }
        };
        /**
         * @param {!Node} el
         * @return {?}
         */
        var positionHighlight = function(el) {
          /** @type {number} */
          var tmp = 0;
          if (el.offsetParent) {
            for (; el;) {
              tmp = tmp + el.offsetTop;
              el = el.offsetParent;
            }
          }
          return tmp >= 0 ? tmp : 0;
        };
        /**
         * @param {!Array} keys
         * @return {undefined}
         */
        var lookup = function(keys) {
          if (keys) {
            keys.sort(function(e, mockRequestContext) {
              var i;
              var n;
              if (positionHighlight(e.content) < positionHighlight(mockRequestContext.content)) {
                return -1;
              } else {
                return 1;
              }
            });
          }
        };
        /**
         * @param {!Object} item
         * @return {?}
         */
        var getCount = function(item) {
          if ("function" == typeof item.offset) {
            return parseFloat(item.offset());
          } else {
            return parseFloat(item.offset);
          }
        };
        /**
         * @return {?}
         */
        var elementFromPoint = function() {
          return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
        };
        /**
         * @param {!Element} elem
         * @param {!Object} query
         * @param {boolean} checkXhr2
         * @return {?}
         */
        var update = function(elem, query, checkXhr2) {
          var n = elem.getBoundingClientRect();
          var count = getCount(query);
          if (checkXhr2) {
            return parseInt(n.bottom, 10) < (window.innerHeight || document.documentElement.clientHeight);
          } else {
            return parseInt(n.top, 10) <= count;
          }
        };
        /**
         * @return {?}
         */
        var isVisible = function() {
          if (window.innerHeight + window.pageYOffset >= elementFromPoint()) {
            return true;
          } else {
            return false;
          }
        };
        /**
         * @param {!Object} action
         * @param {!Object} query
         * @return {?}
         */
        var get = function(action, query) {
          if (isVisible() && update(action.content, query, true)) {
            return true;
          } else {
            return false;
          }
        };
        /**
         * @param {!Array} text
         * @param {!Object} query
         * @return {?}
         */
        var save = function(text, query) {
          if (text.length) {
            var d = text[text.length - 1];
            if (get(d, query)) {
              return d;
            }
            /** @type {number} */
            var p = text.length - 1;
            for (; p >= 0; p--) {
              if (update(text[p].content, query)) {
                return text[p];
              }
            }
          }
        };
        /**
         * @param {!Node} node
         * @param {!Object} opts
         * @return {undefined}
         */
        var f = function(node, opts) {
          if (opts.nested && node.parentNode) {
            var div = node.parentNode.closest("li");
            if (div) {
              div.classList.remove(opts.nestedClass);
              f(div, opts);
            }
          }
        };
        /**
         * @param {!Node} el
         * @param {!Object} options
         * @return {undefined}
         */
        var create = function(el, options) {
          if (el) {
            var parent = el.nav.closest("li");
            if (parent) {
              parent.classList.remove(options.navClass);
              el.content.classList.remove(options.contentClass);
              f(parent, options);
              select("gumshoeDeactivate", parent, {
                link : el.nav,
                content : el.content,
                settings : options
              });
            }
          }
        };
        /**
         * @param {!Node} options
         * @param {!Object} model
         * @return {undefined}
         */
        var add = function(options, model) {
          if (model.nested) {
            var t = options.parentNode.closest("li");
            if (t) {
              t.classList.add(model.nestedClass);
              add(t, model);
            }
          }
        };
        /**
         * @param {!Node} el
         * @param {!Object} options
         * @return {undefined}
         */
        var init = function(el, options) {
          if (el) {
            var data = el.nav.closest("li");
            if (data) {
              data.classList.add(options.navClass);
              el.content.classList.add(options.contentClass);
              add(data, options);
              select("gumshoeActivate", data, {
                link : el.nav,
                content : el.content,
                settings : options
              });
            }
          }
        };
        var y;
        return function(selector, n) {
          var self = {};
          var elList;
          var app;
          var data;
          var rAFId;
          var cb;
          /**
           * @return {undefined}
           */
          self.setup = function() {
            /** @type {!NodeList<Element>} */
            elList = document.querySelectorAll(selector);
            /** @type {!Array} */
            app = [];
            Array.prototype.forEach.call(elList, function(data) {
              /** @type {(Element|null)} */
              var nirXml = document.getElementById(decodeURIComponent(data.hash.substr(1)));
              if (nirXml) {
                app.push({
                  nav : data,
                  content : nirXml
                });
              }
            });
            lookup(app);
          };
          /**
           * @return {undefined}
           */
          self.detect = function() {
            var res = save(app, cb);
            if (res) {
              if (!data || res.content !== data.content) {
                create(data, cb);
                init(res, cb);
                data = res;
              }
            } else {
              if (data) {
                create(data, cb);
                /** @type {null} */
                data = null;
              }
            }
          };
          /**
           * @return {undefined}
           */
          var scheduleResponsiveRedraw = function() {
            if (rAFId) {
              window.cancelAnimationFrame(rAFId);
            }
            rAFId = window.requestAnimationFrame(self.detect);
          };
          /**
           * @return {undefined}
           */
          var init = function() {
            if (rAFId) {
              window.cancelAnimationFrame(rAFId);
            }
            rAFId = window.requestAnimationFrame(function() {
              lookup(app);
              self.detect();
            });
          };
          var delegate;
          return self.destroy = function() {
            if (data) {
              create(data, cb);
            }
            if (window.removeEventListener("scroll", scheduleResponsiveRedraw, false), cb.reflow) {
              window.removeEventListener("resize", init, false);
            }
            /** @type {null} */
            app = null;
            /** @type {null} */
            elList = null;
            /** @type {null} */
            data = null;
            /** @type {null} */
            rAFId = null;
            /** @type {null} */
            cb = null;
          }, function() {
            if (cb = wrap(data, n || {}), self.setup(), self.detect(), window.addEventListener("scroll", scheduleResponsiveRedraw, false), cb.reflow) {
              window.addEventListener("resize", init, false);
            }
          }(), self;
        };
      });
    }).call(obj, generator(40));
  },
  7944 : function(value, global, Symbol) {
    var S = Symbol(6);
    var topLevelContextSymbol = Symbol(7945);
    var SelectionWatcher = Symbol(201);
    S(window).on("load", function() {
      setTimeout(function() {
        S(".u-gallery").removeClass("u-no-transition");
        S(".u-layout-horizontal").each(function() {
          var element = S(this);
          var obj = new SelectionWatcher(element, true);
          element.children(".u-gallery-nav").click(function(e) {
            e.preventDefault();
            var target = S(e.currentTarget);
            obj.navigate(target);
          });
        });
      }, 250);
    });
    S(function() {
      var t;
      S("body").on("mouseenter", ".u-gallery.u-no-transition", function() {
        S(this).closest(".u-gallery").removeClass("u-no-transition");
      });
      (new topLevelContextSymbol([".u-gallery.u-product-zoom.u-layout-thumbnails", ".u-gallery.u-product-zoom.u-layout-carousel"])).init();
    });
  },
  7945 : function(mixin, name, require) {
    /**
     * @param {string} theClass
     * @return {undefined}
     */
    function api(theClass) {
      /** @type {string} */
      this.galleryZoomSelector = theClass;
    }
    /**
     * @param {!Object} e
     * @return {undefined}
     */
    function animate(e) {
      var container = e.currentTarget;
      var i;
      var hasSongChanged = $(container).closest(".u-gallery-item").data("zoom_click");
      var opoint = container.getBoundingClientRect();
      var canvas = container.querySelector("img");
      var nowX = e.clientX;
      var nowY = e.clientY;
      var isReplayingSong = e.originalEvent.changedTouches;
      if (!hasSongChanged && !isReplayingSong) {
        $(container).addClass("hover");
        /** @type {number} */
        var tomoveX = nowX - opoint.x;
        /** @type {number} */
        var tomoveY = nowY - opoint.y;
        requestAnimationFrame(function() {
          /** @type {number} */
          var targetL = tomoveX * (1 - canvas.offsetWidth / container.offsetWidth);
          /** @type {number} */
          var y_body_bottom = tomoveY * (1 - canvas.offsetHeight / container.offsetHeight);
          /** @type {string} */
          canvas.style.left = targetL + "px";
          /** @type {string} */
          canvas.style.top = y_body_bottom + "px";
        });
      }
    }
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    function changeBlockClass(event) {
      var header = $(event.currentTarget);
      var i;
      $(header).removeClass("hover");
      $(header).closest(".u-gallery-item").data("zoom_click");
    }
    /**
     * @param {!Event} e
     * @return {undefined}
     */
    function mouseOutCb(e) {
      var specimens = $(e.currentTarget);
      $(specimens).removeClass("hover");
    }
    var $ = require(6);
    /** @type {function(string): undefined} */
    mixin.exports = api;
    /**
     * @return {undefined}
     */
    api.prototype.init = function() {
      var disableOneEvent = this.galleryZoomSelector.map(function(selector) {
        return selector + " .u-back-slide";
      }).join(", ");
      var current_season = this.galleryZoomSelector.map(function(selector) {
        return selector + " .u-back-image";
      }).join(", ");
      $("body").on("mousedown touchstart", disableOneEvent, changeBlockClass);
      $("body").on("mousemove touchmove", disableOneEvent, animate);
      $("body").on("click mouseup mouseout touchend touchcancel", disableOneEvent, mouseOutCb);
      $(current_season).each(function(canCreateDiscussions, e) {
        var srcAngle = e.getAttribute("src");
        $(e).parent().css("background-image", "url(" + srcAngle + ")");
      });
    };
    /** @type {function(string): undefined} */
    window.ImageZoom = api;
  },
  7946 : function(checkFor, id, require) {
    var $ = require(6);
    var Dialog = require(181);
    /**
     * @return {undefined}
     */
    window._npTabsInit = function() {
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function toggle(event) {
        event.preventDefault();
        event.stopPropagation();
        var msg = $(event.currentTarget);
        var tabsControl;
        (new Dialog(msg)).show();
      }
      $("body").on("click", ".u-tab-link", toggle);
    };
    $(function() {
      window._npTabsInit();
    });
  },
  7947 : function(isContact, str, mix) {
    var base = mix(7948);
    window._npLazyImages = {
      setup : function() {
        window.lazySizesConfig = window.lazySizesConfig || {};
        /** @type {boolean} */
        window.lazySizesConfig.init = false;
        document.addEventListener("lazybeforeunveil", function(dom) {
          /** @type {(EventTarget|null)} */
          var element = dom.target;
          if (element.matches("video")) {
            var url = element.getAttribute("data-src");
            var data = element.querySelector("source");
            if (data && url) {
              data.setAttribute("src", url);
            }
          } else {
            var imgObject = element.getAttribute("data-bg");
            if (imgObject) {
              var params = cssBgParser.parseElementStyle(getComputedStyle(element));
              if (params.backgrounds.length) {
                /** @type {string} */
                params.backgrounds[0].color = "";
              }
              params.backgrounds.push(new cssBgParser.Background({
                image : imgObject
              }));
              element.style.backgroundImage = params.toString("image");
            }
          }
        });
      },
      init : function() {
        base.init();
      }
    };
    window._npLazyImages.setup();
    $(function() {
      window._npLazyImages.init();
    });
  },
  7948 : function(xd, yd, array) {
    !function(window, factory) {
      var lazySizes = factory(window, window.document, Date);
      if (window.lazySizes = lazySizes, "object" == typeof xd && xd.exports) {
        xd.exports = lazySizes;
      }
    }("undefined" != typeof window ? window : {}, function l(window, document, event) {
      var lazysizes;
      var lazySizesConfig;
      if (!function() {
        var prop;
        var lazySizesDefaults = {
          lazyClass : "lazyload",
          loadedClass : "lazyloaded",
          loadingClass : "lazyloading",
          preloadClass : "lazypreload",
          errorClass : "lazyerror",
          autosizesClass : "lazyautosizes",
          srcAttr : "data-src",
          srcsetAttr : "data-srcset",
          sizesAttr : "data-sizes",
          minSize : 40,
          customMedia : {},
          init : true,
          expFactor : 1.5,
          hFac : .8,
          loadMode : 2,
          loadHidden : true,
          ricTimeout : 0,
          throttleDelay : 125
        };
        for (prop in lazySizesConfig = window.lazySizesConfig || window.lazysizesConfig || {}, lazySizesDefaults) {
          if (!(prop in lazySizesConfig)) {
            lazySizesConfig[prop] = lazySizesDefaults[prop];
          }
        }
      }(), !document || !document.getElementsByClassName) {
        return {
          init : function() {
          },
          cfg : lazySizesConfig,
          noSupport : true
        };
      }
      var docElem = document.documentElement;
      var supportPicture = window.HTMLPictureElement;
      /** @type {string} */
      var _addEventListener = "addEventListener";
      /** @type {string} */
      var _getAttribute = "getAttribute";
      var addEventListener = window[_addEventListener].bind(window);
      var setTimeout = window.setTimeout;
      var requestAnimationFrame = window.requestAnimationFrame || setTimeout;
      var requestIdleCallback = window.requestIdleCallback;
      /** @type {!RegExp} */
      var opacityRe = /^picture$/i;
      /** @type {!Array} */
      var loadEvents = ["load", "error", "lazyincluded", "_lazyloaded"];
      var regClassCache = {};
      /** @type {function(this:(IArrayLike<T>|string), (function(this:S, T, number, !Array<T>): ?|null), S=): undefined} */
      var forEach = Array.prototype.forEach;
      /**
       * @param {!Object} ele
       * @param {string} cls
       * @return {?}
       */
      var hasClass = function(ele, cls) {
        if (!regClassCache[cls]) {
          /** @type {!RegExp} */
          regClassCache[cls] = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        }
        return regClassCache[cls].test(ele[_getAttribute]("class") || "") && regClassCache[cls];
      };
      /**
       * @param {!Object} ele
       * @param {string} cls
       * @return {undefined}
       */
      var addClass = function(ele, cls) {
        if (!hasClass(ele, cls)) {
          ele.setAttribute("class", (ele[_getAttribute]("class") || "").trim() + " " + cls);
        }
      };
      /**
       * @param {!Object} ele
       * @param {string} cls
       * @return {undefined}
       */
      var removeClass = function(ele, cls) {
        var reg;
        if (reg = hasClass(ele, cls)) {
          ele.setAttribute("class", (ele[_getAttribute]("class") || "").replace(reg, " "));
        }
      };
      /**
       * @param {!Object} dom
       * @param {!Function} fn
       * @param {boolean} add
       * @return {undefined}
       */
      var addRemoveLoadEvents = function(dom, fn, add) {
        /** @type {string} */
        var action = add ? _addEventListener : "removeEventListener";
        if (add) {
          addRemoveLoadEvents(dom, fn);
        }
        loadEvents.forEach(function(evt) {
          dom[action](evt, fn);
        });
      };
      /**
       * @param {!Object} elem
       * @param {string} name
       * @param {!Object} detail
       * @param {?} noBubbles
       * @param {?} noCancelable
       * @return {?}
       */
      var triggerEvent = function(elem, name, detail, noBubbles, noCancelable) {
        var event = document.createEvent("Event");
        if (!detail) {
          detail = {};
        }
        return detail.instance = lazysizes, event.initEvent(name, !noBubbles, !noCancelable), event.detail = detail, elem.dispatchEvent(event), event;
      };
      /**
       * @param {!Object} el
       * @param {!Object} data
       * @return {undefined}
       */
      var updatePolyfill = function(el, data) {
        var polyfill;
        if (!supportPicture && (polyfill = window.picturefill || lazySizesConfig.pf)) {
          if (data && data.src && !el[_getAttribute]("srcset")) {
            el.setAttribute("srcset", data.src);
          }
          polyfill({
            reevaluate : true,
            elements : [el]
          });
        } else {
          if (data && data.src) {
            el.src = data.src;
          }
        }
      };
      /**
       * @param {!Node} elem
       * @param {string} style
       * @return {?}
       */
      var getCSS = function(elem, style) {
        return (getComputedStyle(elem, null) || {})[style];
      };
      /**
       * @param {!Object} elem
       * @param {!Object} parent
       * @param {string} width
       * @return {?}
       */
      var getWidth = function(elem, parent, width) {
        width = width || elem.offsetWidth;
        for (; width < lazySizesConfig.minSize && parent && !elem._lazysizesWidth;) {
          width = parent.offsetWidth;
          parent = parent.parentNode;
        }
        return width;
      };
      /** @type {function(!Function, boolean): undefined} */
      var rAF = (secondFns = [], fns = firstFns = [], rafBatch = function(fn, queue) {
        if (running && !queue) {
          fn.apply(this, arguments);
        } else {
          if (fns.push(fn), !L) {
            /** @type {boolean} */
            L = true;
            (document.hidden ? setTimeout : requestAnimationFrame)(run);
          }
        }
      }, rafBatch._lsFlush = run = function() {
        var runFns = fns;
        fns = firstFns.length ? secondFns : firstFns;
        /** @type {boolean} */
        running = true;
        /** @type {boolean} */
        L = false;
        for (; runFns.length;) {
          runFns.shift()();
        }
        /** @type {boolean} */
        running = false;
      }, rafBatch);
      var running;
      var L;
      var firstFns;
      var secondFns;
      var fns;
      var run;
      var rafBatch;
      /**
       * @param {!Function} fn
       * @param {boolean} simple
       * @return {?}
       */
      var rAFIt = function(fn, simple) {
        return simple ? function() {
          rAF(fn);
        } : function() {
          var elem = this;
          /** @type {!Arguments} */
          var originalArguments = arguments;
          rAF(function() {
            fn.apply(elem, originalArguments);
          });
        };
      };
      /**
       * @param {!Function} cb
       * @return {?}
       */
      var throttle = function(cb) {
        var e;
        /** @type {number} */
        var i = 0;
        var end = lazySizesConfig.throttleDelay;
        var loadMode = lazySizesConfig.ricTimeout;
        /**
         * @return {undefined}
         */
        var run = function() {
          /** @type {boolean} */
          e = false;
          i = event.now();
          cb();
        };
        var fn = requestIdleCallback && loadMode > 49 ? function() {
          if (requestIdleCallback(run, {
            timeout : loadMode
          }), loadMode !== lazySizesConfig.ricTimeout) {
            loadMode = lazySizesConfig.ricTimeout;
          }
        } : rAFIt(function() {
          setTimeout(run);
        }, true);
        return function(roll) {
          var t;
          if (roll = true === roll) {
            /** @type {number} */
            loadMode = 33;
          }
          if (!e) {
            if (e = true, (t = end - (event.now() - i)) < 0) {
              /** @type {number} */
              t = 0;
            }
            if (roll || t < 9) {
              fn();
            } else {
              setTimeout(fn, t);
            }
          }
        };
      };
      /**
       * @param {!Function} r
       * @return {?}
       */
      var load = function(r) {
        var o;
        var loadTime;
        /** @type {number} */
        var p = 99;
        /**
         * @return {undefined}
         */
        var run = function() {
          /** @type {null} */
          o = null;
          r();
        };
        /**
         * @return {undefined}
         */
        var f = function() {
          /** @type {number} */
          var waited = event.now() - loadTime;
          if (waited < p) {
            setTimeout(f, p - waited);
          } else {
            (requestIdleCallback || run)(run);
          }
        };
        return function() {
          if (loadTime = event.now(), !o) {
            o = setTimeout(f, p);
          }
        };
      };
      var loader = (re = /^img$/i, regex = /^iframe$/i, rt = "onscroll" in window && !/(gle|ing)bot/.test(navigator.userAgent), defaultExpand = 0, currentExpand = 0, isLoading = 0, lowRuns = -1, get = function(e) {
        if (isLoading--, !e || isLoading < 0 || !e.target) {
          /** @type {number} */
          isLoading = 0;
        }
      }, isVisible = function(elem) {
        if (null == tt) {
          /** @type {boolean} */
          tt = "hidden" == getCSS(document.body, "visibility");
        }
        return tt || !("hidden" == getCSS(elem.parentNode, "visibility") && "hidden" == getCSS(elem, "visibility"));
      }, isNestedVisible = function(elem, elemExpand) {
        var outerRect;
        /** @type {!Node} */
        var parent = elem;
        var visible = isVisible(elem);
        /** @type {number} */
        eLtop = eLtop - elemExpand;
        eLbottom = eLbottom + elemExpand;
        /** @type {number} */
        eLleft = eLleft - elemExpand;
        eLright = eLright + elemExpand;
        for (; visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem;) {
          if ((visible = (getCSS(parent, "opacity") || 1) > 0) && "visible" != getCSS(parent, "overflow")) {
            outerRect = parent.getBoundingClientRect();
            /** @type {boolean} */
            visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
          }
        }
        return visible;
      }, throttledCheckElements = throttle(checkElements = function() {
        var eLlen;
        var i;
        var rect;
        var autoLoadElem;
        var loadedSomething;
        var elemExpand;
        var elemNegativeExpand;
        var elemExpandVal;
        var beforeExpandVal;
        var defaultExpand;
        var preloadExpand;
        var hFac;
        var lazyloadElems = lazysizes.elements;
        if ((loadMode = lazySizesConfig.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
          /** @type {number} */
          i = 0;
          lowRuns++;
          for (; i < eLlen; i++) {
            if (lazyloadElems[i] && !lazyloadElems[i]._lazyRace) {
              if (!(!rt || lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i]))) {
                if (!(elemExpandVal = lazyloadElems[i][_getAttribute]("data-expand")) || !(elemExpand = 1 * elemExpandVal)) {
                  elemExpand = currentExpand;
                }
                if (!defaultExpand) {
                  if (defaultExpand = !lazySizesConfig.expand || lazySizesConfig.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesConfig.expand, lazysizes._defEx = defaultExpand, preloadExpand = defaultExpand * lazySizesConfig.expFactor, hFac = lazySizesConfig.hFac, tt = null, currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden) {
                    /** @type {number} */
                    currentExpand = preloadExpand;
                    /** @type {number} */
                    lowRuns = 0;
                  } else {
                    if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
                      currentExpand = defaultExpand;
                    } else {
                      currentExpand = defaultExpand;
                    }
                  }
                }
                if (beforeExpandVal !== elemExpand) {
                  eLvW = innerWidth + elemExpand * hFac;
                  elvH = innerHeight + elemExpand;
                  /** @type {number} */
                  elemNegativeExpand = -1 * elemExpand;
                  beforeExpandVal = elemExpand;
                }
                if (rect = lazyloadElems[i].getBoundingClientRect(), (eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesConfig.loadHidden || isVisible(lazyloadElems[i])) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i], elemExpand))) {
                  if (unveilElement(lazyloadElems[i]), loadedSomething = true, isLoading > 9) {
                    break;
                  }
                } else {
                  if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesConfig.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || "auto" != lazyloadElems[i][_getAttribute](lazySizesConfig.sizesAttr)))) {
                    autoLoadElem = preloadElems[0] || lazyloadElems[i];
                  }
                }
              } else {
                unveilElement(lazyloadElems[i]);
              }
            }
          }
          if (autoLoadElem && !loadedSomething) {
            unveilElement(autoLoadElem);
          }
        }
      }), rafedSwitchLoadingClass = rAFIt(init = function(evt) {
        var elem = evt.target;
        if (elem._lazyCache) {
          return delete elem._lazyCache, void 0;
        }
        get(evt);
        addClass(elem, lazySizesConfig.loadedClass);
        removeClass(elem, lazySizesConfig.loadingClass);
        addRemoveLoadEvents(elem, rafSwitchLoadingClass);
        triggerEvent(elem, "lazyloaded");
      }), rafSwitchLoadingClass = function(e) {
        rafedSwitchLoadingClass({
          target : e.target
        });
      }, log = function(context, string) {
        try {
          context.contentWindow.location.replace(string);
        } catch (i) {
          /** @type {!Object} */
          context.src = string;
        }
      }, handleSources = function(source) {
        var customMedia;
        var sourceSrcset = source[_getAttribute](lazySizesConfig.srcsetAttr);
        if (customMedia = lazySizesConfig.customMedia[source[_getAttribute]("data-media") || source[_getAttribute]("media")]) {
          source.setAttribute("media", customMedia);
        }
        if (sourceSrcset) {
          source.setAttribute("srcset", sourceSrcset);
        }
      }, lazyUnveil = rAFIt(function(elem, detail, i, mainWnd, isImg) {
        var src;
        var srcset;
        var parent;
        var isPicture;
        var event;
        var m;
        if (!(event = triggerEvent(elem, "lazybeforeunveil", detail)).defaultPrevented) {
          if (mainWnd) {
            if (i) {
              addClass(elem, lazySizesConfig.autosizesClass);
            } else {
              elem.setAttribute("sizes", mainWnd);
            }
          }
          if (srcset = elem[_getAttribute](lazySizesConfig.srcsetAttr), src = elem[_getAttribute](lazySizesConfig.srcAttr), isImg) {
            isPicture = (parent = elem.parentNode) && opacityRe.test(parent.nodeName || "");
          }
          if (m = detail.firesLoad || "src" in elem && (srcset || src || isPicture), event = {
            target : elem
          }, addClass(elem, lazySizesConfig.loadingClass), m) {
            clearTimeout(_takingTooLongTimeout);
            _takingTooLongTimeout = setTimeout(get, 2500);
            addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
          }
          if (isPicture) {
            forEach.call(parent.getElementsByTagName("source"), handleSources);
          }
          if (srcset) {
            elem.setAttribute("srcset", srcset);
          } else {
            if (src && !isPicture) {
              if (regex.test(elem.nodeName)) {
                log(elem, src);
              } else {
                elem.src = src;
              }
            }
          }
          if (isImg && (srcset || isPicture)) {
            updatePolyfill(elem, {
              src : src
            });
          }
        }
        if (elem._lazyRace) {
          delete elem._lazyRace;
        }
        removeClass(elem, lazySizesConfig.lazyClass);
        rAF(function() {
          var rv = elem.complete && elem.naturalWidth > 1;
          if (!m || rv) {
            if (rv) {
              addClass(elem, "ls-is-cached");
            }
            init(event);
            /** @type {boolean} */
            elem._lazyCache = true;
            setTimeout(function() {
              if ("_lazyCache" in elem) {
                delete elem._lazyCache;
              }
            }, 9);
          }
          if ("lazy" == elem.loading) {
            isLoading--;
          }
        }, true);
      }), unveilElement = function(elem) {
        if (!elem._lazyRace) {
          var detail;
          var isImg = re.test(elem.nodeName);
          var sizes = isImg && (elem[_getAttribute](lazySizesConfig.sizesAttr) || elem[_getAttribute]("sizes"));
          /** @type {boolean} */
          var isAuto = "auto" == sizes;
          if (!isAuto && isCompleted || !isImg || !elem[_getAttribute]("src") && !elem.srcset || elem.complete || hasClass(elem, lazySizesConfig.errorClass) || !hasClass(elem, lazySizesConfig.lazyClass)) {
            if (detail = triggerEvent(elem, "lazyunveilread").detail, isAuto) {
              autoSizer.updateElem(elem, true, elem.offsetWidth);
            }
            /** @type {boolean} */
            elem._lazyRace = true;
            isLoading++;
            lazyUnveil(elem, detail, isAuto, sizes, isImg);
          }
        }
      }, doc = load(function() {
        /** @type {number} */
        lazySizesConfig.loadMode = 3;
        throttledCheckElements();
      }), onload = function() {
        if (!isCompleted) {
          if (event.now() - Z < 999) {
            return setTimeout(onload, 999), void 0;
          }
          /** @type {boolean} */
          isCompleted = true;
          /** @type {number} */
          lazySizesConfig.loadMode = 3;
          throttledCheckElements();
          addEventListener("scroll", view, true);
        }
      }, {
        _ : function() {
          if (Z = event.now(), lazysizes.elements = document.getElementsByClassName(lazySizesConfig.lazyClass), preloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass + " " + lazySizesConfig.preloadClass), addEventListener("scroll", throttledCheckElements, true), addEventListener("resize", throttledCheckElements, true), addEventListener("pageshow", function(state) {
            if (state.persisted) {
              var args = document.querySelectorAll("." + lazySizesConfig.loadingClass);
              if (args.length && args.forEach) {
                requestAnimationFrame(function() {
                  args.forEach(function(element) {
                    if (element.complete) {
                      unveilElement(element);
                    }
                  });
                });
              }
            }
          }), window.MutationObserver) {
            (new MutationObserver(throttledCheckElements)).observe(docElem, {
              childList : true,
              subtree : true,
              attributes : true
            });
          } else {
            docElem[_addEventListener]("DOMNodeInserted", throttledCheckElements, true);
            docElem[_addEventListener]("DOMAttrModified", throttledCheckElements, true);
            setInterval(throttledCheckElements, 999);
          }
          if (addEventListener("hashchange", throttledCheckElements, true), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(name) {
            document[_addEventListener](name, throttledCheckElements, true);
          }), /d$|^c/.test(document.readyState)) {
            onload();
          } else {
            addEventListener("load", onload);
            document[_addEventListener]("DOMContentLoaded", throttledCheckElements);
            setTimeout(onload, 2E4);
          }
          if (lazysizes.elements.length) {
            checkElements();
            rAF._lsFlush();
          } else {
            throttledCheckElements();
          }
        },
        checkElems : throttledCheckElements,
        unveil : unveilElement,
        _aLSL : view = function() {
          if (3 == lazySizesConfig.loadMode) {
            /** @type {number} */
            lazySizesConfig.loadMode = 2;
          }
          doc();
        }
      });
      var preloadElems;
      var isCompleted;
      var _takingTooLongTimeout;
      var loadMode;
      var Z;
      var eLvW;
      var elvH;
      var eLtop;
      var eLleft;
      var eLright;
      var eLbottom;
      var tt;
      var re;
      var regex;
      var rt;
      var defaultExpand;
      var currentExpand;
      var isLoading;
      var lowRuns;
      var get;
      var isVisible;
      var isNestedVisible;
      var checkElements;
      var throttledCheckElements;
      var init;
      var rafedSwitchLoadingClass;
      var rafSwitchLoadingClass;
      var log;
      var handleSources;
      var lazyUnveil;
      var unveilElement;
      var doc;
      var view;
      var onload;
      var autoSizer = (sizeElement = rAFIt(function(elem, e, event, width) {
        var children;
        var i;
        var msgContentCount;
        if (elem._lazysizesWidth = width, width = width + "px", elem.setAttribute("sizes", width), opacityRe.test(e.nodeName || "")) {
          /** @type {number} */
          i = 0;
          msgContentCount = (children = e.getElementsByTagName("source")).length;
          for (; i < msgContentCount; i++) {
            children[i].setAttribute("sizes", width);
          }
        }
        if (!event.detail.dataAttr) {
          updatePolyfill(elem, event.detail);
        }
      }), getSizeElement = function(elem, dataAttr, width) {
        var event;
        var parent = elem.parentNode;
        if (parent) {
          if (width = getWidth(elem, parent, width), !(event = triggerEvent(elem, "lazybeforesizes", {
            width : width,
            dataAttr : !!dataAttr
          })).defaultPrevented) {
            if ((width = event.detail.width) && width !== elem._lazysizesWidth) {
              sizeElement(elem, parent, event, width);
            }
          }
        }
      }, {
        _ : function() {
          autosizesElems = document.getElementsByClassName(lazySizesConfig.autosizesClass);
          addEventListener("resize", levelUpHandler);
        },
        checkElems : levelUpHandler = load(function() {
          var i;
          var len = autosizesElems.length;
          if (len) {
            /** @type {number} */
            i = 0;
            for (; i < len; i++) {
              getSizeElement(autosizesElems[i]);
            }
          }
        }),
        updateElem : getSizeElement
      });
      var autosizesElems;
      var sizeElement;
      var getSizeElement;
      var Ot;
      var levelUpHandler;
      /**
       * @return {undefined}
       */
      var test = function() {
        if (!test.i && document.getElementsByClassName) {
          /** @type {boolean} */
          test.i = true;
          autoSizer._();
          loader._();
        }
      };
      return setTimeout(function() {
        if (lazySizesConfig.init) {
          test();
        }
      }), lazysizes = {
        cfg : lazySizesConfig,
        autoSizer : autoSizer,
        loader : loader,
        init : test,
        uP : updatePolyfill,
        aC : addClass,
        rC : removeClass,
        hC : hasClass,
        fire : triggerEvent,
        gW : getWidth,
        rAF : rAF
      };
    });
  },
  7949 : function(formatters, customFormatters, require) {
    var $ = require(6);
    var Promise = require(121);
    /**
     * @return {undefined}
     */
    window._npDialogsInit = function() {
      /**
       * @param {!Event} evt
       * @return {undefined}
       */
      function _handleForm(evt) {
        var dialog;
        evt.preventDefault();
        evt.stopPropagation();
        get(evt).open();
      }
      /**
       * @param {!Event} data
       * @return {undefined}
       */
      function moveEvtHandler(data) {
        var dialog;
        data.preventDefault();
        data.stopPropagation();
        get(data).close();
      }
      /**
       * @param {!Event} event
       * @return {?}
       */
      function get(event) {
        var i = $(event.currentTarget);
        var e = i.attr("href") || i.attr("data-href");
        var f = $(e);
        return f = f.length ? f : i, new Promise(f);
      }
      /**
       * @return {?}
       */
      function createWindow() {
        return new Promise($('[data-dialog-show-on="page_exit"]'));
      }
      /**
       * @return {?}
       */
      function require() {
        return new Promise($('[data-dialog-show-on="timer"]'));
      }
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function init(event) {
        if (event.clientY < 50 && null == event.relatedTarget && "select" !== event.target.nodeName.toLowerCase()) {
          var dialog;
          createWindow().open(function() {
            document.removeEventListener("mouseout", init);
          });
        }
      }
      /**
       * @return {undefined}
       */
      function tick() {
        var provider = require();
        setTimeout(function() {
          provider.open();
        }, provider.getInterval());
      }
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function launchTextEditor(event) {
        var truncate = $(event.currentTarget);
        setTimeout(function() {
          (new Promise(truncate)).close();
        });
      }
      $("body").on("click", ".u-dialog-link", _handleForm);
      $("body").on("click", ".u-dialog-close-button", moveEvtHandler);
      $("body").on("click", ".u-dialog .u-btn", launchTextEditor);
      document.addEventListener("mouseout", init);
      tick();
    };
    $(function() {
      window._npDialogsInit();
    });
  },
  7950 : function(onerror, define, require) {
    var $ = require(6);
    var Set = require(116);
    $(window).on("load", function() {
      /**
       * @return {undefined}
       */
      function filter() {
        $imagesToLoad.each(function(canCreateDiscussions, context) {
          var countdownUpdater;
          (new Set($(context))).startUpdate("runtime");
        });
      }
      var $imagesToLoad = Set.findAll();
      if ($imagesToLoad.length) {
        filter();
      }
    });
  },
  7951 : function(loopNode, variableNode, i) {
    var a = i(6);
    a(function() {
      a(document).on("click", ".u-quantity-input a", function(event) {
        var value;
        event.preventDefault();
        var e = a(this);
        var o = e.siblings("input");
        if (e.hasClass("minus")) {
          /** @type {number} */
          value = (value = parseFloat(o.val()) - 1) < 1 ? 1 : value;
          o.val(value);
        }
        if (e.hasClass("plus")) {
          /** @type {number} */
          value = parseFloat(o.val()) + 1;
          o.val(value);
        }
        e.siblings(".minus").addBack(".minus").toggleClass("disabled", 1 === value);
        o.change();
      });
    });
  },
  7952 : function(onerror, define, require) {
    var $ = require(6);
    var Message = require(97);
    /**
     * @return {undefined}
     */
    window._npAccordionInit = function() {
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function keyPressHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        var msg = $(event.currentTarget);
        var accordion;
        (new Message(msg)).show();
      }
      $("body").on("click", ".u-accordion-link", keyPressHandler);
    };
    $(function() {
      window._npAccordionInit();
    });
  },
  7953 : function(formatters, customFormatters) {
  },
  97 : function(module, selector, convertToImages) {
    /**
     * @param {string} link
     * @return {undefined}
     */
    function render(link) {
      /** @type {string} */
      this.selector = ".u-accordion";
      /** @type {string} */
      this.activeClass = "u-accordion-active";
      /** @type {string} */
      this._paneSelector = ".u-accordion-pane";
      /** @type {string} */
      this.activeSelector = "." + this.activeClass;
      /** @type {string} */
      this._linkSelector = ".u-accordion-link";
      /** @type {string} */
      this.activeLinkClass = "active";
      /** @type {string} */
      this.activeLinkSelector = "." + this.activeLinkClass;
      /** @type {string} */
      this._isCollapsedByDefaultSelector = ".u-collapsed-by-default";
      /** @type {string} */
      this._link = link;
      this._accordion = this._link.closest(this.selector);
    }
    /** @type {function(string): undefined} */
    module.exports = render;
    /**
     * @param {?} saveCallBack
     * @return {?}
     */
    render.prototype.show = function(saveCallBack) {
      var a = this._link;
      if (a.is(this.activeLinkSelector) && !saveCallBack) {
        return this._removeActiveLink(), this._hidePane(a), void 0;
      }
      this._removeActiveLink();
      this._hidePane(a);
      this._addActiveLink(a);
      this._activatePane(a);
    };
    /**
     * @return {undefined}
     */
    render.prototype._removeActiveLink = function() {
      var $this = this._getActiveLink();
      $this.removeClass(this.activeLinkClass);
      $this.attr("aria-selected", false);
    };
    /**
     * @return {?}
     */
    render.prototype._getActiveLink = function() {
      return this._accordion.find(this.activeLinkSelector);
    };
    /**
     * @param {!Object} tag
     * @return {undefined}
     */
    render.prototype._addActiveLink = function(tag) {
      tag.addClass(this.activeLinkClass);
      tag.attr("aria-selected", true);
    };
    /**
     * @param {!Object} name
     * @return {undefined}
     */
    render.prototype._activatePane = function(name) {
      var pane;
      this._accordion.find(this.activeSelector).removeClass(this.activeClass);
      this._getPane(name).addClass(this.activeClass);
    };
    /**
     * @param {!Object} object
     * @return {?}
     */
    render.prototype._getPane = function(object) {
      return object.siblings(this._paneSelector);
    };
    /**
     * @param {!Object} link
     * @return {undefined}
     */
    render.prototype._hidePane = function(link) {
      var pane;
      this._getPane(link).removeClass(this.activeClass);
    };
    /**
     * @return {undefined}
     */
    render.prototype.closeAll = function() {
      this._accordion.find(this._linkSelector + this.activeLinkSelector).removeClass(this.activeLinkClass).attr("aria-selected", false);
      this._accordion.find(this._paneSelector + this.activeSelector).removeClass(this.activeClass);
    };
    /**
     * @return {?}
     */
    render.prototype.isCollapsedByDefault = function() {
      return this._accordion.is(this._isCollapsedByDefaultSelector);
    };
  }
});
