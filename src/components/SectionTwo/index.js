import React, {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import request from '@http-util/request';
import {getAllCommitsCount} from '../../pages/utils';
import styles from './index.module.css';

const SectionTwo = () => {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  const {organizationName, projectName} = siteConfig;
  const [days, setDays] = useState(0);
  const [contributors, setContributors] = useState(0);
  const [commits, setCommits] = useState(0);
  const [stars, setStars] = useState(0);
  useEffect(() => {
    request
      .p(
        `https://api.github.com/repos/${organizationName}/${projectName}`
      )
      .get()
      .then(res => {
        const {stargazers_count: stargazersCount, created_at: createdAt} = res ?? {};
        stargazersCount && setStars(stargazersCount);
        createdAt && setDays(Math.floor((new Date() - new Date(createdAt))/24/3600/1000));
      })
      .catch(() => {
        
      });
      const commitsCount = getAllCommitsCount(organizationName, projectName, 'master')
      commitsCount && setCommits(commitsCount)
    request
      .p(
        `https://api.github.com/repos/${organizationName}/${projectName}/contributors`
      )
      .q('per_page', 1)
      .asRaw()
      .get()
      .then(res => {
        const contributionsCount = res?.headers?.get('link')?.match(/\d+(?=>; rel="last")/)?.[0];
        contributionsCount && setContributors(contributionsCount);
      })
      .catch(() => {
        
      });
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.stats}>
        <div className={styles.statsBlock}>{days}<div className={styles.desc}>Days</div></div>
        <div className={styles.statsBlock}>{contributors}<div className={styles.desc}>Contributors</div></div>
        <div className={styles.statsBlock}>{commits}<div className={styles.desc}>Commits</div></div>
        <div className={styles.statsBlock}>{stars}<div className={styles.desc}>Stars</div></div>
      </div>
      <div className={styles.whatWeDo}>
      </div>
    </div>
  )
};

export default SectionTwo;
