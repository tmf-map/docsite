/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  "react": {
    "1.组件基础": [
      "react/1.basic/jsx",
      "react/1.basic/lifecycle",
      "react/1.basic/state",
      "react/1.basic/communication",
      "react/1.basic/category",
      "react/1.basic/event",
      "react/1.basic/style"
    ],
    "2.组件进阶": [
      "react/2.advanced/render-props",
      "react/2.advanced/hoc",
      "react/2.advanced/hooks",
      "react/2.advanced/context",
      "react/2.advanced/portal",
    ],
    "3.组件优化": [
      "react/3.optimization/performance",
      "react/3.optimization/pure-component",
      "react/3.optimization/memo",
      "react/3.optimization/code-splitting",
      "react/3.optimization/suspense",
    ],
    "4.三大组件": [
      "react/4.three-components/container-component",
      "react/4.three-components/presentational-component",
      "react/4.three-components/ui-component",
    ],
    "5.状态管理": [
      "react/5.state-management/redux",
      "react/5.state-management/store",
      "react/5.state-management/reducer",
      "react/5.state-management/action",
      "react/5.state-management/selector",
      "react/5.state-management/middleware",
      "react/5.state-management/model"
    ],
    "6.路由管理": [
      "react/6.router-management/router",
      "react/6.router-management/route",
      "react/6.router-management/link"
    ],
    "7.测试": [
      "react/7.test/test-category",
      "react/7.test/unit-test",
      "react/7.test/component-test",
      "react/7.test/state-test"
    ],
    "8.安全规约": [
      "react/security-guide"
    ],
    "附录": [
      "react/appendix1-references",
      "react/appendix2-related-websites"
    ]
  },
  "web": {
    "1.http协议": [
      "web/1.http/http-connection",
      "web/1.http/http-status",
      "web/1.http/http-cache",
      "web/1.http/http1.1",
      "web/1.http/http2",
      "web/1.http/https",
      "web/1.http/ajax",
      "web/1.http/fetch",
      "web/1.http/websocket"
    ],
    "2.同源协议": [
      "web/2.same-origin-policy/same-origin-policy"
    ],
    "3.跨域请求": [
      "web/3.cross-domain/jsonp",
      "web/3.cross-domain/cors",
      "web/3.cross-domain/websocket"
    ],
    "4.跨文档通信": [
      "web/4.cross-document/iframe",
      "web/4.cross-document/postMassage"

    ],
    "5.webWorker": [
      "web/5.webworker/webworker"    
    ],
    "6.浏览器渲染": [
      "web/6.browser-rendering/js-single-thread","web/6.browser-rendering/page-rendering", 
      "web/6.browser-rendering/async-defer", 
      "web/6.browser-rendering/reflow-repaint", 
      "web/6.browser-rendering/other",
      "web/6.browser-rendering/DOMContentLoaded",
    ],
    "7.js动画": [
      "web/7.js-animation/principle",
      "web/7.js-animation/timer",
      "web/7.js-animation/requestAnimationFrame"
    ],
    "8.DOM": [
      "web/8.dom/node",
      "web/8.dom/event"
    ],
    "9.前端路由": [
      "web/9.rooter/hash-rooter",
      "web/9.rooter/history-rooter",
    ],
    "10.浏览器存储": [
      "web/10.storage/webstorage",
      "web/10.storage/IndexedDB",
      "web/10.storage/web-SQL",
      "web/10.storage/service-workers",
      "web/10.storage/summary"
    ],
    "11.安全机制与防范": [
      "web/11.security/cookie",
      "web/11.security/session",
      "web/11.security/OAuth",
      "web/11.security/JWT",
      "web/11.security/CSRF",
      "web/11.security/XSS"
    ],
    "12.web网页性能优化": [
      "web/12.web-optimize/pic-optimize",
      "web/12.web-optimize/delay-loading",
      "web/12.web-optimize/http-cache"
    ],
    "13.浏览器内核": [
      "web/13.rendering-engine/rendering-engine",
    ] 
  },
  "algorithm": {
    "1.数组": [
      "algorithm/1.array/duplicated-number-in-array",
    ],
    "2.栈与队列": [
      "algorithm/3.stack-queue/min-stack",
    ],
    "4.链表": [
      "algorithm/4.linkedlist/merge-two-sorted-lists",
    ],
    "5.二叉树": [
      "algorithm/5.binary-tree/build-tree",
      "algorithm/5.binary-tree/mirror-tree"
    ],
    "8.排序": [
      "algorithm/8.sort/merged-sort",
      "algorithm/8.sort/quick-sort",
    ],
    "9.查找": [
      "algorithm/9.search/number-same-as-index",
      "algorithm/9.search/number-in-sorted-array",
    ],
    "11.反转和旋转": [
      "algorithm/11.reverse/reverse-linked-list",
      "algorithm/11.reverse/rotate-string",
      "algorithm/11.reverse/reverse-integer",
    ],
    "12.数学": [
      "algorithm/12.math/powx-n",
    ]
  },
  docs: {
    Docusaurus: ['doc1', 'doc2', 'doc3'],
    Features: ['mdx'],
  },
};
