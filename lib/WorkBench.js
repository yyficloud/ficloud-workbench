'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Titles = require('./components/Titles');

var _Titles2 = _interopRequireDefault(_Titles);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * WorkBench控件
 */
var WorkBench = function (_React$Component) {
  _inherits(WorkBench, _React$Component);

  function WorkBench(props) {
    _classCallCheck(this, WorkBench);

    var _this = _possibleConstructorReturn(this, (WorkBench.__proto__ || Object.getPrototypeOf(WorkBench)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(WorkBench, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          className = _props.className;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('ficloud-bench', _defineProperty({}, '' + className, className)) },
        _react2.default.createElement(_Titles2.default, null),
        _react2.default.createElement(
          'p',
          null,
          value ? value : '默认test'
        )
      );
    }
  }]);

  return WorkBench;
}(_react2.default.Component);

WorkBench.propTypes = {
  /**
   * 自定义类名
   */
  className: _propTypes2.default.string,
  value: _propTypes2.default.string
};
exports.default = WorkBench;