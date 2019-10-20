import React from 'react'

function Img (props) {
    const { align, width, src, legend} = props
    if (align) {
        return (
            <div align={align}>
                <img src={src} width={width} />
                {legend && <p>{legend}</p>}
            </div>
        )
    }
    return <img src={src} width={width} />
}

export default Img
