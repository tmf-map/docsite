---
id: disjoint-set
title: 并查集
keywords:
  - disjoint set
  - union find
  - 并查集
---

## 定义 (Definition)

在计算机科学中，并查集（英文：Disjoint-set data structure，直译为不交集数据结构）是一种数据结构，用于处理一些不交集（Disjoint sets，一系列没有重复元素的集合）的合并及查询问题。并查集支持如下操作：

- 查询：查询某个元素属于哪个集合，通常是返回集合内的一个“代表元素”。这个操作是为了判断两个元素是否在同一个集合之中。
- 合并：将两个集合合并为一个。
- 添加：添加一个新集合，其中有一个新元素。添加操作不如查询和合并操作重要，常常被忽略。

由于支持查询和合并这两种操作，并查集在英文中也被称为联合-查找数据结构（Union-find data structure）或者合并-查找集合（Merge-find set）。

“并查集”可以用来指代任何支持上述操作的数据结构，但是一般来说，“并查集”特指其中最常见的一种实现：不交集森林（Disjoint-set forest）。经过优化的不交集森林有线性的空间复杂度（O(n), n 为元素数目），是效率最高的常见数据结构之一。

并查集是用于计算最小生成树的克鲁斯克尔算法中的关键。由于最小生成树在网络路由等场景下十分重要，并查集也得到了广泛的引用。此外，并查集在符号计算，寄存器分配等方面也有应用。

## 举个例子

话说江湖上有各式各样的大侠，他们没有什么正当职业，整天背着剑在外面走来走去，碰到和自己不是一路人的，就免不了要打一架，但大侠们有一个优点就是讲义气，绝对不打自己的朋友。而且他们信奉“朋友的朋友就是我的朋友”，只要是能通过朋友关系串联起来的，不管拐了多少个弯，都认为是自己人。这样一来，江湖上就形成了一个一个的群落，通过两两之间的朋友关系串联起来。而不在同一个群落的人，无论如何都无法通过朋友关系连起来，于是就可以放心往死了打。

但是两个原本互不相识的人，如何判断是否属于一个朋友圈呢？每个人只要记住自己的上级是谁就行了。遇到判断敌友的时候，只要一层层向上问“你的掌门是谁”，直到最高层，就可以在短时间内确定自己的掌门是谁了，掌门相同的不要打就是了。由于我们关心的只是两个人之间是否连通，至于他们是如何连通的，以及每个圈子内部的结构是怎样的，**甚至掌门是谁，并不重要，只要不搞错敌友关系就好了**。同一个门派的所有人构成一个[联通分量](https://baike.baidu.com/item/%E8%BF%9E%E9%80%9A%E5%88%86%E9%87%8F/290350)。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/jiang-hu.png' alt='tree-traversal' width="650" legend="图 1" />

### 初始化

并查集 class 结构:

```js
class UnionFind {
    private parents: [];
    private count: number;

    constructor(n) {
        // 初始化
        this.parents = Array(n).fill(null).map((_, i) => i);
        this.count = n;
    }
    public findParent(x): number;
    public union(x, y): void;
}
```

最开始，大家都不知道自己的上级是谁，所以都认为自己是自己的掌门，上级都指向自己。在 union 联合的过程中，把相同门派的连起来，这个时候谁是掌门并不重要，我们只需要把相同门派的人联系在一起即可。

### 查 - find 方法实现

parents 数组记录了每个大侠的上级是谁，大侠们从 1 或者 0 开始编号（依据题意而定），parents[15] = 3 就表示 15 号大侠的上级是 3 号大侠。如果一个人的上级就是他自己，那说明他就是掌门人了，查找到此为止，比如欧阳锋，他的上级就是他自己。每个人都只认自己的上级。比如宋青书同学只知道自己的上级是宋远桥。张三丰是谁？不认识！要想知道自己的掌门是谁，只能一级级查上去。 find 这个函数就是找掌门用的。

```js
// 查找我（x）的掌门
find(x) {
    // 只有掌门的上级是指向自己的，所以只要上级不是自己，就一直往上找，直到找到最上层，也就是掌门
    while (x != parents[x]) {
      x = parents[x];
    }
    return x;
}
```

### 并 - union 方法实现

union 就是在两个节点之间连一条线，这样一来，原先它们所在的两个板块的所有点就都可以互通了。这在图上很好办，画条线就行了。但我们现在是用并查集来描述武林中的状况的，只有一个 parents[] 数组，该如何实现呢？ 还是举江湖的例子，假设现在武林中的形势如图所示。虚竹小和尚与周芷若的终极 boss 分别是玄慈方丈和灭绝师太，那明显就是两个阵营了。现在我不希望他们互相打架，就对他俩说：“你们两位拉拉勾，做好朋友吧。”他们看在我的面子上，同意了。这一同意可非同小可，整个少林和峨眉派的人就不能打架了。这么重大的变化，可如何实现呀，要改动多少地方？其实非常简单，我对玄慈方丈说：“大师，麻烦你把你的上级改为灭绝师太吧。这样一来，两派原先的所有人员的终极 boss 都是师太，就不用打架了，反正我们关心的只是连通性，门派内部的结构不要紧的。”玄慈一听肯定火大了：“凭什么是我变成她手下呀，怎么不反过来？我抗议！”抗议无效，暂时就这么安排。反正谁加入谁效果是一样的，我就随手指定了一个。让灭绝师太上级改为玄慈也是一样的效果，大家终归变成同一个阵营，在并查集中我们只关心连通性，保证大家不打架就好了。

```js
// 我想让虚竹和周芷若做朋友
union(x, y) {
    // 虚竹的老大是玄慈
    let px = this.findParent(x);
    // 周芷若的老大是灭绝
    let py = this.findParent(y);
    // 只要他俩老大不是一个人，就委屈其中一个老大做另一个老大的下级，方丈只好委委屈屈地当了师太的手下啦
    // 如果他俩老大是同一个人，那还处理啥，不就是我们要的结果啦
    if (px !== py) {
        this.parents[py] = px;
        this.count--;
    }
}
```

### 压缩路径

建立门派的过程是用 union 函数两个人两个人地连接起来的，谁当谁的手下完全随机。最后的树状结构会变成什么样，完全无法预计，一字长蛇阵也有可能。这样查找的效率就会比较低下。最理想的情况就是所有人的直接上级都是掌门，一共就两级结构，只要找一次就找到掌门了。哪怕不能完全做到，也最好尽量接近。这样就产生了路径压缩算法。

设想这样一个场景：两个互不相识的大侠碰面了，想知道能不能打。于是赶紧打电话问自己的上级：“你是不是掌门？”，上级说：“我不是呀，我的上级是谁谁谁，你问问他看看。” 一路问下去，原来两人的最终 boss 都是张三丰。“哎呀呀，原来是记己人，西礼西礼，在下张无忌”，“幸会幸会，在下宋青书”，两人高高兴兴地手拉手喝酒去了。“等等等等，两位同学请留步，还有事情没完成呢！”我叫住他俩。 “哦，对了，还要做路径压缩。”两人醒悟。宋青书打电话给他的上级宋远桥：“师傅啊，我查过了，其习我们的掌门是张三丰。不如偶们一起及接拜在张三丰手下吧，省得级别太低，以后查找掌门麻环。”，“唔，有道理。”。宋青书接着打电话给刚才拜访过的张三丰……张无忌也做了同样的事情。这样，查询中所有涉及到的人物都聚集在张三丰的直接领导下。每次查询都做了优化处理，所以整个门派树的层数都会维持在比较低的水平上。路径压缩的代码，看得懂很好，看不懂也没关系，直接抄上用就行了。总之它所实现的功能就是这么个意思。如下图就是一个路径压缩示意图：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/lu-jing-ya-suo-shi-yi.png' alt='tree-traversal' width="650" legend="图 2 路径压缩示意" />

路径压缩又有两种方式：隔代压缩和彻底压缩。

- 隔代压缩：性能比较高，虽然压缩不完全，不过多次执行「隔代压缩」也能达到比较好的效果，只需要在原 find 方法中加上一句 parents[x] = parents[parent[x]]; 这句代码的意思是把路径上的每个节点的父节点指向其祖父节点。
- 彻底压缩：需要借助系统栈，使用递归的写法。或者使用迭代写法，先找到当前结点的根结点，然后把沿途上所有的节点都指向根节点，需要遍历两次。彻底压缩需要消耗更多的性能，但是压缩的更彻底，可以提高查询效率。

两种压缩方法，任选一种即可。

1. 隔代路径压缩

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ge-dai-ya-suo.png' alt='tree-traversal' width="650" legend="图 3 隔代压缩" />

```js
find(x) {
    while (x != parents[x]) {
        // 加上这句即可
        parents[x] = parents[parents[x]];
        x = parents[x];
    }
    return x;
}
```

2. 彻底路径压缩

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/che-di-ya-suo.png' alt='tree-traversal' width="650" legend="图 4 彻底压缩" />

```js
find(x) {
    while (x != parents[x]) {
        // 改为递归即可
        parents[x] = find(parents[x]);
    }
    return parents[x];
}
```

总而言之，这两种压缩的方法，如果只为了面试，可以不用记甚至不用弄懂上图的原理，背过模板就好。

### 按秩合并

这个“秩”一般是指树的高度，也有地方解释为树节点个数，我们这里取前者。具体实现就是新增一个 ranks 数组记录以各个元素为根节点的树的高度，在做合并操作时，把高度较小的树的根节点连接到高度较大的树的根节点上。如下图，在未优化前，合并后的树高度增加为 4，而按秩合并后的树高仍然为 3。这里要注意的是，如果两棵树高度相同，那么两者均可作为根节点，则合并后的新树高度需要加一。

按秩合并就可以理解成上面讲的玄慈方丈和灭绝师太的合并，以玄慈和灭绝下面带的人的层级为参考，谁下面层级多，谁当老大。这样就能避免这种情况：层级多的连接到别的节点下面而增加了树整体的深度。如图 1 灭绝下面只有一层，而玄慈下面有 2 层，所以按秩合并的情况下，我们应该让灭绝做小弟，玄慈当老大，这样合并之后整棵树还是玄慈的层级 3，如果玄慈挂到灭绝下面，整棵树的深度就变成了 4.

不按秩合并 vs 按秩合并:

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/merge-with-no-order.png' alt='tree-traversal' width="650" legend="图 5 不按秩合并" />

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/merge-with-order.png' alt='tree-traversal' width="650" legend="图 6 按秩合并" />

按秩合并代码模板:

```js
union(int x, int y) {
    let px = this.findParent(x);
    let py = this.findParent(y);
    if (px !== py) {
        // 比较树高，高度小的树合并到另一颗树上，相等的话两者均可作为根节点，并把高度加一
        if (ranks[px] > ranks[py]) {
            parent[py] = px;
        } else if (ranks[px] < ranks[py]) {
            parent[px] = py;
        } else {
            parent[py] = px;
            ranks[px]++;
        }

        this.count--;
    }
}
```

### 完整版代码

1. 路径压缩版本

```js
class UnionFind {
    private parents: [];
    private count: number = 0;

    constructor(n) {
        this.parents = Array(n).fill(null).map((_, i) => i);
        this.count = n;
    }
    findParent(x) {
        if (x !== this.parents[x]) {
            this.parents[x] = this.findParent(this.parents[x]);
        }
        return this.parents[x];
    }
    union(x, y) {
        let px = this.findParent(x);
        let py = this.findParent(y);
        if (px !== py) {
            this.parents[py] = px;
            this.count--;
        }
    }

    get count() {
        return this.count;
    }
}
```

2. 路径压缩 + 按秩合并版

```js
class UnionFind {
    private parents: [];
    private ranks: [];
    private count: number = 0;

    constructor(n) {
        this.parents = Array(n).fill(null).map((_, i) => i);
        this.ranks = Array(n).fill(1);
        this.count = n;
    }

    findParent(x) {
        if (x !== this.parents[x]) {
            this.parents[x] = this.findParent(this.parents[x]);
        }
        return this.parents[x];
    }
    union(x, y) {
        let px = this.findParent(x);
        let py = this.findParent(y);
        if (px !== py) {
            // 比较树高，高度小的树合并到另一颗树上，相等的话两者均可作为根节点，并把高度加一
            if (ranks[px] > ranks[py]) {
                parent[py] = px;
            } else if (ranks[px] < ranks[py]) {
                parent[px] = py;
            } else {
                parent[py] = px;
                ranks[px]++;
            }

            this.count--;
        }
    }

    get count() {
        return this.count;
    }
}
```

## 举个题目试试

### 题目

[947. 移除最多的同行或同列石头](https://leetcode-cn.com/problems/most-stones-removed-with-same-row-or-column)

n 块石头放置在二维平面中的一些整数坐标点上。每个坐标点上最多只能有一块石头。如果一块石头的 同行或者同列 上有其他石头存在，那么就可以移除这块石头。给你一个长度为 n 的数组 stones ，其中 stones[i] = [xi, yi] 表示第 i 块石头的位置，返回 可以移除的石子 的最大数量。

示例 1:

```text
输入：stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
输出：5
解释：一种移除 5 块石头的方法如下所示：
1. 移除石头 [2,2] ，因为它和 [2,1] 同行。
2. 移除石头 [2,1] ，因为它和 [0,1] 同列。
3. 移除石头 [1,2] ，因为它和 [1,0] 同行。
4. 移除石头 [1,0] ，因为它和 [0,0] 同列。
5. 移除石头 [0,1] ，因为它和 [0,0] 同行。
石头 [0,0] 不能移除，因为它没有与另一块石头同行/列。
```

示例  2:

```text
输入：stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
输出：3
解释：一种移除 3 块石头的方法如下所示：
1. 移除石头 [2,2] ，因为它和 [2,0] 同行。
2. 移除石头 [2,0] ，因为它和 [0,0] 同列。
3. 移除石头 [0,2] ，因为它和 [0,0] 同行。
石头 [0,0] 和 [1,1] 不能移除，因为它们没有与另一块石头同行/列。
```

示例  3:

```text
输入：stones = [[0,0]]
输出：0
解释：[0,0] 是平面上唯一一块石头，所以不可以移除它。
```

提示： 1 <= stones.length <= 1000 0 <= xi, yi <= 104 不会有两块石头放在同一个坐标点上

### 思路

按照题目规则把同行同列的节点相连(进行合并操作 - union)，最后统计联通分量的数量，题目问可以删除多少个，即总的节点个数减去联通分量个数，比如有 10 个节点，连接完成后连通分量 count 有 3 个，可以看做这 3 个联通分量的“掌门”是删不掉的了，他们手下的人都可以删除。接下来开始套模板：

1. 初始化：假设有 n 个节点。每个节点的 parent 都指向自己，联通分量个数为 n。
2. 实现 find 方法，方便寻找每个节点的父节点，同时可以进行路径压缩优化。
3. 实现 union 方法，在 union 的过程中，每 union 两个节点，连通分量数目减 1。将两个连通分量合并为一个，自然总的连通分量个数减 1，这也很好理解。
4. 在题目逻辑指引的规则中，对并查集进行合并。
5. 输出总的节点个数减去联通分量个数即可。

### 代码实现

```js
const removeStones = function (stones) {
  let n = stones.length;
  let uf = new UnionFind(n);
  for (let i = 1; i < n; i++) {
    for (let j = i - 1; j >= 0; j--) {
      // 如果同行或者同列就进行节点合并
      if (stones[i][0] === stones[j][0] || stones[i][1] === stones[j][1]) {
        uf.union(i, j);
      }
    }
  }
  return n - uf.count;
};
class UnionFind {
  constructor(n) {
    this.parents = Array(n)
      .fill(null)
      .map((_, i) => i);
    this.count = n;
  }
  findParent(x) {
    if (x !== this.parents[x]) {
      this.parents[x] = this.findParent(this.parents[x]);
    }
    return this.parents[x];
  }
  union(x, y) {
    let px = this.findParent(x);
    let py = this.findParent(y);
    if (px !== py) {
      this.parents[py] = px;
      this.count--;
    }
  }
}
```

这里我们仅进行了路径压缩的优化，没有使用所有优化手段，比如按秩合并和使用哈希表优化 parents 数组，主要是考虑上述方法可以更清晰的表达解题思路的结构，更详尽的答案可以参考 [Leetcode 官方答案](https://leetcode-cn.com/problems/most-stones-removed-with-same-row-or-column/solution/947-yi-chu-zui-duo-de-tong-xing-huo-tong-ezha/)。

### 复杂度

- 时间复杂度：O(nlog(A))，其中 n 为石子的数量，A 是数组 stones 里横纵坐标不同值的总数；
- 空间复杂度：O(n)。

## 参考资料

1. [并查集, wikipedia](https://zh.wikipedia.org/wiki/%E5%B9%B6%E6%9F%A5%E9%9B%86)
2. [并查集详解 ——图文解说,简单易懂](https://blog.csdn.net/liujian20150808/article/details/50848646)
