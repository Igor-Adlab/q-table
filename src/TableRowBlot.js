import Quill from 'quill';
import TableCell from './TableCellBlot';

const Container = Quill.import('blots/container');
const Block = Quill.import('blots/block');
const Text = Quill.import('blots/text');
const Break = Quill.import('blots/break');
const BlockEmbed = Quill.import('blots/block/embed');
const Parchment = Quill.import('parchment');

class TableRow extends Container {
  static create(value) {
    const node = super.create();
    const { tableId, rowId } = value;
    if (tableId) {
      node.setAttribute('data-table-id', tableId);
    }
    if (rowId) {
      node.setAttribute('data-row-id', rowId);
    }
    return node;
  }

  static formats(node) {
    const tableId = node.hasAttribute('data-table-id') ? node.getAttribute('data-table-id') : null
    const rowId = node.hasAttribute('data-row-id') ? node.getAttribute('data-row-id') : null

    return {
      tableId,
      rowId,
    };
  }

  formats() {
    // We don't inherit from FormatBlot
    return { [this.statics.blotName]: this.statics.formats(this.domNode) };
  }

  optimize() {
    // The purpose of optimize() method for table-row blot is twofold. First it makes sure if there
    // are two rows right next to each other with the same `rowId` value that it merges them
    // together, ie. it moves all the children from the second row into the first one and then
    // deletes the second. And secondly, it does the same thing the table-cell blot does, which is
    // it wraps itself into a table blot if it's not already in one.
    super.optimize();
    let next = this.next;
    if (next != null && next.prev === this &&
      next.statics.blotName === this.statics.blotName &&
      next.domNode.tagName === this.domNode.tagName &&
      next.domNode.getAttribute('data-row-id') === this.domNode.getAttribute('data-row-id')) {
      next.moveChildren(this);
      next.remove();
    }

    if (this.parent && this.parent.statics.blotName !== 'table') {
      const row = Parchment.create('table', this.statics.formats(this.domNode));
      this.parent.insertBefore(row, this);
      row.appendChild(this);
    }
  }
}
TableRow.blotName = 'table-row';
TableRow.tagName = 'TR';
TableRow.scope = Parchment.Scope.BLOCK_BLOT;
TableRow.defaultChild = 'table-cell';
TableRow.allowedChildren = [TableCell, Block, BlockEmbed, Container, Break, Text];

export default TableRow;
