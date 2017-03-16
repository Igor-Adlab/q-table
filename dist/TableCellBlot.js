'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _quill = require('quill');

var _quill2 = _interopRequireDefault(_quill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = _quill2.default.import('blots/container');
var Block = _quill2.default.import('blots/block');
var Break = _quill2.default.import('blots/break');
var Text = _quill2.default.import('blots/text');
var BlockEmbed = _quill2.default.import('blots/block/embed');
var Parchment = _quill2.default.import('parchment');

var TableCell = function (_Container) {
  _inherits(TableCell, _Container);

  function TableCell() {
    _classCallCheck(this, TableCell);

    return _possibleConstructorReturn(this, (TableCell.__proto__ || Object.getPrototypeOf(TableCell)).apply(this, arguments));
  }

  _createClass(TableCell, [{
    key: 'formats',
    value: function formats() {
      return _defineProperty({}, this.statics.blotName, this.statics.formats(this.domNode));
    }
  }, {
    key: 'formatAt',
    value: function formatAt(index, length, name, value) {
      // Pressing an enter key inside a table will try to insert a new line with `table-cell`,
      // `table-row` and `table` formats. Then after a new line is inserted, the existing code will
      // try to create each of those formats and we'd end up in each new line being wrapped into
      // cell->row->table blots (this is actually pretty much the same way a new table is inserted,
      // only the new line is not inserted by pressing an enter, but directly with delta insert).
      // Since we obviously don't want that happening when pressing enter inside a table as well, we
      // check here if the new line was being inserted in the table we're currently in, in which case
      // we don't let it propagate further. This ensures that all the other blots that have special
      // handling of the enter key function properly (eg. lists), as well as also ensuring that we can
      // easily insert a new table inside an already existing table since their tableId's will be
      // different.
      if (value && this.domNode.getAttribute('data-table-id') === value.tableId) {
        return;
      }
      _get(TableCell.prototype.__proto__ || Object.getPrototypeOf(TableCell.prototype), 'formatAt', this).call(this, index, length, name, value);
    }
  }, {
    key: 'optimize',
    value: function optimize() {
      // When inserting a new table, table-cell is the first blot that's created (well, after Block
      // blot) and what this optimize method does is making sure that each table-cell properly wraps
      // itself into a table-row if it's not already inside a table-row
      _get(TableCell.prototype.__proto__ || Object.getPrototypeOf(TableCell.prototype), 'optimize', this).call(this);
      if (this.parent && this.parent.statics.blotName !== 'table-row') {
        var row = Parchment.create('table-row', this.statics.formats(this.domNode));
        this.parent.insertBefore(row, this);
        row.appendChild(this);
      }
    }
  }, {
    key: 'replace',
    value: function replace(target) {
      // This method is called when inserting a new table (well, more specifically table-cell) and all
      // it does is takes the existing blot where the table is about to be inserted, moves its
      // children, if any, to the table-cell and replaces it with the block blot (which then gets
      // wrapped into table-cell).
      // Note: this does not mean that content that is selected when inserting a new table will be
      // moved into the table. That will be needed to handled specially if/when we want to do that.
      if (target.statics.blotName !== this.statics.blotName) {
        var item = Parchment.create(this.statics.defaultChild);
        target.moveChildren(item);
        this.appendChild(item);
      }
      _get(TableCell.prototype.__proto__ || Object.getPrototypeOf(TableCell.prototype), 'replace', this).call(this, target);
    }
  }], [{
    key: 'create',
    value: function create(value) {
      console.log('[TableCell]: ', value);

      var node = _get(TableCell.__proto__ || Object.getPrototypeOf(TableCell), 'create', this).call(this);
      var tableId = value.tableId,
          rowId = value.rowId,
          cellId = value.cellId;

      if (tableId) {
        node.setAttribute('data-table-id', tableId);
      }
      if (rowId) {
        node.setAttribute('data-row-id', rowId);
      }
      if (cellId) {
        node.setAttribute('data-cell-id', cellId);
      }
      return node;
    }
  }, {
    key: 'formats',
    value: function formats(node) {
      var tableId = node.hasAttribute('data-table-id') ? node.getAttribute('data-table-id') : null;
      var rowId = node.hasAttribute('data-row-id') ? node.getAttribute('data-row-id') : null;
      var cellId = node.hasAttribute('data-cell-id') ? node.getAttribute('data-cell-id') : null;

      return {
        tableId: tableId,
        rowId: rowId,
        cellId: cellId
      };
    }
  }]);

  return TableCell;
}(Container);

TableCell.blotName = 'table-cell';
TableCell.tagName = 'TD';
TableCell.scope = Parchment.Scope.BLOCK_BLOT;
TableCell.defaultChild = 'block';
TableCell.allowedChildren = [Block, BlockEmbed, Container, Break, Text];

exports.default = TableCell;