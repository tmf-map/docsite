import React from 'react';
import classNames from 'classnames';

const GifPlayer = ({gif, still, playing, toggle, ...rest}) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    className={classNames('gif_player', {playing: playing})}
    onClick={toggle}>
    <div className="play_button" />
    <img {...rest} src={playing ? gif || still : still || gif} />
  </div>
);

export default GifPlayer;
