import React, {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import request from '@http-util/request';
import {getAllCommitsCount} from '../utils';
import cards from './cards';
import styles from './index.module.css';

const Section4 = () => {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  const {organizationName, projectName} = siteConfig;
  const [days, setDays] = useState('-');
  const [contributors, setContributors] = useState('-');
  const [commits, setCommits] = useState('-');
  const [stars, setStars] = useState('-');
  // useEffect(() => {
  //   request
  //     .p(`https://api.github.com/repos/${organizationName}/${projectName}`)
  //     .get()
  //     .then(res => {
  //       const {stargazers_count: stargazersCount, created_at: createdAt} =
  //         res ?? {};
  //       stargazersCount && setStars(stargazersCount);
  //       createdAt &&
  //         setDays(
  //           Math.floor((new Date() - new Date(createdAt)) / 24 / 3600 / 1000)
  //         );
  //     })
  //     .catch(() => {});
  //   const commitsCount = getAllCommitsCount(
  //     organizationName,
  //     projectName,
  //     'master'
  //   );
  //   commitsCount && setCommits(commitsCount);
  //   request
  //     .p(
  //       `https://api.github.com/repos/${organizationName}/${projectName}/contributors`
  //     )
  //     .q('per_page', 1)
  //     .asRaw()
  //     .get()
  //     .then(res => {
  //       // https://stackoverflow.com/questions/44347339/github-api-how-efficiently-get-the-total-contributors-amount-per-repository
  //       const contributionsCount = res?.headers
  //         ?.get('link')
  //         ?.match(/\d+(?=>; rel="last")/)?.[0];
  //       contributionsCount && setContributors(contributionsCount);
  //     })
  //     .catch(() => {});
  // }, []);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.about}>About ThinkBucket</div>
        <div className={styles.intro}>
          ThinkBucket is a lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem ratione, quibusdam voluptatibus harum beatae labore dolorum earum minus eligendi numquam est adipisci quas laborum deleniti, aperiam, voluptas cupiditate repellendus odit.
        </div>
        <ul>
          <li>
            GitHub:{' '}
            <span className={styles.link}>
              https://github.com/ThinkBucket/docsite
            </span>
          </li>
          <li>
            Release Note:{' '}
            <span className={styles.link}>
              https://github.com/ThinkBucket/docsite
            </span>
          </li>
          <li>
            GitHub:{' '}
            <span className={styles.link}>
              https://github.com/ThinkBucket/docsite
            </span>
          </li>
          <li>
            Release Note:{' '}
            <span className={styles.link}>
              https://github.com/ThinkBucket/docsite
            </span>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        <div>
          <div className={styles.title}>Contributor</div>
          <div className={styles.avatars}>
            <div className={styles.avatar}>
              <img
                className={styles.image}
                src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Dnx3Ag.jpg"
                alt=""
              />
              <div className={styles.name}>Kimi</div>
            </div>
            <div className={styles.avatar}>
              <img
                className={styles.image}
                src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Dnx3Ag.jpg"
                alt=""
              />
              <div className={styles.name}>Sherry</div>
            </div>
            <div className={styles.avatar}>
              <img
                className={styles.image}
                src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Dnx3Ag.jpg"
                alt=""
              />
              <div className={styles.name}>Kanon</div>
            </div>
            <div className={styles.avatar}>
              <img
                className={styles.image}
                src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Dnx3Ag.jpg"
                alt=""
              />
              <div className={styles.name}>Robbie</div>
            </div>
            <div className={styles.avatar}>
              <img
                className={styles.image}
                src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Dnx3Ag.jpg"
                alt=""
              />
              <div className={styles.name}>Miya</div>
            </div>
            <div className={styles.avatar}>
              <img
                className={styles.image}
                src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Dnx3Ag.jpg"
                alt=""
              />
              <div className={styles.name}>Goroyal</div>
            </div>
          </div>
        </div>
        <div className={styles.sponsor}>
          <div className={styles.title}>Sponsor</div>
          <div className={styles.avatars}>
            <div className={styles.avatar}>
              <img
                className={styles.image}
                src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Dnx3Ag.jpg"
                alt=""
              />
              <div className={styles.name}>Kimi</div>
            </div>
            <div className={styles.avatar}>
              <img
                className={styles.image}
                src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Dnx3Ag.jpg"
                alt=""
              />
              <div className={styles.name}>Sherry</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4;
