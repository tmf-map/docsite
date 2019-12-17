import React from 'react';
import cx from 'classnames';

import Heading from './Heading';
import styles from '../pages/index.module.css';

export default function WIP() {
  return (
    <div className={cx('section text--center', styles.contact)}>
      <Heading>
        This section is in progress <br />
        <br /> Please stay tuned
      </Heading>
    </div>
  );
}
