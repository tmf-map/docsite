import React from 'react'

function Img (props) {
    const { align, w, width, src, legend} = props
    return (
        <div align={align || 'center'}>
            <img src={src} width={w || width || '100%'} loading="lazy" />
            {legend && <p>{legend}</p>}
        </div>
    )
}

export default Img
