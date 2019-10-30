/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  "javascript": {
    "1.基础概念": [
      "javascript/1.basic/workflow",
      "javascript/1.basic/scope",
      "javascript/1.basic/execute-context",
    ],
    "2.内存管理": [
      "javascript/2.memory/memory-space",
      "javascript/2.memory/memory-check",
      "javascript/2.memory/old-new-space",
      "javascript/2.memory/reference-counting",
      "javascript/2.memory/memory-leak",
      "javascript/2.memory/gc-optimization",
    ],
    "3.闭包": [
      "javascript/3.closure/closure-external",
      "javascript/3.closure/closure-internal",
      "javascript/3.closure/closure-issues",
      "javascript/3.closure/closure-application",
      "javascript/3.closure/summary-test",
    ],
    "4.函数": [
      "javascript/4.function/function-overview",
      "javascript/4.function/context-this",
      "javascript/4.function/function-params",
      "javascript/4.function/constructor",
      "javascript/4.function/iife",
      "javascript/4.function/chained-call",
    ],
    "5.类型机制": [
      "javascript/5.typing/is-type",
      "javascript/5.typing/type-conversion",
      "javascript/5.typing/equal",
      "javascript/5.typing/shallow-deep-clone",
      "javascript/5.typing/data-binding",
    ],
    "6.引用类型应用": [
      "javascript/6.reference-type/array",
      "javascript/6.reference-type/object",
      "javascript/6.reference-type/regex",
      "javascript/6.reference-type/date",
      "javascript/6.reference-type/set-map",
    ],
    "7.面向对象编程": [
      "javascript/7.object-oriented-programming/constructor",
      "javascript/7.object-oriented-programming/create-instance",
      "javascript/7.object-oriented-programming/prototype-chain",
      "javascript/7.object-oriented-programming/inherit",
      "javascript/7.object-oriented-programming/class",
      "javascript/7.object-oriented-programming/super",
    ],
    "8.异步编程": [
      "javascript/8.async-programming/macro-task",
      "javascript/8.async-programming/micro-task",
      "javascript/8.async-programming/event-loop",
      "javascript/8.async-programming/callback",
      "javascript/8.async-programming/promise",
      "javascript/8.async-programming/async-await",
    ],
    "9.模块机制": [
      "javascript/9.modules/amd-cmd-umd",
      "javascript/9.modules/es6-module",
      "javascript/9.modules/import()",
      "javascript/9.modules/browser-import",
      "javascript/9.modules/babel",
    ],
    "附录": [
      "javascript/appendix1-references",
      "javascript/appendix2-related-websites"
    ]
  },
  "css": {
    "1.视觉格式化模型": [
      "css/1.visual-formatting-model/basic-concept",
      "css/1.visual-formatting-model/box-model",
      "css/1.visual-formatting-model/normal-flow",
      "css/1.visual-formatting-model/float",
      "css/1.visual-formatting-model/position",
      "css/1.visual-formatting-model/z-index",
      "css/1.visual-formatting-model/margin"
    ],
    "2.单位与字体": [
      "css/2.unit-font/px",
      "css/2.unit-font/percentage",
      "css/2.unit-font/em",
      "css/2.unit-font/rem",
      "css/2.unit-font/viewport",
      "css/2.unit-font/font",
    ],
    "3.布局": [
      "css/3.layout/flex",
      "css/3.layout/grid",
      "css/3.layout/cols",
      "css/3.layout/rows",
    ],
    "4.居中": [
      "css/4.center/horizontal-center",
      "css/4.center/vertical-middle",
      "css/4.center/horizontal-vertical-center",
    ],
    "5.动画": [
      "css/5.animation/bezier-curve",
      "css/5.animation/transition",
      "css/5.animation/animation",
    ],
    "6.响应式设计": [
      "css/6.responsive-design/media-query",
    ],
    "7.附录": [
      "css/7.appendix/related-websites"
    ]
  },
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
      "react/2.advanced/hook",
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
      "react/5.state-management/action",
      "react/5.state-management/middleware",
      "react/5.state-management/reducer",
      "react/5.state-management/selector",
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
    "8.安全": [
      "react/8.security/security-guide"
    ],
    "附录": [
      "react/appendix/note",
      "react/appendix/references",
      "react/appendix/related-websites"
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
      "algorithm/1.array/inverse-pairs",
    ],
    "2.栈与队列": [
      "algorithm/3.stack-queue/min-stack",
    ],
    "4.链表": [
      "algorithm/4.linkedlist/merge-two-sorted-lists",
    ],
    "5.二叉树": [
      "algorithm/5.binary-tree/build-tree",
      "algorithm/5.binary-tree/mirror-tree",
      "algorithm/5.binary-tree/subtree",
      "algorithm/5.binary-tree/maximum-depth-of-binary-tree",
      "algorithm/5.binary-tree/balanced-binary-tree",
    ],
    "8.排序": [
      "algorithm/8.sort/merged-sort",
      "algorithm/8.sort/quick-sort",
    ],
    "9.查找": [
      {
        type: 'category',
        label: '二分查找',
        items: [
          "algorithm/9.search/number-same-as-index",
          "algorithm/9.search/number-in-sorted-array",
          "algorithm/9.search/missing-number",
        ],
      },
      {
        type: 'category',
        label: 'BST',
        items: [
          "algorithm/9.search/k-node-in-bst",
        ],
      },
      {
        type: 'category',
        label: '哈希表',
        items: [
          "algorithm/9.search/first-unique-character",
        ],
      },
    ],
    "10.回溯法": [
      "algorithm/10.back-tracking/permutation",
      "algorithm/10.back-tracking/combination",
      "algorithm/10.back-tracking/n-queens",
    ],
    "11.位运算": [
      "algorithm/11.bit-operation/single-number",
    ],
    "12.反转和旋转": [
      "algorithm/12.reverse/reverse-linked-list",
      "algorithm/12.reverse/rotate-string",
      "algorithm/12.reverse/reverse-integer",
    ],
    "13.数学": [
      "algorithm/13.math/powx-n",
    ]
  },
  "design-patterns": {
    '3.行为模式': [
      'design-patterns/3.behavior-pattern/observer',
      'design-patterns/3.behavior-pattern/pub-sub',
    ]
  },
  docs: {
    Docusaurus: ['doc1', 'doc2', 'doc3'],
    Features: ['mdx'],
  },
};
