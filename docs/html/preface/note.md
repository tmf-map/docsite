---
title: 说明
sidebar_label: 说明
---

## 注解说明

import Hint from '../../../src/components/Hint';

<Hint type="tip">提示，补充说明</Hint>

<Hint type="warn">注意，容易忽视</Hint>

<Hint type="good">推荐，最佳实践</Hint>

<Hint type="bad">避免，容易出错</Hint>

## 时序图

import SeqChart from '../../../src/components/SeqChart';

- See more: https://mscgen.js.org/embed.html
- Online: https://mscgen.js.org/index.html

### MscGen - turns text into sequence charts

http://www.mcternan.me.uk/mscgen/

<SeqChart>
{`
  wordwraparcs="true";
  eu [label="end-user"],
  rp [label="relying party"],
  op [label="OpenID provider"];
  eu =>> rp [label="log me in"];
  rp =>> op [label="authentication request"];
  op =>> eu [label="authentication and authorization request"];
  eu >> op [label="authenticate and authorize"];
  op >> rp [label="authentication response"];
  rp =>> op [label="UserInfo request"];
  op >> rp [label="UserInfo response"];
  rp >> eu [label="Hi. You're logged in with {UserInfo.name}"];
`}
</SeqChart>

### Xù - an MscGen super set

https://github.com/sverweij/mscgen_js/blob/master/wikum/xu.md

<SeqChart inputType="xu">
{`
  watermark="时序图", wordwraparcs="true";
  a,b,d,e;
  a => d;
  b loop e [label="for each element with class='mscgen_js'"]{
      b =>> d [label="get textContent of the element"];
      d >> b  [label="textContent"];
      b =>> e [label="parse(textContent)"];
      b alt e [label="happy day", textbgcolor="#f7fff7"] {
          e >> b [label="abstract syntax tree"];
          b -> d [label="clear inner HTML of the element"];
          b -> d [label="render (abstract syntax tree)"];
          --- [label="error", linecolor="red"];
          e >> b [label="error object", linecolor="red"];
          b -> d [label="add error message to innerHTML of the element",
                  linecolor="red"];
      };
  };
  ...;
`}
</SeqChart>
