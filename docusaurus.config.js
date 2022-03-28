const path = require('path');

const githubOrg = 'ThinkBucket';
const githubRepo = 'docsite';

const remarkPlugins = [
  require('./src/plugins/remark-npm2yarn'),
  require('./src/plugins/remark-global-modules')
];

const admonitions = {
  infima: true,
  customTypes: {
    good: {
      ifmClass: 'success',
      keyword: 'good',
      svg:
        '<svg preserveAspectRatio="xMidYMid meet" height="1rem" width="1rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M22 11.07V12a10 10 0 1 1-5.93-9.14"></path><polyline points="23 3 12 14 9 11"></polyline></g></svg>'
    },
    bad: {
      ifmClass: 'danger',
      keyword: 'bad',
      svg:
        '<svg preserveAspectRatio="xMidYMid meet" height="1rem" width="1rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" stroke="none"><g><path d="M512 992c-262.4 0-480-217.6-480-480 0-262.4 217.6-480 480-480s480 217.6 480 480C992 774.4 774.4 992 512 992zM512 108.8C288 108.8 108.8 288 108.8 512c0 224 179.2 403.2 403.2 403.2s403.2-179.2 403.2-403.2C915.2 288 736 108.8 512 108.8zM697.6 684.8l-12.8 12.8c-6.4 6.4-19.2 6.4-25.6 0L512 550.4l-140.8 140.8c-6.4 6.4-19.2 6.4-25.6 0l-12.8-12.8c-6.4-6.4-6.4-19.2 0-25.6L473.6 512 326.4 371.2C320 358.4 320 345.6 326.4 339.2l12.8-12.8C345.6 320 358.4 320 371.2 326.4L512 473.6l140.8-140.8c6.4-6.4 19.2-6.4 25.6 0l12.8 12.8c6.4 6.4 6.4 19.2 0 25.6L550.4 512l140.8 140.8C704 665.6 704 678.4 697.6 684.8z"></path></g></svg>'
    }
  }
};

module.exports = {
  title: githubOrg,
  tagline: 'Small steps get us to faraway places',
  url: 'https://thinkbucket.cn',
  baseUrl: '/',
  favicon: '/img/favicon/docsite.png',
  organizationName: githubOrg, // Usually your GitHub org/user name.
  projectName: 'docsite', // Usually your repo name.
  plugins: [
    [
      require.resolve('@thinkbucket/docusaurus-search-local'),
      {
        hashed: true
      }
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
            href: '/img/icons/mobile-512x512@2x.png'
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json' // your PWA manifest
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#434343'
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#000'
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: '/img/icons/mobile-512x512@2x.png'
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: '/img/favicon/docsite.svg',
            color: 'rgb(62, 204, 94)'
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            content: '/img/icons/mobile-512x512@2x.png'
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#000'
          }
        ]
      }
    ]
  ],
  themes: [require.resolve('@docusaurus/theme-live-codeblock')],
  customFields: {
    icp: {
      href: 'http://beian.miit.gov.cn/',
      text: '冀ICP备19034211号'
    }
  },
  themeConfig: {
    navbar: {
      title: githubOrg,
      logo: {
        alt: 'Logo',
        src:
          'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/docsite-logo-white-mode.png'
      },
      items: [
        {
          type: 'search',
          position: 'left'
        },
        {
          label: 'Basics',
          position: 'right',
          // no `to` means activeBaseRegex gets ignored, so it's a must
          to: 'docs/algorithm/1.get-started/asymptotic-notations',
          activeBaseRegex: 'docs/(design-patterns|algorithm|http)/',
          items: [
            {
              to: 'docs/algorithm/1.get-started/asymptotic-notations',
              activeBasePath: 'docs/algorithm/',
              label: 'Algorithm'
            },
            {
              to: 'docs/design-patterns/1.get-started',
              activeBasePath: 'docs/design-patterns/',
              label: 'Design Patterns'
            },
            {
              to: 'docs/http/1.get-started',
              activeBasePath: 'docs/http/',
              label: 'HTTP'
            }
          ]
        },
        {
          label: 'Frontend',
          position: 'right',
          // no `to` means activeBaseRegex gets ignored, so it's a must
          to: 'docs/javascript/1.basic/js-engine',
          activeBaseRegex:
            'docs/(javascript|typescript|html|css|web|react|webpack|nodejs|fe-guidelines)/',
          items: [
            {
              to: 'docs/javascript/1.basic/js-engine',
              activeBasePath: 'docs/javascript/',
              label: 'JavaScript'
            },
            {
              to: 'docs/typescript/1.get-started',
              activeBasePath: 'docs/typescript/',
              label: 'TypeScript'
            },
            {
              to: 'docs/html/1.get-started',
              activeBasePath: 'docs/html/',
              label: 'HTML'
            },
            {
              to: 'docs/css/1.visual-formatting-model/basic-concept',
              activeBasePath: 'docs/css/',
              label: 'CSS'
            },
            {
              to: 'docs/web/1.get-started',
              activeBasePath: 'docs/web/',
              label: 'Web'
            },
            {
              to: 'docs/react/1.basic/jsx',
              activeBasePath: 'docs/react/',
              label: 'React'
            },
            {
              to: 'docs/webpack/1.get-started',
              activeBasePath: 'docs/webpack/',
              label: 'Webpack'
            },
            {
              to: 'docs/nodejs/1.get-started',
              activeBasePath: 'docs/nodejs/',
              label: 'NodeJS'
            },
            {
              to: 'docs/fe-guidelines/1.introduction',
              activeBasePath: 'docs/fe-guidelines/',
              label: 'Coding Guidelines'
            }
          ]
        },
        {
          label: 'Backend',
          position: 'right',
          // no `to` means activeBaseRegex gets ignored, so it's a must
          to: 'docs/python/1.get-started/history',
          activeBaseRegex:
            'docs/(python|java|go|mysql|fastapi|docker|kubernetes)/', // `/` can avoid the confusion such as `javascript`
          items: [
            {
              to: 'docs/python/1.get-started/history',
              activeBasePath: 'docs/python/',
              label: 'Python'
            },
            {
              to: 'docs/java/1.get-started/introduction',
              activeBasePath: 'docs/java/',
              label: 'Java'
            },
            {
              to: 'docs/go/1.get-started/introduction',
              activeBasePath: 'docs/go/',
              label: 'Go'
            },
            {
              to: 'docs/mysql/1.get-started/intro-to-sql',
              activeBasePath: 'docs/mysql/',
              label: 'MySQL'
            }
          ]
        },
        {to: 'blog', label: 'Blog', position: 'right'},
        {
          label: 'Wiki',
          position: 'right',
          activeBasePath: 'docs/wiki/',
          to: 'docs/wiki/1.get-started'
        },
        {
          href: `https://github.com/${githubOrg}/${githubRepo}`,
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: githubOrg,
          items: [
            {
              html: `<img class="footer-logo" loading="lazy" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/docsite-logo-dark-mode.png" /><span>${githubOrg}</span>`
            },
            {
              html:
                '<p class="footer-desc">Explore and study full stack technology. Here gathers developers\' thinking, summary and imagination on the future development of technology.</p>'
            }
          ]
        },
        {
          title: 'Power by',
          items: [
            {
              html:
                '<a href="https://www.netlify.com/" target="blank"><img class="footer-power-by" loading="lazy" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/netlify-color-accent.svg" /></a>'
            },
            {
              html:
                '<a href="https://docusaurus.io/docs/" target="blank"><img class="footer-power-by" loading="lazy" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/docusaurus.svg" /></a>'
            }
          ]
        },
        {
          title: 'Help',
          items: [
            {
              label: 'Release Notes',
              href: `https://github.com/${githubOrg}/${githubRepo}/releases`
            },
            {
              label: 'Issues',
              href: `https://github.com/${githubOrg}/${githubRepo}/issues`
            },
            {
              label: 'Bug Report',
              href: `https://github.com/${githubOrg}/${githubRepo}/issues/new`
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Blog',
              to: 'blog'
            },
            {
              label: 'GitHub',
              href: `https://github.com/${githubOrg}/${githubRepo}`
            },
            {
              html: `<iframe src="https://ghbtns.com/github-btn.html?user=${githubOrg}&repo=${githubRepo}&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>`
            }
          ]
        }
      ],
      // logo: {
      //   alt: `${githubOrg} Logo`,
      //   src: '',
      // },
      copyright: `Copyright © 2019-${new Date().getFullYear()} ${githubOrg}`
    },
    prism: {
      theme: require('prism-react-renderer/themes/nightOwl'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
      additionalLanguages: ['java']
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        googleAnalytics: {
          trackingID: 'UA-152610996-1'
        },
        docs: {
          sidebarPath: require.resolve('./sidebars/index.js'),
          editUrl: `https://github.com/${githubOrg}/${githubRepo}/edit/master/`,
          // Equivalent to `enableUpdateBy`.
          showLastUpdateAuthor: true,
          // Equivalent to `enableUpdateTime`.
          showLastUpdateTime: true,
          remarkPlugins,
          admonitions,
          numberPrefixParser: false
        },
        blog: {
          editUrl: `https://github.com/${githubOrg}/${githubRepo}/edit/master/`,
          remarkPlugins,
          admonitions
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
};
