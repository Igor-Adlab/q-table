import Quill from 'quill';
import TableRow from './TableRowBlot';
import TableCell from './TableCellBlot';

const Container = Quill.import('blots/container');
const Text = Quill.import('blots/text');
const Block = Quill.import('blots/block');
const Break = Quill.import('blots/break');
const BlockEmbed = Quill.import('blots/block/embed');
const Parchment = Quill.import('parchment');

class Table extends Container {
  static create(value) {
    const node = super.create();
    const { tableId } = value;
    if (tableId) {
      node.setAttribute('data-table-id', tableId);
    }
    return node;
  }

  static formats(node) {
    const tableId = node.hasAttribute('data-table-id') ? node.getAttribute('data-table-id') : null

    return {
      tableId,
    };
  }

  formats() {
    return { [this.statics.blotName]: this.statics.formats(this.domNode) };
  }

  optimize() {
    super.optimize();
    let next = this.next;
    const columnCount = table => table.children.head.children.length
    if (next != null && next.prev === this &&
      next.statics.blotName === this.statics.blotName &&
      next.domNode.tagName === this.domNode.tagName &&
      (next.domNode.getAttribute('data-table-id') === this.domNode.getAttribute('data-table-id') ||
      columnCount(next) === columnCount(this))) {
      next.moveChildren(this);
      next.remove();
    }
  }
}
Table.blotName = 'table';
Table.scope = Parchment.Scope.BLOCK_BLOT;
Table.tagName = 'TABLE';
Table.defaultChild = 'table-row';
Table.allowedChildren = [TableRow, TableCell, Block, BlockEmbed, Container, Break, Text];

export default Table;
