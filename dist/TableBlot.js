'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _quill = require('quill');

var _quill2 = _interopRequireDefault(_quill);

var _TableRowBlot = require('./TableRowBlot');

var _TableRowBlot2 = _interopRequireDefault(_TableRowBlot);

var _TableCellBlot = require('./TableCellBlot');

var _TableCellBlot2 = _interopRequireDefault(_TableCellBlot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = _quill2.default.import('blots/container');
var Text = _quill2.default.import('blots/text');
var Block = _quill2.default.import('blots/block');
var Break = _quill2.default.import('blots/break');
var BlockEmbed = _quill2.default.import('blots/block/embed');
var Parchment = _quill2.default.import('parchment');

var Table = function (_Container) {
  _inherits(Table, _Container);

  function Table() {
    _classCallCheck(this, Table);

    return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
  }

  _createClass(Table, [{
    key: 'formats',
    value: function formats() {
      return _defineProperty({}, this.statics.blotName, this.statics.formats(this.domNode));
    }
  }, {
    key: 'optimize',
    value: function optimize() {
      _get(Table.prototype.__proto__ || Object.getPrototypeOf(Table.prototype), 'optimize', this).call(this);
      var next = this.next;
      var columnCount = function columnCount(table) {
        return table.children.head.children.length;
      };
      if (next != null && next.prev === this && next.statics.blotName === this.statics.blotName && next.domNode.tagName === this.domNode.tagName && (next.domNode.getAttribute('data-table-id') === this.domNode.getAttribute('data-table-id') || columnCount(next) === columnCount(this))) {
        next.moveChildren(this);
        next.remove();
      }
    }
  }], [{
    key: 'create',
    value: function create(value) {
      var node = _get(Table.__proto__ || Object.getPrototypeOf(Table), 'create', this).call(this);
      var tableId = value.tableId;

      if (tableId) {
        node.setAttribute('data-table-id', tableId);
      }
      return node;
    }
  }, {
    key: 'formats',
    value: function formats(node) {
      var tableId = node.hasAttribute('data-table-id') ? node.getAttribute('data-table-id') : null;

      return {
        tableId: tableId
      };
    }
  }]);

  return Table;
}(Container);

Table.blotName = 'table';
Table.scope = Parchment.Scope.BLOCK_BLOT;
Table.tagName = 'TABLE';
Table.defaultChild = 'table-row';
Table.allowedChildren = [_TableRowBlot2.default, _TableCellBlot2.default, Block, BlockEmbed, Container, Break, Text];

exports.default = Table;