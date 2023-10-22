import React from 'react';
import cx from 'classnames';
import Layout from '@theme/Layout';
import BackToTopButton from '@theme/BackToTopButton';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Section1 from './Section1';
import Section2 from './Section2';
import Technology from './Technology';
import Management from './Management';
import Metaverse from './Metaverse';

import styles from './index.module.css';

export default function HomePage() {
  const context = useDocusaurusContext();
  const {
    customFields: {keywords},
    tagline
  } = context.siteConfig;

  return (
    <Layout keywords={keywords} description={tagline}>
      <div className={cx(styles.landing, styles['overflow-hidden'])}>
        <Section1 />
        <Section2 />
        <Technology />
        <Management />
        <Metaverse />
      </div>
      <BackToTopButton />
    </Layout>
  );
}
