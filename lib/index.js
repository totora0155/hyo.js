var events = {
  RENDERED: 'rendered',
};
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
  next({
    calc(this.table);
    if (handler[event] && typeof handler[event] === 'function') {
      handler[event]();
    }
  });
}

function walk(data, parent) {
  var parent;
  forEach(data, function (children, tag) {
    if (parent) {
      var el = document.createElement(tag);
      parent.appendChild(el);
      if (typeof children === 'object') {
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

function next(cb) {
  if (requestAnimationFrame) {
    requestAnimationFrame(cb);
  } else {
    setTimeout(cb, 0);
  }
}
