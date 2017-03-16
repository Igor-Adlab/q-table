'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _quill = require('quill');

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