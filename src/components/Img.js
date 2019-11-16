import React from 'react'

function Img (props) {
    const { align, w, width, src, legend, ...other} = props
    return (
        <div align={align || 'center'}>
            <img src={src} width={w || width || '100%'} loading="lazy" {...other} />
            {legend && <p>{legend}</p>}
        </div>
    )
}

export default Img
