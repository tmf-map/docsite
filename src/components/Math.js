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

// function Img(props) {
//   const {align, w, width, src, legend, origin, float, ...other} = props;
//   const style = float && {float};
//   return (
//     <div align={align || 'center'} style={style}>
//       <img src={src} width={w || width || '100%'} loading="lazy" {...other} />
//       {legend && !origin && <p style={{fontSize: '0.9rem'}}>{legend}</p>}
//       {legend && origin && (
//         <p style={{fontSize: '0.9rem'}}>
//           <a target="blank" href={origin}>
//             <i>{legend}</i>
//           </a>
//         </p>
//       )}
//     </div>
//   );
// }

export default Math;
