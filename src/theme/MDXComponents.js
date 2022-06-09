// https://docusaurus.io/docs/markdown-features/react#mdx-component-scope

import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Img from '@site/src/components/Img';
import GifPlayer from '@site/src/components/GifPlayer';
import Math from '@site/src/components/Math';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "highlight" tag to our <Highlight /> component!
  // `Highlight` will receive all props that were passed to `highlight` in MDX
  Img,
  GifPlayer,
  Math,
  Tabs,
  TabItem
};
