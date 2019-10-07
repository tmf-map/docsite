/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'ThinkBucket',
  tagline: 'The tagline of my site',
  url: 'https://thinkbucket.github.io',
  baseUrl: '/docsite/',
  favicon: 'https://avatars1.githubusercontent.com/u/53037732?s=70&v=4',
  organizationName: 'ThinkBucket', // Usually your GitHub org/user name.
  projectName: 'docsite', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'ThinkBucket',
      logo: {
        alt: 'ThinkBucket Logo',
        src: 'https://avatars1.githubusercontent.com/u/53037732?s=70&v=4',
      },
      links: [
        {to: 'docs/javascript/1.basic/workflow', label: 'Javascript', position: 'left'},
        {to: 'docs/react/1.basic/jsx', label: 'React', position: 'left'},
        {to: 'docs/web/1.http/http-connection', label: 'Web', position: 'left'},
        {to: 'docs/algorithm/1.array/duplicated-number-in-array', label: 'Algorithm', position: 'left'},
        {to: 'docs/doc1', label: 'Docs', position: 'left'},
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/ThinkBucket/docsite',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: 'docs/doc1',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
          ],
        },
      ],
      logo: {
        alt: 'Facebook Open Source Logo',
        src: 'https://docusaurus.io/img/oss_logo.png',
      },
      copyright: `Copyright © ${new Date().getFullYear()} ThinkBucket.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
