const nodeForImport = {
  type: 'import',
  value:
    "import Img from '@site/src/components/Img';\nimport GifPlayer from '@site/src/components/GifPlayer';\nimport Math from '@site/src/components/Math';\nimport Tabs from '@theme/Tabs';\nimport TabItem from '@theme/TabItem';"
};

module.exports = () => {
  let transformed = false;
  const transformer = node => {
    if (Array.isArray(node.children)) {
      let index = 0;
      while (index < node.children.length) {
        const result = transformer(node.children[index]);
        if (result) {
          node.children.splice(index, 1, ...result);
          index += result.length;
        } else {
          index += 1;
        }
      }
    }
    if (node.type === 'root' && !transformed) {
      node.children.unshift(nodeForImport);
      transformed = true;
    }
    return null;
  };
  return transformer;
};
