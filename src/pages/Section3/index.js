import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import PartIntro from './PartIntro';
import categories from '../categories';
import styles from './index.module.css';

const Section3 = () => {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  const {themeConfig} = siteConfig;
  const linksMapping = themeConfig.navbar.items.filter(item => item.items).map(v => v.items).flat();

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
            linksMapping={linksMapping}
          />
        ))}
      </div>
    </div>
  );
};

export default Section3;
