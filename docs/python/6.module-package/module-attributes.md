---
title: Module Attributes
---

Python module has its attributes that describe it. Attributes perform some tasks or contain some information about the module. Some of the important attributes are explained below:

## `__name__`

The `__name__` attribute returns the name of the module. By default, the name of the file (excluding the `extension.py`) is the value of `__name__` attribute.

```shell
>>> import math
>>> math.__name__
'math'
```

In the same way, it gives the name of your custom module.

```shell
>>> hello.__name__
'hello'
```

However, this can be modified by assigning different strings to this attribute. Change `hello.py` as shown below.

```python title=hello.py
def SayHello(name):
    print ("Hi {}! How are you?".format(name))

__name__="SayHello"
```

And check the `__name__` attribute now.

```shell
>>> import hello
>>> hello.__name__
'SayHello'
```

The value of the `__name__` attribute is `__main__` on the Python interactive shell.

```shell
>>> __name__
'__main__'
```

Sometimes, you will see below code in some modules:

```python
if __name__=='__main__':
    # do sth...
```

Let's modify the `hello.py`:

```python title=hello.py
def SayHello(name):
    print ("Hi {}! How are you?".format(name))

if __name__=='__main__':
  SayHello('Alice')
```

When we run the `hello` module file on the command line, the Python interpreter puts a special variable `__name__` as a `__main__`, and if the `hello` module is imported elsewhere, the `if` condition will fail, so this `if` allows a module to execute some extra code when running from the command line, the most common being running the test.

```shell
$ python hello.py
Hi Alice! How are you?
```

If run `hello.py` from Python interactive shell and then import `hello` module:

```shell
$ python
Python 3.8.2 (default, Mar 25 2020, 11:22:43)
[Clang 4.0.1 (tags/RELEASE_401/final)] :: Anaconda, Inc. on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import hello
>>>
```

As you can see, When importing, there is nothing to be printed, because the `SayHello()` function is not executed.

## `__doc__`

The `__doc__` attribute denotes the documentation string (docstring) line written in a module code.

```shell
>>> import math
>>> math.__doc__
'This module provides access to the mathematical functions\ndefined by the C standard.'
```

Consider the following script is saved as `test.py` module.

```python title=test.py
"""This is docstring of test module"""

def SayHello(name):
    print ("Hi {}! How are you?".format(name))
    return
```

The `__doc__` attribute will return a string defined at the beginning of the module code.

```shell
>>> import test
>>> test.__doc__
'This is docstring of test module'
```

## `__file__`

`__file__` is an optional attribute which holds the name and path of the module file from which it is loaded.

```shell
>>> import io
>>> io.__file__
'/Users/kimi/opt/anaconda3/lib/python3.8/io.py'
```

## `__dict__`

The `__dict__` attribute will return a dictionary object of module attributes, functions and other definitions and their respective values.

```shell
>>> import math
>>> math.__dict__
{'__name__': 'math',
 '__doc__': 'This module provides access to the mathematical functions\ndefined by the C standard.',
 '__package__': '',
 '__loader__': <_frozen_importlib_external.ExtensionFileLoader at 0x7f78f0122ac0>,
 '__spec__': ModuleSpec(name='math', loader=<_frozen_importlib_external.ExtensionFileLoader object at 0x7f78f0122ac0>, origin='/Users/kimi/opt/anaconda3/lib/python3.8/lib-dynload/math.cpython-38-darwin.so'),
 'acos': <function math.acos(x, /)>,
 'acosh': <function math.acosh(x, /)>,
 'asin': <function math.asin(x, /)>,
 'asinh': <function math.asinh(x, /)>,
 'atan': <function math.atan(x, /)>,
 'atan2': <function math.atan2(y, x, /)>,
 'atanh': <function math.atanh(x, /)>,
 'ceil': <function math.ceil(x, /)>,
 'copysign': <function math.copysign(x, y, /)>,
 'cos': <function math.cos(x, /)>,
 'cosh': <function math.cosh(x, /)>,
 'degrees': <function math.degrees(x, /)>,
 'dist': <function math.dist(p, q, /)>,
 'erf': <function math.erf(x, /)>,
 'erfc': <function math.erfc(x, /)>,
 'exp': <function math.exp(x, /)>,
 'expm1': <function math.expm1(x, /)>,
 'fabs': <function math.fabs(x, /)>,
 'factorial': <function math.factorial(x, /)>,
 'floor': <function math.floor(x, /)>,
 'fmod': <function math.fmod(x, y, /)>,
 'frexp': <function math.frexp(x, /)>,
 'fsum': <function math.fsum(seq, /)>,
 'gamma': <function math.gamma(x, /)>,
 'gcd': <function math.gcd(x, y, /)>,
 'hypot': <function math.hypot>,
 'isclose': <function math.isclose(a, b, *, rel_tol=1e-09, abs_tol=0.0)>,
 'isfinite': <function math.isfinite(x, /)>,
 'isinf': <function math.isinf(x, /)>,
 'isnan': <function math.isnan(x, /)>,
 'isqrt': <function math.isqrt(n, /)>,
 'ldexp': <function math.ldexp(x, i, /)>,
 'lgamma': <function math.lgamma(x, /)>,
 'log': <function math.log>,
 'log1p': <function math.log1p(x, /)>,
 'log10': <function math.log10(x, /)>,
 'log2': <function math.log2(x, /)>,
 'modf': <function math.modf(x, /)>,
 'pow': <function math.pow(x, y, /)>,
 'radians': <function math.radians(x, /)>,
 'remainder': <function math.remainder(x, y, /)>,
 'sin': <function math.sin(x, /)>,
 'sinh': <function math.sinh(x, /)>,
 'sqrt': <function math.sqrt(x, /)>,
 'tan': <function math.tan(x, /)>,
 'tanh': <function math.tanh(x, /)>,
 'trunc': <function math.trunc(x, /)>,
 'prod': <function math.prod(iterable, /, *, start=1)>,
 'perm': <function math.perm(n, k=None, /)>,
 'comb': <function math.comb(n, k, /)>,
 'pi': 3.141592653589793,
 'e': 2.718281828459045,
 'tau': 6.283185307179586,
 'inf': inf,
 'nan': nan,
 '__file__': '/Users/kimi/opt/anaconda3/lib/python3.8/lib-dynload/math.cpython-38-darwin.so'}
```

:::info

`dir()` is a built-in function that also returns the list of all attributes and functions in a module.

```shell
>>> dir(math)
['__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'ceil', 'comb',
 'copysign', 'cos', 'cosh', 'degrees', 'dist', 'e', 'erf', 'erfc', 'exp', 'expm1', 'fabs', 'factorial', 'floor', 'fmod', 'frexp', 'fsum', 'gamma', 'gcd',
  'hypot', 'inf', 'isclose', 'isfinite', 'isinf', 'isnan', 'isqrt', 'ldexp', 'lgamma', 'log', 'log10', 'log1p', 'log2', 'modf', 'nan', 'perm', 'pi', 'pow',
   'prod', 'radians', 'remainder', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'tau', 'trunc']
```

:::

Learn more about [module attributes in Python Docs](https://docs.python.org/3/reference/import.html#import-related-module-attributes)

## Reference

1. [Python Module Attributes by tutorials teacher](https://www.tutorialsteacher.com/python/python-module-attributes)
2. [Python Tutorial: Module Usage by Liao, Xuefeng](https://www.liaoxuefeng.com/wiki/1016959663602400/1017455068170048)
