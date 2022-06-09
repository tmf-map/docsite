import React, {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import request from '@http-util/request';
import styles from './index.module.css';

const Section4 = () => {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  const {title, organizationName, projectName, customFields = {}} = siteConfig;
  const {siteIntro} = customFields;
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    request
      .p(
        `https://api.github.com/repos/${organizationName}/${projectName}/contributors`
      )
      .q('per_page', 100)
      .get()
      .then(res => {
        const contributors = res.filter(ctb => !ctb.login.includes('[bot]'));
        setContributors(contributors);
      })
      .catch(() => {});
  }, []);

  const domain = 'https://github.com';
  const urls = {
    repository: `${domain}/${organizationName}/${projectName}`,
    releases: `${domain}/${organizationName}/${projectName}/releases`,
    issues: `${domain}/${organizationName}/${projectName}/issues`,
    discussions: `${domain}/${organizationName}/${projectName}/discussions`
  };

  return (
    <div className={styles.section4}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.about}>About {title}</div>
          <div className={styles.intro}>{siteIntro}</div>
          <ul>
            {Object.keys(urls)?.map(key => (
              <li key={key}>
                <span className={styles.linkName}>{key}:</span>
                <a className={styles.link} href={urls[key]} target="_blank">
                  {urls[key]}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.right}>
          <div>
            <div className={styles.title}>Contributors</div>
            <div className={styles.avatars}>
              {contributors?.map(ctb => (
                <div className={styles.avatar} key={ctb.login}>
                  <img className={styles.image} src={ctb.avatar_url} alt="" />
                  <a
                    className={styles.name}
                    href={ctb.html_url}
                    target="_blank">
                    {ctb.login}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.sponsor}>
            <div className={styles.title}>Sponsors</div>
            <div className={styles.avatars}>
              <div className={styles.avatar}>
                <div className={styles.sponsorAdd}>+</div>
                <div className={styles.sponsorName}>Sponsor</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4;
