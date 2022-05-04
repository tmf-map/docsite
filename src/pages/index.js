/**
 * Copyright (c) 2016-2019 Vazco
 * https://github.com/vazco/uniforms
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import WIP from './WIP';
import Gitter from './Gitter';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import PartIntro from './PartIntro';

import styles from './index.module.css';

const categories = [
  {
    id: 'basics',
    title: {
      name: 'Basics',
      position: 'left'
    },
    content: [
      {
        title: 'Theories',
        icon: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/book-2-line.svg',
        list: [
          {
            name: 'DS & Algorithms',
            created: true
          },
          {
            name: 'Design Patterns',
            created: true
          },
          {
            name: 'Network',
            created: true
          },
          {
            name: 'Operation System',
            created: false
          }
        ]
      },
      {
        title: 'Devtools',
        icon: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/tools-fill.svg',
        list: [
          {
            name: 'Git',
            created: false
          },
          {
            name: 'Terminal',
            created: false
          },
          {
            name: 'IDE',
            created: false
          },
          {
            name: 'Chrome Devtools',
            created: false
          }
        ]
      },
      {
        title: 'Document',
        icon: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/pen-nib-line.svg',
        list: [
          {
            name: 'Markdown',
            created: false
          }
        ]
      },
      {
        title: 'Diagram',
        icon: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/flow-chart.svg',
        list: [
          {
            name: 'UML',
            created: false
          }
        ]
      }
    ]
  },
  {
    id: 'frontend',
    title: {
      name: 'Frontend',
      position: 'right'
    },
    content: [
      {
        title: 'Languages',
        icon: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/code-s-slash-fill.svg',
        list: [
          {
            name: 'JavaScript',
            created: true
          },
          {
            name: 'TypeScript',
            created: true
          },
          {
            name: 'HTML',
            created: true
          },
          {
            name: 'CSS',
            created: true
          }
        ]
      },
      {
        title: 'Frameworks',
        icon: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/stack-line.svg',
        list: [
          {
            name: 'React Stack',
            created: true
          },
          {
            name: 'NodeJS',
            created: true
          }
        ]
      },
      {
        title: 'Libraries',
        icon: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/icon-package.svg',
        list: [
          {
            name: 'Electron',
            created: false
          },
          {
            name: 'Playwright',
            created: false
          },
          {
            name: 'Webpack',
            created: true
          },
          {
            name: 'Vite',
            created: false
          }
        ]
      },
      {
        title: 'Design',
        icon: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/palette-line.svg',
        list: [
          {
            name: 'Icon & Font',
            created: false
          },
          {
            name: 'Figma',
            created: false
          }
        ]
      }
    ]
  },
  {
    id: 'backend',
    title: {
      name: 'Backend',
      position: 'left'
    },
    content: [
      {
        title: 'Languages',
        icon: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/code-s-slash-fill.svg',
        list: [
          {
            name: 'Python',
            created: true
          },
          {
            name: 'Go',
            created: true
          },
          {
            name: 'Shell',
            created: false
          }
        ]
      },
      {
        title: 'Frameworks',
        icon: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/stack-line.svg',
        list: [
          {
            name: 'FastAPI',
            created: false
          }
        ]
      },
      {
        title: 'Databases',
        icon: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/database-2-line.svg',
        list: [
          {
            name: 'MySQL',
            created: true
          },
          {
            name: 'Redis',
            created: false
          },
          {
            name: 'MongoDB',
            created: false
          }
        ]
      },
      {
        title: 'Devops',
        icon: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/cloud-line.svg',
        list: [
          {
            name: 'Docker',
            created: false
          },
          {
            name: 'Kubernetes',
            created: false
          },
          {
            name: 'CI',
            created: false
          },
          {
            name: 'Nginx',
            created: false
          }
        ]
      }
    ]
  },
  {
    id: 'data-ai',
    title: {
      name: 'Data & AI',
      position: 'right'
    },
    content: [
      {
        title: 'Collection',
        icon: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/database-line.svg',
        list: [
          {
            name: 'Scraping',
            created: false
          },
          {
            name: 'Buried Point',
            created: false
          },
          {
            name: 'Public Datasets',
            created: false
          }
        ]
      },
      {
        title: 'Preprocessing',
        icon: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/data-preprocessing.svg',
        list: [
          {
            name: 'Data Cleaning',
            created: false
          },
          {
            name: 'Data Integration',
            created: false
          },
          {
            name: 'Data Transformation',
            created: false
          },
          {
            name: 'Data Reduction',
            created: false
          }
        ]
      },
      {
        title: 'Mining',
        icon: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/search-eye-line.svg',
        list: [
          {
            name: 'Statistics',
            created: false
          },
          {
            name: 'DM Algorithms',
            created: false
          },
          {
            name: 'Machine Learning',
            created: false
          },
          {
            name: 'Deep Learning',
            created: false
          }
        ]
      },
      {
        title: 'Visualization',
        icon: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/bar-chart-2-line.svg',
        list: [
          {
            name: 'SVG',
            created: true
          },
          {
            name: 'Canvas2d',
            created: false
          },
          {
            name: 'D3',
            created: false
          },
          {
            name: 'WebGL & WebGPU',
            created: false
          },
          {
            name: 'Python Vis Libs',
            created: false
          }
        ]
      }
    ]
  }
];

export default function HomePage() {
  const context = useDocusaurusContext();
  const {
    customFields: {keywords},
    tagline
  } = context.siteConfig;

  return (
    <Layout keywords={keywords} description={tagline}>
      <div className={cx(styles.landing, styles['overflow-hidden'])}>
        <SectionOne />
        <SectionTwo />
        <div className={styles.homepage__sections}>
          <div className={styles.homepage__sectionsContainer}>
            {categories.map(category => (
              <PartIntro
                title={category.title.name}
                titlePosition={category.title.position}
                content={category.content}
                id={category.id}
              />
            ))}
          </div>
        </div>
        {/* <WIP /> */}
        <Gitter />
      </div>
    </Layout>
  );
}
