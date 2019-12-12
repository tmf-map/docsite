import React from 'react';

function Img(props) {
  const {align, w, width, src, legend, origin, float, ...other} = props;
  const style = float && {float};
  return (
    <div align={align || 'center'} style={style}>
      <img src={src} width={w || width || '100%'} loading="lazy" {...other} />
      {legend && !origin && <p style={{fontSize: '0.9rem'}}>{legend}</p>}
      {legend && origin && (
        <p style={{fontSize: '0.9rem'}}>
          <a target="blank" href={origin}>
            <i>{legend}</i>
          </a>
        </p>
      )}
    </div>
  );
}

export default Img;
