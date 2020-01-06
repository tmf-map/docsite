---
title: 抽象类与接口
sidebar_label: 抽象类与接口
---

import Hint from '../../../src/components/Hint';

import Img from '../../../src/components/Img';

抽象类和接口是 Java 面向对象中非常重要的元素，在面向接口的编程中两者更是经常用到。类是对象的模版，抽象类和接口可以看作是具体的类的模版。

## 抽象类

如果一个 `class` 定义了方法，但没有具体执行代码，这个方法就是抽象方法，抽象方法用 `abstract` 修饰。

抽象方法是没有方法体的。包含一个或多个抽象方法的类也必须被声明为抽象类。我们无法实例化一个抽象类：

```java
Person p = new Person(); // 编译错误
```

```java
public final class Demo {
  public static void main(String[] args) {
    Teacher t = new Teacher();
    t.setName("王明");
    t.work();
    Driver d = new Driver();
    d.setName("小陈");
    d.work();
  }
}
// 定义一个抽象类
abstract class People {
  private String name; // 实例变量
  // 共有的 setter 和 getter 方法
  public void setName(String name){
    this.name = name;
  }
  public String getName(){
    return this.name;
  }
  // 抽象方法
  public abstract void work();
}

class Teacher extends People {
  // 必须实现该方法
  public void work(){
    System.out.println("我的名字叫" + this.getName() + "，我正在讲课，请大家不要东张西望…");
  }
}

class Driver extends People{
  // 必须实现该方法
  public void work(){
    System.out.println("我的名字叫" + this.getName() + "，我正在开车，不能接听电话…");
  }
}
```

## 接口

### 和抽象类区别

在抽象类中，可以包含一个或多个抽象方法，但在接口中，所有的方法必须都是抽象的，不能有方法体，连字段都不能有，它比抽象类更加“抽象”。

例如：

```java
interface Person {
  void run();
  String getName();
}
```

<Hint type="tip">因为接口定义的所有方法默认都是 `public abstract` 的，所以这两个修饰符不需要写出来（写不写效果都一样）。</Hint>

接口可以看作是一种特殊的抽象类，它规定一个类必须做什么，而不是如何去做。

当一个具体的 `class` 去实现一个 `interface` 时，需要使用 `implements` 关键字。举个例子：

```java
class Student implements Person {
  private String name;

  public Student(String name) {
    this.name = name;
  }

  @Override
  public void run() {
    System.out.println(this.name + " run");
  }

  @Override
  public String getName() {
    return this.name;
  }
}
```

<Hint type="warn">实现类实现某个接口必须覆写其中的所有方法，当然也可以是一个空的实现（方法体为空），但抽象类实现某个接口，可以不实现所有接口的方法，可以由它的子类实现。</Hint>

我们知道，在 Java 中，一个类只能继承自另一个类，不能从多个类继承。但是，一个类可以实现多个 `interface` ，例如：

```java
class Student implements Person, Hello { // 实现了两个interface
  ...
}
```

### 接口继承

一个 `interface` 可以使用 `extends` 继承自另一个 `interface` 。例如：

```java
interface Hello {
  void hello();
}

interface Person extends Hello {
  void run();
  String getName();
}
```

此时， `Person` 接口继承自 `Hello` 接口，因此， `Person` 接口现在实际上有 3 个抽象方法签名，其中一个来自继承的 `Hello` 接口。

### 类与接口的继承关系

合理设计 interface 和 abstract class 的继承关系，可以充分复用代码。一般来说，公共逻辑适合放在 abstract class 中，具体逻辑放到各个子类，而接口层次代表抽象程度。可以参考 Java 的集合类定义的一组接口、抽象类以及具体子类的继承关系：

<Img w="380" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/rt4hsL.png' />

在使用的时候，实例化的对象永远只能是某个具体的子类，但总是通过接口去引用它，因为接口比抽象类更抽象：

```java
List list = new ArrayList(); // 用List接口引用具体子类的实例
Collection coll = list; // 向上转型为Collection接口
Iterable it = coll; // 向上转型为Iterable接口
```

### 空接口

我们常常看到 Java 程序里有定义的一些空接口，那么空接口是什么作用呢？

空接口的主要是用来做判断的，也就是作为一个标记。为了判断某一个类是否满足其筛选条件时可以做一个空接口，然后利用 `instanceof` 方法来判断某一类是否使用了该接口，以达到你要筛选指定类型类的需求。

### default 方法

<Hint type="tip">JDK >= 1.8</Hint>

https://ebnbin.com/2015/12/20/java-8-default-methods/

### 小结

- Java 的接口（interface）定义了纯抽象规范，一个类可以实现多个接口；
- 接口也是数据类型，适用于向上转型和向下转型；
- 接口的所有方法都是抽象方法，接口不能定义实例字段；
- 接口可以定义 default 方法（JDK>=1.8）

## 相同点

从某种角度讲，接口是一种特殊的抽象类，它们有很大的相似处：

- 都代表类树形结构的抽象层。在使用引用变量时，尽量使用类结构的抽象层，**使方法的定义和实现分离**，这样做对于代码有松散耦合的好处。
- 都不能被实例化。
- 都能包含抽象方法。

## 区别

### 抽象类的优势

抽象类可以为部分方法提供实现，避免在子类中重复实现这些方法，提高了代码的可重用性，而接口中只能包含抽象方法，不能包含任何实现。

```java
abstract class A {
  public abstract void method1();
  public void method2() {
    // A method2
  }
}
class B extends A {
  public void method1() {
    // B method1
  }
}
class C extends A {
  public void method1() {
    // C method1
  }
}
```

- `method1`(**松散耦合**): 抽象类 A 有两个子类 B、C，由于 A 并没有方法`method1`的实现，子类 B、C 可以根据自己的特点实现`method1`方法。
- `method2`(**代码可重用**): 抽象类 A 中有方法`method2`的实现，子类 B、C 中不需要重写`method2`方法，我们就说 A 为子类提供了公共的功能，或 A 约束了子类的行为。

再换成接口看看：

```java
interface A {
  public void method1();
  public void method2();
}
class B implements A {
  public void method1() {
    // B method1
  }
  public void method2() {
    // B method2
  }
}
class C implements A {
  public void method1() {
    // C method1
  }
  public void method2() {
    // C method2
  }
}
```

接口 A 虽然也有松散耦合的特性，但无法为类 B、C 提供公共的功能，即代码缺乏可重用性。从另外一个角度看，也就是说 A 无法详细约束 B、C 的行为，B、C 可以自由地根据自己的特点来实现`method1`和`method2`方法，接口 A 对此没有较强的掌控能力。

<Hint type="tip">选择抽象类的时候通常情况是：需要定义子类的抽象行为，又要为子类提供通用功能。</Hint>

### 接口的优势

Java 中一个类只能继承一个直接的父类（可能是抽象类），但一个类可以实现多个接口。

```java
abstract class A {
  public abstract void method1();
}
abstract class B extends A {
  public abstract void method2();
}

// 对于 C 类，将没有机会继承其它父类
class C extends B {
  public void method1(); {
    // C method1
  }
  public void method2(); {
    // C method2
  }
}
```

```java
interface A {
  public void method1();
}
interface B {
  public void method2();
}

class C implements A, B {
  public void method1(); {
    // C method1
  }
  public void method2(); {
    // C method2
  }
}

// 可以如此灵活地使用 C, 并且 C 还有机会进行扩展，实现其它接口
A a = new C();
B b = new C();
```

### 其它区别

- 抽象类中可以定义非`abstract`的方法和变量，而且可以是非`public`的，而且抽象类中方法可以有具体内容。接口中的方法必须是`public`的，就算不写也会默认为`public`，且方法体必须为空的。接口中的变量是`public static final`类型的，其实就是常量。
- 继承了抽象类的子类只能看到抽象类中`public`和`protected`类型的变量和方法，对于非`abstract`的方法不需要重写。而接口中定义的所有方法必须重写，定义的常量会影响所有实现它的类，所以，一般不推荐在接口里定义常量，且接口规模应尽可能小。如果需要抽象出多个方法，不应该把这些方法都放在接口里，而是采用多个接口+接口继承的形式。这点在 Effective Java 里面也有提到。
- 接口是对行为的一种抽象，而抽象类是对类的抽象，包括属性、方法。继承抽象类的类往往是具有一些相似特点的类，而实现接口的类可以跨不同的域，仅仅实现了接口定义的契约。类继承抽象类像是一个 **”is-a”** 特点，类实现接口像是 **”like-a”** 特点。
- 在设计时，对接口往往是自上而下的，先定义接口行为，然后再针对其做具体实现；抽象类往往是自下而上的，我们先知道子类后才对其进行抽象出父类。

## 参考资料

1. [Effective Java, By Joshua Bloch](https://book.douban.com/subject/30412517/)
