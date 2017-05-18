'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var color1 = '#f1f1f1';
var color2 = '#e9e9e9';

var defaultTableStyles = {
  width: '100%',
  border: '1px solid ' + color2,
  fontFamily: 'helvetica',
  borderCollapse: 'collapse',
  boxShadow: '0 10px 60px rgba(0,0,0,.1)'
};

var defaultCellStyles = {
  padding: '15px 25px',
  fontWeight: 'normal'
};

var DataGridRow = function (_PureComponent) {
  _inherits(DataGridRow, _PureComponent);

  function DataGridRow() {
    _classCallCheck(this, DataGridRow);

    return _possibleConstructorReturn(this, (DataGridRow.__proto__ || Object.getPrototypeOf(DataGridRow)).apply(this, arguments));
  }

  _createClass(DataGridRow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          data = _props.data,
          style = _props.style,
          className = _props.className,
          cellStyle = _props.cellStyle,
          cellClassName = _props.cellClassName,
          onClick = _props.onClick,
          onCellClick = _props.onCellClick,
          rest = _objectWithoutProperties(_props, ['data', 'style', 'className', 'cellStyle', 'cellClassName', 'onClick', 'onCellClick']);

      return _react2.default.createElement(
        'tr',
        _extends({}, rest, {
          onClick: onClick,
          className: className,
          style: style
        }),
        data.map(function (dat, i) {
          return _react2.default.createElement(
            'th',
            {
              key: i,
              style: _extends({}, defaultCellStyles, cellStyle),
              className: cellClassName,
              onClick: onCellClick
            },
            dat.component ? _react2.default.createElement(dat.component, { value: dat.value }) : dat.value
          );
        })
      );
    }
  }]);

  return DataGridRow;
}(_react.PureComponent);

DataGridRow.propTypes = {
  data: _propTypes.array.isRequired,
  cellStyle: _propTypes.object,
  cellClassName: _propTypes.string,
  style: _propTypes.object,
  className: _propTypes.string,
  onClick: _propTypes.func,
  onCellClick: _propTypes.func
};

var DataGridHeader = function (_PureComponent2) {
  _inherits(DataGridHeader, _PureComponent2);

  function DataGridHeader() {
    _classCallCheck(this, DataGridHeader);

    return _possibleConstructorReturn(this, (DataGridHeader.__proto__ || Object.getPrototypeOf(DataGridHeader)).apply(this, arguments));
  }

  _createClass(DataGridHeader, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          data = _props2.data,
          style = _props2.style,
          cellStyle = _props2.cellStyle,
          className = _props2.className,
          cellClassName = _props2.cellClassName,
          rest = _objectWithoutProperties(_props2, ['data', 'style', 'cellStyle', 'className', 'cellClassName']);

      return _react2.default.createElement(
        'thead',
        rest,
        _react2.default.createElement(
          'tr',
          {
            style: _extends({ background: color1 }, style),
            className: className
          },
          data.map(function (dat, i) {
            return _react2.default.createElement(
              'th',
              {
                key: dat.index,
                style: _extends({}, defaultCellStyles, cellStyle),
                className: cellClassName
              },
              dat.name
            );
          })
        )
      );
    }
  }]);

  return DataGridHeader;
}(_react.PureComponent);

DataGridHeader.propTypes = {
  data: (0, _propTypes.arrayOf)((0, _propTypes.shape)({
    name: _propTypes.string,
    index: _propTypes.string
  })).isRequired,
  style: _propTypes.object,
  cellStyle: _propTypes.object
};

var DataGrid = function (_PureComponent3) {
  _inherits(DataGrid, _PureComponent3);

  function DataGrid() {
    var _ref;

    var _temp, _this3, _ret;

    _classCallCheck(this, DataGrid);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = DataGrid.__proto__ || Object.getPrototypeOf(DataGrid)).call.apply(_ref, [this].concat(args))), _this3), _this3.indexes = _this3.props.columns.map(function (col, i) {
      return col.index;
    }), _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(DataGrid, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      this.indexes = nextProps.columns.map(function (col, i) {
        return col.index;
      });
    }
  }, {
    key: 'renderData',
    value: function renderData() {
      var _props3 = this.props,
          data = _props3.data,
          columns = _props3.columns,
          rowStyle = _props3.rowStyle,
          rowClassName = _props3.rowClassName,
          cellStyle = _props3.cellStyle,
          cellClassName = _props3.cellClassName,
          onRowClick = _props3.onRowClick,
          onCellClick = _props3.onCellClick;
      var indexes = this.indexes;


      var dats = [];

      data.forEach(function (d, i) {
        var dat = [];
        indexes.forEach(function (idx, i) {
          dat[i] = { value: d[idx], component: columns[i].component };
        });
        dats.push(dat);
      });

      return dats.map(function (d, i) {
        return _react2.default.createElement(DataGridRow, {
          key: i,
          data: d,
          className: rowClassName,
          style: rowStyle,
          cellStyle: cellStyle,
          cellClassName: cellClassName,
          onClick: onRowClick,
          onCellClick: onCellClick
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          columns = _props4.columns,
          style = _props4.style,
          className = _props4.className,
          rowStyle = _props4.rowStyle,
          rowClassName = _props4.rowClassName,
          headerClassName = _props4.headerClassName,
          headerStyle = _props4.headerStyle,
          headerCellClassName = _props4.headerCellClassName,
          headerCellStyle = _props4.headerCellStyle,
          cellStyle = _props4.cellStyle,
          cellClassName = _props4.cellClassName,
          onRowClick = _props4.onRowClick,
          onCellClick = _props4.onCellClick,
          rest = _objectWithoutProperties(_props4, ['columns', 'style', 'className', 'rowStyle', 'rowClassName', 'headerClassName', 'headerStyle', 'headerCellClassName', 'headerCellStyle', 'cellStyle', 'cellClassName', 'onRowClick', 'onCellClick']);

      return _react2.default.createElement(
        'table',
        _extends({}, rest, {
          style: _extends({}, defaultTableStyles, style),
          className: className
        }),
        _react2.default.createElement(DataGridHeader, {
          onClick: onRowClick,
          style: headerStyle,
          cellStyle: headerCellStyle,
          cellClassName: headerCellClassName,
          className: headerClassName,
          data: columns
        }),
        _react2.default.createElement(
          'tbody',
          null,
          this.renderData()
        )
      );
    }
  }]);

  return DataGrid;
}(_react.PureComponent);

DataGrid.propTypes = {
  activeRow: _propTypes.number,
  activeField: _propTypes.string,
  data: _propTypes.array,
  columns: (0, _propTypes.arrayOf)((0, _propTypes.shape)({
    name: _propTypes.string,
    index: _propTypes.string,
    component: _propTypes.func
  })),
  onRowClick: _propTypes.func,
  onFieldClick: _propTypes.func,
  headerStyle: _propTypes.object,
  headerCellStyle: _propTypes.object,
  rowStyle: _propTypes.object,
  cellStyle: _propTypes.object,
  headerClassName: _propTypes.string,
  headerCellClassName: _propTypes.string,
  cellClassName: _propTypes.string,
  rowClassName: _propTypes.string
};
DataGrid.defaultProps = {
  data: [],
  columns: []
};
exports.default = DataGrid;
//# sourceMappingURL=DataGrid.js.map