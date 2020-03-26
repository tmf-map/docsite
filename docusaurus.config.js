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
          // options for remark-admonitions, this does not work now.
          admonitions: {
            customTypes: {
              kk: {
                keyword: 'kk',
                emoji: '⚠️', // '&#x26A0;&#xFE0F;'
                svg:
                  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"/></svg>'
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
