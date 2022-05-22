import React from 'react';
import PartIntro from './PartIntro';
import categories from './categories';
import styles from './index.module.css';

const Section3 = () => {
  return (
    <div className={styles.section3}>
      <div className={styles.container}>
        {categories.map(category => (
          <PartIntro
            title={category.title.name}
            titlePosition={category.title.position}
            content={category.content}
            intro={category.intro}
            id={category.id}
            key={category.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Section3;
