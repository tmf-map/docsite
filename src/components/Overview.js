import React from 'react';
import classNames from 'classnames';

import Heading from './Heading';
import styles from '../pages/index.module.css';

function Section({who, company, position, description, mirror}) {
  return (
    <div
      className={classNames(
        styles.testimonial,
        styles['border-dashed'],
        mirror
          ? styles['border-disable-top-right']
          : styles['border-disable-bottom-left']
      )}>
      <div
        className={classNames(
          'text--center',
          styles['testimonial-content'],
          styles['border-gradient'],
          mirror
            ? styles['border-disable-bottom-left']
            : styles['border-disable-top-right']
        )}>
        <h2>{who}</h2>
        <p>
          <b>{company}</b>
          <br />
          {position}
        </p>
        <p
          className={classNames(
            styles.text,
            styles['testimonial-description']
          )}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Overview() {
  return (
    <div className="section text--center">
      <p
        className={classNames(
          styles.centered,
          styles.text,
          styles['heading-helper']
        )}>
        The technology we are exploring
      </p>
      <Heading>Overview</Heading>
      <div className={styles.testimonials}>
        <Section
          who="Client"
          company=""
          position="Web / Mobile / Desktop"
          description="The structure graphing is in progress, these words are just placeholders for the layout of this section. Coming soon..."
        />
        <Section
          mirror
          who="Server"
          company=""
          position="NodeJS / Database / Ops"
          description="The structure graphing is in progress, these words are just placeholders for the layout of this section. Coming soon..."
        />
      </div>
    </div>
  );
}
