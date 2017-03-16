import Quill from 'quill';

const Container = Quill.import('blots/container');
const Block = Quill.import('blots/block');
const Break = Quill.import('blots/break');
const Text = Quill.import('blots/text');
const BlockEmbed = Quill.import('blots/block/embed');
const Parchment = Quill.import('parchment');

class TableCell extends Container {
  static create(value) {
    console.log('[TableCell]: ', value)

    const node = super.create();
    const { tableId, rowId, cellId } = value;
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

  static formats(node) {
    const tableId = node.hasAttribute('data-table-id') ? node.getAttribute('data-table-id') : null
    const rowId = node.hasAttribute('data-row-id') ? node.getAttribute('data-row-id') : null
    const cellId = node.hasAttribute('data-cell-id') ? node.getAttribute('data-cell-id') : null

    return {
      tableId,
      rowId,
      cellId,
    };
  }

  formats() {
    return { [this.statics.blotName]: this.statics.formats(this.domNode) };
  }

  formatAt(index, length, name, value) {
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
      return
    }
    super.formatAt(index, length, name, value)
  }

  optimize() {
    // When inserting a new table, table-cell is the first blot that's created (well, after Block
    // blot) and what this optimize method does is making sure that each table-cell properly wraps
    // itself into a table-row if it's not already inside a table-row
    super.optimize();
    if (this.parent && this.parent.statics.blotName !== 'table-row') {
      const row = Parchment.create('table-row', this.statics.formats(this.domNode));
      this.parent.insertBefore(row, this);
      row.appendChild(this);
    }
  }

  replace(target) {
    // This method is called when inserting a new table (well, more specifically table-cell) and all
    // it does is takes the existing blot where the table is about to be inserted, moves its
    // children, if any, to the table-cell and replaces it with the block blot (which then gets
    // wrapped into table-cell).
    // Note: this does not mean that content that is selected when inserting a new table will be
    // moved into the table. That will be needed to handled specially if/when we want to do that.
    if (target.statics.blotName !== this.statics.blotName) {
      const item = Parchment.create(this.statics.defaultChild);
      target.moveChildren(item);
      this.appendChild(item);
    }
    super.replace(target)
  }
}
TableCell.blotName = 'table-cell';
TableCell.tagName = 'TD';
TableCell.scope = Parchment.Scope.BLOCK_BLOT;
TableCell.defaultChild = 'block';
TableCell.allowedChildren = [Block, BlockEmbed, Container, Break, Text];

export default TableCell;
