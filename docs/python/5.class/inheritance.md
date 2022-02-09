---
title: Inheritance
---

## Single Inheritance

We often come across different products that have a basic model and an advanced model with added features over and above basic model. A software modelling approach of OOP enables extending the capability of an existing class to build a new class, instead of building from scratch. In OOP terminology, this characteristic is called inheritance, the existing class is called base or parent class, while the new class is called child or sub class.

The general mechanism of establishing inheritance is illustrated below:

```python title=Syntax
class Parent:
    statements

class Child(Parent):
    statements
```

While defining the child class, the name of the parent class is put in the parentheses in front of it, indicating the relation between the two. Instance attributes and methods defined in the parent class will be inherited by the object of the child class.

To demonstrate a more meaningful example, a `Quadrilateral` class is first defined, and it is used as a base class for the rectangle class.

A `Quadrilateral` class having four sides as instance variables and a `perimeter()` method is defined below:

```python title="Base Class"
class Quadrilateral:
    def __init__(self, a, b, c, d):
        self.side1=a
        self.side2=b
        self.side3=c
        self.side4=d

    def perimeter(self):
        p=self.side1 + self.side2 + self.side3 + self.side4
        print("perimeter=",p)
```

The constructor (the `__init__()` method) receives four parameters and assigns them to four instance variables. To test the above class, declare its object and invoke the `perimeter()` method.

```shell
>>> q1 = Quadrilateral(7,5,6,4)
>>> q1.perimeter()
perimeter=22
```

We now design a `Rectangle` class based upon the `Quadrilateral` class (Rectangle IS a Quadrilateral!). The instance variables and the `perimeter()` method from the base class should be automatically available to it without redefining it.

Since opposite sides of the rectangle are the same, we need only two adjacent sides to construct its object. Hence, the other two parameters of the `__init__()` method are set to none. The` __init__()` method forwards the parameters to the constructor of its base (`Quadrilateral`) class using the **`Super()`** function. The object is initialized with `side3` and `side4` set to none. Opposite sides are made equal by the constructor of rectangle class. Remember that it has automatically inherited the `perimeter()` method, hence there is no need to redefine it.

```python title="Sub Class"
class Rectangle(Quadrilateral):
    def __init__(self, a, b):
        super().__init__(a, b, a, b)
```

We can now declare the object of the rectangle class and call the `perimeter()` method.

```shell
>>> r1 = Rectangle(10, 20)
>>> r1.perimeter()
perimeter=60
```

## Multiple Inheritance

Python supports a limited form of multiple inheritance as well. A class definition with multiple base classes looks like this:

```python title=Syntax
class Base1:
    pass

class Base2:
    pass

class DerivedClassName(Base1, Base2):
    pass
```

The only rule necessary to explain the semantics is the resolution rule used for class attribute references. This is **depth-first**, **left-to-right**. Thus, if an attribute is not found in `DerivedClassName`, it is searched in `Base1`, then (recursively) in the base classes of `Base1`, and only if it is not found there, it is searched in `Base2`, and so on.

:::info

To some people breadth first — searching `Base2` and `Base3` before the base classes of `Base1` — looks more natural. However, this would require you to know whether a particular attribute of `Base1` is actually defined in `Base1` or in one of its base classes before you can figure out the consequences of a name conflict with an attribute of `Base2`. The depth-first rule makes no differences between direct and inherited attributes of `Base1`.

:::

In fact, it is slightly more complex than that; the method resolution order changes dynamically to support cooperative calls to `super()`. This approach is known in some other multiple-inheritance languages as call-next-method and is more powerful than the super call found in single-inheritance languages.

It is clear that indiscriminate use of multiple inheritance is a maintenance nightmare, given the reliance in Python on conventions to avoid accidental name conflicts. A well-known problem with multiple inheritance is a class derived from two classes that happen to have a common base class. While it is easy enough to figure out what happens in this case (the instance will have a single copy of “instance variables” or data attributes used by the common base class), it is not clear that these semantics are in any way useful. See [Python Official Tutorial](https://docs.python.org/3/tutorial/classes.html#multiple-inheritance) for more details.

## Method Overriding

In the above example, we see how resources of the base class are reused while constructing the inherited class. However, the inherited class can have its own instance attributes and methods.

Methods of the parent class are available for use in the inherited class. However, if needed, we can modify the functionality of any base class method. For that purpose, the inherited class contains a new definition of a method (with the same name and the signature already present in the base class). Naturally, the object of a new class will have access to both methods, but the one from its own class will have precedence when invoked. This is called method overriding.

First, we shall define a new method named `area()` in the rectangle class and use it as a base for the `Square` class. The area of rectangle is the product of its adjacent sides.

```python
class Rectangle(Quadrilateral):
    def __init__(self, a,b):
        super().__init__(a, b, a, b)

    def area(self):
        a = self.side1 * self.side2
        print("area of rectangle=", a)
```

Let us define the `Square` class which inherits the `Rectangle` class. The `area()` method is overridden to implement the formula for the area of the square as the square of its sides.

```python
class Square(Rectangle):
    def __init__(self, a):
        super().__init__(a, a)
    def area(self):
        a=pow(self.side1, 2)
        print('Area of Square: ', a)
```

```shell
>>> s = Square(10)
>>> s.area()
Area of Square: 100
```

## Reference

1. [Python Class Inheritance by tutorials teacher](https://www.tutorialsteacher.com/python/inheritance-in-python)
1. [Python Official Tutorial by Python Software Foundation](https://docs.python.org/3/tutorial/classes.html#multiple-inheritance)
