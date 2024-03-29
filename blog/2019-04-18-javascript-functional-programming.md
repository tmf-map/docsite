---
title: 《JavaScript函数式编程指南》导读与总结
author: Kimi Gao
author_title: Software Engineer
author_url: https://github.com/kimi-gao
author_image_url: https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/5tLtEV.jpg
tags: [javascript, book]
---

<Img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/DErEJX.jpg" width="250" alt="JavaScript函数式编程指南" />

推荐指数：★★★☆☆  
难度指数：★★★☆☆  
出版时间：2018/6  
作者：[US] Luis Atencio

<!--truncate-->

## 1. 前言

本书原版是 2016 年出版的，中文版是 2018 年出版的，大家阅读的时候注意一下出版时间，由于 JS 的发展非常快，标准也在不断的变化当中。这本书在 JS 函数式编程当属还算属于“比较新的”书。内容 200 页左右，和“蝴蝶书”差不多一个厚度，个人比较喜欢这种精小的书，就像是小巧的纯函数一样，把一本本这样书组合起来，也会获得相当大的力量。

总体而言，本书的示意图画比较多，对于一些概念理解起来还是比较有帮助的。虽然本书主题是讲 JS 函数式编程，但是作者刚开始花了很大的篇幅介绍 JS 中函数式编程的基础，包括函数式编程和面向对象的优缺点比较、first-class、high-order function、闭包和作用域，lambda、链式调用、递归以及 Promise。这些内容前面就占了 73 页左右的篇幅，后面优化的部分还有涉及，总共 100 页左右都在讲 JS 基础相关的知识。这些概念在平时开发中都在使用，作者更强调了和函数式编程的关系。虽然讲得还是不错的，尤其是闭包这块，角度独特，作者也有自己的思考和理解，但篇幅过多将近一半的内容都在讲这些 JS 的基础，不免拉低了本书的专业性和深度，在我的定位中，更是一本 JS 函数式编程的入门介绍性的科普书籍，内容相对比较浅显。

需要特别指出的是，也是我认为阅读此书过程中最大的遗憾：作者对函数式编程中非常非常重要的概念（可以说是精华所在），Combinator, Container, Functor 和 Monad 讲得十分粗糙，对于一些关键的步骤，缺乏自己的思考和理解，更多的是生硬地传递概念，会很容易让读者不知所以然。不过作者也算是抛砖引玉的角色，给了你一把打开函数式编程的钥匙，后面就看你自己的努力了，也正如最近半个世纪软件行业奉为经典的一句话：“没有银弹（No Silver Bullet）”，我们也不能把这本书当成是银弹，以为看了这本书就会函数式编程。这本书更像是一个引路人的角色，更多地还需要我们自己去求索。

## 2. 导读与总结

这一部分，我将作者在本书的内容重新划分为预备知识、基础知识、进阶知识以及其他这四块，对每一部分的内容做了一个简单的导读和注意的点，有些地方也加上了拓展阅读，方便读者更进一步的学习。

### 2.1. 预备知识：JS 基础概念

作者在这一部分讲的内容，主要是 JS 中和函数式编程息息相关的概念，集中在`第2章 高阶JavaScript`、`第7章 函数式优化`和`第8章 管理异步事件以及数据`。

#### 2.1.1. OOP 的优缺点

首先关注两个词：`数据` 和 `行为`。

JS 具有面向对象和函数式编程的能力，要学会根据个人喜好和待解决问题的需求在二者之间寻求**平衡**。FP 和 OOP 不是二者选其一的过程，而是二者平衡的过程。

面向对象的应用程序大多是命令式的，因此在很大程度上依赖于使用基于对象的封装来保护其自身和继承的可变状态的完整性，再通过实例方法来暴露或修改这些状态。

**缺点**

> 对象的数据与其具体的行为以一种内聚的包裹的形式耦合在一起。

> OOP 通常是通过调用对象方法来更改对象内部的状态，它无法保证检索状态的输出一致，并可能破坏部分的期望该对象保持不变的功能。

而函数式编程即分离数据和行为，更加专注于行为的组合，使得数据和行为是松耦合的。

> 函数式代码使用的是可以横切或工作于多种数据类型之上的更加粗粒度的操作，而不是一些细粒度的实例方法。在这种范式中，函数成为抽象的主要形式。

作者强调函数在函数式编程的重要性，它是一种抽象的粗粒度，从另一个纬度横切，比如 `map`, `filter` 这些方法，它也是一种抽象的粗粒度，具体的数据如何操作（行为）的也是开发者自己去定义。

P24-图 2.1，可以结合该图形详细看看作者说得这块内容。

在这一部分，作者也特意提到来**不可变性**在函数式编程的重要性，对`Object.freeze`的方法也作了一些特别地阐述：**不能用于冻结嵌套对象属性，该方法是浅冻结**。见 P32-图 2.3。

```js
const a = Object.freeze({x: 1, y: {z: 2}});
a.x = 3; // 3, 但不会改变a里面的值
a.y = 3; // 3,  但不会改变a里面的值
a.y.z = 3; // 3, 此时a变成了{x: 1, y: {z: 3}}
```

**思考**

```txt
Q1: 那如何实现深冻结对象呢？
Q2: Object.seal 和 Object.freeze 有什么区别？
```

#### 2.1.2. 闭包、作用域、上下文堆栈

> 从本质上讲，闭包就是函数继承而来的作用域。

> 闭包是一种能够在函数声明过程中讲环境信息与所属函数绑定在一起的数据结构。它是基于函数声明的文本位置的，因此也被称为围绕函数定义的**静态作用域**或**词法作用域**

闭包和作用域密不可分。

P42-图 2.4 解释闭包的图画得非常棒，函数闭包包括以下内容：

> - 函数的所有参数
> - 外部作用域的所有变量（当然也包括所有全局变量）

> 函数内部的返回函数会在其声明时记住其作用域内的所有变量，并防止他们被回收。（全局作用域也是闭包的一部分）

闭包的应用：

- 模拟私有变量/模块化
- 回调函数
- 模块化作用域变量（forEach）

上下文堆栈

> 上下文堆栈负责管理函数执行以及关闭变量作用域

每一个上下文堆栈包括一下内容：

```js
executionContextData = {
  scopeChain,
  variableObject,
  this
};
```

理解闭包和上下文堆栈也是理解柯里化的基础，

#### 2.1.3. 递归和尾递归优化

递归本质上是一种循环操作。纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，这就是为什么尾递归对这些语言极其重要。我们需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。

更多参考 [2.4.3. 递归调用与优化(TCO)](#243-%E9%80%92%E5%BD%92%E8%B0%83%E7%94%A8%E4%B8%8E%E4%BC%98%E5%8C%96tco)

#### 2.1.4. Promise

> Promise 提供连接和组合“未来”函数的可能，抽象出时间依赖代码，并降低复杂性。P206

### 2.2. 半函数式编程：基础概念与方法库

#### 2.2.1. 何为函数式编程

> 函数式编程的目标是使用函数来**抽象作用在数据之上的控制流与操作**，从而在系统中**消除副作用**并**减少对状态的改变**。P5

> 函数式编程是指为创建不可变的程序，通过消除外部可见的副作用，来对纯函数的声明式的求值过程。P14

从作者在书中说的这几句话可以看出函数式编程核心几点：

- 声明式
- 抽象
- 流式
- 无副作用
- 不可变性
- 提纯

函数式编程是尽量减少对状态的改变，实际中状态的改变很难完全消除，所以提纯也是函数式编程的一个重要手段，分离纯和不纯的地方，从而将代码潜在的风险约束在可控范围内。同时也利于对代码的测试和 bug 的排查和修复。

#### 2.2.2. 一等函数

> 一等，指的是在语言层面将函数视为真实的对象。

强调 first-class 即强调函数可以作为一个值被“传来传去”，比如值赋值给变量、对象的属性、函数的参数、返回值，这也为高阶函数和柯里化作了基础铺垫。大家在理解这个简单概念的时候要注意函数和函数表达式的概念。

这一块作者比较“啰嗦”，还介绍了 `sort` 方法。

另外值得一提的是作者在本书其他地方对函数名的描述也颇具一番风味：

> 函数名代表的不是一个具体的值，而是一种（惰性计算的）可获取其值的描述。P55

#### 2.2.3. 高阶函数

前面一部分，我们说了函数是一等的，那么函数可以作为参数，也可以作为返回值。那么高阶函数其实就是把函数作为参数或返回值的函数，比如 `map` 函数。

这一块作者比较“啰嗦”，在简单的概念上讲解的篇幅有点过多。

#### 2.2.4. 引用透明与纯函数

引用透明是用来判断一个函数纯与不纯的关键。

> 纯度表明一个函数的参数和返回值之间映射的纯的关系。P12

> 如果一个函数对于相同的输入始终产生相同的结果，那么就说它是引用透明的。P12

那用更通俗的话说，引用透明就是相同输入必然相同输出。画一张图比较一下纯与不纯以及引用透明之间的关系：

#### 2.2.5. 控制流与链式调用

> 程序为实现业务目标所要进行的路径被称为控制流。P52

命令式编程通过大量的循环和分支来描述控制流，而函数式编程则通过链式调用高阶抽象的方式从计算逻辑中分离控制流。

链式调用其实在 jQuery 时代就被大范围使用，也算是典型链式调用风格的代表，比如类似下面代码这样：

```
optA().optB().optC().optD()
```

> FP 多使用以简单拓扑连接的独立黑盒操作组合而成的较小结构化控制流，从而提升程序的抽象层次。P52

> 这些连接在一起的操作只是一些能够将状态传递至下一个操作的高阶函数。P52

> 连接黑盒操作的函数式控制流程。信息在一个操作与下一个（独立的纯函数）操作之间独立地流动。

高阶抽象使得分支和迭代明显减少甚至消除。采用这种链式操作能够使程序简洁，流畅并富有表现力，能够从计算逻辑中很好地分离控制流，因此可以使得代码和数据更易推理。

我们经常会写出类似于下面这样嵌套的代码：

```js
concat(toLowerCase(substring('Functional Programming', 1, 10)), ' is fun');
```

这样的代码写起来没有链式调用流畅，而且它也更难阅读，因为需要一层层地剥离外部函数，才能知晓内部真正发生的事情。

在使用 Lodash 的时候，我们会使用`_(data)`的方式将数据进行链式操作:

```js
_(data).map;
```

思考

```txt
Q1: 如何用面向对象范式实现方法的链式调用。
Q2: pipe/compose 的内部实现原理是什么？
```

#### 2.2.6. Lambda 表达式

> lambda 表达式，在 JS 也被称为箭头函数，用相对简洁的语法形式来声明一个匿名函数，可以写成多行，单行是最普遍的形式。P54

#### 2.2.7. Immutable 与 Lens

不可变性在`2.1.1. OOP 的优缺点`中也有提及，想必概念大家都明白，Lens(镜头、聚焦)即函数式引用，它是 FP 中用于访问和不改变地操作状态数据类型属性的解决方案。那什么是 Lens？作者在这个概念的讲解上比较晦涩，绕来绕去，例子举的也不是很好，我们不妨先看一下 Ramda `lensProp` 方法的使用：

```js
// lensProp :: String → Lens s a

const xLens = R.lensProp('x');

R.set(xLens, 4, {x: 1, y: 2}); //=> {x: 4, y: 2}
R.over(xLens, R.negate, {x: 1, y: 2}); //=> {x: -1, y: 2}
```

那为什么不直接去写/变换 `{x: 1, y: 2}`中 `x`属性呢？其实就是在保护原数据的不可变性。

这里就涉及到与`Object.freeze`的区别，前文在 JS 基础部分也提到过该方法是一个浅冻结，同样的例子，用 lens 来操作，保证原始数据的不可变性：

```js
const a = {x: 1, y: {z: 2}};
const yxLens = R.lensPath(['y', 'x']);
R.set(yxLens, 4, a); // {x: 1, y: {z: 4}}, 但a依旧保持不变
```

有人应该会注意到，这类似 Immutable.js 中的 set 方法，其实他们核心思想都是一致的，保证原数据的不可变性，这也是原生 JS 的所缺失的一块东西，也造成很多地方的坑。

#### 2.2.8. 柯里化

柯里化和闭包息息相关，如果这本书函数式编程其他的地方没看懂，只理解来什么是闭包和柯里化，那也是非常有意义的收获。

#### 2.2.9. 部分应用

部分应用（partial）函数在有些书中翻译为“偏函数”，可以解释为，将一个函数和它一些的参数绑定，然后返回一个新的函数，这个新函数继续接收剩下未绑定的参数。

如果一个函数有 5 个参数，给出 3 个参数后，就会得到一个具有 2 个参数的函数。

部分应用函数和柯里化一样都是`由函数构建函数`的一种技术，它们都可以用来缩短函数的长度，柯里化函数其实本质上也是部分应用函数。

柯里化函数是逐渐返回消耗参数的函数，直到所有参数耗尽。而部分应用函数是一个“部分”执行，等待接收剩余的参数立即执行的函数。看下面代码：

```js
const add a => b => a + b // add 为柯里化函数

const add2 = div(2) // add2 为部分应用函数
add2(3) // 5
```

柯里化函数在 FUN 运行之前需要三次级联调用，而部分应用函数已经准备好被调用，只需要一次带两个参数的调用。在某些情况下有可能部分应用函数和柯里化函数都只期待一个参数，但部分应用函数并不一定每次只处理一个参数，而是应用并存储部分参数，并接收剩下的参数等待运行。

图片 p90

结合 bind 来说

mergeProps .bind 例子

#### 2.2.10. 组合、管道与无参化(point-free)

之前也提到过链式调用，在了解柯里化后，便可以更进一步地掌握管道的概念。

#### 2.2.11. 组合子与控制流

- I-Combinator
- K-Combinator
- T-Combinator
- OR-Combinator
- S-Combinator
- Fork/Join-Combinator

// 内容待完善...P99

### 2.3. 全函数式编程：Functor 与错误处理

#### 2.3.1. 函数签名

P76 页的定义比较清晰明了。类型签名在写纯函数时所起的作用非常大，大到英语都不能望其项背。这些签名轻轻诉说着函数最不可告人的秘密。

_TIPS:_

> - :: 翻译为“类型为”更好理解
> - 最后一个输入（不是输出）类型往往是前面的输入类型的输入类型（如果是一个函数的话）

另外：

```txt
map :: Functor f => (a -> b) -> f a -> f b
```

Functor f =>。这个标记告诉我们 f 必须是一个 Functor。

签名这块内容还可以参考：

- https://github.com/fantasyland/fantasy-land#type-signature-notation
- https://sanctuary.js.org/#types
- https://www.haskell.org/hoogle/

#### 2.3.2. Container

> 空引用是一个价值数十亿美元的错误。——Tony Hoare, InfoQ

> 软件中的许多问题都是由于数据不经意间变成了 `null` 或 `undefined`，出现了异常，失去网络连接等情况造成的。P103

作者的观念：**函数式程序不应抛出异常**。并给出以下几点理由：

- 难以与其他函数组合或连接(try-catch)。
- 违反引用透明性，因为抛出的异常会导致函数调用出现另一出口，所以不能确保单一的可预测的返回值。
- 会引起副作用，因为异常会在函数调用之外对堆栈引发不可预料的影响。
- 违反非局域性原则，因为用于恢复异常的代码与原始的函数调用渐行渐远，当发生错误时，函数离开局部栈与环境。
- 不能只关注函数的返回值，调用者需要负责声明 `catch` 块中的异常匹配类型来管理特定的异常。
- 当有多个异常条件时会出现嵌套的异常处理块(catch 里面还有 try-catch)

需要注意的是**函数式编程并不是不抛异常**，而是让异常从一个地方抛出，而不是随处可见。我们平时开发中经常会在函数的开头写一些啰嗦的“防守代码”，去判断数据类型或者判断一些特殊情况。不管使用 if 检查还是 try-catch，这些都是被动的解决方式。

在上面这些背景下，容器（container）诞生来，它常用来处理错误或异常情况，将可能出现的异常或者说有副作用的函数包裹起来，即本书作者所说的 `wrapper` 函数。

这块内容作者讲解的不是很到位，也与一般的 FP 概念存在一些“误差”，推荐大家看看这本书：

- [mostly-adequate-guide-chinese](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch8.html)
- [mostly-adequate-guide(英文版内容比较新，用的 ES6 语法)](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/ch08.html)

相对完整的结构图：

<Img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/k4Ydm1.png" />

> From: https://github.com/fantasyland/fantasy-land

另外也可以参考这个库：https://evilsoft.github.io/crocks/docs/functions/predicate-functions.html

_NOTE:_ 2.3.2-2.3.4 内容有待完善，以下为`<mostly-adequate-guide>`节选...

<Img width="220" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/LaQmRe.png" />

```js
class Container {
  constructor(x) {
    this.__value = x;
  }
  of(x) {
    return new Container(x);
  }
}
```

我们将使用 Container.of 作为构造器（constructor），这样就不用到处去写糟糕的 new 关键字了，非常省心。我们可以简单地将 of 函数看成是把值放到容器里的一种方式。

```js
Container.of(3);
//=> Container(3)

Container.of('hotdogs');
//=> Container("hotdogs")

Container.of(Container.of({name: 'yoda'}));
//=> Container(Container({name: "yoda" }))
```

这个容器必须能够装载任意类型的值，先澄清几点：

- Container 是个只有一个属性的对象。尽管容器可以有不止一个的属性，但大多数容器还是只有一个。我们很随意地把 Container 的这个属性命名为 \_\_value。
- \_\_value 不能是某个特定的类型，不然 Container 就对不起它这个名字了。
- 数据一旦存放到 Container，就会一直待在那儿。我们可以用 .\_\_value 获取到数据，但这样做有悖初衷。

#### 2.3.3. Functor

> functor 是实现了 `map` 方法并遵守一些特定规则的容器类型。

```js
// (a -> b) -> Container a -> Container b
map (f) {
  return Container.of(f(this.__value))
}
```

functor 就是一个签了合约的接口。我们本来可以简单地把它称为 **Mappable**，但这样就没有 fun（functor 中包含 fun 这个单词一双关语）了。

一旦容器里有了值，不管这个值是什么，我们就需要一种方法来让别的函数能够操作它。而容器 map 函数和数组里面的 map 函数使用方式也几乎一致，只不过是专门为容器操作值而服务。

```js
Container.of(2).map(two => two + 2);
//=> Container(4)

Container.of('flamethrowers').map(s => s.toUpperCase());
//=> Container("FLAMETHROWERS")

Container.of('bombs').map(concat(' away')).map(_.prop('length'));
//=> Container(10)
```

为什么要使用这样一种方法？因为我们能够在不离开 Container 的情况下操作容器里面的值。这是非常了不起的一件事情。Container 里的值传递给 map 函数之后，就可以任我们操作；操作结束后，为了防止意外再把它放回它所属的 Container。这样做的结果是，我们能连续地调用 map，运行任何我们想运行的函数。甚至还可以改变值的类型，就像上面最后一个例子中那样。

把值装进一个容器，而且只能使用 map 来处理它，这么做的理由到底是什么呢？如果我们换种方式来问，答案就很明显了：让容器自己去运用函数能给我们带来什么好处？答案是抽象，对于函数运用的抽象。我们请求容器用于 map 函数来运行函数。不夸张地讲，这是一种十分强大的理念。

#### 2.3.4. Monad

> 实现了 `map`, `ap`, `chain` 和 `of` 方法并遵守一些特定规则的容器类型。

从定义中可以看出 Monad 是一种更复杂的 functor, `chain` 很像 `map`， 除了用来铺平嵌套数据。在有些语言中，`chain` 也称为 `flatmap`（先 map 再 flatten ） 与 `bind`，`of` 也称为 `return`。

ap 的概念：瓶中之船。

### 2.4. 函数式编程优化

> 在某些情况下，函数式代码可能比其等效的命令式代码更慢或消耗的内存更多。P178

> 函数式编程不会加快单个函数的求值速度。相反，它的理念是避免重复的函数调用以及延迟调用代码，把求值延迟到必要的时候，这可能会使应用程序的整体加速。P160

纯函数的语言已经内置了这些优化，而 JS 需要自定义代码或函数库来做到这些优化。作者指出柯里化会增加 JS 的上下文堆栈，导致更多的内存占用。同时作者也指出来递归也是一个很大的影响因素，但我觉得作者在讲函数式编程的时候有点过多讲解 JS，而忽略了本书的主要目的，阅读本章节的时候关注柯里化函数的优化即可，当然想了解递归优化的也可以看看。

#### 2.4.1. 惰性求值(Lazy Evaluation)

> 惰性求值：尽可能地推迟求值，直到依赖的表达式被调用。P165

> 在编程语言理论中，惰性求值（英语：Lazy Evaluation），又译为惰性计算、懒惰求值，也称为传需求调用（call-by-need），是一个计算机编程中的一个概念，它的目的是要最小化计算机要做的工作。表达式不在它被绑定到变量之后就立即求值，而是在该值被取用的时候求值，也就是说，语句如 x:=expression; (把一个表达式的结果赋值给一个变量)明显的调用这个表达式被计算并把结果放置到 x 中，但是先不管实际在 x 中的是什么，直到通过后面的表达式中到 x 的引用而有了对它的值的需求的时候，而后面表达式自身的求值也可以被延迟，最终为了生成让外界看到的某个符号而计算这个快速增长的依赖树。——维基百科

```txt
惰性求值 -> 延迟执行 -> 避免重复计算
```

举一个简单例子，为了防止代码报错，我们会经常写如下代码:

```js
// ex1
const res = data && data.length > 0 && data.map(...)
// ex2
const backgroundImage = state.popperImageURL
  ? state.popperImageURL.replace(...)
  : null
```

上面的例子算是具有惰性计算的思维，再看下面一个简单取余的函数：

```js
const mod = (a, b) => (b === 1 ? 0 : a % b);

mod((1 + 3) * 2, 1); // 0
```

可以看到由于 b 是 1，所以我们并不会用到 a 的值，但是由于 JS 用的是**及早求值**方案，它会依然计算了表达式`(1 + 3) * 2`，这里的计算就是浪费的。惰性求值则能避免这一情况。

```js
const arr = _.range(100);

const a = _.chain(arr)
  .map(x => {
    console.log(1);
    return x + 1;
  })
  .take(10)
  .value();
//输出了100个1
//说好的惰性求值呢！

const arr = _.range(200);

const a = _.chain(arr)
  .map(x => {
    console.log(1);
    return x + 1;
  })
  .take(10)
  .value();
//输出了10个1
//这才对嘛
```

Lodash 在**数组超过 200 个**才会启动惰性求值。因为惰性求值需要记录依赖，就是 `x -> y` 的过程。记录步骤会造成额外的消耗。所以 Lodash 设定超过数组超过 200 才会启动惰性求值。

作者主要介绍了两个方法来实现惰性求值：`combinator` 和 `short-fusion`

`combinator` 作者给的例子，和命令式编程相比，我反而觉得命令式编程的代码更易懂可读。

`short-fusion`是 lodash 的概念，以下引自 lodash：http://lodash.think2011.net/_

> shortcut fusion 是一种通过合并链式 iteratee 调用从而大大降低迭代的次数以提高执行性能的方式。 部分链有资格 shortcut fusion，如果它至少有超过二百个元素的数组和任何只接受一个参数的 iterates。 触发的方式是任何一个 shortcut fusion 有了变化。

这部分内容作者说了几句比较有意思的话：

> 函数式编程的引用透明性带来的数学与代数的正确性。P168

> 只有纯函数才能以这种数学方式进行系列操作。P168

作者在这块讲得不是很好，缺少一些实际的例子，举的例子比较“教学化”，基本上惰性求值相关的文章都是这个例子。

更多关于惰性求值的知识，推荐这篇文章深入了解一下：[How to Speed Up Lo-Dash ×100? Introducing Lazy Evaluation.](http://filimanjaro.com/blog/2014/introducing-lazy-evaluation/)

#### 2.4.2. 记忆化(Memoization)

> 通过使用记忆化，遇到相同的输入会立即触发内部缓存命中直接返回结果。P170

```txt
记忆化 -> 内部函数级缓存 -> 避免重复计算
```

书中给出的记忆化的算法是去扩展 Function 对象，这里给出更通用一点的方法（注意单词是 memoize 不是 memorize）：

```js
const memoize = fn => {
  let cache = {};
  return (...args) => {
    let n = args[0]; // just taking one argument here
    if (n in cache) {
      console.log('Fetching from cache');
      return cache[n];
    }
    console.log('Calculating result');
    let result = fn(n);
    cache[n] = result;
    return result;
  };
};

// a simple pure function to get a value adding 10
const add = n => n + 10;
console.log('Simple call', add(3));

const memorizedAdd = memoize(add);
console.log(memorizedAdd(3)); // Calculating result
console.log(memorizedAdd(3)); // Fetching from cache
console.log(memorizedAdd(4)); // Calculating result
console.log(memorizedAdd(4)); // Fetching from cache
```

为了简化生成密匙的逻辑，简单的记忆化仅限于一元函数。对于需要记忆化多个参数的函数可以使用柯里化，来避免缓存层给函数增加额外的开销和复杂度。

**记忆化递归版 factorial**

```js
const factorial = memoize(n => (n === 1 ? 1 : n * factorial(n - 1)));

factorial(100); // 0.123ms
factorial(101); // 0.004ms
```

注意书上在 P174 给出的代码示例有误，谨慎参考。

更多阅读：

- [JavaScript Function Memoization](http://inlehmansterms.net/2015/03/01/javascript-memoization/)

#### 2.4.3. 递归调用与优化(TCO)

> 递归是将任务分解成更小版本的自己的机制。P174

优化：

- 记忆化 Memoization
- 尾部调用优化 TCO

递归通过分解把问题化为更简单的自相似问题，继而充分利用记忆化优化上下文堆栈的使用。

也可以利用编译器级别的优化：尾部调用优化(TCO)。

尾递归带来递归循环的性能接近于 for 循环，没有额外创建堆栈帧。

> 对于大多数的应用而言，牺牲效率以获得更高的可维护性是值得考虑的。应该让代码更容易阅读和调试，即使它不是最快的。P178

> “对于你写的 97%的代码，多上几毫秒并不会有什么区别，特别是相对代码的可维护性来说” - Knuth

TCO 将函数的上下文状态作为参数传递给下一个函数调用，使得递归调用不依赖当前栈，那么可以抛弃当前的栈，从而达到**扁平化**栈释放内存的目的。

以阶乘为例对比两个版本的递归差别：

**原始递归版 factorial**

```js
const factorial = n => (n === 1 ? 1 : n * factorial(n - 1)); // 最后一步不是只有递归
```

```js
factorial(4);
4 * factorial(3);
4 * 3 * factorial(2);
4 * 3 * 2 * factorial(1);
4 * 3 * 2 * 1;
4 * 3 * 2;
4 * 6;
return 24;
```

改成尾递归只需两步：

1. 将当前乘法结果当作参数传入递归函数（有单参数改为多参数）
2. 给结果参数传递一个默认值（类似于求和函数的默认值）

**尾递归递归版 factorial**

```js
const factorial = (n, result = 1) =>
  n === 1 ? result : factorial(n - 1, n * result); // 最后一步只有递归
```

```js
factorial(4);
factorial(3, 4);
factorial(2, 12);
factorial(1, 24);
return 24;
```

### 2.5. 其他

#### 2.5.1. 函数式代码的测试

> 有好篱笆，才有好邻居。——Robert Frost，《Mending Wall》P135

> 基于纯函数的模块化的代码很容易测试，还可以使用严格的类型测试方法，如基于属性的测试。P158

这部分内容我没有认真阅读，作者想让你对 FP 各个方面都有所了解，测试也不例外，只是觉得作者哪头都没有兼顾好，有兴趣的读者可以看看，这里给出一个内容概要清单：

- 函数式编程会如何改变代码测试
- 认识到测试命令式代码的挑战
- 使用 QUnit 测试函数式代码
- JSCheck 探索属性测试
- 使用 Blanket 测量程序的复杂性

#### 2.5.2. 异步与响应式编程

> 函数式响应式编程提升了抽象的层次，这样就可以将事件视为独立的逻辑单元。这可以让开发者更专注于任务，而不是处理复杂的实现细节。P206

> 程序员之所以认为函数式编程比其他编程更高效，是因为函数式程序的代码量往往会少一个数量级。—— John Hughes, 《Why Functional Programming Matters》P181

> 位置透明度（location transparency）：Promise 会隐藏处理异步调用的细节，这样像是每个函数都一个接一个地执行，无须关心内部的计算是正在从外部服务器请求数据还是其他耗时操作。可以轻松地将 getJson(url)换为 getJson(db) P193

位置透明性是指用户不必知道所操作的数据放在何处，可以用 Promise 本地 mock api 返回数据。

> Observable 是可以订阅的数据对象。应用程序可以订阅如读取文件、web 服务调用、查询数据库、推送系统通知、处理用户输入、遍历元素集合或甚至解析简单字符串而发出的异步事件。P202

> 流是随时间发生的有序事件的序列。要提取值，必须先订阅它。

作者在异步与响应式编程编程这块也讲解来很多，但我觉得是因小失大，Promise 包括 Rxjs 和 FP 有一定的关联，但这些内容我觉得不是大家想买这本书获取的知识，这些可以放在 ES6 或者响应式编程中去介绍。

可以不用看这块内容，更多 RXjs 相关内容：

- https://rxjs-dev.firebaseapp.com/guide/overview
- https://cn.rx.js.org/
- https://github.com/RxJS-CN/learn-rxjs-operators

#### 2.5.3. 函数式库

- [lodash](https://lodash.com/): 广为人知的一个函数库，为平时开发的数据操作提供了比较便捷的方法，也能让 map,filter 这些操作数组的方法有更好的兼容度，不会因为 null 而报错。也提供了`lodash/fp`这种借鉴部分函数式编程的库，也进行了函数的柯里化，可以将 lodash 当成是入门函数式编程的入门方法库。

- [ramda](https://ramdajs.com/): 比 lodash 更加偏向 FP，数据一律放在最后一个参数，函数都被柯里化过，准确一点说是半柯里化，可以多参数传参。提供了一些 combinator 和 logic function，但是缺少对 Functor, Monad 等这些 FP 编程必备概念的实现。

- [sanctuary](https://sanctuary.js.org/): 名字很有意思：Refuge from unsafe JavaScript。维护者也是以前写[ramda-fantasy](https://github.com/ramda/ramda-fantasy)。它是在 ramda + Haskell 的基础上衍生出来的，函数都被严格的柯里化，对 Maybe, Monad, Either 都有实现，还提供了强类型校验，写起来比较严格和别扭，没有 ramda 和 FP 的基础很难入门。

- [crocks](https://evilsoft.github.io/crocks/docs/getting-started.html): 更加函数式风格的库，基本上是对 FP 概念的全套实现，官方文档写得很友好，比较专业，也比较容易上手，lodash 和 ramda 遗留的影子不是很多。比较推崇这个库，最近也在积极维护。

- [Haskell](https://www.haskell.org/): 纯函数式编程的语言，官方的入门教程很有意思，有兴趣可以学习学习。

## 3. 后记

本书只是一个对函数式编程的抛砖引玉，也对 JS 的基础做了一遍夯实，但在函数式编程的核心地方缺乏深度，讲解得不够清晰明了，总体而言是不本不错的入门了解书籍。至于如何引玉，就看读者自己背后的努力了。

## 4. 参考资料

1. [惰性求值 与 Lodash，作者：luicfer](https://cnodejs.org/topic/5667c7d45af0e6ab3bf1a19d)
2. [How to Speed Up Lo-Dash ×100? Introducing Lazy Evaluation.](http://filimanjaro.com/blog/2014/introducing-lazy-evaluation/)
3. [JavaScript Function Memoization, by: Jonathan Lehman](http://inlehmansterms.net/2015/03/01/javascript-memoization/)
4. [How to use Memoize to cache JavaScript function results and speed up your code, by: Divyanshu Maithani](https://medium.freecodecamp.org/understanding-memoize-in-javascript-51d07d19430e)
