import React, {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import request from '@http-util/request';
import {getAllCommitsCount} from '../utils';
import categories from '../categories';
import styles from './index.module.css';

const cards = categories.map((item, idx) => ({
  bannerUrl: `https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/cardBanner${
    idx + 1
  }.svg`,
  title: item.title.name,
  intro: item.intro.post,
  moreUrl: `#${item.id}`
}));

const Card = ({bannerUrl, title, intro, moreUrl}) => {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click',  (e) => {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <a className={styles.card} href={moreUrl}>
      <img src={bannerUrl} alt={title} className={styles.cardBanner} />
      <div className={styles.cardTitle}>{title}</div>
      <p className={styles.cardIntro}>{intro}</p>
      {/* <div className={styles.cardReadMore}>
        <a href={moreUrl}>Read More</a>
      </div> */}
    </a>
  );
};

const Section2 = () => {
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

export default Section2;
