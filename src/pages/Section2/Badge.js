import React from 'react';
import styles from './index.module.css';

const Badge = ({children}) => {
  const bgColorMapping = {
    'Expert': '#d61d00',
    'Proficient': '#ca5924',
    'Competent': '#e67f19',
    'Beginner': '#31b531',
  }
  return (
    <div className={styles.badge} style={{backgroundColor: bgColorMapping[children]}}>
      {children}
    </div>
  );
};

export default Badge;
