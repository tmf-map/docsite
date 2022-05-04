import React from 'react';
import cx from 'classnames';

import Heading from '../components/Heading';
import styles from '../pages/index.module.css';

export default function Gitter() {
  return (
    <div className={cx('section text--center', styles.contact)}>
        <img style={{width: 1200}} src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Xnip2022-05-04_18-30-37.png" alt=""/>
    </div>
  );
}
