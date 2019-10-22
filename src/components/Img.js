import React from 'react'

function Img (props) {
    const { align, width, src, legend} = props
    if (align || legend) {
        return (
            <div align={align || 'center'}>
                <img src={src} width={width} />
                {legend && <p>{legend}</p>}
            </div>
        )
    }
    return <img src={src} width={width} />
}

export default Img
