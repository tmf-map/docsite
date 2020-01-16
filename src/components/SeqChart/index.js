import React from 'react';
import cx from 'classnames';
import {renderMsc} from 'mscgenjs';
import styles from './index.module.css';

export default class SeqChart extends React.Component {
  constructor() {
    super();
    this.state = {
      uuid: this.genUuidV4()
    };
  }

  componentDidMount() {
    const {
      inputType = 'msc',
      mirrorEntitiesOnBottom,
      additionalTemplate,
      includeSource
    } = this.props;
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

    renderMsc(
      `${inputType} {
        ${this.props.children}
      }`,
      {
        elementId: this.state.uuid,
        ...options
      },
      this.handleRenderMscResult
    );
  }

  genUuidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  handleRenderMscResult(parseError) {
    if (parseError) {
      console.error(parseError);
    }
  }

  render() {
    return (
      <div
        id={this.state.uuid}
        className={cx(styles['seq-chart'], this.props.className)}
      />
    );
  }
}
