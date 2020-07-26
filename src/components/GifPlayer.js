import React from 'react';
import GifPlayer from 'react-gif-player';

export default class MyGifPlayer extends React.Component {
  render() {
    return (
      <GifPlayer
        gif={this.props.gif}
        still={this.props.still}
        pauseRef={pause => {
          this.pauseGif = pause;
        }}
      />
    );
  }
}
