/*!
 * Copyright 2016, nju33
 * Released under the MIT License
 * https://github.com/totora0155/hyo.js
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Hyo = factory());
}(this, function () { 'use strict';

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
  babelHelpers;

  function selectorParse(selector) {
    var re = /([#.[]?[^#.\[]+)/g;
    var matches = selector.match(re);
    if (matches) {
      return traverse(matches);
    }
    return {};
  }

  function traverse(selectors) {
    var result = {};
    selectors.forEach(function (selector) {
      var detail = specity(selector);
      if (detail.attr) {
        if (!result[detail.attr]) {
          result[detail.attr] = [];
        }
        result[detail.attr].push(detail.val);
      } else {
        result.tag = detail.val;
      }
    });

    if (!result.tag) {
      result.tag = 'div';
    }
    return result;
  }

  function specity(selector) {
    if (selector[0] === '#') {
      return {
        attr: 'id',
        val: selector.slice(1, selector.length)
      };
    } else if (selector[0] === '.') {
      return {
        attr: 'class',
        val: selector.slice(1, selector.length)
      };
    } else if (selector[0] === '[' && selector[selector.length - 1] === ']') {
      var splited = selector.slice(1, selector.length - 1).split('=');
      var attr = splited[0];
      var val = splited[1] || true;
      return { attr: attr, val: val };
    }
    return {
      attr: null,
      val: selector
    };
  }

  console.log(selectorParse);

  var handler = {};

  function Hyo(id, opts) {
    this.el = document.getElementById(id);
    if (this.el == null) {
      throw Error('Not found ' + id);
    }
    this.table = null;
    this.opts = {}; // TODO:
  }

  Hyo.prototype.on = function on(event, handle) {
    handler[event] = handle;
  };

  Hyo.prototype.render = function render(data) {
    this.table = walk(data, document.createElement('table'));
    this.el.parentNode.insertBefore(this.table, this.el);
    // next({
    //   calc(this.table);
    //   if (handler[event] && typeof handler[event] === 'function') {
    //     handler[event]();
    //   }
    // });
  };

  function walk(data, parent) {
    var parent;
    forEach(data, function (children, tag) {
      if (parent) {
        var el = document.createElement(tag);
        parent.appendChild(el);
        if ((typeof children === 'undefined' ? 'undefined' : babelHelpers.typeof(children)) === 'object') {
          walk(data, parent);
        } else {
          el.innerText = children;
        }
      }
    });
  }

  function forEach(obj, cb) {
    var keys = Object.keys(obj);
    keys.forEach(function (key) {
      cb(obj[key], key);
    });
  }

  return Hyo;

}));