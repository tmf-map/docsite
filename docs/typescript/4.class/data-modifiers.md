---
title: Data Modifiers
---

## access modifiers

TypeScript supports access modifiers `public`, `private` and `protected` which determine the accessibility of a class member as shown below:

| accessible on   | public | protected | private |
| --------------- | ------ | --------- | ------- |
| class           | yes    | yes       | yes     |
| class children  | yes    | yes       | no      |
| class instances | yes    | no        | no      |

If an access modifier is not specified it is implicitly public as that matches the convenient nature of JavaScript.

:::tip

In other object-oriented languages, the default modifier is more restrictive than Typescript. For example, in C++, the default modifier is `private`. In C#, the default modifier for fields is `private`. And in Java, the default is no keyword, which means package.

:::

Note that at runtime (in the generated JS) these have no significance but will give you compile time errors if you use them incorrectly. An example of each is shown below:

```typescript
class FooBase {
  public x: number;
  private y: number;
  protected z: number;
}

// EFFECT ON INSTANCES
var foo = new FooBase();
foo.x; // okay
foo.y; // ERROR : private
foo.z; // ERROR : protected

// EFFECT ON CHILD CLASSES
class FooChild extends FooBase {
  constructor() {
    super();
    this.x; // okay
    this.y; // ERROR: private
    this.z; // okay
  }
}
```

### constructor parameters with modifiers

Having a member in a class and initializing it like below:

```typescript
class TestClass {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

TypeScript provides a shorthand where you can prefix the member **with an access modifier** and it is automatically declared on the class and copied from the constructor. So the previous example can be re-written as:

```typescript
class TestClass {
  constructor(private name: string) {}
}
```

Here’s a more complete example including the public keyword, as well as the result of not including a keyword:

```typescript
class TestClass {
  constructor(name: string, private address: string, public city) {}

  testMethod() {
    console.log(this.name); // Compiler error: Property 'name' does not exist on type 'TestClass'.
    console.log(this.address);
    console.log(this.city);
  }
}

const testClass = new TestClass('Jane Doe', '123 Main St.', 'Cityville');

testClass.testMethod();

console.log(testClass.name); // Compiler error: Property 'name' does not exist on type 'TestClass'.
console.log(testClass.address); // Compiler error: 'address' is private and only accessible within class 'TestClass'.
console.log(testClass.city);
```

## readonly

TypeScript introduced the keyword `readonly`, which makes a property as read-only in the class, type or interface.

Read-only members can be accessed outside the class, but their value cannot be changed. Since read-only members cannot be changed outside the class, they either **must be initialized** at declaration or inside the class constructor.

```typescript
class Employee {
  readonly empCode: number;
  empName: string;

  constructor(code: number, name: string) {
    this.empCode = code;
    this.empName = name;
  }
}
let emp = new Employee(10, 'John');
emp.empCode = 20; //Compiler Error
```

## static

TypeScript classes support static properties that are shared by all instances of the class. The static members of a class are accessed using the class name and dot notation, without creating an object.

```typescript
class Something {
  static instances = 0;
  constructor() {
    Something.instances++;
  }
}

var s1 = new Something();
var s2 = new Something();
console.log(Something.instances); // 2
```

You can have static members as well as static functions.

## private constructor

If constructor of a class is private then its instance cannot be created outside. A famous use of private constructor is applying [singleton pattern](/docs/design-patterns/1.creation-pattern/singleton):

```typescript
class SingletonExample {
  private constructor() {
    console.log('Instance created');
  }

  private static _instance: SingletonExample | undefined;

  public prop = 'value';

  public static instance() {
    if (this._instance === undefined) {
      // no error, since the code is inside the class
      this._instance = new SingletonExample();
    }
    return this._instance;
  }
}

const singleton = SingletonExample.instance(); // no error, instance is created
console.log(singleton.prop); // value
const oops = new SingletonExample(); // oops, constructor is private
```

## protected constructor

Constructors declared with protected modifier can be used in 'this' class and in subclasses only.

```typescript
class Person {
  protected _name: string;
  protected _age: number;

  protected constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  protected displayAsString(): void {
    console.log(this);
  }
}

class Employee extends Person {
  private _salary: number;

  constructor(name: string, age: number, salary: number) {
    super(name, age);
    this._salary = salary;
  }

  public display(): void {
    super.displayAsString();
  }
}

//let person: Person = new Person("Ashlee", 23); error TS2674: Constructor of class 'Person' is protected and
// only accessible within the class declaration.
let emp: Employee = new Employee('Ashlee', 23, 3000);
//emp.displayAsString();  error TS2445: Property 'displayAsString' is protected and only accessible within
// class 'Person' and its subclasses.
emp.display(); // Employee { _name: 'Ashlee', _age: 23, _salary: 3000 }
```

## References

1. [TypeScript Official Docs](https://www.typescriptlang.org/docs/handbook/classes.html)
2. [AccessModifier, by martin Fowler](https://martinfowler.com/bliki/AccessModifier.html)
3. [TypeScript Data Modifiers, by TutorialsTeacher](https://www.tutorialsteacher.com/typescript/data-modifiers)
4. [TypeScript Deep Dive, by Basarat Ali Syed](https://basarat.gitbook.io/typescript/future-javascript/classes)
5. [TypeScript ReadOnly, by TutorialsTeacher](https://www.tutorialsteacher.com/typescript/typescript-readonly)
6. [TypeScript Constructor Assignment: public and private Keywords, by Ken Dale](https://kendaleiv.com/typescript-constructor-assignment-public-and-private-keywords/)
7. [TypeScript Static, by TutorialsTeacher](https://www.tutorialsteacher.com/typescript/typescript-static)
8. [What is the usage of Private and Protected Constructors in Typescript](https://stackoverflow.com/questions/51134172/what-is-the-usage-of-private-and-protected-constructors-in-typescript)
9. [TypeScript in action, by Liang Xiao](https://time.geekbang.org/course/detail/211-108549)
