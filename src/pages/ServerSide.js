import React from 'react';
import classNames from 'classnames';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Oval from '../components/Oval';
import Heading from '../components/Heading';
import styles from '../pages/index.module.css';

export default function ServerSide({title}) {
  // const context = useDocusaurusContext();
  // const {  } = context.siteConfig.customFields;

  return (
    <div
      className={classNames('hero homepage__section', styles['overflow-hidden'])}>
      <div className="container">
        <div className="section">
          <div className="row">
            <div
              className={classNames(
                'col',
                styles['section-content'],
                styles['section-bgwhite']
              )}>
              <span
                className={classNames(
                  styles['section-bgwhite-block'],
                  styles['section-bgwhite-block-left']
                )}
              />
              <div className={classNames('row', styles.padding)}>
                <div className="col">
                  <Oval className={styles.white}>
                    <img
                      src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ops.svg"
                      className={styles['small-image']}
                    />
                  </Oval>
                  <h2 className={styles['section-heading']}>Ops</h2>
                  <ul>
                    <li>Linux</li>
                    <li>Docker</li>
                    <li>Kubernetes</li>
                  </ul>
                </div>
                <div className="col">
                  <Oval className={styles.white}>
                    <img
                      src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/database.svg"
                      className={styles['small-image']}
                    />
                  </Oval>
                  <h2 className={styles['section-heading']}>Database</h2>
                  <ul>
                    <li>MySQL</li>
                    <li>Redis</li>
                    <li>MongoDB</li>
                  </ul>
                </div>
                <div className="col">
                  <Oval className={styles.white}>
                    <img
                      src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/nodejs.svg"
                      className={styles['small-image']}
                    />
                  </Oval>
                  <h2 className={styles['section-heading']}>NodeJS</h2>
                  <ul>
                    <li>Express</li>
                    <li>Nest</li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className={classNames('col col--5', styles['section-content'])}>
              {/* <Subtitle>Why choose us</Subtitle> */}
              <Heading className={styles['heading-white']}>
                {title}
                {/* <br />
                to implement solution */}
              </Heading>
              <p className={classNames(styles.text, styles.paragraph)}>
                JS sometimes is not the best choice, but it indeed has opened
                the door to the full stack world.
              </p>
              <h2 className={classNames(styles.text, styles.emphasis)}>
                More than Node and JavaScript.
              </h2>
              <p className={classNames(styles.text, styles.paragraph)}>
                Node likes Swiss army knife, it&apos;s useful but you&apos;d
                better learn other technologies to make your ability of server
                side development stronger.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
