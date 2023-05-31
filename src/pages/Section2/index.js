import React, { useEffect, useState } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import request from '@http-util/request'
import categories from '../categories'
import styles from './index.module.css'
import Link from '@docusaurus/Link'

const techCards = categories?.technology?.map?.((item, idx) => ({
  bannerUrl: `https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/cardBanner${idx + 1}.svg`,
  title: item.title.name,
  intro: item.intro.post,
  moreUrl: `#${item.id}`,
}))

const mgmtCards = categories?.management?.map?.((item, idx) => ({
  bannerUrl: `https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/cardBannerMgmt${idx + 1}.svg`,
  title: item.title.name,
  intro: item.intro.post,
  moreUrl: `#${item.id}`,
  ['to']: item?.to
}))

const BASE_URL = 'https://api.github.com'

const httpGet = (theUrl, returnHeaders) => {
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', theUrl, false) // false for synchronous request
  xmlHttp.send(null)
  if (returnHeaders) {
    return xmlHttp
  }
  return xmlHttp.responseText
}

// https://gist.github.com/yershalom/a7c08f9441d1aadb13777bce4c7cdc3b
const getFirstCommit = (owner, repo) => {
  let url = `${BASE_URL}/repos/${owner}/${repo}/commits`
  let req = httpGet(url, true)
  let firstCommitHash = ''
  if (req.getResponseHeader('Link')) {
    let pageUrl = req
      .getResponseHeader('Link')
      .split(',')[1]
      .split(';')[0]
      .split('<')[1]
      .split('>')[0]
    let reqLastCommit = httpGet(pageUrl)
    let firstCommit = JSON.parse(reqLastCommit)
    firstCommitHash = firstCommit[firstCommit.length - 1]?.sha
  } else {
    let firstCommit = JSON.parse(req.responseText)
    firstCommitHash = firstCommit[firstCommit.length - 1]?.sha
  }
  return firstCommitHash
}

const getAllCommitsCount = (owner, repo, sha) => {
  let firstCommit = getFirstCommit(owner, repo)
  let compareUrl = `${BASE_URL}/repos/${owner}/${repo}/compare/${firstCommit}...${sha}`
  let commitReq = httpGet(compareUrl)
  let commitCount = JSON.parse(commitReq)['total_commits'] + 1
  return commitCount
}

const Card = ({ bannerUrl, title, intro, moreUrl, to }) => {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        })
      })
    })
  }, [])

  const children = (
    <>
      <img src={bannerUrl} alt={title} className={styles.cardBanner}/>
      <div className={styles.cardTitle}>{title}</div>
      <p className={styles.cardIntro}>{intro}</p>
      {/* <div className={styles.cardReadMore}>
        <a href={moreUrl}>Read More</a>
      </div> */}
    </>
  )

  return to ? <Link to={to} className={styles.card} >{children}</Link> : <a className={styles.card} href={moreUrl}>{children}</a>
}

const Section2 = () => {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  const { organizationName, projectName } = siteConfig
  const [days, setDays] = useState('-')
  const [contributors, setContributors] = useState('-')
  const [commits, setCommits] = useState('-')
  const [stars, setStars] = useState('-')

  useEffect(() => {
    process.env.NODE_ENV !== 'development' && request
      .p(`${BASE_URL}/repos/${organizationName}/${projectName}`)
      .get()
      .then(res => {
        const { stargazers_count: stargazersCount, created_at: createdAt } = res ?? {}
        stargazersCount && setStars(stargazersCount)
        createdAt && setDays(Math.floor((new Date() - new Date(createdAt)) / 24 / 3600 / 1000))
      })
      .catch(() => {})
    const commitsCount = process.env.NODE_ENV !== 'development' && getAllCommitsCount(organizationName, projectName, 'master')
    commitsCount && setCommits(commitsCount)
    process.env.NODE_ENV !== 'development' && request
      .p(`${BASE_URL}/repos/${organizationName}/${projectName}/contributors`)
      .q('per_page', 1)
      .asRaw()
      .get()
      .then(res => {
        // https://stackoverflow.com/questions/44347339/github-api-how-efficiently-get-the-total-contributors-amount-per-repository
        const contributionsCount = res?.headers
          ?.get('link')
          ?.match(/\d+(?=>; rel="last")/)?.[0]
        contributionsCount && setContributors(contributionsCount)
      })
      .catch(() => {})
  }, [])

  return (<main>
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
        <p className={styles.title}>Technology</p>
        <div className={styles.treeEdgeTop}>
          <img className={styles.treeEdgeImg1} src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/tree-edge-1.svg"
               alt=""/>
        </div>
        <div className={styles.content}>
          {techCards?.map(card => (<Card key={card.title} {...card} />))}
        </div>
        <div className={styles.treeEdgeBottom}>
          <img className={styles.treeEdgeImg2} src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/tree-edge-2.svg"
               alt=""/>
        </div>
        <p className={styles.title}>Management</p>
        <div className={styles.treeEdgeTop}>
          <img className={styles.treeEdgeImg3} src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/tree-edge-3.svg"
               alt=""/>
        </div>
        <div className={styles.content}>
          {mgmtCards?.map(card => (<Card key={card.title} {...card} />))}
        </div>
        <div className={styles.treeEdgeBottom}>
          <img className={styles.treeEdgeImg4} src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/tree-edge-4.svg"
               alt=""/>
        </div>
        <div className={styles.title}>Future</div>
      </div>
    </div>
  </main>)
}

export default Section2
