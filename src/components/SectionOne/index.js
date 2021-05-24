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
      <p className={styles.slogan}>{tagline}</p>
      <div className={styles.getStartedBtn}>
        <Button to="/docs/react/1.basic/jsx">Get Started</Button>
      </div>
    </div>
  );
};

export default SectionOne;
