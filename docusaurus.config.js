const path = require('path')
const npm2yarn = require('@docusaurus/remark-plugin-npm2yarn')

const githubOrg = 'tmf-map'
const githubRepo = 'docsite'
const siteTitle = 'TMF Map'
const siteIntro =
  'Small steps get us to faraway places. Here you can learn web technologies in different fields, including basics, frontend, backend, and data & ai. Keep exploring and stay up-to-date.'

module.exports = {
  title: siteTitle,
  tagline: 'Small steps get us to faraway places',
  url: 'https://tmf-map.netlify.app',
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
      text: '',
    },
    siteIntro,
  },
  themeConfig: {
    navbar: {
      title: siteTitle,
      logo: {
        alt: 'Logo',
        src: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/docsite-logo-blue.svg',
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
          to: 'docs/data-structures/01-get-started/01-asymptotic-notations',
          activeBaseRegex:
            'docs/(algorithms|data-structures|design-patterns|http|browser|web-security|linux|git|macos)/',
          items: [
            {
              to: 'docs/data-structures/01-get-started/01-asymptotic-notations',
              activeBasePath: 'docs/data-structures/',
              label: 'Data Structures',
            },
            {
              to: 'docs/algorithms/01-get-started/01-overview',
              activeBasePath: 'docs/algorithms/',
              label: 'Algorithms',
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
            {
              to: 'docs/macos/01-get-started',
              activeBasePath: 'docs/macos/',
              label: 'macOS',
            },
          ],
        },
        {
          label: 'Frontend',
          position: 'right',
          // no `to` means activeBaseRegex gets ignored, so it's a must
          to: 'docs/javascript/01-basic/01-js-engine',
          activeBaseRegex:
            'docs/(javascript|typescript|html|css|react|webpack|nodejs|vite|svg)/',
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
              to: 'docs/vite/01-get-started',
              activeBasePath: 'docs/vite/',
              label: 'Vite',
            },
            {
              to: 'docs/nodejs/1.get-started',
              activeBasePath: 'docs/nodejs/',
              label: 'NodeJS',
            },
            {
              to: 'docs/svg/01-get-started',
              activeBasePath: 'docs/svg/',
              label: 'SVG',
            },
          ],
        },
        {
          label: 'Backend',
          position: 'right',
          // no `to` means activeBaseRegex gets ignored, so it's a must
          to: 'docs/python/01-get-started/01-history',
          activeBaseRegex:
            'docs/(python|shell|sqlalchemy|sql|redis|fastapi|docker|kubernetes|nginx)/', // `/` can avoid the confusion such as `javascript`
          items: [
            {
              to: 'docs/python/01-get-started/01-history',
              activeBasePath: 'docs/python/',
              label: 'Python',
            },
            {
              to: 'docs/shell/01-get-started',
              activeBasePath: 'docs/shell/',
              label: 'Shell',
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
            {
              to: 'docs/nginx/01-get-started',
              activeBasePath: 'docs/nginx/',
              label: 'Nginx',
            },
          ],
        },
        {
          label: 'Data & AI',
          position: 'right',
          // no `to` means activeBaseRegex gets ignored, so it's a must
          to: 'docs/data-viz-guide/1.get-started/1.overview',
          activeBaseRegex: 'docs/(data-viz-guide)/',
          items: [
            {
              to: 'docs/data-viz-guide/1.get-started/1.overview',
              activeBasePath: 'docs/data-viz-guide/',
              label: 'Data Viz Guide',
            },
          ],
        },
        {
          label: 'Management',
          position: 'right',
          // no `to` means activeBaseRegex gets ignored, so it's a must
          to: 'docs/project-mgmt/01-get-started',
          activeBaseRegex: 'docs/(project-mgmt|product-mgmt|people-mgmt)/',
          items: [
            {
              to: 'docs/project-mgmt/01-get-started',
              activeBasePath: 'docs/project-mgmt/',
              label: 'Project Management',
            },
            {
              to: 'docs/product-mgmt/01-get-started',
              activeBasePath: 'docs/product-mgmt/',
              label: 'Product Management',
            },
            {
              to: 'docs/people-mgmt/01-get-started',
              activeBasePath: 'docs/people-mgmt/',
              label: 'People Management',
            },
          ],
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
              html: `<img class="footer-logo" loading="lazy" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/docsite-logo-gray.svg" />`,
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
              label: 'Wiki',
              href: '/docs/wiki/01-get-started',
            },
            {
              label: 'Issues',
              href: `https://github.com/${githubOrg}/${githubRepo}/issues`,
            },
            {
              label: 'Release Notes',
              href: `https://github.com/${githubOrg}/${githubRepo}/releases`,
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
              label: 'Discussions',
              href: `https://github.com/${githubOrg}/${githubRepo}/discussions`,
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
      copyright: `Copyright © 2019-${new Date().getFullYear()} ${siteTitle}`,
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
}
