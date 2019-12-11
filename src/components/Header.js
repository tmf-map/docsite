import React from 'react';
import classNames from 'classnames';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Button from './Button';
import styles from '../pages/index.module.css';

const themes = [
  {
    alt: 'JavaScript',
    src: 'javascript.svg',
    to: '/docs/javascript/1.basic/js-engine',
  },
  {
    alt: 'CSS',
    src: 'css3-logo.svg',
    to: '/docs/css/1.visual-formatting-model/basic-concept',
  },
  {
    alt: 'React',
    src: 'react.svg',
    to: '/docs/react/1.basic/jsx',
  },
  {
    alt: 'Redux',
    src: 'redux-logo.svg',
    to: '/docs/react/5.state-management/redux',
  },
];

export default function Header() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  const {title, tagline} = siteConfig;
  return (
    <div className="hero hero--primary">
      <div className="container">
        <div className="row">
          <div className="col">
            <span
              className={classNames(
                styles.text,
                styles['text-big'],
                styles.title,
              )}>
              {title}
            </span>
            <span
              className={classNames(
                styles.description,
                styles.text,
                styles['text-huge'],
              )}>
              {tagline}
            </span>
            <div className={styles['center-if-sm']}>
              <p className={classNames(styles.text, styles.supported)}>
                Here is a glimpse of updating docs:
              </p>
              {themes.map(({alt, src, to}) => (
                <Link className={styles['theme-icon']} key={alt} to={to}>
                  <img
                    alt={alt}
                    src={`https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/${src}`}
                  />
                </Link>
              ))}
            </div>
            <div className={styles['center-if-sm']}>
              <Button to="/docs/react/1.basic/jsx">Get Started</Button>
            </div>
          </div>
          <div className="col">
            <img
              className={styles.imgRight}
              src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/home-right.png"
              draggable={false}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
