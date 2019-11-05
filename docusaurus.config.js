const githubOrg = 'ThinkBucket'
const githubRepo = 'docsite'

module.exports = {
  title: githubOrg,
  tagline: 'The tagline of my site',
  url: 'https://thinkbucket.github.io',
  baseUrl: '/docsite/',
  favicon: 'https://avatars1.githubusercontent.com/u/53037732?s=70&v=4',
  organizationName: githubOrg, // Usually your GitHub org/user name.
  projectName: 'docsite', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: githubOrg,
      logo: {
        alt: 'Logo',
        src: 'https://avatars1.githubusercontent.com/u/53037732?s=70&v=4',
      },
      links: [
        {to: 'docs/javascript/preface/overview', label: 'Javascript', position: 'left'},
        {to: 'docs/css/preface/overview', label: 'CSS', position: 'left'},
        {to: 'docs/web/preface/overview', label: 'Web', position: 'left'},
        {to: 'docs/react/preface/overview', label: 'React Stack', position: 'left'},
        {to: 'docs/design-patterns/preface/overview', label: 'Design Patterns', position: 'left'},
        {to: 'docs/algorithm/preface/overview', label: 'Algorithm', position: 'left'},
        {to: 'docs/doc1', label: 'Docs', position: 'right'},
        {to: 'blog', label: 'Blog', position: 'right'},
        {
          href: `https://github.com/${githubOrg}/${githubRepo}`,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '相关资源',
          items: [
            {
              label: '文档介绍',
              to: '/',
            },
            {
              label: 'MDX',
              to: 'https://github.com/mdx-js/mdx',
            },
            {
              label: 'Docusaurus',
              to: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
        {
          title: '帮助',
          items: [
            {
              label: '更新日志',
              href: `https://github.com/${githubOrg}/${githubRepo}/releases`,
            },
            {
              label: '讨论列表',
              href: `https://github.com/${githubOrg}/${githubRepo}/issues`,
            },
            {
              label: '报告 Bug',
              href: `https://github.com/${githubOrg}/${githubRepo}/issues/new`,
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: `https://github.com/${githubOrg}/${githubRepo}`,
            },
            {
              html:
                `<iframe src="https://ghbtns.com/github-btn.html?user=${githubOrg}&repo=${githubRepo}&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>`,
            }
          ],
        },
      ],
      logo: {
        alt: 'Facebook Open Source Logo',
        src: 'https://docusaurus.io/img/oss_logo.png',
      },
      copyright: `Copyright © ${new Date().getFullYear()} ${githubOrg}.`,
    },
    prismTheme: require('prism-react-renderer/themes/nightOwl'),
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: `https://github.com/${githubOrg}/${githubRepo}/edit/master/docs/`,
          // Equivalent to `enableUpdateBy`.
          showLastUpdateAuthor: true,
          // Equivalent to `enableUpdateTime`.
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
