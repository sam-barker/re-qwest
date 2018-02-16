'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (_ref) {
  var method = _ref.method,
      url = _ref.url,
      params = _ref.params,
      headers = _ref.headers,
      props = _ref.props;

  return new Promise(function (resolve, reject) {
    var xhr = getXHR(method, url);
    if (xhr === null) throw new Error('CORS not supported');
    xhr.onerror = function () {
      reject(createError(xhr));
    };
    xhr.onload = function () {
      if (statusOK(xhr)) resolve(xhr.response);else reject(createError(xhr));
    };

    if (headers) {
      Object.keys(headers).forEach(function (key) {
        xhr.setRequestHeader(key, headers[key]);
      });
    }

    if (props) {
      Object.keys(props).forEach(function (key) {
        Object.defineProperty(xhr, key, {
          value: props[key],
          writable: true
        });
      });
    }

    var xhrParams = getXHRParams(params);
    xhr.send(xhrParams);
  });
};

var getXHR = function getXHR(method, url) {
  var xhr = new XMLHttpRequest();
  if ('withCredentials' in xhr) {
    xhr.open(method, url, true);
    return xhr;
  } else if (typeof XDomainRequest !== 'undefined') {
    xhr = new XDomainRequest();
    xhr.open(method, url);
    return xhr;
  } else {
    return null;
  }
};

var statusOK = function statusOK(xhr) {
  return xhr.status >= 200 && xhr.status < 300;
};

var createError = function createError(xhr) {
  return new Error(xhr.status + ' - ' + xhr.statusText);
};

var getXHRParams = function getXHRParams(params) {
  if (params && (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
    return Object.keys(params).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
  } else {
    return null;
  }
};