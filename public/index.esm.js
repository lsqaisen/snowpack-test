import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _typeof from '@babel/runtime/helpers/esm/typeof';
import _toConsumableArray from '@babel/runtime/helpers/esm/toConsumableArray';
import React, { Component } from 'react';
import invariant from 'invariant';
import { createHashHistory } from 'history';
export { createBrowserHistory, createHashHistory, createMemoryHistory } from 'history';
import document from 'global/document';
import { Provider } from 'react-redux';
export { connect, connectAdvanced, shallowEqual, useDispatch, useSelector, useStore } from 'react-redux';
export { bindActionCreators } from 'redux';
import { create, utils } from 'dva-core';
export { saga } from 'dva-core';
import { useHistory as useHistory$1, useLocation as useLocation$1, useParams as useParams$1, useRouteMatch as useRouteMatch$1 } from 'react-router-dom';
import * as router from 'react-router-dom';
export { router };
import { connectRouter as connectRouter$1, routerMiddleware as routerMiddleware$1 } from 'connected-react-router';
import * as routerRedux from 'connected-react-router';
export { routerRedux };
export { default as fetch } from 'isomorphic-fetch';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';

var cached = {};

function registerModel(app, model) {
  model = model.default || model;

  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

var defaultLoadingComponent = function defaultLoadingComponent() {
  return null;
};

function asyncComponent(config) {
  var resolve = config.resolve;
  return /*#__PURE__*/function (_Component) {
    _inherits(DynamicComponent, _Component);

    var _super = _createSuper(DynamicComponent);

    function DynamicComponent() {
      var _this;

      _classCallCheck(this, DynamicComponent);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      _this.LoadingComponent = config.LoadingComponent || defaultLoadingComponent;
      _this.state = {
        AsyncComponent: null
      };

      _this.load();

      return _this;
    }

    _createClass(DynamicComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.mounted = true;
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.mounted = false;
      }
    }, {
      key: "load",
      value: function load() {
        var _this2 = this;

        resolve().then(function (m) {
          var AsyncComponent = m.default || m;

          if (_this2.mounted) {
            _this2.setState({
              AsyncComponent: AsyncComponent
            });
          } else {
            _this2.state.AsyncComponent = AsyncComponent; // eslint-disable-line
          }
        });
      }
    }, {
      key: "render",
      value: function render() {
        var AsyncComponent = this.state.AsyncComponent;
        var LoadingComponent = this.LoadingComponent;
        if (AsyncComponent) return /*#__PURE__*/React.createElement(AsyncComponent, this.props);
        return /*#__PURE__*/React.createElement(LoadingComponent, this.props);
      }
    }]);

    return DynamicComponent;
  }(Component);
}

function dynamic(config) {
  var app = config.app,
      resolveModels = config.models,
      resolveComponent = config.component;
  return asyncComponent(_objectSpread({
    resolve: config.resolve || function () {
      var models = typeof resolveModels === 'function' ? resolveModels() : [];
      var component = resolveComponent();
      return new Promise(function (resolve) {
        Promise.all([].concat(_toConsumableArray(models), [component])).then(function (ret) {
          if (!models || !models.length) {
            return resolve(ret[0]);
          } else {
            var len = models.length;
            ret.slice(0, len).forEach(function (m) {
              m = m.default || m;

              if (!Array.isArray(m)) {
                m = [m];
              }

              m.map(function (_) {
                return registerModel(app, _);
              });
            });
            resolve(ret[len]);
          }
        });
      });
    }
  }, config));
}

dynamic.setDefaultLoadingComponent = function (LoadingComponent) {
  defaultLoadingComponent = LoadingComponent;
};

var connectRouter = connectRouter$1,
    routerMiddleware = routerMiddleware$1;
var isFunction = utils.isFunction;
var useHistory = useHistory$1,
    useLocation = useLocation$1,
    useParams = useParams$1,
    useRouteMatch = useRouteMatch$1;
function index () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var history = opts.history || createHashHistory();
  var createOpts = {
    initialReducer: {
      router: connectRouter(history)
    },
    setupMiddlewares: function setupMiddlewares(middlewares) {
      return [routerMiddleware(history)].concat(_toConsumableArray(middlewares));
    },
    setupApp: function setupApp(app) {
      app._history = patchHistory(history);
    }
  };
  var app = create(opts, createOpts);
  var oldAppStart = app.start;
  app.router = router;
  app.start = start;
  return app;

  function router(router) {
    invariant(isFunction(router), "[app.router] router should be function, but got ".concat(_typeof(router)));
    app._router = router;
  }

  function start(container) {
    // 允许 container 是字符串，然后用 querySelector 找元素
    if (isString(container)) {
      container = document.querySelector(container);
      invariant(container, "[app.start] container ".concat(container, " not found"));
    } // 并且是 HTMLElement


    invariant(!container || isHTMLElement(container), "[app.start] container should be HTMLElement"); // 路由必须提前注册

    invariant(app._router, "[app.start] router must be registered before app.start()");

    if (!app._store) {
      oldAppStart.call(app);
    }

    var store = app._store; // export _getProvider for HMR
    // ref: https://github.com/dvajs/dva/issues/469

    app._getProvider = getProvider.bind(null, store, app); // If has container, render; else, return react component

    if (container) {
      render(container, store, app, app._router);

      app._plugin.apply('onHmr')(render.bind(null, container, store, app));
    } else {
      return getProvider(store, this, this._router);
    }
  }
}

function isHTMLElement(node) {
  return _typeof(node) === 'object' && node !== null && node.nodeType && node.nodeName;
}

function isString(str) {
  return typeof str === 'string';
}

function getProvider(store, app, router) {
  var DvaRoot = function DvaRoot(extraProps) {
    return /*#__PURE__*/React.createElement(Provider, {
      store: store
    }, router(_objectSpread({
      app: app,
      history: app._history
    }, extraProps)));
  };

  return DvaRoot;
}

function render(container, store, app, router) {
  var ReactDOM = import('react-dom'); // eslint-disable-line

  ReactDOM.render(React.createElement(getProvider(store, app, router)), container);
}

function patchHistory(history) {
  var oldListen = history.listen;

  history.listen = function (callback) {
    // TODO: refact this with modified ConnectedRouter
    // Let ConnectedRouter to sync history to store first
    // connected-react-router's version is locked since the check function may be broken
    // min version of connected-react-router
    // e.g.
    // function (e, t) {
    //   var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    //   r.inTimeTravelling ? r.inTimeTravelling = !1 : a(e, t, n)
    // }
    // ref: https://github.com/umijs/umi/issues/2693
    var cbStr = callback.toString();
    var isConnectedRouterHandler = callback.name === 'handleLocationChange' && cbStr.indexOf('onLocationChanged') > -1 || cbStr.indexOf('.inTimeTravelling') > -1 && cbStr.indexOf('.inTimeTravelling') > -1 && cbStr.indexOf('arguments[2]') > -1;
    callback(history.location, history.action);
    return oldListen.call(history, function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (isConnectedRouterHandler) {
        callback.apply(void 0, args);
      } else {
        // Delay all listeners besides ConnectedRouter
        setTimeout(function () {
          callback.apply(void 0, args);
        });
      }
    });
  };

  return history;
}

export default index;
export { dynamic, useHistory, useLocation, useParams, useRouteMatch };
