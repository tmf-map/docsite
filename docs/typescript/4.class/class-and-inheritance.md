---
title: Class and Inheritance
---

A class is an entity that determines how an object will behave and what the object will contain. In other words, it is a blueprint or prototype that defines the variables and the methods (functions) common to all objects of a certain kind.

An object is a specimen of a class. Software objects are often used to model real-world objects you find in everyday life.

A class can include the following:

- Constructor
- Properties
- Methods

```typescript
class Employee {
  empCode: number;
  empName: string;

  constructor(code: number, name: string) {
    this.empName = name;
    this.empCode = code;
  }

  getSalary(): number {
    return 10000;
  }
}
```

The TypeScript compiler will convert the above class to the following JavaScript code using closure:

```typescript
var Employee = /** @class */ (function () {
  function Employee(name, code) {
    this.empName = name;
    this.empCode = code;
  }
  Employee.prototype.getSalary = function () {
    return 10000;
  };
  return Employee;
})();
```

## Constructor

The constructor is a special type of method which is called when creating an object. In TypeScript, the constructor method is always defined with the name "constructor".

```typescript
class Employee {
  empCode: number;
  empName: string;

  constructor(empcode: number, name: string) {
    this.empCode = empcode;
    this.name = name;
  }
}
```

In the above example, the `Employee` class includes a constructor with the parameters `empcode` and `name`. In the constructor, members of the class can be accessed using `this` keyword e.g. `this.empCode` or `this.name`.

### Constructor is optional

It is not necessary for a class to have a constructor.

```typescript
class Employee {
  empCode: number;
  empName: string;
}
```

### Property initializer

This is a nifty feature supported by TypeScript (from ES7 actually). You can initialize any member of the class outside the class constructor, useful to provide default (notice `members = []`)

```typescript
class Foo {
  members = []; // Initialize directly
  add(x) {
    this.members.push(x);
  }
}
```

would be equivalent to a similar assignment within a constructor body.

```typescript
class Foo {
  constructor() {
    this.members = [];
  }
  add(x) {
    this.members.push(x);
  }
}
```

## Creating an Object of Class

An object of the class can be created using the `new` keyword.

```typescript
class Employee {
  empCode: number;
  empName: string;

  constructor(empcode: number, name: string) {
    this.empCode = empcode;
    this.name = name;
  }
}

let emp = new Employee(100, 'Steve');
```

Here, we create an object called `emp` of type `Employee` using `let emp = new Employee(100,"Steve");`. The above class include a parameterized constructor so we pass values while creating an object. When we instantiate a new object, the class constructor is called with the values passed and the member variables `empCode` and `empName` are initialized with these values. If the class does not include any parameterized constructor, then we cannot pass values while creating an object. Otherwise the compiler will show an error.

## Inheritance

Just like object-oriented languages such as Java and C#, TypeScript classes can be extended to create new classes with inheritance, using the keyword `extends`.

```typescript
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  empCode: number;

  constructor(empcode: number, name: string) {
    super(name);
    this.empCode = empcode;
  }

  displayName(): void {
    console.log('Name = ' + this.name + ', Employee Code = ' + this.empCode);
  }
}

let emp = new Employee(100, 'Bill');
emp.displayName(); // Name = Bill, Employee Code = 100
```

In the above example, the `Employee` class extends the Person class using `extends` keyword. This means that the `Employee` class now includes all the members of the `Person` class.

The constructor of the `Employee` class initializes its own members as well as the parent class's properties using a special keyword `super`. The `super` keyword is used to call the parent constructor and passes the property values.

:::caution

We must call super() method first before assigning values to properties in the constructor of the derived class.

:::

### Method Overriding

When a child class defines its own implementation of a method from the parent class, it is called method overriding.

```typescript
class Car {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  run(speed: number = 0) {
    console.log('A ' + this.name + ' is moving at ' + speed + ' mph!');
  }
}

class Mercedes extends Car {
  constructor(name: string) {
    super(name);
  }

  run(speed = 150) {
    console.log('A Mercedes started');
    super.run(speed);
  }
}

class Honda extends Car {
  constructor(name: string) {
    super(name);
  }

  run(speed = 100) {
    console.log('A Honda started');
    super.run(speed);
  }
}

let mercObj = new Mercedes('Mercedes-Benz GLA');
let hondaObj = new Honda('Honda City');

mercObj.run(); // A Mercedes started A Mercedes-Benz GLA is moving at 150 mph!
hondaObj.run(); // A Honda started A Honda City is moving at 100 mph!
```

In the above example, we have a class `Car` with the `name` property. The constructor for this class initializes the member variables. The class also has a method `run()` with an argument speed initialized to 0.

We then create two classes, `Mercedes` and `Honda`, that extend from the parent class `Car`. Each child class extends the properties of the parent class. The constructor for each class calls the super constructor to initialize the parent class properties. Each class also defines a method `run()` that prints its own message in addition to calling the super class method for `run()`.

Since each child class has its own implementation of the method `run()`, it is called method overriding, i.e. the children classes have a method of the same name as that of the parent class.

When we create objects of the child class and call the `run()` method on this object, it will call its own overridden method of `run()` and not that of the parent class.

## References

1. [TypeScript Official Docs](https://www.typescriptlang.org/docs/handbook/classes.html)
2. [TypeScript Class, by TutorialsTeacher](https://www.tutorialsteacher.com/typescript/typescript-class)
3. [Typescript Deep Dive, by Basarat Ali Syed](https://basarat.gitbook.io/typescript/future-javascript/classes)
4. [TypeScript in action, by Liang Xiao](https://time.geekbang.org/course/detail/211-108549)
