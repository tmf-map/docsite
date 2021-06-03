import React, {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import request from '@http-util/request';
import pkg from '../../../package.json';
import Button from '../Button';
import styles from './index.module.css';

const SectionOne = () => {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  const {tagline, organizationName, projectName} = siteConfig;
  const [version, setVersion] = useState('');
  useEffect(() => {
    request
      .p('https://api.github.com/repos/thinkbucket/docsite/releases')
      .q('per_page', 1)
      .get()
      .then(res => {
        const tagName = res?.[0]?.tag_name;
        setVersion(tagName ?? pkg.version);
      })
      .catch(() => {
        setVersion(pkg.version);
      });
  }, []);
  return (
    <div className={styles.container}>
      <p className={styles.slogan}>{tagline}</p>
      <a
        className={styles.version}
        href={`https://github.com/${organizationName}/${projectName}/releases`}
        target="blank">
        Latest version: {version}
      </a>
      <div className={styles.getStartedBtn}>
        <Button to="/docs/react/1.basic/jsx">Get Started</Button>
      </div>
    </div>
  );
};

export default SectionOne;
