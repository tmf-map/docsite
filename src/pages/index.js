import React from 'react';
import cx from 'classnames';
import Layout from '@theme/Layout';
import BackToTopButton from '@theme/BackToTopButton';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';

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
        <Section3 />
        <Section4 />
      </div>
      <BackToTopButton />
    </Layout>
  );
}
