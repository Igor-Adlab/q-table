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