import Link from '@docusaurus/Link';
import React from 'react';
import classNames from 'classnames';

import styles from '../pages/index.module.css';

export default function Button({children, className, to, ...props}) {
  return (
    <Link to={to}>
      <button
        type="button"
        {...props}
        className={classNames(
          'button button--lg button--primary',
          styles['call-to-action'],
          className
        )}
      >
        {children}
      </button>
    </Link>
  );
}
