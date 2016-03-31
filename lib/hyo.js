import selectorParse from 'selector-parse';

var events = {
  RENDERED: 'rendered',
};
var handler = {};

export default function Hyo(id, opts) {
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
  this.table = walk(data, createElement('table'));
  this.el.parentNode.insertBefore(this.table, this.el);
  next({
    calc(this.table);
    if (handler[events.RENDERERD]
        && typeof handler[events.RENDERERD] === 'function') {
      handler[event]();
    }
  });
}

function walk(data, parent) {
  var parent;
  forEach(data, function (children, selector) {
    if (parent) {
      var el = createElement(selector);
      parent.appendChild(el);
      if (typeof children === 'object') {
        walk(data, parent);
      } else {
        el.innerText = children;
      }
    }
  });
}

function createElement(selector) {
  const parsed = selectorParse(selector);
  const el = document.createElement(parsed.tag);
  const el.id = parsed.id.join(' ');
  const el.className = parsed.class.join(' ');

  forEach(parsed, (val, attr) => {
    if (attr !== 'tag' && attr !== 'id' && attr !== 'class') {
      el.setAttribute(attr, val.join(' '));
    }
  });
  return el;
}

function forEach(obj, cb) {
  var keys = Object.keys(obj);
  keys.forEach(function (key) {
    cb(obj[key], key);
  });
}

function next(cb) {
  if (requestAnimationFrame) {
    requestAnimationFrame(cb);
  } else {
    setTimeout(cb, 0);
  }
}
