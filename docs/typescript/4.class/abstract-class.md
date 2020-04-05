---
title: Abstract Class
---

## Abstract Class

TypeScript allows us to define an abstract class using keyword `abstract`. Abstract classes are mainly for inheritance where other classes may derive from them.

:::caution

We cannot create an instance of an abstract class.

:::

An abstract class typically includes one or more abstract methods or property declarations. The class which extends the abstract class must define all the abstract methods.

The following abstract class declares one abstract method `find` and also includes a normal method `display`.

```typescript
abstract class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  display(): void {
    console.log(this.name);
  }

  abstract find(string): Person;
}

class Employee extends Person {
  empCode: number;

  constructor(name: string, code: number) {
    super(name); // must call super()
    this.empCode = code;
  }

  find(name: string): Person {
    // execute AJAX request to find an employee from a db
    return new Employee(name, 1);
  }
}

let emp: Person = new Employee('James', 100);
emp.display(); //James

let emp2: Person = emp.find('Steve');
```

In the above example, `Person` is an abstract class which includes one property and two methods, one of which is declared as abstract. The `find()` method is an abstract method and so must be defined in the derived class. The `Employee` class derives from the `Person` class and so it must define the `find()` method as abstract. The `Employee` class must implement all the abstract methods of the `Person` class, otherwise the compiler will show an error.

## References

1. [TypeScript Official Docs](https://www.typescriptlang.org/docs/handbook/advanced-types.html#polymorphic-this-types)
2. [TypeScript Abstract Class, by TutorialsTeacher](https://www.tutorialsteacher.com/typescript/abstract-class)
3. [TypeScript in action, by Liang Xiao](https://time.geekbang.org/course/detail/211-108549)
