module.exports = [
  'web/1.get-started',
  {
    '2. Cross Origin': [
      'web/2.cross-domain/same-origin-policy',
      'web/2.cross-domain/jsonp',
      'web/2.cross-domain/cors',
      'web/2.cross-domain/websocket'
    ]
  },
  {
    '3. Sending Data': [
      'web/3.data-transmission/url',
      'web/3.data-transmission/json',
      'web/3.data-transmission/ajax',
      'web/3.data-transmission/fetch',
      'web/3.data-transmission/form',
      'web/3.data-transmission/file'
    ]
  },
  {
    '4. Browser': [
      'web/4.browser/window',
      'web/4.browser/navigator',
      'web/4.browser/rendering-engine'
    ]
  },
  {
    '5. Render & Load': [
      'web/5.render-load/page-rendering',
      'web/5.render-load/script',
      'web/5.render-load/reflow-repaint',
      'web/5.render-load/DOMContentLoaded'
    ]
  },
  {
    '6. Cross Document Communication': [
      'web/6.cross-document/iframe',
      'web/6.cross-document/postMassage'
    ]
  },
  {
    '7. Browser Router': [
      'web/7.rooter/hash-rooter',
      'web/7.rooter/history-rooter'
    ]
  },
  {
    '8. Graphics & Effects': [
      'web/8.graphics-effects/js-animation',
      'web/8.graphics-effects/canvas',
      'web/8.graphics-effects/webgl'
    ]
  },
  {
    '9. Offline & Storage': [
      'web/9.offline-storage/webstorage',
      'web/9.offline-storage/IndexedDB',
      'web/9.offline-storage/web-SQL',
      'web/9.offline-storage/service-workers',
      'web/9.offline-storage/summary'
    ]
  },
  {
    '10. Web Security': [
      {
        type: 'category',
        label: 'Request Status Maintenance',
        items: [
          'web/10.web-security/cookie',
          'web/10.web-security/session',
          {
            type: 'category',
            label: 'Token',
            items: ['web/10.web-security/oauth', 'web/10.web-security/jwt']
          }
        ]
      },
      'web/10.web-security/csrf',
      'web/10.web-security/xss'
    ]
  },
  {
    '11. Web Performance': [
      'web/11.web-performance/pic-optimize',
      'web/11.web-performance/lazy-loading',
      'web/11.web-performance/http-cache',
      'web/11.web-performance/webworker'
    ]
  }
];
