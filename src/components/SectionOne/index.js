import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import pkg from '../../../package.json';
import Button from '../Button';
import styles from './index.module.css';

const SectionOne = () => {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  const {tagline, organizationName, projectName} = siteConfig;
  return (
    <div className={styles.container}>
      {/* <div className={styles.topBg} /> */}
      <p className={styles.slogan}>{tagline}</p>
      {/* <p className={styles.sloganCN}>
        不積跬步，无以至千里；不積小流，无以成江海。——荀子
      </p> */}
      <a
        className={styles.version}
        href={`https://github.com/${organizationName}/${projectName}/releases`}
        target="blank">
        Latest version: {pkg.version}
      </a>
      <div className={styles.getStartedBtn}>
        <Button to="/docs/react/1.basic/jsx">Get Started</Button>
      </div>
    </div>
  );
};

export default SectionOne;
