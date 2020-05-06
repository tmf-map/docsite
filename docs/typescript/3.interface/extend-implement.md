---
title: Extend or implement
---

## Interface extends interface

Interfaces can extend one or more interfaces. This makes writing interfaces flexible and reusable.

```ts
interface Person {
  name: string;
  gender: string;
}

interface Employee extends Person {
  department: string;
}

let empObj: Employee = {
  name: 'Kimi',
  gender: 'male',
  department: 'Payment'
};
```

In the above example, the `Employee` interface extends the `Person` interface. So, objects of `Employee` must include all the properties and methods of the `Person` interface otherwise, the compiler will show an error.

## Class implements interface

Similar to languages like Java and C#, interfaces in TypeScript can be implemented with a Class. The Class implementing the interface needs to strictly conform to the structure of the interface.

```ts
interface Employee {
  name: string;
  department: string;
  getSalary: number => number;
}

class MyEmployee implements Employee {
  name: string;
  department: number;
  constructor(name: string, department: string) {
    this.name = name;
    this.department = department;
  }
  getSalary(department: string): number {
    return 9999;
  }
}

let emp = new MyEmployee("Kimi", "Payment");
```

In the above example, the `Employee` interface is implemented in the `MyEmployee` class using the the `implements` keyword. The implementing class should strictly define the properties and the function with the same name and data type. If the implementing class does not follow the structure, then the compiler will show an error.

:::tip

Of course, the implementing class can define **extra** properties and methods, but at least it must define **all** the members of an interface.

:::

## References

1. [Tutorials Teacher: TypeScript Interface](https://www.tutorialsteacher.com/typescript/typescript-interface)
