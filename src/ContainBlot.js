import Quill from 'quill';

const Container = Quill.import('blots/container');
const Block = Quill.import('blots/block');
const BlockEmbed = Quill.import('blots/block/embed');
const Parchment = Quill.import('parchment');

class ContainBlot extends Container {
  static create() {
    return super.create('contain');
  }

  insertBefore(blot, ref) {
    if (blot.statics.blotName === this.statics.blotName) {
      super.insertBefore(blot.children.head, ref);
    } else {
      super.insertBefore(blot, ref);
    }
  }

  static formats(domNode) {
    return domNode.tagName;
  }

  formats() {
    return { [this.statics.blotName]: this.statics.formats(this.domNode) };
  }

  replace(target) {
    if (target.statics.blotName !== this.statics.blotName) {
      const item = Parchment.create(this.statics.defaultChild)
      console.log(item, target)
      target.moveChildren(item);
      this.appendChild(item);
    }
    if (target.parent == null) return;
    super.replace(target);
  }
}

ContainBlot.blotName = 'contain';
ContainBlot.tagName = 'contain';
ContainBlot.scope = Parchment.Scope.BLOCK_BLOT;
ContainBlot.defaultChild = 'block';
ContainBlot.allowedChildren = [Block, BlockEmbed, Container];

export default ContainBlot;
