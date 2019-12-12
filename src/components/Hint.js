import React from 'react';
import marked from 'marked';
import './Hint.css';

const colorMap = {
  best: {
    name: 'Best',
    color: '#50c610',
    icon: (
      <svg
        preserveAspectRatio="xMidYMid meet"
        height="1rem"
        width="1rem"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        className="custom-hint__icon"
        style={{color: '#50c610'}}>
        <g>
          <path d="M22 11.07V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="23 3 12 14 9 11" />
        </g>
      </svg>
    )
  },
  must: {
    name: 'Must',
    color: '#ff4642',
    icon: (
      <svg
        preserveAspectRatio="xMidYMid meet"
        height="1rem"
        width="1rem"
        fill="#ff4642"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        stroke="none"
        className="custom-hint__icon">
        <g>
          <path d="M512 992c-262.4 0-480-217.6-480-480 0-262.4 217.6-480 480-480s480 217.6 480 480C992 774.4 774.4 992 512 992zM512 108.8C288 108.8 108.8 288 108.8 512c0 224 179.2 403.2 403.2 403.2s403.2-179.2 403.2-403.2C915.2 288 736 108.8 512 108.8zM697.6 684.8l-12.8 12.8c-6.4 6.4-19.2 6.4-25.6 0L512 550.4l-140.8 140.8c-6.4 6.4-19.2 6.4-25.6 0l-12.8-12.8c-6.4-6.4-6.4-19.2 0-25.6L473.6 512 326.4 371.2C320 358.4 320 345.6 326.4 339.2l12.8-12.8C345.6 320 358.4 320 371.2 326.4L512 473.6l140.8-140.8c6.4-6.4 19.2-6.4 25.6 0l12.8 12.8c6.4 6.4 6.4 19.2 0 25.6L550.4 512l140.8 140.8C704 665.6 704 678.4 697.6 684.8z" />
        </g>
      </svg>
    )
  },
  tip: {
    name: 'Tip',
    color: '#3884ff',
    icon: (
      <svg
        preserveAspectRatio="xMidYMid meet"
        height="1rem"
        width="1rem"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="none"
        className="custom-hint__icon"
        style={{color: '#3884ff'}}>
        <g>
          <path
            d="M12.2 8.98c.06-.01.12-.03.18-.06.06-.02.12-.05.18-.09l.15-.12c.18-.19.29-.45.29-.71 0-.06-.01-.13-.02-.19a.603.603 0 0 0-.06-.19.757.757 0 0 0-.09-.18c-.03-.05-.08-.1-.12-.15-.28-.27-.72-.37-1.09-.21-.13.05-.23.12-.33.21-.04.05-.09.1-.12.15-.04.06-.07.12-.09.18-.03.06-.05.12-.06.19-.01.06-.02.13-.02.19 0 .26.11.52.29.71.1.09.2.16.33.21.12.05.25.08.38.08.06 0 .13-.01.2-.02M13 16v-4a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0M12 3c-4.962 0-9 4.038-9 9 0 4.963 4.038 9 9 9 4.963 0 9-4.037 9-9 0-4.962-4.037-9-9-9m0 20C5.935 23 1 18.065 1 12S5.935 1 12 1c6.066 0 11 4.935 11 11s-4.934 11-11 11"
            fillRule="evenodd"
          />
        </g>
      </svg>
    )
  },
  warning: {
    name: 'Warning',
    color: '#fdbe12',
    icon: (
      <svg
        preserveAspectRatio="xMidYMid meet"
        height="1rem"
        width="1rem"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        className="custom-hint__icon"
        style={{color: '#fdbe12'}}>
        <g>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12" y2="16" />
        </g>
      </svg>
    )
  }
};

function Hint({type, children}) {
  return (
    <div
      className="custom-hint"
      style={{borderLeft: `0.25rem solid ${colorMap[type].color}`}}>
      <div style={{float: 'left'}}>{colorMap[type].icon}</div>
      <div
        dangerouslySetInnerHTML={{
          __html: marked(`<span>${colorMap[type].name}</span>：${children}`)
        }}
      />
    </div>
  );
}

export default Hint;
