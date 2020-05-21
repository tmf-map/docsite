---
title: 抽象类与接口
---

import Img from '../../../src/components/Img';

抽象类和接口是 Java 面向对象编程中非常重要的元素，在面向接口的编程中两者更是经常用到。类是对象的模版，抽象类和接口可以看作是具体的类的模版。

## 抽象类

如果一个 `class` 用 `abstract`修饰，它就是抽象类。除了正常的方法定义外，抽象类里的方法可以是空的，直接以分号结尾，没有具体执行代码，这个方法就是抽象方法，它必须用 `abstract` 修饰。

我们无法实例化一个抽象类，抽象类必须通过一个具体的子类实例化：

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
  public void work() {
    System.out.println("我的名字叫" + this.getName() + "，我正在讲课，请大家不要东张西望…");
  }
}

class Driver extends People {
  // 必须实现该方法
  public void work() {
    System.out.println("我的名字叫" + this.getName() + "，我正在开车，不能接听电话…");
  }
}
```

除了可以拥有抽象方法和不能实例化的特性外，抽象类拥有普通类的所有特点，比如：

* 可以继承父类（但抽象类的父类必须是抽象类）
* 可以实现接口
* 可以写 `private` 、 `protected`、 `public` 的成员变量和方法
* 可以写 `static final` 的常量

## 接口
接口一般是描述一些行为，是对接口使用者的一个承诺。在面向接口的编程中，接口的使用者只需要调用接口的某个方法达到其目的，而无需关心是哪个类实现的。接口的一个例子：

```java
interface Person {
  void run();
  String getName();
}
```

接口的一些特性：

* 所有方法都是 `public abstract` 的，必须被接口的实现类实现（Java 8之前）
* 所有的变量都是 `public static final` 的，其实就是常量

:::tip

因为接口定义的所有方法默认都是 `public abstract` 的，所以这两个修饰符不需要写出来（写不写效果都一样）。

:::

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

### 空接口

我们常常看到 Java 程序里有定义的一些空接口，那么空接口是什么作用呢？

空接口的主要是用来做判断的，也就是作为一个标记。为了判断某一个类是否满足其筛选条件时可以做一个空接口，然后利用 `instanceof` 方法来判断某一类是否使用了该接口，以达到你要筛选指定类型类的需求。

## 接口和抽象类比较

### 相同点

从某种角度讲，接口是一种特殊的抽象类，它们有很大的相似处：

* 都代表类树形结构的抽象层。在使用引用变量时，尽量使用类结构的抽象层，**使方法的定义和实现分离**，这样做对于代码有松散耦合的好处。
* 都不能被实例化。
- 都能包含抽象方法。

### 区别

* 接口里只能有常量，而且会“污染”实现类里的作用域；抽象类可以拥有 `private` 的变量，有一定程度的封装。
* 接口只能继承接口；抽象类既可以继承抽象类，也可以实现接口。
* 接口里的所有方法使用者都能直接调用；抽象类里可以封装一些 `private`、`protected` 或者包访问级别的方法
* 接口里的所有方法都是抽象的，没有方法体（Java 8 之前）；抽象类里的非抽象方法可以拥有方法体。
* 一个实现类一旦继承了某个抽象类，可以实现别的接口，但是不能继承其他类了；而如果它实现了某个接口，还可以实现别的接口，也可以继承别的类。体为空），但抽象类实现某个接口，可以不实现所有接口的方法，可以由它的子类实现。
* 接口是对行为的一种抽象，而抽象类是对类的抽象，包括属性、方法。继承抽象类的类往往是具有一些相似特点的类，而实现接口的类可以跨不同的域，仅仅实现了接口定义的契约。类继承抽象类像是一个 **”is-a”** 特点，类实现接口像是 **”like-a”** 特点。
* 在设计时，对接口往往是自上而下的，先定义接口行为，然后再针对其做具体实现；抽象类往往是自下而上的，我们先知道子类后才对其进行抽象出父类。

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

## 接口里的默认方法
从 Java 8 开始，Java 为接口提供了默认方法的功能，用 `default` 关键字表示，比如：

```java
interface InterfaceA {
  default void foo() {
    System.out.println("InterfaceA foo");
  }
}

class ClassA implements InterfaceA {
}

public class Test {
  public static void main(String[] args) {
    new ClassA().foo(); // Will print "InterfaceA foo"
  }
}
```

`ClassA` 没有实现 `InterfaceA` 的 `foo` 方法，但是 `InterfaceA` 提供了默认实现，当 `ClassA` 的实例调用到 `foo` 方法时，实际上是调用了接口里的默认实现。

### 为什么引入默认方法
**在 Java 8 之前**，接口和实现类之间高度耦合，当接口中添加一个方法时，它的所有实现类都需要修改，否则会发生编译错误。无法在不破坏现有实现的条件下向接口添加**新**方法。

:::tip

To use default method, JDK >= 1.8 is a must.

:::

在 Java 8 里面，引入默认方法的意图是**允许向现有接口添加方法**，Java 8 里有一个重要新功能： lamda 表达式，这需要升级旧接口并保持向后兼容。

```java
String[] array = new String[] {
  "hello",
  ", ",
  "world",
};
List<String> list = Arrays.asList(array);
list.forEach(System.out::println); // additional method in JDK 1.8
```

`forEach` 方法是 Java 8 里为 `Iterable` 接口添加的新默认方法，实现类不需要做任何修改就可以直接用它。下面是 `Iterable` 接口里的 `forEach` 方法：

```java
package java.lang;

import java.util.Objects;
import java.util.function.Consumer;

public interface Iterable<T> {
  default void forEach(Consumer<? super T> action) {
    Objects.requireNonNull(action);
    for (T t : this) {
      action.accept(t);
    }
  }
}
```

更多细节，可以参考这篇文章：https://ebnbin.com/2015/12/20/java-8-default-methods/

:::caution

向现有接口添加新方法充满了风险。在存在默认方法的情况下，接口的现有实现**可能**编译没有错误或警告，但在运行时会失败。

:::

:::good

除非有必要，否则应避免使用默认方法向现有接口添加新方法，在这种情况下，你应该认真考虑一下现有接口实现是否会被默认方法实现破坏。

:::

以上都是需要注意的，但是默认方法对于在创建接口时提供标准方法实现非常有用，它能简化实现接口的任务。

## 参考资料

1. [Effective Java, By Joshua Bloch](https://book.douban.com/subject/30412517/)
2. [Java 8 Default Methods, By Ebn Zhang](https://ebnbin.com/2015/12/20/java-8-default-methods/)
