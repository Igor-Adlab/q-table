import Quill from 'quill';
const Delta = Quill.import('delta');

export default class QuillModule {
  constructor(quill, options = {}) {
    this.quill = quill;
    this.options = options;
    this.toolbar = quill.getModule('toolbar');

    this.setup();
  }

  setup() {
    this.toolbar.addHandler('table', (size) => {
      switch (size) {
        case 'custom': {
          const columns = prompt('Numbers of columns: ');
          const rows = prompt('Numbers of rows: ');
          return this.addTableHandler(`${columns}x${rows}`);
        }
        default:
          return this.addTableHandler(size);
      }
    });


    let tableId = `table-${QuillModule.rand()}`;
    let rowId = `row-${QuillModule.rand()}`;

    this.quill.clipboard.addMatcher('TABLE', (node, delta) => {
      tableId = `table-${QuillModule.rand()}`;
      return delta.compose((new Delta()).retain(delta.length(), { table: { tableId } }));
    });
    this.quill.clipboard.addMatcher('TR', (node, delta) => {
      rowId = `row-${QuillModule.rand()}`;
      return delta.compose((new Delta()).retain(delta.length(), { 'table-row': { tableId, rowId } }));
    });
    this.quill.clipboard.addMatcher('TD', (node, delta) => {
      const cellId = `cell-${QuillModule.rand()}`;
      return delta.compose((new Delta()).retain(delta.length(), { 'table-cell': { tableId, rowId, cellId } }));
    });
  }

  getClosestNewLineIndex(index) {
    return index + this.quill.getContents().map(op => typeof op.insert === 'string' ? op.insert : ' ')
        .join('')
        .slice(index)
        .indexOf('\n');
  }

  addTableHandler(size) {
    const [columns, rows] = size.split('x');
    const range = this.quill.getSelection();
    if (!range) return
    const newLineIndex = this.getClosestNewLineIndex(range.index + range.length);
    let changeDelta = new Delta().retain(newLineIndex)
    changeDelta = changeDelta.insert('\n');
    const tableId = `table-${QuillModule.rand()}`;

    for (let i = 0; i < rows; i += 1) {
      const rowId = `row-${QuillModule.rand()}`;
      for (let j = 0; j < columns; j += 1) {
        const cellId = `cell-${QuillModule.rand()}`;
        changeDelta = changeDelta.insert('\n', { 'table-cell': { tableId, rowId, cellId } });
      }
    }
    this.quill.updateContents(changeDelta, Quill.sources.USER);
    this.quill.setSelection(newLineIndex + 1);
  }
}

QuillModule.rand = () => Math.random().toString(36).slice(2);
