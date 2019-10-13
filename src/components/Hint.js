import React from 'react'
import marked from 'marked'
import './Hint.css'

const colorMap = {
    warning: {
        name: '注意',
        color: '#fdbe12',
        icon: (
            <div style={{float: 'left'}}>
                <svg
                    preserveAspectRatio="xMidYMid meet"
                    height="1em"
                    width="1em"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="currentColor"
                    className="custom-hint__icon"
                    style={{color: '#fdbe12'}}
                >
                    <g>
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12" y2="17"/>
                    </g>
                </svg>
            </div>
        )
    },
    recommend: {
        name: '推荐',
        color: '#50c610',
        icon: (
            <div style={{float: 'left'}}>
                <svg
                    preserveAspectRatio="xMidYMid meet"
                    height="1em"
                    width="1em"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="currentColor"
                    className="custom-hint__icon"
                    style={{color: '#50c610'}}
                >
                    <g>
                        <path d="M22 11.07V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="23 3 12 14 9 11"/>
                    </g>
                </svg>
            </div>
        )
    },
    force: {
        name: '强制',
        color: '#ff4642',
        icon: (
            <div style={{float: 'left'}}>
                <svg
                    preserveAspectRatio="xMidYMid meet"
                    height="1em"
                    width="1em"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="currentColor"
                    className="custom-hint__icon"
                    style={{color: '#ff4642'}}
                >
                    <g>
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12" y2="17"/>
                    </g>
                </svg>
            </div>
        )
    }
}

function Hint ({type, children}) {
    return (
        <div className="custom-hint" style={{borderLeft: `4px solid ${colorMap[type].color}`}}>
            {colorMap[type].icon}
            <div dangerouslySetInnerHTML={{ __html: marked(`<strong>${colorMap[type].name}</strong>：`+children) }} />
        </div>
    )
}

export default Hint
