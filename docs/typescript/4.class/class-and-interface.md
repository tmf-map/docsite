---
title: Class and Interface
---

## Class Implements Interface

A class can implement single or multiple interfaces.

```typescript
interface IPerson {
  name: string;
  display(): void;
}

interface IEmployee {
  empCode: number;
}

class Employee implements IPerson, IEmployee {
  empCode: number;
  name: string;

  constructor(empcode: number, name: string) {
    this.empCode = empcode;
    this.name = name;
  }

  display(): void {
    console.log('Name = ' + this.name + ', Employee Code = ' + this.empCode);
  }
}

let per: IPerson = new Employee(100, 'Bill');
per.display(); // Name = Bill, Employee Code = 100

let emp: IEmployee = new Employee(100, 'Bill');
emp.display(); //Compiler Error: Property 'display' does not exist on type 'IEmployee'
```

In the above example, the `Employee` class implements two interfaces - `IPerson` and `IEmployee`. So, an instance of the `Employee` class can be assigned to a variable of `IPerson` or `IEmployee` type. However, an object of type `IEmployee` cannot call the `display()` method because `IEmployee` does not include it. You can only use properties and methods specific to the object type.

## Interface extends Class

In common object-oriented languages, interfaces cannot extends classes, but they are possible in TypeScript:

```typescript
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

Why does TypeScript support interface extends classes?

Actually, when we declare `class Point`, in addition to creating a class named `Point`, a type named `Point` (type of instance) is also created.

So we can use `Point` as a class (use`new Point` to create an instance of it):

```typescript
const p = new Point(1, 2);
```

We can also use `Point` as a type (use`: Point` to indicate the type of the parameter):

```typescript
function printPoint(p: Point) {
  console.log(p.x, p.y);
}

printPoint(new Point(1, 2));
```

This example is actually equivalent to:

```typescript
interface PointInstanceType {
  x: number;
  y: number;
}

function printPoint(p: PointInstanceType) {
  console.log(p.x, p.y);
}

printPoint(new Point(1, 2));
```

In the above example, the newly declared `PointInstanceType` type is equivalent to the `Point` type that was created when the `class Point` was declared.

So back to the `Point3d` example, we can easily understand why TypeScript supports interface extends classes:

```typescript
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

interface PointInstanceType {
  x: number;
  y: number;
}

// Equivalent to interface Point3d extends PointInstanceType
interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

When we declare `interface Point3d extends Point`, `Point3d` inherits the type of the instance of class `Point`.

In other words, it can be understood that one interface `Point3d` inherits another interface `PointInstanceType`.

So there is no essential difference between "interface extends class" and "interface extends interface".

It is worth noting that `PointInstanceType` lacks a constructor method compared to `Point` because the `Point` type created when the `Point` class is declared does not include a constructor. In addition, except that constructors are not included, static properties or static methods are also not included (of course, the type of the instance should not include constructors, static properties, or static methods).

In other words, the `Point` type that is created when the `Point` class is declared contains only instance properties and instance methods in it:

```typescript
class Point {
  static origin = new Point(0, 0);

  static distanceToOrigin(p: Point) {
    return Math.sqrt(p.x * p.x + p.y * p.y);
  }

  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  printPoint() {
    console.log(this.x, this.y);
  }
}

interface PointInstanceType {
  x: number;
  y: number;
  printPoint(): void;
}

let p1: Point;
let p2: PointInstanceType;
```

In the above example, the last type `Point` and the type `PointInstanceType` are equivalent.

Similarly, when an interface inherits a class, it only inherits its instance properties and instance methods.

## Interface vs Abstract Class

| Interface | Abstract Class |
| --- | --- |
| All members are abstract. | Some members are abstract and some are fully implemented. |
| Interfaces support multiple inheritances. | Abstract class does not support multiple inheritances. |
| Interfaces are generic in nature. They can be implemented by any class for example IClone interface can be implemented by any class like business objects, database classes. | Abstract classes are related. For example ViewModelBase is an abstract, class then we know this class will only inherits by ViewModels. |

## References

1. [TypeScript Official Docs](https://www.typescriptlang.org/docs/handbook/classes.html)
2. [TypeScript Class, by TutorialsTeacher](https://www.tutorialsteacher.com/typescript/typescript-class)
3. [Typescript 入门教程, by xcatliu](https://ts.xcatliu.com/advanced/class-and-interfaces)
4. [TypeScript Abstract Class](http://dotnetpattern.com/typescript-abstract-class)
5. [TypeScript in action, by Liang Xiao](https://time.geekbang.org/course/detail/211-108549)
