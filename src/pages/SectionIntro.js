import React from 'react';
import classNames from 'classnames';

import Heading from '../components/Heading';
import Oval from '../components/Oval';
import styles from '../pages/index.module.css';

const SectionIntro = ({title}) => {
  return (
    <div
      className={classNames(
        'hero hero--primary',
        styles['overflow-hidden'],
        styles.whyus
      )}>
      <div className="container">
        <div className="section">
          <div className="row">
            <div
              className={classNames('col col--5', styles['section-content'])}>
              {/* <Subtitle>Why choose us</Subtitle> */}
              <Heading className={styles['heading-white']}>{title}</Heading>
              <p className={classNames(styles.text, styles.paragraph)}>
                <cite>
                  &quot;Any application that can be written in JavaScript, will
                  eventually be written in JavaScript.&quot; - Atwood
                </cite>
                {/* <cite style={{float: 'right'}}>- Jeff Atwood</cite> */}
              </p>
              <h2 className={classNames(styles.text, styles.emphasis)}>
                Write in one language, run in more clients.
              </h2>
              <p className={classNames(styles.text, styles.paragraph)}>
                As the web and JS develop rapidly, there are many frameworks
                available to build client applications for different ends.
              </p>
            </div>
            <div
              className={classNames(
                'col',
                styles['section-content'],
                styles['section-bgwhite']
              )}>
              <span
                className={classNames(
                  styles['section-bgwhite-block'],
                  styles['section-bgwhite-block-right']
                )}
              />
              <div className={classNames('row', styles.padding)}>
                <div className="col">
                  <Oval className={styles.white}>
                    <img
                      src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/browser.svg"
                      className={styles['small-image']}
                    />
                  </Oval>
                  <h2 className={styles['section-heading']}>Web</h2>
                  <ul>
                    <li>JS/CSS/HTML</li>
                    <li>TypeScript</li>
                    <li>React Stack</li>
                    <li>Micro Frontends</li>
                  </ul>
                </div>
                <div className="col">
                  <Oval className={styles.white}>
                    <img
                      src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/mobile.svg"
                      className={styles['small-image']}
                    />
                  </Oval>
                  <h2 className={styles['section-heading']}>Mobile</h2>
                  <ul>
                    <li>H5</li>
                    <li>Mini Programs</li>
                    <li>React Native</li>
                    <li>PWA</li>
                  </ul>
                </div>
                <div className="col">
                  <Oval className={styles.white}>
                    <img
                      src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/desktop.svg"
                      className={styles['small-image']}
                    />
                  </Oval>
                  <h2 className={styles['section-heading']}>Desktop</h2>
                  <ul>
                    <li>Electron</li>
                    <li>NodeGUI</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionIntro;
