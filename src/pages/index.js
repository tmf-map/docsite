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
import SectionIntro from './SectionIntro';
import ServerSide from './ServerSide';

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
        <SectionOne />
        <SectionTwo />
        <div className="main">
          <SectionIntro title="Part I. Basics" />
          <WIP />
          <ServerSide title="Part II. Frontend" />
          <WIP />
          <SectionIntro title="Part III. Backend" />
          <WIP />
          <ServerSide title="Part IV. Data" />
          <WIP />
          <Gitter />
        </div>
      </div>
    </Layout>
  );
}
