import React from 'react';
import cx from 'classnames';

import Heading from '../components/Heading';
import styles from '../pages/index.module.css';

export default function WIP() {
  return (
    <div className={cx('section text--center', styles.contact)}>
      <img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/oltp-and-olap.png" alt="" width="60%" />
      {/* <Heading>
        This section is in progress <br />
        <br /> Please stay tuned
      </Heading> */}
    </div>
  );
}
