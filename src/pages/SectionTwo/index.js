import React, {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import request from '@http-util/request';
import {getAllCommitsCount} from '../../pages/utils';
import styles from './index.module.css';

const Card = ({bannerUrl, title, intro, moreUrl}) => {
  return (
    <div className={styles.card}>
      <img src={bannerUrl} alt={title} className={styles.cardBanner} />
      <div className={styles.cardTitle}>{title}</div>
      <p className={styles.cardIntro}>{intro}</p>
      <div className={styles.cardReadMore}>
        <span>Read More</span>
      </div>
    </div>
  );
};

const cards = [
  {
    bannerUrl: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/cardBanner1.svg',
    title: 'Basics',
    intro:
      "The core language of frontend is JS. From here, you can learn not only JS/CSS/HTML, but also React, NodeJS, Webpack as well. In the following lessons, you'll get a healthy understanding of each of front-end.",
    moreUrl: '/'
  },
  {
    bannerUrl: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/cardBanner2.svg',
    title: 'Frontend',
    intro:
      "The core language of frontend is JS. From here, you can learn not only JS/CSS/HTML, but also React, NodeJS, Webpack as well. In the following lessons, you'll get a healthy understanding of each of front-end.",
    moreUrl: '/'
  },
  {
    bannerUrl: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/cardBanner3.svg',
    title: 'Backend',
    intro:
      "The core language of frontend is JS. From here, you can learn not only JS/CSS/HTML, but also React, NodeJS, Webpack as well. In the following lessons, you'll get a healthy understanding of each of front-end.",
    moreUrl: '/'
  },
  {
    bannerUrl: 'https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/cardBanner4.svg',
    title: 'Data',
    intro:
      "The core language of frontend is JS. From here, you can learn not only JS/CSS/HTML, but also React, NodeJS, Webpack as well. In the following lessons, you'll get a healthy understanding of each of front-end.",
    moreUrl: '/'
  }
];

const SectionTwo = () => {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  const {organizationName, projectName} = siteConfig;
  const [days, setDays] = useState('-');
  const [contributors, setContributors] = useState('-');
  const [commits, setCommits] = useState('-');
  const [stars, setStars] = useState('-');
  useEffect(() => {
    request
      .p(`https://api.github.com/repos/${organizationName}/${projectName}`)
      .get()
      .then(res => {
        const {stargazers_count: stargazersCount, created_at: createdAt} =
          res ?? {};
        stargazersCount && setStars(stargazersCount);
        createdAt &&
          setDays(
            Math.floor((new Date() - new Date(createdAt)) / 24 / 3600 / 1000)
          );
      })
      .catch(() => {});
    const commitsCount = getAllCommitsCount(
      organizationName,
      projectName,
      'master'
    );
    commitsCount && setCommits(commitsCount);
    request
      .p(
        `https://api.github.com/repos/${organizationName}/${projectName}/contributors`
      )
      .q('per_page', 1)
      .asRaw()
      .get()
      .then(res => {
        // https://stackoverflow.com/questions/44347339/github-api-how-efficiently-get-the-total-contributors-amount-per-repository
        const contributionsCount = res?.headers
          ?.get('link')
          ?.match(/\d+(?=>; rel="last")/)?.[0];
        contributionsCount && setContributors(contributionsCount);
      })
      .catch(() => {});
  }, []);
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.stats}>
          <div className={styles.statsBlock}>
            {days}
            <div className={styles.desc}>Days</div>
          </div>
          <div className={styles.statsBlock}>
            {contributors}
            <div className={styles.desc}>Contributors</div>
          </div>
          <div className={styles.statsBlock}>
            {commits}
            <div className={styles.desc}>Commits</div>
          </div>
          <div className={styles.statsBlock}>
            {stars}
            <div className={styles.desc}>Stars</div>
          </div>
        </div>
        <div className={styles.whatWeDo}>
          <p className={styles.title}>What we are exploring</p>
          <div className={styles.content}>
            {cards.map(card => (
              <Card key={card.title} {...card} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SectionTwo;
