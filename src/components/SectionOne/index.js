import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Button from '../Button';
import styles from './index.module.css';

const SectionOne = () => {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  const {tagline} = siteConfig;
  return (
    <div className={styles.container}>
      {/* <div className={styles.topBg} /> */}
      <p className={styles.slogan}>{tagline}</p>
      <p className={styles.sloganCN}>
        不積跬步，无以至千里；不積小流，无以成江海。——荀子
      </p>
      <a className={styles.version} href="/">
        Latest version: 2021-Q1-Jan
      </a>
      <div className={styles.getStartedBtn}>
        <Button to="/docs/react/1.basic/jsx">Get Started</Button>
      </div>
    </div>
  );
};

export default SectionOne;
