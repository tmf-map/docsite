import React, {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import request from '@http-util/request';
import Button from '../Button';
import styles from './index.module.css';

const Section1 = () => {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  const {tagline, organizationName, projectName, themeConfig} = siteConfig;
  const [version, setVersion] = useState('-');
  useEffect(() => {
    request
      .p(
        `https://api.github.com/repos/${organizationName}/${projectName}/releases`
      )
      .q('per_page', 1)
      .get()
      .then(res => {
        const tagName = res?.[0]?.tag_name;
        const d = new Date();
        setVersion(tagName ?? `${d.getFullYear()}.${d.getMonth()}`);
      })
      .catch(() => {
        const d = new Date();
        setVersion(`${d.getFullYear()}.${d.getMonth()}`);
      });
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.textPart}>
        <p className={styles.slogan}>{tagline}</p>
        <div className={styles.buttons}>
          <a
            className={styles.version}
            href={`https://github.com/${organizationName}/${projectName}/releases`}
            target="blank">
            Version {version}
          </a>
          <Button
            to={`/${themeConfig?.navbar?.items?.[1]?.items?.[0]?.to ?? ''}`}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Section1;
