import React, {useState, useEffect} from 'react';
import cx from 'classnames';
import {renderMsc} from 'mscgenjs';
import styles from './index.module.css';

function genUuidV4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function handleRenderMscResult(parseError) {
  if (parseError) {
    console.error(parseError);
  }
}

export default function SeqChart({
  inputType = 'msc',
  mirrorEntitiesOnBottom,
  additionalTemplate,
  includeSource,
  children,
  className
}) {
  const [uuid] = useState(genUuidV4());
  console.log('uuid', uuid);

  useEffect(() => {
    const options = {inputType};
    if (mirrorEntitiesOnBottom) {
      options.mirrorEntitiesOnBottom = mirrorEntitiesOnBottom;
    }
    if (additionalTemplate) {
      options.additionalTemplate = additionalTemplate;
    }
    if (includeSource) {
      options.includeSource = includeSource;
    }
    console.log('useEffect', uuid);

    renderMsc(
      `${inputType} {
        ${children}
      }`,
      {
        elementId: uuid,
        ...options
      },
      handleRenderMscResult
    );
  });

  return <div id={uuid} className={cx(styles['seq-chart'], className)} />;
}
