const githubOrg = 'ThinkBucket';
const githubRepo = 'docsite';

module.exports = {
  title: githubOrg,
  tagline: 'Explore and study full stack technology',
  url: 'https://thinkbucket.cn',
  baseUrl: '/',
  favicon:
    'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/docsite-logo-white-mode.png',
  organizationName: githubOrg, // Usually your GitHub org/user name.
  projectName: 'docsite', // Usually your repo name.
  plugins: ['@docusaurus/plugin-google-analytics'],
  themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig: {
    googleAnalytics: {
      trackingID: 'UA-152610996-1'
    },
    disableDarkMode: false,
    navbar: {
      title: githubOrg,
      logo: {
        alt: 'Logo',
        src:
          'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/docsite-logo-white-mode.png'
      },
      links: [
        {
          to: 'docs/javascript/1.basic/js-engine',
          label: 'JavaScript',
          position: 'left'
        },
        {to: 'docs/html/preface/overview', label: 'HTML', position: 'left'},
        {
          to: 'docs/css/1.visual-formatting-model/basic-concept',
          label: 'CSS',
          position: 'left'
        },
        {
          to: 'docs/web/1.cross-domain/same-origin-policy',
          label: 'Web',
          position: 'left'
        },
        {to: 'docs/react/1.basic/jsx', label: 'React Stack', position: 'left'},
        {
          to: 'docs/java/object-oriented-programming/abstract-class-interface',
          label: 'Java',
          position: 'left'
        },
        {
          to: 'docs/design-patterns/1.creation-pattern/singleton',
          label: 'Design Patterns',
          position: 'left'
        },
        {
          to: 'docs/algorithm/1.analysis-of-algorithms/asymptotic-notations',
          label: 'Algorithm',
          position: 'left'
        },
        {to: 'docs/http/1.web-basic/tcp-ip', label: 'HTTP', position: 'left'},
        {
          to: 'docs/typescript/1.types/basic-types',
          label: 'TypeScript',
          position: 'left'
        },
        {
          to: 'docs/webpack/1.Basic/basic',
          label: 'Webpack',
          position: 'left'
        },
        {to: 'blog', label: 'Blog', position: 'right'},
        {to: 'docs/wiki/1.get-started', label: 'Wiki', position: 'right'},
        {
          href: `https://github.com/${githubOrg}/${githubRepo}`,
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '',
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
          title: 'Subscription',
          items: [
            {
              html:
                '<img class="footer-reward" loading="lazy" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/qrcode_for_wechat.jpg" />'
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
      copyright: `Copyright © ${new Date().getFullYear()} ${githubOrg}`,
      icp: {
        href: 'http://beian.miit.gov.cn/',
        text: '冀ICP备19034211号'
      }
    },
    prism: {
      theme: require('prism-react-renderer/themes/nightOwl'),
      darkTheme: require('prism-react-renderer/themes/dracula')
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars/index.js'),
          editUrl: `https://github.com/${githubOrg}/${githubRepo}/edit/master/`,
          // Equivalent to `enableUpdateBy`.
          showLastUpdateAuthor: true,
          // Equivalent to `enableUpdateTime`.
          showLastUpdateTime: true,
          remarkPlugins: [require('./src/plugins/remark-npm2yarn')],
          // options for remark-admonitions, this does not work now.
          admonitions: {
            customTypes: {
              good: {
                keyword: 'good',
                svg:
                  '<svg preserveAspectRatio="xMidYMid meet" height="1rem" width="1rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M22 11.07V12a10 10 0 1 1-5.93-9.14"></path><polyline points="23 3 12 14 9 11"></polyline></g></svg>'
              },
              bad: {
                keyword: 'bad',
                svg:
                  '<svg preserveAspectRatio="xMidYMid meet" height="1rem" width="1rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" stroke="none"><g><path d="M512 992c-262.4 0-480-217.6-480-480 0-262.4 217.6-480 480-480s480 217.6 480 480C992 774.4 774.4 992 512 992zM512 108.8C288 108.8 108.8 288 108.8 512c0 224 179.2 403.2 403.2 403.2s403.2-179.2 403.2-403.2C915.2 288 736 108.8 512 108.8zM697.6 684.8l-12.8 12.8c-6.4 6.4-19.2 6.4-25.6 0L512 550.4l-140.8 140.8c-6.4 6.4-19.2 6.4-25.6 0l-12.8-12.8c-6.4-6.4-6.4-19.2 0-25.6L473.6 512 326.4 371.2C320 358.4 320 345.6 326.4 339.2l12.8-12.8C345.6 320 358.4 320 371.2 326.4L512 473.6l140.8-140.8c6.4-6.4 19.2-6.4 25.6 0l12.8 12.8c6.4 6.4 6.4 19.2 0 25.6L550.4 512l140.8 140.8C704 665.6 704 678.4 697.6 684.8z"></path></g></svg>'
              }
            }
          }
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
};
