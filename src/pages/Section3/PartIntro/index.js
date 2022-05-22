import React, {useState} from 'react';
import Heading from '../../../components/Heading';
import Oval from '../../../components/Oval';
import styles from './index.module.css';
import cx from 'classnames';

const PartIntro = ({
  title,
  titlePosition = 'left',
  content,
  id,
  intro = {}
}) => {
  return (
    <div
      className={cx(styles.container, styles[`titleFrom--${titlePosition}`])}
      id={id}>
      <div className={styles.textIntro}>
        {/* <div className={styles.decorationLine}></div> */}
        <h1 className={styles.heading}>{title}</h1>
        <p className={cx(styles.text, styles.paragraph)}>
          <cite>{intro.pre}</cite>
          {/* <cite style={{float: 'right'}}>- Jeff Atwood</cite> */}
        </p>
        <h2 className={cx(styles.text, styles.emphasis)}>{intro.emphasis}</h2>
        <p className={cx(styles.text, styles.paragraph)}>{intro.post}</p>
      </div>
      <div className={styles.categoryIntro}>
        {content.map(tech => (
          <div className={styles.techColumn} key={tech.title}>
            <Oval className={cx(styles.oval, styles.white)}>
              <img src={tech.icon} className={styles.image} />
            </Oval>
            <h2 className={styles.sectionHeading}>{tech.title}</h2>
            <ul>
              {tech.list.map(v => (
                <li
                  className={cx(styles.contentItem, {
                    [styles.contentItemCreated]: v.created
                  })}
                  key={v.name}>
                  {v.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartIntro;
