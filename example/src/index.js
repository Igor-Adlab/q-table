import { TableBlot, TableRowBlot, TableCellBlot, QuillModule } from '../../src';

const Quill = window.Quill;
const Delta = Quill.import('delta');

Quill.register('modules/table', QuillModule);

Quill.register({
  'formats/table': TableBlot,
  'formats/table-row': TableRowBlot,
  'formats/table-cell': TableCellBlot,
});

const toolbar = [
  [{ table: ['1x1', '2x2', '3x3', 'custom'] }],

  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],

  ['link', 'image', 'code-block'],

  ['clean'],
];

const quill = new Quill('#editor', {
  modules: {
    table: true,
    toolbar: {
      container: toolbar,
    },
  },
  theme: 'snow',
});

const delta = {
  ops: [

  ],
};

quill.setContents(delta);
