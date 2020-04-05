---
title: Polymorphism
---

## Polymorphism

Polymorphism is the ability for specific classes or objects to be referenced in their more general sense, to then preform an action shared amongst multiple sub types. The primary reason to use abstract class to achieve polymorphism and provide developers to implement on their own way in future by implementing abstract methods.

```typescript
abstract class Animal {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  public abstract makeSound(): void;
}

class Dog extends Animal {
  public makeSound(): void {
    console.log('Bark!');
  }

  public dig(): void {
    console.log('digging');
  }
}

class Cat extends Animal {
  public makeSound(): void {
    console.log('Meow');
  }

  public scratch(): void {
    console.log('scratching');
  }
}

class Bird extends Animal {
  public makeSound(): void {
    console.log('Chirp');
  }

  public fly(): void {
    console.log('flying');
  }
}

const dog: Animal = new Dog('Scooby');
const cat: Animal = new Cat('Paws');
const bird: Animal = new Bird('Tweetie');

dog.makeSound(); //Bark!
cat.makeSound(); //Meow
bird.makeSound(); //Chirp

dog.dig(); // Type Error
cat.scratch(); // Type Error
bird.fly(); // Type Error
```

Although `dog`, `cat` and `bird` all instantiate new instances of their respective class, because they are all sub types of `Animal`, we were able to reference them as `Animal` and our application still works.

This special ability comes at the cost of sacrificing the sub classes specific functionality. The big stipulation that comes with polymorphism, is that you cannot call any method specific to the sub class even if the variable that you’re dealing with is an instance of that sub class.

### polymorphic this type

A polymorphic `this` type represents a type that is the subtype of the containing class or interface. This is called F-bounded polymorphism. This makes hierarchical fluent interfaces much easier to express, for example. Take a simple calculator that returns `this` after each operation:

```typescript
class BasicCalculator {
  public constructor(protected value: number = 0) {}
  public currentValue(): number {
    return this.value;
  }
  public add(operand: number): this {
    this.value += operand;
    return this;
  }
  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
  // ... other operations go here ...
}

let v = new BasicCalculator(2).multiply(5).add(1).currentValue();
```

Since the class uses `this` types, you can extend it and the new class can use the old methods with no changes.

```typescript
class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) {
    super(value);
  }
  public sin() {
    this.value = Math.sin(this.value);
    return this;
  }
  // ... other operations go here ...
}

let v = new ScientificCalculator(2).multiply(5).sin().add(1).currentValue();
```

Without `this` types, `ScientificCalculator` would not have been able to extend `BasicCalculator` and keep the fluent interface. multiply would have returned `BasicCalculator`, which doesn’t have the `sin` method. However, with `this` types, multiply returns `this`, which is `ScientificCalculator` here.

The `this` will refer to the instance of the current class. When another class extends the former class, the `this` will refer to the instance of the class that extended. This way, `this` changes it’s form depending on where it is called. This is called polymorphism.

## References

1. [TypeScript Official Docs](https://www.typescriptlang.org/docs/handbook/advanced-types.html#polymorphic-this-types)
2. [Polymorphism- Object Oriented Principles in Typescript, by Raymond Johnson](https://medium.com/@raymondjohnson121/polymorphism-object-oriented-principles-in-typescript-b176995e5643)
3. [Polymorphic this Type in TypeScript, by Alfred M. Adjei](https://alligator.io/typescript/polymorphic-this/)
4. [TypeScript in action, by Liang Xiao](https://time.geekbang.org/course/detail/211-108549)
