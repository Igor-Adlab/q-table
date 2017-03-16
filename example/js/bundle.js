/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = Quill;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _quill = __webpack_require__(0);

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _quill = __webpack_require__(0);

var _quill2 = _interopRequireDefault(_quill);

var _TableCellBlot = __webpack_require__(1);

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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _quill = __webpack_require__(0);

var _quill2 = _interopRequireDefault(_quill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = _quill2.default.import('blots/container');
var Block = _quill2.default.import('blots/block');
var BlockEmbed = _quill2.default.import('blots/block/embed');
var Parchment = _quill2.default.import('parchment');

var ContainBlot = function (_Container) {
  _inherits(ContainBlot, _Container);

  function ContainBlot() {
    _classCallCheck(this, ContainBlot);

    return _possibleConstructorReturn(this, (ContainBlot.__proto__ || Object.getPrototypeOf(ContainBlot)).apply(this, arguments));
  }

  _createClass(ContainBlot, [{
    key: 'insertBefore',
    value: function insertBefore(blot, ref) {
      if (blot.statics.blotName === this.statics.blotName) {
        _get(ContainBlot.prototype.__proto__ || Object.getPrototypeOf(ContainBlot.prototype), 'insertBefore', this).call(this, blot.children.head, ref);
      } else {
        _get(ContainBlot.prototype.__proto__ || Object.getPrototypeOf(ContainBlot.prototype), 'insertBefore', this).call(this, blot, ref);
      }
    }
  }, {
    key: 'formats',
    value: function formats() {
      return _defineProperty({}, this.statics.blotName, this.statics.formats(this.domNode));
    }
  }, {
    key: 'replace',
    value: function replace(target) {
      if (target.statics.blotName !== this.statics.blotName) {
        var item = Parchment.create(this.statics.defaultChild);
        console.log(item, target);
        target.moveChildren(item);
        this.appendChild(item);
      }
      if (target.parent == null) return;
      _get(ContainBlot.prototype.__proto__ || Object.getPrototypeOf(ContainBlot.prototype), 'replace', this).call(this, target);
    }
  }], [{
    key: 'create',
    value: function create() {
      return _get(ContainBlot.__proto__ || Object.getPrototypeOf(ContainBlot), 'create', this).call(this, 'contain');
    }
  }, {
    key: 'formats',
    value: function formats(domNode) {
      return domNode.tagName;
    }
  }]);

  return ContainBlot;
}(Container);

ContainBlot.blotName = 'contain';
ContainBlot.tagName = 'contain';
ContainBlot.scope = Parchment.Scope.BLOCK_BLOT;
ContainBlot.defaultChild = 'block';
ContainBlot.allowedChildren = [Block, BlockEmbed, Container];

exports.default = ContainBlot;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _quill = __webpack_require__(0);

var _quill2 = _interopRequireDefault(_quill);

var _TableRowBlot = __webpack_require__(2);

var _TableRowBlot2 = _interopRequireDefault(_TableRowBlot);

var _TableCellBlot = __webpack_require__(1);

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _src = __webpack_require__(7);

var Quill = window.Quill;
var Delta = Quill.import('delta');

Quill.register('modules/table', _src.QuillModule);

Quill.register({
  'formats/table': _src.TableBlot,
  'formats/table-row': _src.TableRowBlot,
  'formats/table-cell': _src.TableCellBlot
});

var toolbar = [[{ table: ['1x1', '2x2', '3x3', 'custom'] }], ['bold', 'italic', 'underline', 'strike'], ['blockquote', 'code-block'], [{ header: 1 }, { header: 2 }], [{ list: 'ordered' }, { list: 'bullet' }], [{ script: 'sub' }, { script: 'super' }], [{ indent: '-1' }, { indent: '+1' }], [{ direction: 'rtl' }], [{ size: ['small', false, 'large', 'huge'] }], [{ header: [1, 2, 3, 4, 5, 6, false] }], [{ color: [] }, { background: [] }], [{ align: [] }], ['link', 'image', 'code-block'], ['clean']];

var quill = new Quill('#editor', {
  modules: {
    table: true,
    toolbar: {
      container: toolbar
    }
  },
  theme: 'snow'
});

var delta = {
  ops: []
};

quill.setContents(delta);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _quill = __webpack_require__(0);

var _quill2 = _interopRequireDefault(_quill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Delta = _quill2.default.import('delta');

var QuillModule = function () {
  function QuillModule(quill) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, QuillModule);

    this.quill = quill;
    this.options = options;
    this.toolbar = quill.getModule('toolbar');

    this.setup();
  }

  _createClass(QuillModule, [{
    key: 'setup',
    value: function setup() {
      var _this = this;

      this.toolbar.addHandler('table', function (size) {
        switch (size) {
          case 'custom':
            {
              var columns = prompt('Numbers of columns: ');
              var rows = prompt('Numbers of rows: ');
              return _this.addTableHandler(columns + 'x' + rows);
            }
          default:
            return _this.addTableHandler(size);
        }
      });

      var tableId = 'table-' + QuillModule.rand();
      var rowId = 'row-' + QuillModule.rand();

      this.quill.clipboard.addMatcher('TABLE', function (node, delta) {
        tableId = 'table-' + QuillModule.rand();
        return delta.compose(new Delta().retain(delta.length(), { table: { tableId: tableId } }));
      });
      this.quill.clipboard.addMatcher('TR', function (node, delta) {
        rowId = 'row-' + QuillModule.rand();
        return delta.compose(new Delta().retain(delta.length(), { 'table-row': { tableId: tableId, rowId: rowId } }));
      });
      this.quill.clipboard.addMatcher('TD', function (node, delta) {
        var cellId = 'cell-' + QuillModule.rand();
        return delta.compose(new Delta().retain(delta.length(), { 'table-cell': { tableId: tableId, rowId: rowId, cellId: cellId } }));
      });
    }
  }, {
    key: 'getClosestNewLineIndex',
    value: function getClosestNewLineIndex(index) {
      return index + this.quill.getContents().map(function (op) {
        return typeof op.insert === 'string' ? op.insert : ' ';
      }).join('').slice(index).indexOf('\n');
    }
  }, {
    key: 'addTableHandler',
    value: function addTableHandler(size) {
      var _size$split = size.split('x'),
          _size$split2 = _slicedToArray(_size$split, 2),
          columns = _size$split2[0],
          rows = _size$split2[1];

      var range = this.quill.getSelection();
      if (!range) return;
      var newLineIndex = this.getClosestNewLineIndex(range.index + range.length);
      var changeDelta = new Delta().retain(newLineIndex);
      changeDelta = changeDelta.insert('\n');
      var tableId = 'table-' + QuillModule.rand();

      for (var i = 0; i < rows; i += 1) {
        var rowId = 'row-' + QuillModule.rand();
        for (var j = 0; j < columns; j += 1) {
          var cellId = 'cell-' + QuillModule.rand();
          changeDelta = changeDelta.insert('\n', { 'table-cell': { tableId: tableId, rowId: rowId, cellId: cellId } });
        }
      }
      this.quill.updateContents(changeDelta, _quill2.default.sources.USER);
      this.quill.setSelection(newLineIndex + 1);
    }
  }]);

  return QuillModule;
}();

exports.default = QuillModule;


QuillModule.rand = function () {
  return Math.random().toString(36).slice(2);
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableRowBlot = exports.TableCellBlot = exports.ContainBlot = exports.TableBlot = exports.QuillModule = undefined;

var _QuillModule2 = __webpack_require__(6);

var _QuillModule3 = _interopRequireDefault(_QuillModule2);

var _TableBlot2 = __webpack_require__(4);

var _TableBlot3 = _interopRequireDefault(_TableBlot2);

var _ContainBlot2 = __webpack_require__(3);

var _ContainBlot3 = _interopRequireDefault(_ContainBlot2);

var _TableCellBlot2 = __webpack_require__(1);

var _TableCellBlot3 = _interopRequireDefault(_TableCellBlot2);

var _TableRowBlot2 = __webpack_require__(2);

var _TableRowBlot3 = _interopRequireDefault(_TableRowBlot2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.QuillModule = _QuillModule3.default;
exports.TableBlot = _TableBlot3.default;
exports.ContainBlot = _ContainBlot3.default;
exports.TableCellBlot = _TableCellBlot3.default;
exports.TableRowBlot = _TableRowBlot3.default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWRmYWQ3MzczZWE3MzQ4ZWM5OTgiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUXVpbGxcIiIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGVDZWxsQmxvdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGVSb3dCbG90LmpzIiwid2VicGFjazovLy8uL3NyYy9Db250YWluQmxvdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGFibGVCbG90LmpzIiwid2VicGFjazovLy8uL2V4YW1wbGUvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9RdWlsbE1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQ29udGFpbmVyIiwiaW1wb3J0IiwiQmxvY2siLCJCcmVhayIsIlRleHQiLCJCbG9ja0VtYmVkIiwiUGFyY2htZW50IiwiVGFibGVDZWxsIiwic3RhdGljcyIsImJsb3ROYW1lIiwiZm9ybWF0cyIsImRvbU5vZGUiLCJpbmRleCIsImxlbmd0aCIsIm5hbWUiLCJ2YWx1ZSIsImdldEF0dHJpYnV0ZSIsInRhYmxlSWQiLCJwYXJlbnQiLCJyb3ciLCJjcmVhdGUiLCJpbnNlcnRCZWZvcmUiLCJhcHBlbmRDaGlsZCIsInRhcmdldCIsIml0ZW0iLCJkZWZhdWx0Q2hpbGQiLCJtb3ZlQ2hpbGRyZW4iLCJjb25zb2xlIiwibG9nIiwibm9kZSIsInJvd0lkIiwiY2VsbElkIiwic2V0QXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwidGFnTmFtZSIsInNjb3BlIiwiU2NvcGUiLCJCTE9DS19CTE9UIiwiYWxsb3dlZENoaWxkcmVuIiwiVGFibGVSb3ciLCJuZXh0IiwicHJldiIsInJlbW92ZSIsIkNvbnRhaW5CbG90IiwiYmxvdCIsInJlZiIsImNoaWxkcmVuIiwiaGVhZCIsIlRhYmxlIiwiY29sdW1uQ291bnQiLCJ0YWJsZSIsIlF1aWxsIiwid2luZG93IiwiRGVsdGEiLCJyZWdpc3RlciIsInRvb2xiYXIiLCJoZWFkZXIiLCJsaXN0Iiwic2NyaXB0IiwiaW5kZW50IiwiZGlyZWN0aW9uIiwic2l6ZSIsImNvbG9yIiwiYmFja2dyb3VuZCIsImFsaWduIiwicXVpbGwiLCJtb2R1bGVzIiwiY29udGFpbmVyIiwidGhlbWUiLCJkZWx0YSIsIm9wcyIsInNldENvbnRlbnRzIiwiUXVpbGxNb2R1bGUiLCJvcHRpb25zIiwiZ2V0TW9kdWxlIiwic2V0dXAiLCJhZGRIYW5kbGVyIiwiY29sdW1ucyIsInByb21wdCIsInJvd3MiLCJhZGRUYWJsZUhhbmRsZXIiLCJyYW5kIiwiY2xpcGJvYXJkIiwiYWRkTWF0Y2hlciIsImNvbXBvc2UiLCJyZXRhaW4iLCJnZXRDb250ZW50cyIsIm1hcCIsIm9wIiwiaW5zZXJ0Iiwiam9pbiIsInNsaWNlIiwiaW5kZXhPZiIsInNwbGl0IiwicmFuZ2UiLCJnZXRTZWxlY3Rpb24iLCJuZXdMaW5lSW5kZXgiLCJnZXRDbG9zZXN0TmV3TGluZUluZGV4IiwiY2hhbmdlRGVsdGEiLCJpIiwiaiIsInVwZGF0ZUNvbnRlbnRzIiwic291cmNlcyIsIlVTRVIiLCJzZXRTZWxlY3Rpb24iLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJUYWJsZUJsb3QiLCJUYWJsZUNlbGxCbG90IiwiVGFibGVSb3dCbG90Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwr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QyxTO1FBQ0FqRSxXO1FBQ0FrRSxhO1FBQ0FDLFkiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gOCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMWRmYWQ3MzczZWE3MzQ4ZWM5OTgiLCJtb2R1bGUuZXhwb3J0cyA9IFF1aWxsO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUXVpbGxcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUXVpbGwgZnJvbSAncXVpbGwnO1xuXG5jb25zdCBDb250YWluZXIgPSBRdWlsbC5pbXBvcnQoJ2Jsb3RzL2NvbnRhaW5lcicpO1xuY29uc3QgQmxvY2sgPSBRdWlsbC5pbXBvcnQoJ2Jsb3RzL2Jsb2NrJyk7XG5jb25zdCBCcmVhayA9IFF1aWxsLmltcG9ydCgnYmxvdHMvYnJlYWsnKTtcbmNvbnN0IFRleHQgPSBRdWlsbC5pbXBvcnQoJ2Jsb3RzL3RleHQnKTtcbmNvbnN0IEJsb2NrRW1iZWQgPSBRdWlsbC5pbXBvcnQoJ2Jsb3RzL2Jsb2NrL2VtYmVkJyk7XG5jb25zdCBQYXJjaG1lbnQgPSBRdWlsbC5pbXBvcnQoJ3BhcmNobWVudCcpO1xuXG5jbGFzcyBUYWJsZUNlbGwgZXh0ZW5kcyBDb250YWluZXIge1xuICBzdGF0aWMgY3JlYXRlKHZhbHVlKSB7XG4gICAgY29uc29sZS5sb2coJ1tUYWJsZUNlbGxdOiAnLCB2YWx1ZSlcblxuICAgIGNvbnN0IG5vZGUgPSBzdXBlci5jcmVhdGUoKTtcbiAgICBjb25zdCB7IHRhYmxlSWQsIHJvd0lkLCBjZWxsSWQgfSA9IHZhbHVlO1xuICAgIGlmICh0YWJsZUlkKSB7XG4gICAgICBub2RlLnNldEF0dHJpYnV0ZSgnZGF0YS10YWJsZS1pZCcsIHRhYmxlSWQpO1xuICAgIH1cbiAgICBpZiAocm93SWQpIHtcbiAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLXJvdy1pZCcsIHJvd0lkKTtcbiAgICB9XG4gICAgaWYgKGNlbGxJZCkge1xuICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1pZCcsIGNlbGxJZCk7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgc3RhdGljIGZvcm1hdHMobm9kZSkge1xuICAgIGNvbnN0IHRhYmxlSWQgPSBub2RlLmhhc0F0dHJpYnV0ZSgnZGF0YS10YWJsZS1pZCcpID8gbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFibGUtaWQnKSA6IG51bGxcbiAgICBjb25zdCByb3dJZCA9IG5vZGUuaGFzQXR0cmlidXRlKCdkYXRhLXJvdy1pZCcpID8gbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93LWlkJykgOiBudWxsXG4gICAgY29uc3QgY2VsbElkID0gbm9kZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1pZCcpID8gbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1pZCcpIDogbnVsbFxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRhYmxlSWQsXG4gICAgICByb3dJZCxcbiAgICAgIGNlbGxJZCxcbiAgICB9O1xuICB9XG5cbiAgZm9ybWF0cygpIHtcbiAgICByZXR1cm4geyBbdGhpcy5zdGF0aWNzLmJsb3ROYW1lXTogdGhpcy5zdGF0aWNzLmZvcm1hdHModGhpcy5kb21Ob2RlKSB9O1xuICB9XG5cbiAgZm9ybWF0QXQoaW5kZXgsIGxlbmd0aCwgbmFtZSwgdmFsdWUpIHtcbiAgICAvLyBQcmVzc2luZyBhbiBlbnRlciBrZXkgaW5zaWRlIGEgdGFibGUgd2lsbCB0cnkgdG8gaW5zZXJ0IGEgbmV3IGxpbmUgd2l0aCBgdGFibGUtY2VsbGAsXG4gICAgLy8gYHRhYmxlLXJvd2AgYW5kIGB0YWJsZWAgZm9ybWF0cy4gVGhlbiBhZnRlciBhIG5ldyBsaW5lIGlzIGluc2VydGVkLCB0aGUgZXhpc3RpbmcgY29kZSB3aWxsXG4gICAgLy8gdHJ5IHRvIGNyZWF0ZSBlYWNoIG9mIHRob3NlIGZvcm1hdHMgYW5kIHdlJ2QgZW5kIHVwIGluIGVhY2ggbmV3IGxpbmUgYmVpbmcgd3JhcHBlZCBpbnRvXG4gICAgLy8gY2VsbC0+cm93LT50YWJsZSBibG90cyAodGhpcyBpcyBhY3R1YWxseSBwcmV0dHkgbXVjaCB0aGUgc2FtZSB3YXkgYSBuZXcgdGFibGUgaXMgaW5zZXJ0ZWQsXG4gICAgLy8gb25seSB0aGUgbmV3IGxpbmUgaXMgbm90IGluc2VydGVkIGJ5IHByZXNzaW5nIGFuIGVudGVyLCBidXQgZGlyZWN0bHkgd2l0aCBkZWx0YSBpbnNlcnQpLlxuICAgIC8vIFNpbmNlIHdlIG9idmlvdXNseSBkb24ndCB3YW50IHRoYXQgaGFwcGVuaW5nIHdoZW4gcHJlc3NpbmcgZW50ZXIgaW5zaWRlIGEgdGFibGUgYXMgd2VsbCwgd2VcbiAgICAvLyBjaGVjayBoZXJlIGlmIHRoZSBuZXcgbGluZSB3YXMgYmVpbmcgaW5zZXJ0ZWQgaW4gdGhlIHRhYmxlIHdlJ3JlIGN1cnJlbnRseSBpbiwgaW4gd2hpY2ggY2FzZVxuICAgIC8vIHdlIGRvbid0IGxldCBpdCBwcm9wYWdhdGUgZnVydGhlci4gVGhpcyBlbnN1cmVzIHRoYXQgYWxsIHRoZSBvdGhlciBibG90cyB0aGF0IGhhdmUgc3BlY2lhbFxuICAgIC8vIGhhbmRsaW5nIG9mIHRoZSBlbnRlciBrZXkgZnVuY3Rpb24gcHJvcGVybHkgKGVnLiBsaXN0cyksIGFzIHdlbGwgYXMgYWxzbyBlbnN1cmluZyB0aGF0IHdlIGNhblxuICAgIC8vIGVhc2lseSBpbnNlcnQgYSBuZXcgdGFibGUgaW5zaWRlIGFuIGFscmVhZHkgZXhpc3RpbmcgdGFibGUgc2luY2UgdGhlaXIgdGFibGVJZCdzIHdpbGwgYmVcbiAgICAvLyBkaWZmZXJlbnQuXG4gICAgaWYgKHZhbHVlICYmIHRoaXMuZG9tTm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFibGUtaWQnKSA9PT0gdmFsdWUudGFibGVJZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHN1cGVyLmZvcm1hdEF0KGluZGV4LCBsZW5ndGgsIG5hbWUsIHZhbHVlKVxuICB9XG5cbiAgb3B0aW1pemUoKSB7XG4gICAgLy8gV2hlbiBpbnNlcnRpbmcgYSBuZXcgdGFibGUsIHRhYmxlLWNlbGwgaXMgdGhlIGZpcnN0IGJsb3QgdGhhdCdzIGNyZWF0ZWQgKHdlbGwsIGFmdGVyIEJsb2NrXG4gICAgLy8gYmxvdCkgYW5kIHdoYXQgdGhpcyBvcHRpbWl6ZSBtZXRob2QgZG9lcyBpcyBtYWtpbmcgc3VyZSB0aGF0IGVhY2ggdGFibGUtY2VsbCBwcm9wZXJseSB3cmFwc1xuICAgIC8vIGl0c2VsZiBpbnRvIGEgdGFibGUtcm93IGlmIGl0J3Mgbm90IGFscmVhZHkgaW5zaWRlIGEgdGFibGUtcm93XG4gICAgc3VwZXIub3B0aW1pemUoKTtcbiAgICBpZiAodGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuc3RhdGljcy5ibG90TmFtZSAhPT0gJ3RhYmxlLXJvdycpIHtcbiAgICAgIGNvbnN0IHJvdyA9IFBhcmNobWVudC5jcmVhdGUoJ3RhYmxlLXJvdycsIHRoaXMuc3RhdGljcy5mb3JtYXRzKHRoaXMuZG9tTm9kZSkpO1xuICAgICAgdGhpcy5wYXJlbnQuaW5zZXJ0QmVmb3JlKHJvdywgdGhpcyk7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgcmVwbGFjZSh0YXJnZXQpIHtcbiAgICAvLyBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgd2hlbiBpbnNlcnRpbmcgYSBuZXcgdGFibGUgKHdlbGwsIG1vcmUgc3BlY2lmaWNhbGx5IHRhYmxlLWNlbGwpIGFuZCBhbGxcbiAgICAvLyBpdCBkb2VzIGlzIHRha2VzIHRoZSBleGlzdGluZyBibG90IHdoZXJlIHRoZSB0YWJsZSBpcyBhYm91dCB0byBiZSBpbnNlcnRlZCwgbW92ZXMgaXRzXG4gICAgLy8gY2hpbGRyZW4sIGlmIGFueSwgdG8gdGhlIHRhYmxlLWNlbGwgYW5kIHJlcGxhY2VzIGl0IHdpdGggdGhlIGJsb2NrIGJsb3QgKHdoaWNoIHRoZW4gZ2V0c1xuICAgIC8vIHdyYXBwZWQgaW50byB0YWJsZS1jZWxsKS5cbiAgICAvLyBOb3RlOiB0aGlzIGRvZXMgbm90IG1lYW4gdGhhdCBjb250ZW50IHRoYXQgaXMgc2VsZWN0ZWQgd2hlbiBpbnNlcnRpbmcgYSBuZXcgdGFibGUgd2lsbCBiZVxuICAgIC8vIG1vdmVkIGludG8gdGhlIHRhYmxlLiBUaGF0IHdpbGwgYmUgbmVlZGVkIHRvIGhhbmRsZWQgc3BlY2lhbGx5IGlmL3doZW4gd2Ugd2FudCB0byBkbyB0aGF0LlxuICAgIGlmICh0YXJnZXQuc3RhdGljcy5ibG90TmFtZSAhPT0gdGhpcy5zdGF0aWNzLmJsb3ROYW1lKSB7XG4gICAgICBjb25zdCBpdGVtID0gUGFyY2htZW50LmNyZWF0ZSh0aGlzLnN0YXRpY3MuZGVmYXVsdENoaWxkKTtcbiAgICAgIHRhcmdldC5tb3ZlQ2hpbGRyZW4oaXRlbSk7XG4gICAgICB0aGlzLmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgIH1cbiAgICBzdXBlci5yZXBsYWNlKHRhcmdldClcbiAgfVxufVxuVGFibGVDZWxsLmJsb3ROYW1lID0gJ3RhYmxlLWNlbGwnO1xuVGFibGVDZWxsLnRhZ05hbWUgPSAnVEQnO1xuVGFibGVDZWxsLnNjb3BlID0gUGFyY2htZW50LlNjb3BlLkJMT0NLX0JMT1Q7XG5UYWJsZUNlbGwuZGVmYXVsdENoaWxkID0gJ2Jsb2NrJztcblRhYmxlQ2VsbC5hbGxvd2VkQ2hpbGRyZW4gPSBbQmxvY2ssIEJsb2NrRW1iZWQsIENvbnRhaW5lciwgQnJlYWssIFRleHRdO1xuXG5leHBvcnQgZGVmYXVsdCBUYWJsZUNlbGw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvVGFibGVDZWxsQmxvdC5qcyIsImltcG9ydCBRdWlsbCBmcm9tICdxdWlsbCc7XG5pbXBvcnQgVGFibGVDZWxsIGZyb20gJy4vVGFibGVDZWxsQmxvdCc7XG5cbmNvbnN0IENvbnRhaW5lciA9IFF1aWxsLmltcG9ydCgnYmxvdHMvY29udGFpbmVyJyk7XG5jb25zdCBCbG9jayA9IFF1aWxsLmltcG9ydCgnYmxvdHMvYmxvY2snKTtcbmNvbnN0IFRleHQgPSBRdWlsbC5pbXBvcnQoJ2Jsb3RzL3RleHQnKTtcbmNvbnN0IEJyZWFrID0gUXVpbGwuaW1wb3J0KCdibG90cy9icmVhaycpO1xuY29uc3QgQmxvY2tFbWJlZCA9IFF1aWxsLmltcG9ydCgnYmxvdHMvYmxvY2svZW1iZWQnKTtcbmNvbnN0IFBhcmNobWVudCA9IFF1aWxsLmltcG9ydCgncGFyY2htZW50Jyk7XG5cbmNsYXNzIFRhYmxlUm93IGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgc3RhdGljIGNyZWF0ZSh2YWx1ZSkge1xuICAgIGNvbnN0IG5vZGUgPSBzdXBlci5jcmVhdGUoKTtcbiAgICBjb25zdCB7IHRhYmxlSWQsIHJvd0lkIH0gPSB2YWx1ZTtcbiAgICBpZiAodGFibGVJZCkge1xuICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFibGUtaWQnLCB0YWJsZUlkKTtcbiAgICB9XG4gICAgaWYgKHJvd0lkKSB7XG4gICAgICBub2RlLnNldEF0dHJpYnV0ZSgnZGF0YS1yb3ctaWQnLCByb3dJZCk7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgc3RhdGljIGZvcm1hdHMobm9kZSkge1xuICAgIGNvbnN0IHRhYmxlSWQgPSBub2RlLmhhc0F0dHJpYnV0ZSgnZGF0YS10YWJsZS1pZCcpID8gbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFibGUtaWQnKSA6IG51bGxcbiAgICBjb25zdCByb3dJZCA9IG5vZGUuaGFzQXR0cmlidXRlKCdkYXRhLXJvdy1pZCcpID8gbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93LWlkJykgOiBudWxsXG5cbiAgICByZXR1cm4ge1xuICAgICAgdGFibGVJZCxcbiAgICAgIHJvd0lkLFxuICAgIH07XG4gIH1cblxuICBmb3JtYXRzKCkge1xuICAgIC8vIFdlIGRvbid0IGluaGVyaXQgZnJvbSBGb3JtYXRCbG90XG4gICAgcmV0dXJuIHsgW3RoaXMuc3RhdGljcy5ibG90TmFtZV06IHRoaXMuc3RhdGljcy5mb3JtYXRzKHRoaXMuZG9tTm9kZSkgfTtcbiAgfVxuXG4gIG9wdGltaXplKCkge1xuICAgIC8vIFRoZSBwdXJwb3NlIG9mIG9wdGltaXplKCkgbWV0aG9kIGZvciB0YWJsZS1yb3cgYmxvdCBpcyB0d29mb2xkLiBGaXJzdCBpdCBtYWtlcyBzdXJlIGlmIHRoZXJlXG4gICAgLy8gYXJlIHR3byByb3dzIHJpZ2h0IG5leHQgdG8gZWFjaCBvdGhlciB3aXRoIHRoZSBzYW1lIGByb3dJZGAgdmFsdWUgdGhhdCBpdCBtZXJnZXMgdGhlbVxuICAgIC8vIHRvZ2V0aGVyLCBpZS4gaXQgbW92ZXMgYWxsIHRoZSBjaGlsZHJlbiBmcm9tIHRoZSBzZWNvbmQgcm93IGludG8gdGhlIGZpcnN0IG9uZSBhbmQgdGhlblxuICAgIC8vIGRlbGV0ZXMgdGhlIHNlY29uZC4gQW5kIHNlY29uZGx5LCBpdCBkb2VzIHRoZSBzYW1lIHRoaW5nIHRoZSB0YWJsZS1jZWxsIGJsb3QgZG9lcywgd2hpY2ggaXNcbiAgICAvLyBpdCB3cmFwcyBpdHNlbGYgaW50byBhIHRhYmxlIGJsb3QgaWYgaXQncyBub3QgYWxyZWFkeSBpbiBvbmUuXG4gICAgc3VwZXIub3B0aW1pemUoKTtcbiAgICBsZXQgbmV4dCA9IHRoaXMubmV4dDtcbiAgICBpZiAobmV4dCAhPSBudWxsICYmIG5leHQucHJldiA9PT0gdGhpcyAmJlxuICAgICAgbmV4dC5zdGF0aWNzLmJsb3ROYW1lID09PSB0aGlzLnN0YXRpY3MuYmxvdE5hbWUgJiZcbiAgICAgIG5leHQuZG9tTm9kZS50YWdOYW1lID09PSB0aGlzLmRvbU5vZGUudGFnTmFtZSAmJlxuICAgICAgbmV4dC5kb21Ob2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1yb3ctaWQnKSA9PT0gdGhpcy5kb21Ob2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1yb3ctaWQnKSkge1xuICAgICAgbmV4dC5tb3ZlQ2hpbGRyZW4odGhpcyk7XG4gICAgICBuZXh0LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5zdGF0aWNzLmJsb3ROYW1lICE9PSAndGFibGUnKSB7XG4gICAgICBjb25zdCByb3cgPSBQYXJjaG1lbnQuY3JlYXRlKCd0YWJsZScsIHRoaXMuc3RhdGljcy5mb3JtYXRzKHRoaXMuZG9tTm9kZSkpO1xuICAgICAgdGhpcy5wYXJlbnQuaW5zZXJ0QmVmb3JlKHJvdywgdGhpcyk7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQodGhpcyk7XG4gICAgfVxuICB9XG59XG5UYWJsZVJvdy5ibG90TmFtZSA9ICd0YWJsZS1yb3cnO1xuVGFibGVSb3cudGFnTmFtZSA9ICdUUic7XG5UYWJsZVJvdy5zY29wZSA9IFBhcmNobWVudC5TY29wZS5CTE9DS19CTE9UO1xuVGFibGVSb3cuZGVmYXVsdENoaWxkID0gJ3RhYmxlLWNlbGwnO1xuVGFibGVSb3cuYWxsb3dlZENoaWxkcmVuID0gW1RhYmxlQ2VsbCwgQmxvY2ssIEJsb2NrRW1iZWQsIENvbnRhaW5lciwgQnJlYWssIFRleHRdO1xuXG5leHBvcnQgZGVmYXVsdCBUYWJsZVJvdztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9UYWJsZVJvd0Jsb3QuanMiLCJpbXBvcnQgUXVpbGwgZnJvbSAncXVpbGwnO1xuXG5jb25zdCBDb250YWluZXIgPSBRdWlsbC5pbXBvcnQoJ2Jsb3RzL2NvbnRhaW5lcicpO1xuY29uc3QgQmxvY2sgPSBRdWlsbC5pbXBvcnQoJ2Jsb3RzL2Jsb2NrJyk7XG5jb25zdCBCbG9ja0VtYmVkID0gUXVpbGwuaW1wb3J0KCdibG90cy9ibG9jay9lbWJlZCcpO1xuY29uc3QgUGFyY2htZW50ID0gUXVpbGwuaW1wb3J0KCdwYXJjaG1lbnQnKTtcblxuY2xhc3MgQ29udGFpbkJsb3QgZXh0ZW5kcyBDb250YWluZXIge1xuICBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiBzdXBlci5jcmVhdGUoJ2NvbnRhaW4nKTtcbiAgfVxuXG4gIGluc2VydEJlZm9yZShibG90LCByZWYpIHtcbiAgICBpZiAoYmxvdC5zdGF0aWNzLmJsb3ROYW1lID09PSB0aGlzLnN0YXRpY3MuYmxvdE5hbWUpIHtcbiAgICAgIHN1cGVyLmluc2VydEJlZm9yZShibG90LmNoaWxkcmVuLmhlYWQsIHJlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmluc2VydEJlZm9yZShibG90LCByZWYpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmb3JtYXRzKGRvbU5vZGUpIHtcbiAgICByZXR1cm4gZG9tTm9kZS50YWdOYW1lO1xuICB9XG5cbiAgZm9ybWF0cygpIHtcbiAgICByZXR1cm4geyBbdGhpcy5zdGF0aWNzLmJsb3ROYW1lXTogdGhpcy5zdGF0aWNzLmZvcm1hdHModGhpcy5kb21Ob2RlKSB9O1xuICB9XG5cbiAgcmVwbGFjZSh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LnN0YXRpY3MuYmxvdE5hbWUgIT09IHRoaXMuc3RhdGljcy5ibG90TmFtZSkge1xuICAgICAgY29uc3QgaXRlbSA9IFBhcmNobWVudC5jcmVhdGUodGhpcy5zdGF0aWNzLmRlZmF1bHRDaGlsZClcbiAgICAgIGNvbnNvbGUubG9nKGl0ZW0sIHRhcmdldClcbiAgICAgIHRhcmdldC5tb3ZlQ2hpbGRyZW4oaXRlbSk7XG4gICAgICB0aGlzLmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0LnBhcmVudCA9PSBudWxsKSByZXR1cm47XG4gICAgc3VwZXIucmVwbGFjZSh0YXJnZXQpO1xuICB9XG59XG5cbkNvbnRhaW5CbG90LmJsb3ROYW1lID0gJ2NvbnRhaW4nO1xuQ29udGFpbkJsb3QudGFnTmFtZSA9ICdjb250YWluJztcbkNvbnRhaW5CbG90LnNjb3BlID0gUGFyY2htZW50LlNjb3BlLkJMT0NLX0JMT1Q7XG5Db250YWluQmxvdC5kZWZhdWx0Q2hpbGQgPSAnYmxvY2snO1xuQ29udGFpbkJsb3QuYWxsb3dlZENoaWxkcmVuID0gW0Jsb2NrLCBCbG9ja0VtYmVkLCBDb250YWluZXJdO1xuXG5leHBvcnQgZGVmYXVsdCBDb250YWluQmxvdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Db250YWluQmxvdC5qcyIsImltcG9ydCBRdWlsbCBmcm9tICdxdWlsbCc7XG5pbXBvcnQgVGFibGVSb3cgZnJvbSAnLi9UYWJsZVJvd0Jsb3QnO1xuaW1wb3J0IFRhYmxlQ2VsbCBmcm9tICcuL1RhYmxlQ2VsbEJsb3QnO1xuXG5jb25zdCBDb250YWluZXIgPSBRdWlsbC5pbXBvcnQoJ2Jsb3RzL2NvbnRhaW5lcicpO1xuY29uc3QgVGV4dCA9IFF1aWxsLmltcG9ydCgnYmxvdHMvdGV4dCcpO1xuY29uc3QgQmxvY2sgPSBRdWlsbC5pbXBvcnQoJ2Jsb3RzL2Jsb2NrJyk7XG5jb25zdCBCcmVhayA9IFF1aWxsLmltcG9ydCgnYmxvdHMvYnJlYWsnKTtcbmNvbnN0IEJsb2NrRW1iZWQgPSBRdWlsbC5pbXBvcnQoJ2Jsb3RzL2Jsb2NrL2VtYmVkJyk7XG5jb25zdCBQYXJjaG1lbnQgPSBRdWlsbC5pbXBvcnQoJ3BhcmNobWVudCcpO1xuXG5jbGFzcyBUYWJsZSBleHRlbmRzIENvbnRhaW5lciB7XG4gIHN0YXRpYyBjcmVhdGUodmFsdWUpIHtcbiAgICBjb25zdCBub2RlID0gc3VwZXIuY3JlYXRlKCk7XG4gICAgY29uc3QgeyB0YWJsZUlkIH0gPSB2YWx1ZTtcbiAgICBpZiAodGFibGVJZCkge1xuICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFibGUtaWQnLCB0YWJsZUlkKTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBzdGF0aWMgZm9ybWF0cyhub2RlKSB7XG4gICAgY29uc3QgdGFibGVJZCA9IG5vZGUuaGFzQXR0cmlidXRlKCdkYXRhLXRhYmxlLWlkJykgPyBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS10YWJsZS1pZCcpIDogbnVsbFxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRhYmxlSWQsXG4gICAgfTtcbiAgfVxuXG4gIGZvcm1hdHMoKSB7XG4gICAgcmV0dXJuIHsgW3RoaXMuc3RhdGljcy5ibG90TmFtZV06IHRoaXMuc3RhdGljcy5mb3JtYXRzKHRoaXMuZG9tTm9kZSkgfTtcbiAgfVxuXG4gIG9wdGltaXplKCkge1xuICAgIHN1cGVyLm9wdGltaXplKCk7XG4gICAgbGV0IG5leHQgPSB0aGlzLm5leHQ7XG4gICAgY29uc3QgY29sdW1uQ291bnQgPSAodGFibGUpID0+IHRhYmxlLmNoaWxkcmVuLmhlYWQuY2hpbGRyZW4ubGVuZ3RoXG4gICAgaWYgKG5leHQgIT0gbnVsbCAmJiBuZXh0LnByZXYgPT09IHRoaXMgJiZcbiAgICAgIG5leHQuc3RhdGljcy5ibG90TmFtZSA9PT0gdGhpcy5zdGF0aWNzLmJsb3ROYW1lICYmXG4gICAgICBuZXh0LmRvbU5vZGUudGFnTmFtZSA9PT0gdGhpcy5kb21Ob2RlLnRhZ05hbWUgJiZcbiAgICAgIChuZXh0LmRvbU5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYmxlLWlkJykgPT09IHRoaXMuZG9tTm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFibGUtaWQnKSB8fFxuICAgICAgY29sdW1uQ291bnQobmV4dCkgPT09IGNvbHVtbkNvdW50KHRoaXMpKSkge1xuICAgICAgbmV4dC5tb3ZlQ2hpbGRyZW4odGhpcyk7XG4gICAgICBuZXh0LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxufVxuVGFibGUuYmxvdE5hbWUgPSAndGFibGUnO1xuVGFibGUuc2NvcGUgPSBQYXJjaG1lbnQuU2NvcGUuQkxPQ0tfQkxPVDtcblRhYmxlLnRhZ05hbWUgPSAnVEFCTEUnO1xuVGFibGUuZGVmYXVsdENoaWxkID0gJ3RhYmxlLXJvdyc7XG5UYWJsZS5hbGxvd2VkQ2hpbGRyZW4gPSBbVGFibGVSb3csIFRhYmxlQ2VsbCwgQmxvY2ssIEJsb2NrRW1iZWQsIENvbnRhaW5lciwgQnJlYWssIFRleHRdO1xuXG5leHBvcnQgZGVmYXVsdCBUYWJsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9UYWJsZUJsb3QuanMiLCJpbXBvcnQgeyBUYWJsZUJsb3QsIFRhYmxlUm93QmxvdCwgVGFibGVDZWxsQmxvdCwgUXVpbGxNb2R1bGUgfSBmcm9tICcuLi8uLi9zcmMnO1xuXG5jb25zdCBRdWlsbCA9IHdpbmRvdy5RdWlsbDtcbmNvbnN0IERlbHRhID0gUXVpbGwuaW1wb3J0KCdkZWx0YScpO1xuXG5RdWlsbC5yZWdpc3RlcignbW9kdWxlcy90YWJsZScsIFF1aWxsTW9kdWxlKTtcblxuUXVpbGwucmVnaXN0ZXIoe1xuICAnZm9ybWF0cy90YWJsZSc6IFRhYmxlQmxvdCxcbiAgJ2Zvcm1hdHMvdGFibGUtcm93JzogVGFibGVSb3dCbG90LFxuICAnZm9ybWF0cy90YWJsZS1jZWxsJzogVGFibGVDZWxsQmxvdCxcbn0pO1xuXG5jb25zdCB0b29sYmFyID0gW1xuICBbeyB0YWJsZTogWycxeDEnLCAnMngyJywgJzN4MycsICdjdXN0b20nXSB9XSxcblxuICBbJ2JvbGQnLCAnaXRhbGljJywgJ3VuZGVybGluZScsICdzdHJpa2UnXSxcbiAgWydibG9ja3F1b3RlJywgJ2NvZGUtYmxvY2snXSxcbiAgW3sgaGVhZGVyOiAxIH0sIHsgaGVhZGVyOiAyIH1dLFxuICBbeyBsaXN0OiAnb3JkZXJlZCcgfSwgeyBsaXN0OiAnYnVsbGV0JyB9XSxcbiAgW3sgc2NyaXB0OiAnc3ViJyB9LCB7IHNjcmlwdDogJ3N1cGVyJyB9XSxcbiAgW3sgaW5kZW50OiAnLTEnIH0sIHsgaW5kZW50OiAnKzEnIH1dLFxuICBbeyBkaXJlY3Rpb246ICdydGwnIH1dLFxuICBbeyBzaXplOiBbJ3NtYWxsJywgZmFsc2UsICdsYXJnZScsICdodWdlJ10gfV0sXG4gIFt7IGhlYWRlcjogWzEsIDIsIDMsIDQsIDUsIDYsIGZhbHNlXSB9XSxcbiAgW3sgY29sb3I6IFtdIH0sIHsgYmFja2dyb3VuZDogW10gfV0sXG4gIFt7IGFsaWduOiBbXSB9XSxcblxuICBbJ2xpbmsnLCAnaW1hZ2UnLCAnY29kZS1ibG9jayddLFxuXG4gIFsnY2xlYW4nXSxcbl07XG5cbmNvbnN0IHF1aWxsID0gbmV3IFF1aWxsKCcjZWRpdG9yJywge1xuICBtb2R1bGVzOiB7XG4gICAgdGFibGU6IHRydWUsXG4gICAgdG9vbGJhcjoge1xuICAgICAgY29udGFpbmVyOiB0b29sYmFyLFxuICAgIH0sXG4gIH0sXG4gIHRoZW1lOiAnc25vdycsXG59KTtcblxuY29uc3QgZGVsdGEgPSB7XG4gIG9wczogW1xuXG4gIF0sXG59O1xuXG5xdWlsbC5zZXRDb250ZW50cyhkZWx0YSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9leGFtcGxlL3NyYy9pbmRleC5qcyIsImltcG9ydCBRdWlsbCBmcm9tICdxdWlsbCc7XG5jb25zdCBEZWx0YSA9IFF1aWxsLmltcG9ydCgnZGVsdGEnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVpbGxNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihxdWlsbCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5xdWlsbCA9IHF1aWxsO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy50b29sYmFyID0gcXVpbGwuZ2V0TW9kdWxlKCd0b29sYmFyJyk7XG5cbiAgICB0aGlzLnNldHVwKCk7XG4gIH1cblxuICBzZXR1cCgpIHtcbiAgICB0aGlzLnRvb2xiYXIuYWRkSGFuZGxlcigndGFibGUnLCAoc2l6ZSkgPT4ge1xuICAgICAgc3dpdGNoIChzaXplKSB7XG4gICAgICAgIGNhc2UgJ2N1c3RvbSc6IHtcbiAgICAgICAgICBjb25zdCBjb2x1bW5zID0gcHJvbXB0KCdOdW1iZXJzIG9mIGNvbHVtbnM6ICcpO1xuICAgICAgICAgIGNvbnN0IHJvd3MgPSBwcm9tcHQoJ051bWJlcnMgb2Ygcm93czogJyk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYWRkVGFibGVIYW5kbGVyKGAke2NvbHVtbnN9eCR7cm93c31gKTtcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiB0aGlzLmFkZFRhYmxlSGFuZGxlcihzaXplKTtcbiAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgbGV0IHRhYmxlSWQgPSBgdGFibGUtJHtRdWlsbE1vZHVsZS5yYW5kKCl9YDtcbiAgICBsZXQgcm93SWQgPSBgcm93LSR7UXVpbGxNb2R1bGUucmFuZCgpfWA7XG5cbiAgICB0aGlzLnF1aWxsLmNsaXBib2FyZC5hZGRNYXRjaGVyKCdUQUJMRScsIChub2RlLCBkZWx0YSkgPT4ge1xuICAgICAgdGFibGVJZCA9IGB0YWJsZS0ke1F1aWxsTW9kdWxlLnJhbmQoKX1gO1xuICAgICAgcmV0dXJuIGRlbHRhLmNvbXBvc2UoKG5ldyBEZWx0YSgpKS5yZXRhaW4oZGVsdGEubGVuZ3RoKCksIHsgdGFibGU6IHsgdGFibGVJZCB9IH0pKTtcbiAgICB9KTtcbiAgICB0aGlzLnF1aWxsLmNsaXBib2FyZC5hZGRNYXRjaGVyKCdUUicsIChub2RlLCBkZWx0YSkgPT4ge1xuICAgICAgcm93SWQgPSBgcm93LSR7UXVpbGxNb2R1bGUucmFuZCgpfWA7XG4gICAgICByZXR1cm4gZGVsdGEuY29tcG9zZSgobmV3IERlbHRhKCkpLnJldGFpbihkZWx0YS5sZW5ndGgoKSwgeyAndGFibGUtcm93JzogeyB0YWJsZUlkLCByb3dJZCB9IH0pKTtcbiAgICB9KTtcbiAgICB0aGlzLnF1aWxsLmNsaXBib2FyZC5hZGRNYXRjaGVyKCdURCcsIChub2RlLCBkZWx0YSkgPT4ge1xuICAgICAgY29uc3QgY2VsbElkID0gYGNlbGwtJHtRdWlsbE1vZHVsZS5yYW5kKCl9YDtcbiAgICAgIHJldHVybiBkZWx0YS5jb21wb3NlKChuZXcgRGVsdGEoKSkucmV0YWluKGRlbHRhLmxlbmd0aCgpLCB7ICd0YWJsZS1jZWxsJzogeyB0YWJsZUlkLCByb3dJZCwgY2VsbElkIH0gfSkpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2xvc2VzdE5ld0xpbmVJbmRleChpbmRleCkge1xuICAgIHJldHVybiBpbmRleCArIHRoaXMucXVpbGwuZ2V0Q29udGVudHMoKS5tYXAob3AgPT4gdHlwZW9mIG9wLmluc2VydCA9PT0gJ3N0cmluZycgPyBvcC5pbnNlcnQgOiAnICcpXG4gICAgICAgIC5qb2luKCcnKVxuICAgICAgICAuc2xpY2UoaW5kZXgpXG4gICAgICAgIC5pbmRleE9mKCdcXG4nKTtcbiAgfVxuXG4gIGFkZFRhYmxlSGFuZGxlcihzaXplKSB7XG4gICAgY29uc3QgW2NvbHVtbnMsIHJvd3NdID0gc2l6ZS5zcGxpdCgneCcpO1xuICAgIGNvbnN0IHJhbmdlID0gdGhpcy5xdWlsbC5nZXRTZWxlY3Rpb24oKTtcbiAgICBpZiAoIXJhbmdlKSByZXR1cm5cbiAgICBjb25zdCBuZXdMaW5lSW5kZXggPSB0aGlzLmdldENsb3Nlc3ROZXdMaW5lSW5kZXgocmFuZ2UuaW5kZXggKyByYW5nZS5sZW5ndGgpO1xuICAgIGxldCBjaGFuZ2VEZWx0YSA9IG5ldyBEZWx0YSgpLnJldGFpbihuZXdMaW5lSW5kZXgpXG4gICAgY2hhbmdlRGVsdGEgPSBjaGFuZ2VEZWx0YS5pbnNlcnQoJ1xcbicpO1xuICAgIGNvbnN0IHRhYmxlSWQgPSBgdGFibGUtJHtRdWlsbE1vZHVsZS5yYW5kKCl9YDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSArPSAxKSB7XG4gICAgICBjb25zdCByb3dJZCA9IGByb3ctJHtRdWlsbE1vZHVsZS5yYW5kKCl9YDtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1uczsgaiArPSAxKSB7XG4gICAgICAgIGNvbnN0IGNlbGxJZCA9IGBjZWxsLSR7UXVpbGxNb2R1bGUucmFuZCgpfWA7XG4gICAgICAgIGNoYW5nZURlbHRhID0gY2hhbmdlRGVsdGEuaW5zZXJ0KCdcXG4nLCB7ICd0YWJsZS1jZWxsJzogeyB0YWJsZUlkLCByb3dJZCwgY2VsbElkIH0gfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucXVpbGwudXBkYXRlQ29udGVudHMoY2hhbmdlRGVsdGEsIFF1aWxsLnNvdXJjZXMuVVNFUik7XG4gICAgdGhpcy5xdWlsbC5zZXRTZWxlY3Rpb24obmV3TGluZUluZGV4ICsgMSk7XG4gIH1cbn1cblxuUXVpbGxNb2R1bGUucmFuZCA9ICgpID0+IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1F1aWxsTW9kdWxlLmpzIiwiZXhwb3J0IFF1aWxsTW9kdWxlIGZyb20gJy4vUXVpbGxNb2R1bGUnO1xuXG5leHBvcnQgVGFibGVCbG90IGZyb20gJy4vVGFibGVCbG90JztcbmV4cG9ydCBDb250YWluQmxvdCBmcm9tICcuL0NvbnRhaW5CbG90JztcbmV4cG9ydCBUYWJsZUNlbGxCbG90IGZyb20gJy4vVGFibGVDZWxsQmxvdCc7XG5leHBvcnQgVGFibGVSb3dCbG90IGZyb20gJy4vVGFibGVSb3dCbG90JztcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==