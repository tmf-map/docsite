const githubOrg = 'ThinkBucket';
const githubRepo = 'docsite';

module.exports = {
    title: githubOrg,
    tagline: 'Explore and study full stack technology',
    url: 'https://thinkbucket.cn',
    baseUrl: '/',
    favicon: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/docsite-logo-white-mode.png',
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
                src: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/docsite-logo-white-mode.png'
            },
            links: [{
                    to: 'docs/javascript/1.basic/js-engine',
                    label: 'Javascript',
                    position: 'left'
                },
                { to: 'docs/html/preface/overview', label: 'HTML', position: 'left' },
                {
                    to: 'docs/css/1.visual-formatting-model/basic-concept',
                    label: 'CSS',
                    position: 'left'
                },
                { to: 'docs/web/1.http/http-connection', label: 'Web', position: 'left' },
                { to: 'docs/react/1.basic/jsx', label: 'React Stack', position: 'left' },
                {
                    to: 'docs/java/1.basic/abstract-class-interface',
                    label: 'Java',
                    position: 'left'
                },
                {
                    to: 'docs/design-patterns/1.creation-pattern/singleton',
                    label: 'Design Patterns',
                    position: 'left'
                },
                {
                    to: 'docs/algorithm/1.array/duplicated-number-in-array',
                    label: 'Algorithm',
                    position: 'left'
                },
                { to: 'blog', label: 'Blog', position: 'right' },
                {
                    href: `https://github.com/${githubOrg}/${githubRepo}`,
                    label: 'GitHub',
                    position: 'right'
                }
            ]
        },
        footer: {
            style: 'dark',
            links: [{
                    title: '',
                    items: [{
                            html: `<img class="footer-logo" loading="lazy" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/docsite-logo-dark-mode.png" /><span>${githubOrg}</span>`
                        },
                        {
                            html: '<p class="footer-desc">Explore and study full stack technology. Here gathers developers\' thinking, summary and imagination on the future development of technology.</p>'
                        }
                    ]
                },
                {
                    title: 'Subscription',
                    items: [{
                        html: '<img class="footer-reward" loading="lazy" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/qrcode_for_wechat.jpg" />'
                    }]
                },
                {
                    title: 'Help',
                    items: [{
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
                    items: [{
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