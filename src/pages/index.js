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
import Gitter from './Gitter';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';

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
        <Gitter />
      </div>
    </Layout>
  );
}
