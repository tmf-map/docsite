import React from 'react';
import cx from 'classnames';

import Button from './Button';
import Heading from './Heading';
import styles from '../pages/index.module.css';

export default function Gitter() {
  return (
    <div className={cx('section text--center', styles.contact)}>
      <Heading>If you want to know more - join us please!</Heading>
      {/* <div className={styles.contactList}>
        <img className={styles.contactLogo} src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/gitter-logo.svg" alt=""/>
        <img className={styles.contactLogo} src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/slack-logo.svg" alt=""/>
      </div> */}
      <Button className={styles.gitter} to="https://gitter.im">
        Our Gitter
      </Button>
    </div>
  );
}
