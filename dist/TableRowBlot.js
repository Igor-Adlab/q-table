'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _quill = require('quill');

var _quill2 = _interopRequireDefault(_quill);

var _TableCellBlot = require('./TableCellBlot');

var _TableCellBlot2 = _interopRequireDefault(_TableCellBlot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = _quill2.default.import('blots/container');
var Block = _quill2.default.import('blots/block');
var Text = _quill2.default.import('blots/text');
var Break = _quill2.default.import('blots/break');
var BlockEmbed = _quill2.default.import('blots/block/embed');
var Parchment = _quill2.default.import('parchment');

var TableRow = function (_Container) {
  _inherits(TableRow, _Container);

  function TableRow() {
    _classCallCheck(this, TableRow);

    return _possibleConstructorReturn(this, (TableRow.__proto__ || Object.getPrototypeOf(TableRow)).apply(this, arguments));
  }

  _createClass(TableRow, [{
    key: 'formats',
    value: function formats() {
      // We don't inherit from FormatBlot
      return _defineProperty({}, this.statics.blotName, this.statics.formats(this.domNode));
    }
  }, {
    key: 'optimize',
    value: function optimize() {
      // The purpose of optimize() method for table-row blot is twofold. First it makes sure if there
      // are two rows right next to each other with the same `rowId` value that it merges them
      // together, ie. it moves all the children from the second row into the first one and then
      // deletes the second. And secondly, it does the same thing the table-cell blot does, which is
      // it wraps itself into a table blot if it's not already in one.
      _get(TableRow.prototype.__proto__ || Object.getPrototypeOf(TableRow.prototype), 'optimize', this).call(this);
      var next = this.next;
      if (next != null && next.prev === this && next.statics.blotName === this.statics.blotName && next.domNode.tagName === this.domNode.tagName && next.domNode.getAttribute('data-row-id') === this.domNode.getAttribute('data-row-id')) {
        next.moveChildren(this);
        next.remove();
      }

      if (this.parent && this.parent.statics.blotName !== 'table') {
        var row = Parchment.create('table', this.statics.formats(this.domNode));
        this.parent.insertBefore(row, this);
        row.appendChild(this);
      }
    }
  }], [{
    key: 'create',
    value: function create(value) {
      var node = _get(TableRow.__proto__ || Object.getPrototypeOf(TableRow), 'create', this).call(this);
      var tableId = value.tableId,
          rowId = value.rowId;

      if (tableId) {
        node.setAttribute('data-table-id', tableId);
      }
      if (rowId) {
        node.setAttribute('data-row-id', rowId);
      }
      return node;
    }
  }, {
    key: 'formats',
    value: function formats(node) {
      var tableId = node.hasAttribute('data-table-id') ? node.getAttribute('data-table-id') : null;
      var rowId = node.hasAttribute('data-row-id') ? node.getAttribute('data-row-id') : null;

      return {
        tableId: tableId,
        rowId: rowId
      };
    }
  }]);

  return TableRow;
}(Container);

TableRow.blotName = 'table-row';
TableRow.tagName = 'TR';
TableRow.scope = Parchment.Scope.BLOCK_BLOT;
TableRow.defaultChild = 'table-cell';
TableRow.allowedChildren = [_TableCellBlot2.default, Block, BlockEmbed, Container, Break, Text];

exports.default = TableRow;