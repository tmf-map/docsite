import React from 'react'

function Img (props) {
    const { align, width, src}  = props
    if (align) {
        return (
            <div align={align}>
                <img src={src} width={width} />
            </div>
        )
    }
    return <img src={src} width={width} />
}

export default Img
