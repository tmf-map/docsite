---
id: IndexedDB
title: indexedDB
sidebar_label: indexedDB
---

## indexedDB

IndexedDB(索引数据库) 是一个为了能够在浏览器端存储大量数据，可以离线使用和使用索引进行高性能检索。其实它就是一个基于**事务操作**的 key-value 型数前端 NoSQL 数据库，其 API 是异步的。基本操作就是，打开数据库，增删改查。

应用：大的数据在本地临时存储，比如谷歌文档可能是为了离线存储，待联网的时候自动把保存本地的更新到服务器。联合使用 IndexedDB 储存离线数据和 Service Workers 储存离线资源，制作离线 PWA，如https://h5.ele.me/。

IndexedDB 具有以下特点:

（1）键值对储存。 IndexedDB 内部采用对象仓库（object store）存放数据。所有类型的数据都可以直接存入，包括 JavaScript 对象。对象仓库中，数据以"键值对"的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复，否则会抛出一个错误。

（2）异步。 IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作，这与 LocalStorage 形成对比，后者的操作是同步的。异步设计是为了防止大量数据的读写，拖慢网页的表现。

（3）支持事务。 IndexedDB 支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。

（4）同源限制 IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。

（5）储存空间大 IndexedDB 的储存空间比 LocalStorage 大得多，一般来说不少于 250MB，甚至没有上限。

（6）支持二进制储存。 IndexedDB 不仅可以储存字符串，还可以储存二进制数据（ArrayBuffer 对象和 Blob 对象）。

**基本原理：**

要异步访问数据库，要调用 window 对象 indexedDB 属性的 open() 方法。该方法返回一个 IDBRequest 对象 (IDBOpenDBRequest)；异步操作通过在 IDBRequest 对象上触发事件来和调用程序进行通信。

## 创建一个数据库

```js
const request = indexedDB.open('myDatabase', 1);
request.addEventListener('success', (e) => {
  console.log('连接数据库成功');
});
request.addEventListener('error', (e) => {
  console.log('连接数据库失败');
});
```

在上面代码中我们使用 indexedDB.open() 创建一个 indexedDB 数据库.open()方法接受可以接受两个参数：

- 数据库名
- 数据库的版本号

同时返回一个 IDBOpenDBRequest 对象用于操作数据库.其中对于 open()的第一个参数数据库名,open()会先去查找本地是否已有这个数据库,如果有则直接将这个数据库返回,如果没有,则先创建这个数据库,再返回.对于第二个参数版本号,则是一个可选参数,如果不传,默认为 1.但如果传入就必须是一个整数.

在通过对 indexedDB.open()方法拿到一个数据库对象 IDBOpenDBRequest 我们可以通过监听这个对象的 success 事件和 error 事件来执行相应的操作.

## 创建一个表：对象仓库

有了一个数据库之后,我们获取就想要去存储数据了,但是单只有数据库还不够,我们还需要有对象仓库(object store).对象仓库(object store)是 indexedDB 数据库的基础,其类似于 MySQL 中表的概念.

要创建一个对象仓库必须在 upgradeneeded 事件中,而 upgradeneeded 事件只会在版本号更新的时候触发.这是因为 indexedDB API 中**不允许数据仓库在同一版本中发生变化**：

```js
const request = indexedDB.open('myDatabase', 2);
request.addEventListener('upgradeneeded', (e) => {
  const db = e.target.result;
  const store = db.createObjectStore('Users', {
    keyPath: 'userId',
    autoIncrement: false
  });
  console.log('创建对象仓库成功');
});
```

在上述代码中我们监听 upgradeneeded 事件,并在这个事件触发时使用 createObjectStore()方法创建了一个对象仓库.createObjectStore()方法接受两个参数：

- 对象仓库的名字,在同一数据库中,仓库名不能重复
- 可选参数.用于指定数据的主键,以及是否自增主键

## 创建事务

简单来说事务就是用来保证数据库操作要么全部成功，要么全部失败的一个限制。

比如,在修改多条数据时,前面几条已经成功了.,在中间的某一条是失败了.那么在这时,如果是基于事务的数据库操作,那么这时数据库就应该重置前面数据的修改,放弃后面的数据修改.直接返回错误,一条数据也不修改。

```js
const request = indexedDB.open('myDatabase', 3);
request.addEventListener('success', (e) => {
  const db = e.target.result;
  const tx = db.transaction('Users', 'readwrite');
});
```

上述代码中我们使用 transaction()来创建一个事务，它接受两个参数：

- 你要操作的对象仓库名称。
- 你创建的事务模式：传入 readonly 时只能对对象仓库进行读操作，无法写操作。可以传入 readwrite 进行读写操作。

## 增删改查

好了现在有了数据库,对象仓库,事务之后我们终于可以存储数据了：

- add() : 增加数据。接收一个参数，为需要保存到对象仓库中的对象。
- put() : 增加或修改数据。接收一个参数，为需要保存到对象仓库中的对象。
- get() : 获取数据。接收一个参数，为需要获取数据的主键值。
- delete() : 删除数据。接收一个参数，为需要获取数据的主键值。

add 和 put 的作用类似，区别在于 put 保存数据时，如果该数据的主键在数据库中已经有相同主键的时候，则会修改数据库中对应主键的对象，而使用 add 保存数据，如果该主键已经存在，则保存失败。

```js
const request = indexedDB.open('myDatabase', 3);
request.addEventListener('success', (e) => {
  const db = e.target.result;
  const tx = db.transaction('Users', 'readwrite');
  const store = tx.objectStore('Users');
  const reqAdd = store.add({
    userId: 1,
    userName: '李白',
    age: 24
  });
  const reqGet = store.get(1);
  const reqDelete = store.delete(1);
  reqAdd.addEventListener('success', (e) => {
    console.log('操作成功'); // delete 同理
  });
  reqGet.addEventListener('success', (e) => {
    console.log(this.result.userName);
  });
});
```

10.2.5 游标在上面当中我们使用 get()方法传入一个主键来获取数据，但是这样只能够获取到一条数据。如果我们想要获取多条数据了怎么办？**我们可以使用游标，来获取一个区间内的数据。**

要使用游标，我们需要使用对象仓库上的 openCursor() 方法创建并打开 .openCursor() 方法接受两个参数：

```js
openCursor(
  range?: IDBKeyRange | number | string | Date | IDBArrayKey,
  direction?: IDBCursorDirection
): IDBRequest;
```

第一个是范围，范围可以是一个 IDBKeyRange 对象，用以下方式创建：

```js
var boundRange = IDBKeyRange.bound(1, 10, false, false);
var onlyRange = IDBKeyRange.only(1);
var lowerRange = IDBKeyRange.lowerBound(1, false);
var upperRange = IDBKeyRange.upperBound(10, false);
```

第二个参数是方向，主要有一下几种：

- next : 游标中的数据按主键值升序排列，主键值相等的数据都被读取
- nextunique : 游标中的数据按主键值升序排列，主键值相等只读取第一条数据
- prev : 游标中的数据按主键值降序排列，主键值相等的数据都被读取
- prevunique : 游标中的数据按主键值降序排列，主键值相等只读取第一条数据

下面让我们来看一个完整的例子：

```js
const request = indexedDB.open('myDatabase', 4);
request.addEventListener('success', (e) => {
  const db = e.target.result;
  const tx = db.transaction('Users', 'readwrite');
  const store = tx.objectStore('Users');
  const range = IDBKeyRange.bound(1, 10);
  const req = store.openCursor(range, 'next');
  req.addEventListener('success', (e) => {
    const cursor = this.result;
    if (cursor) {
      console.log(cursor.value.userName);
      cursor.continue();
    } else {
      console.log('检索结束');
    }
  });
});
```

在上面的代码中如果检索到符合条件的数据时,我们可以:

- 使用 cursor.value 拿到数据.
- 使用 cursor.updata()更新数据.
- 使用 cursor.delete()删除数据.
- 使用 cursor.continue()读取下一条数据.

## 索引

在上面代码中我们获取数据都是用的主键。但是在很多情况下我们并不知道我们需要数据的主键是什么。我们知道一个大概的条件，比如说年龄大于 20 岁的用户。这个时候我们就需要用到索引，以便有条件的查找。

**创建索引**

我们使用对象仓库的 createIndex()方法来创建一个索引.

createIndex( name: string, keyPath: string | string[], optionalParameters?: IDBIndexParameters) : IDBIndex;

createIndex()方法接收三个参数:

- name：索引名,不能重复.
- keyPath：你要在存储对象上的那个属性上建立索引,可以是一个单个的 key 值,也可以是一个包含 key 值集合的数组.
- optionalParameters：一个可选的对象参数{unique, multiEntry}
  - unique: 用来指定索引值是否可以重复,为 true 代表不能相同,为 false 时代表可以相同
  - multiEntry: 当第二个参数 keyPath 为一个数组时.如果 multiEntry 是 true,则会以数组中的每个元素建立一条索引.如果是 false,则以整个数组为 keyPath 值,添加一条索引.

下面让我们来看一个完整的例子,我们建立一条用户年龄的索引.

```js
const request = indexedDB.open('myDatabase', 5);
request.addEventListener('upgradeneeded', (e) => {
  const db = e.target.result;
  const store = db.createObjectStore('Users', {
    keyPath: 'userId',
    autoIncrement: false
  });
  const idx = store.createIndex('ageIndex', 'age', {
    unique: false
  });
});
```

这样我们就创建了一条索引.

**使用索引**

我们使用对象仓库上的 index 方法,通过传入一个索引名.来拿到一个索引对象：

```js
const index = store.index('ageIndex');
```

然后我们就可以使用这个索引了.比如说我们要拿到年龄在 20 岁以上的数据,升序排列.

```js
const request = indexedDB.open('myDatabase', 4);
request.addEventListener('success', (e) => {
  const db = e.target.result;
  const tx = db.transaction('Users', 'readwrite');
  const store = tx.objectStore('Users');
  const index = store.index('ageIndex');
  const req = index.openCursor(IDBKeyRange.lowerBound(20), 'next');
  req.addEventListener('success', (e) => {
    const cursor = e.target.result;
    if (cursor) {
      console.log(cursor.value.age);
      cursor.continue();
    } else {
      console.log('检索结束');
    }
  });
});
```
