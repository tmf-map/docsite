const path = require('path');
const npm2yarn = require('@docusaurus/remark-plugin-npm2yarn');

const githubOrg = 'ThinkBucket';
const githubRepo = 'docsite';
const siteIntro =
  'Small steps get us to faraway places. Here you can learn web technologies in different fields, including basics, frontend, backend, and data & ai. Keep exploring and stay up-to-date.';

module.exports = {
  title: githubOrg,
  tagline: 'Small steps get us to faraway places',
  url: 'https://thinkbucket.cn',
  baseUrl: '/',
  favicon: '/img/favicon/docsite.png',
  organizationName: githubOrg, // Usually your GitHub org/username.
  projectName: 'docsite', // Usually your repo name.
  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
      },
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: ['appInstalled', 'queryString'],
        swCustom: path.resolve(__dirname, 'src/sw.js'),
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/icons/mobile-512x512@2x.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json', // your PWA manifest
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#434343',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#000',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: '/img/icons/mobile-512x512@2x.png',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: '/img/favicon/docsite.svg',
            color: 'rgb(62, 204, 94)',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            content: '/img/icons/mobile-512x512@2x.png',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#000',
          },
        ],
      },
    ],
  ],
  themes: [require.resolve('@docusaurus/theme-live-codeblock')],
  customFields: {
    icp: {
      href: 'http://beian.miit.gov.cn/',
      text: '冀ICP备19034211号',
    },
    siteIntro,
  },
  themeConfig: {
    navbar: {
      title: githubOrg,
      logo: {
        alt: 'Logo',
        src: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/docsite-logo-white-mode.png',
      },
      items: [
        {
          type: 'search',
          position: 'left',
        },
        {
          label: 'Basics',
          position: 'right',
          // no `to` means activeBaseRegex gets ignored, so it's a must
          to: 'docs/algorithm/1.get-started/asymptotic-notations',
          activeBaseRegex:
            'docs/(design-patterns|algorithm|http|browser|web-security|linux|git)/',
          items: [
            {
              to: 'docs/algorithm/1.get-started/asymptotic-notations',
              activeBasePath: 'docs/algorithm/',
              label: 'Algorithm',
            },
            {
              to: 'docs/design-patterns/1.get-started',
              activeBasePath: 'docs/design-patterns/',
              label: 'Design Patterns',
            },
            {
              to: 'docs/http/1.get-started',
              activeBasePath: 'docs/http/',
              label: 'HTTP',
            },
            {
              to: 'docs/browser/01-get-started',
              activeBasePath: 'docs/browser/',
              label: 'Browser',
            },
            {
              to: 'docs/web-security/01-introduction',
              activeBasePath: 'docs/web-security/',
              label: 'Web Security',
            },
            {
              to: 'docs/linux/1.get-started/1.introduction',
              activeBasePath: 'docs/linux/',
              label: 'Linux',
            },
            {
              to: 'docs/git/01-get-started',
              activeBasePath: 'docs/git/',
              label: 'Git',
            },
          ],
        },
        {
          label: 'Frontend',
          position: 'right',
          // no `to` means activeBaseRegex gets ignored, so it's a must
          to: 'docs/javascript/01-basic/01-js-engine',
          activeBaseRegex:
            'docs/(javascript|typescript|html|css|react|webpack|nodejs)/',
          items: [
            {
              to: 'docs/javascript/01-basic/01-js-engine',
              activeBasePath: 'docs/javascript/',
              label: 'JavaScript',
            },
            {
              to: 'docs/typescript/1.get-started',
              activeBasePath: 'docs/typescript/',
              label: 'TypeScript',
            },
            {
              to: 'docs/html/1.get-started',
              activeBasePath: 'docs/html/',
              label: 'HTML',
            },
            {
              to: 'docs/css/1.visual-formatting-model/basic-concept',
              activeBasePath: 'docs/css/',
              label: 'CSS',
            },
            {
              to: 'docs/react/1.basics/1.1.jsx',
              activeBasePath: 'docs/react/',
              label: 'React',
            },
            {
              to: 'docs/webpack/1.get-started',
              activeBasePath: 'docs/webpack/',
              label: 'Webpack',
            },
            {
              to: 'docs/nodejs/1.get-started',
              activeBasePath: 'docs/nodejs/',
              label: 'NodeJS',
            },
          ],
        },
        {
          label: 'Backend',
          position: 'right',
          // no `to` means activeBaseRegex gets ignored, so it's a must
          to: 'docs/python/1.get-started/history',
          activeBaseRegex:
            'docs/(python|sqlalchemy|sql|redis|fastapi|docker|kubernetes)/', // `/` can avoid the confusion such as `javascript`
          items: [
            {
              to: 'docs/python/1.get-started/history',
              activeBasePath: 'docs/python/',
              label: 'Python',
            },
            {
              to: 'docs/fastapi/1.get-started/1.introduction',
              activeBasePath: 'docs/fastapi/',
              label: 'FastAPI',
            },
            {
              to: 'docs/sqlalchemy/01-get-started',
              activeBasePath: 'docs/sqlalchemy/',
              label: 'SQLAlchemy',
            },
            {
              to: 'docs/sql/1.get-started/1.intro-to-sql',
              activeBasePath: 'docs/sql/',
              label: 'SQL',
            },
            {
              to: 'docs/docker/1.get-started/1.what-is-docker',
              activeBasePath: 'docs/docker/',
              label: 'Docker',
            },
            {
              to: 'docs/kubernetes/01-get-started/01-introduction',
              activeBasePath: 'docs/kubernetes/',
              label: 'Kubernetes',
            },
          ],
        },
        {
          label: 'Data & AI',
          position: 'right',
          // no `to` means activeBaseRegex gets ignored, so it's a must
          to: 'docs/data-viz-guide/1.get-started/1.overview',
          activeBaseRegex: 'docs/(data-viz-guide|svg)/',
          items: [
            {
              to: 'docs/data-viz-guide/1.get-started/1.overview',
              activeBasePath: 'docs/data-viz-guide/',
              label: 'Data Viz Guide',
            },
            {
              to: 'docs/svg/1.get-started',
              activeBasePath: 'docs/svg/',
              label: 'SVG',
            },
          ],
        },
        {to: 'blog', label: 'Blog', position: 'right'},
        {
          label: 'Wiki',
          position: 'right',
          activeBasePath: 'docs/wiki/',
          to: 'docs/wiki/01-get-started',
        },
        {
          href: `https://github.com/${githubOrg}/${githubRepo}`,
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: githubOrg,
          items: [
            {
              html: `<img class="footer-logo" loading="lazy" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/docsite-logo-dark-mode.png" /><span>${githubOrg}</span>`,
            },
            {
              html: `<p class="footer-desc">${siteIntro}</p>`,
            },
          ],
        },
        {
          title: 'Mobile',
          items: [
            {
              html: '<img class="footer-mobile-qr-code" loading="lazy" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/mobile_qrcode.png" />',
            },
          ],
        },
        {
          title: 'Help',
          items: [
            {
              label: 'Release Notes',
              href: `https://github.com/${githubOrg}/${githubRepo}/releases`,
            },
            {
              label: 'Issues',
              href: `https://github.com/${githubOrg}/${githubRepo}/issues`,
            },
            {
              label: 'Bug Report',
              href: `https://github.com/${githubOrg}/${githubRepo}/issues/new`,
            },
          ],
        },
        {
          title: 'Community',
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
              html: `<iframe src="https://ghbtns.com/github-btn.html?user=${githubOrg}&repo=${githubRepo}&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>`,
            },
          ],
        },
      ],
      // logo: {
      //   alt: `${githubOrg} Logo`,
      //   src: '',
      // },
      copyright: `Copyright © 2019-${new Date().getFullYear()} ${githubOrg}`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/nightOwl'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
      additionalLanguages: ['java'],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        googleAnalytics: {
          trackingID: 'UA-152610996-1',
        },
        docs: {
          sidebarPath: require.resolve('./sidebars/index.js'),
          editUrl: `https://github.com/${githubOrg}/${githubRepo}/edit/master/`,
          // Equivalent to `enableUpdateBy`.
          showLastUpdateAuthor: true,
          // Equivalent to `enableUpdateTime`.
          showLastUpdateTime: true,
          remarkPlugins: [npm2yarn],
          numberPrefixParser: false,
        },
        blog: {
          editUrl: `https://github.com/${githubOrg}/${githubRepo}/edit/master/`,
          remarkPlugins: [npm2yarn],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
