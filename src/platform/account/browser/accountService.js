'use strict';
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
var react_router_dom_1 = require('react-router-dom');
var react_1 = require('react');
var storageService_1 = require('src/platform/storage/browser/storageService');
var injector_1 = require('src/base/common/injector');
var Service_1 = require('src/base/common/Service');
var AccountService = /** @class */ (function (_super) {
  __extends(AccountService, _super);
  function AccountService() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  AccountService.prototype.useLogin = function () {
    return this.storageService.read('user');
  };
  AccountService.prototype.useHome = function () {
    var isLogin = this.useLogin();
    var navigate = react_router_dom_1.useNavigate();
    react_1.useEffect(function () {
      if (isLogin) navigate('/');
    }, []);
  };
  var _a;
  __decorate(
    [
      injector_1.inject(),
      __metadata(
        'design:type',
        typeof (_a = typeof storageService_1.default !== 'undefined' && storageService_1.default) === 'function'
          ? _a
          : Object
      )
    ],
    AccountService.prototype,
    'storageService',
    void 0
  );
  AccountService = __decorate([injector_1.injectable('AccountService')], AccountService);
  return AccountService;
})(Service_1.default);
exports.default = AccountService;
