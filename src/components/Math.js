import React from 'react';

function Img(props) {
  return (
    <img
      src={`https://math.now.sh?from=${encodeURIComponent(props.code)}`}
      style={{height: '100%', verticalAlign: 'middle'}}
    />
  );
}

function Math(props) {
  const {code, block} = props;
  const style = {
    margin: '1rem auto',
    width: '80%',
    padding: '1rem',
    textAlign: 'center',
    backgroundColor: '#ebedf0'
  };

  return block ? (
    <div style={style}>
      <Img code={code} />
    </div>
  ) : (
    <Img code={code} />
  );
}

export default Math;
