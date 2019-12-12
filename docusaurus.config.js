const githubOrg = 'ThinkBucket';
const githubRepo = 'docsite';

module.exports = {
  title: githubOrg,
  tagline: 'Explore and study full stack technology',
  url: 'http://106.75.115.39',
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
          label: 'Javascript',
          position: 'left'
        },
        {to: 'docs/html/preface/overview', label: 'HTML', position: 'left'},
        {
          to: 'docs/css/1.visual-formatting-model/basic-concept',
          label: 'CSS',
          position: 'left'
        },
        {to: 'docs/web/1.http/http-connection', label: 'Web', position: 'left'},
        {to: 'docs/react/1.basic/jsx', label: 'React Stack', position: 'left'},
        {
          to: 'docs/design-patterns/1.creation-pattern/singleton',
          label: 'Design Patterns',
          position: 'left'
        },
        {
          to: 'docs/algorithm/analysis-of-algorithms/asymptotic-notations',
          label: 'Algorithm',
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
                '<p class="footer-desc">致力于加强开发者对技术的学习和思考，专注于互联网技术发展，这里集聚了开发者的思考，总结和对未来互联网科技发展的畅想。</p>'
            }
          ]
        },
        {
          title: '公众号',
          items: [
            {
              html:
                '<img class="footer-reward" loading="lazy" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/qrcode_for_wechat.jpg" />'
            }
          ]
        },
        {
          title: '帮助',
          items: [
            {
              label: '更新日志',
              href: `https://github.com/${githubOrg}/${githubRepo}/releases`
            },
            {
              label: '讨论列表',
              href: `https://github.com/${githubOrg}/${githubRepo}/issues`
            },
            {
              label: '报告问题',
              href: `https://github.com/${githubOrg}/${githubRepo}/issues/new`
            }
          ]
        },
        {
          title: '社区',
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
      copyright: `Copyright © ${new Date().getFullYear()} ${githubOrg}`
    },
    prism: {
      theme: require('prism-react-renderer/themes/nightOwl')
    }
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
          showLastUpdateTime: true
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
};
