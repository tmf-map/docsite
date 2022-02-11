---
title: Class and Instance
---

## OOP

The core concepts of OOP(**Object-Oriented Programming**) are Class and Instance(aka Object), You need to remember that class is the abstract **template** while instance is the concrete "Object" created from class, each with the same method, but the data may be different.

Python is a completely object-oriented language. Every element in a Python program is an object of a class. A number, string, list, dictionary, etc., used in a program is an object of a corresponding built-in class. You can retrieve the class name of variables or objects using the `type()` method, as shown below.

```shell title="Python Built-in Classes"
>>> num=20
>>> type(num)
<class 'int'>
>>> s="Python"
>>> type(s)
<class 'str'>
```

## Defining a Class

A class in Python can be defined using the `class` keyword.

```python
class <ClassName>:
    <statement1>
    <statement2>
    .
    .
    <statementN>
```

As per the syntax above, a class is defined using the `class` keyword followed by the class name and `:` operator after the class name, which allows you to continue in the next indented line to define class members. The followings are class members.

1. [Class Attributes](#class-attributes)
2. [Constructor](#constructor)
3. [Instance Attributes](#instance-attributes)
4. [Class Methods](#class-methods)

A class can also be defined without any members. The following example defines an empty class using the `pass` keyword.

```python title="An Empty Class"
class Student:
    pass
```

Class instantiation uses function notation. To create an object of the class, just call a class like a parameterless function that returns a new object of the class, as shown below.

```python title="Creating an Object of a Class"
std = Student()
```

Above, `Student()` returns an object of the `Student` class, which is assigned to a local variable `std`. The `Student` class is an empty class because it does not contain any members.

## Class Attributes

### Define directly

Class attributes are the variables defined directly in the class that are shared by all objects of the class. Class attributes can be accessed using the class name as well as using the objects.

```python title="Class Attributes"
class Student:
    schoolName = 'XYZ School'
```

Above, the `schoolName` is a class attribute defined inside a class. The value of the `schoolName` will remain the same for all the objects unless modified explicitly.

```shell
>>> Student.schoolName
'XYZ School'
>>> std = Student()
>>> std.schoolName
'XYZ School'
```

As you can see, a class attribute is accessed by `Student.schoolName` as well as `std.schoolName`. Changing the value of class attribute using the class name would change it **across ALL instances**. However, changing class attribute value using instance will not reflect to other instances or class.

```shell
>>> Student.schoolName = 'ABC School' # change attribute value using class name
>>> std = Student()
>>> std.schoolName
'ABC School'   # value changed for all instances
>>> std.schoolName = 'My School'  # changing instance's attribute
>>> std.schoolName
'My School'
>>> Student.schoolName # instance level change not reflectd to class attribute
'ABC School'
>>> std2 = Student()
>>> std2.schoolName
'ABC School'
```

The following example demonstrates the use of class attribute `count`.

```python
class Student:
    count = 0
    def __init__(self):
        Student.count += 1
```

In the above example, `count` is an attribute in the `Student` class. Whenever a new object is created, the value of `count` is incremented by `1`. You can now access the `count` attribute after creating the objects, as shown below.

```shell
>>> std1=Student()
>>> Student.count
1
>>> std2 = Student()
>>> Student.count
2
```

### Use `property()`

In Python, a property in the class can also be defined using the `property()` function which provides an interface to instance attributes. It encapsulates instance attributes and provides a property, same as Java and C#.

The `property()` method takes the **get**, **set** and **delete** methods as arguments and returns an object of the property class.

The following example demonstrates how to create a property in Python using the `property()` function.

```python title="property()"
class Student:
    def __init__(self):
        self.__name=''
    def setname(self, name):
        print('setname() called')
        self.__name=name
    def getname(self):
        print('getname() called')
        return self.__name
    name=property(getname, setname)
```

In the above example, `property(getname, setname)` returns the property object and assigns it to `name`. Thus, the `name` property hides the [private instance attribute](/docs/python/5.class/access-modifiers#private-members) `__name`. The name property is accessed directly, but internally it will invoke the `getname()` or `setname()` method, as shown below.

```shell
>>> std = Student()
>>> std.name="Steve"
setname() called
>>> std.name
getname() called
'Steve'
```

It is recommended to use the property decorator instead of the `property()` method.

## Constructor

In Python, the constructor method is invoked automatically whenever a new object of a class is instantiated, same as constructors in C# or Java. The constructor must have a special name `__init__()` and a special parameter called `self`.

:::tip

The first parameter of each method in a class must be the `self` , which refers to the calling object. However, you can give any name to the first parameter, not necessarily self.

:::

The following example defines a constructor.

```python title="Constructor"
class Student:
    def __init__(self): # constructor method
        print('Constructor invoked')
```

Now, whenever you create an object of the `Student` class, the `__init__()` constructor method will be called, as shown below.

```shell title="Constructor Call on Creating Object"
>>> s1 = Student()
Constructor invoked
>>> s2 = Student()
Constructor invoked
```

The constructor in Python is used to define the attributes of an instance and assign values to them.

## Instance Attributes

Instance attributes are attributes or properties attached to an instance of a class.

:::tip

Instance attributes are defined in the constructor.

:::

The following example defines instance attributes `name` and `age` in the constructor.

```python title="Instance Attributes"
class Student:
    schoolName = 'XYZ School' # class attribute

    def __init__(self): # constructor
        self.name = '' # instance attribute
        self.age = 0 # instance attribute
```

An instance attribute can be accessed using dot notation: `[instance name].[attribute name]`, as shown below.

```shell
>>> std = Student()
>>> std.name
''
>>> std.age
0
```

You can set the value of attributes using the dot notation, as shown below.

```shell
>>> std = Student()
>>> std.name = "Bill" # assign value to instance attribute
>>> std.age=25        # assign value to instance attribute
>>> std.name          # access instance attribute value
Bill
>>> std.age           # access value to instance attribute
25
```

You can specify the values of instance attributes through the constructor as well. The following constructor includes the `name` and `age` parameters, other than the `self` parameter.

```python Setting Attribute Values
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
```

Now, you can specify the values while creating an instance, as shown below:

```shell
>>> std = Student('Bill',25)
>>> std.name
'Bill'
>>> std.age
25
```

:::tip

You don't have to specify the value of the `self` parameter. It will be assigned internally in Python.

:::

You can also set default values to the instance attributes. The following code sets the default values of the constructor parameters. So, if the values are not provided when creating an object, the values will be assigned latter.

```python title="Setting Default Values of Attributes"
class Student:
    def __init__(self, name="Guest", age=25)
        self.name=name
        self.age=age
```

Now, you can create an object with default values, as shown below.

```shell
>>> std = Student()
>>> std.name
'Guest'
>>> std.age
25
```

```python
std.schoolName = 'ABC School'
print(std.schoolName) # instance attributes have higher priority
# ABC School
print(Student.schoolName) # class properties are still accessible
# XYZ School
```

```python
del std.schoolName
print(alice.school) # Since the schoolName of the instance is not found, the schoolName of the class is displayed
# XYZ School
```

As we can see from above examples, never use the same name for the instance property and the class property, because the instance property with the same name will override the class property, but when you delete the instance property, and then use the same name, the access will be the class property.

:::tip

- Instance properties belong to each instance and do not interfere with each other.
- Class properties belong to the class, and all instances share a property.
- Do not use the same name for instance properties and class properties, otherwise you will produce errors that are difficult to find.

:::

Visit [class attributes vs instance attributes in Python](https://www.tutorialsteacher.com/articles/class-attributes-vs-instance-attributes-in-python) for more information.

## Class Methods

You can define as many methods as you want in a class using the `def` keyword. Each method must have the first parameter, generally named as `self`, which refers to the calling instance.

```python title="Class Method"
class Student:
    def displayInfo(self): # class method
        print('Student Information')
```

`self` is just a conventional name for the first argument of a method in the class. A method defined as `mymethod(self, a, b)` should be called as `x.mymethod(a, b)` for the object `x` of the class.

The above class method can be called as a normal function, as shown below.

```shell
>>> std = Student()
>>> std.displayInfo()
'Student Information'
```

The first parameter of the method need not be named `self`. You can give any name that refers to the instance of the calling method. The following `displayInfo()` method names the first parameter as `obj` instead of `self` and that works perfectly fine.

```python
class Student:
    def displayInfo(obj): # class method
        print('Student Information')
```

Defining a method in the class without the `self` parameter would raise an exception when calling a method.

```python
class Student:
    def displayInfo(): # method without self parameter
        print('Student Information')
```

```shell
>>> std = Student()
>>> std.displayInfo()
Traceback (most recent call last):
std.displayInfo()
TypeError: displayInfo() takes 0 positional arguments but 1 was given
```

The method can access instance attributes using the `self` parameter.

```python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def displayInfo(self): # class method
        print('Student Name: ', self.name,', Age: ', self.age)
```

You can now invoke the method, as shown below.

```shell title="Calling a Method"
>>> std = Student('Steve', 25)
>>> std.displayInfo()
Student Name: Steve , Age: 25
```

Compared to the normal function, the function defined in class has only one thing different, that is, the first argument is always the instance variable `self`, and when called, there is no need to pass `self`. Other than that, there is no different between them, so you can still use default parameters, variadic parameters, keyword parameters, and named keyword parameters just like normal functions.

## Deleting Attribute, Object, Class

You can delete attributes, objects, or the class itself, using the `del` keyword, as shown below:

```python
std = Student('Steve', 25)
```

```shell title="Delete Attribute"
>>> del std.name
>>> std.name
Traceback (most recent call last):
File "<pyshell#42>", line 1, in <module>
std.name
AttributeError: 'Student' object has no attribute 'name'
```

```shell title="Delete Object"
>>> del std
>>> std.name
Traceback (most recent call last):
File "<pyshell#42>", line 1, in <module>
std.name
NameError: name 'std' is not defined
```

```shell title="Delete Class"
>>> del Student
>>> std = Student('Steve', 25)
Traceback (most recent call last):
File "<pyshell#42>", line 1, in <module>
std = Student()
NameError: name 'Student' is not defined
```

## Reference

1. [Python Class by tutorials teacher](https://www.tutorialsteacher.com/python/python-class)
2. [Python Tutorial: Class and Instance by Liao, Xuefeng](https://www.liaoxuefeng.com/wiki/1016959663602400/1017496031185408)
