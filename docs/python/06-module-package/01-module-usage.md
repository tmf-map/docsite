---
title: Module Usage
---

Any text file with the `.py` extension containing Python code is basically a module. Different Python objects such as functions, classes, variables, constants, etc., defined in one module can be made available to an interpreter session or another Python script by using the `import` statement. Functions defined in built-in modules need to be imported before use. On similar lines, a custom module may have one or more user-defined Python objects in it. These objects can be imported in the interpreter session or another script.

If the programming algorithm requires defining a lot of functions and classes, they are logically organized in modules. One module stores classes, functions and other resources of similar relevance. Such a modular structure of the code makes it easy to understand, use and maintain.

## Creating a Module

Shown below is a Python script containing the definition of `sum()` function. It is saved as `calc.py`.

```py title="calc.py"
def sum(x, y):
    return x + y
```

## Importing a Module

We can now import this module and execute the `sum()` function in the Python shell.

```shell
>>> import calc
>>> calc.sum(5, 5)
10
```

In the same way, to use the above `calc` module in another Python script, use the `import` statement.

:::tip

All Python objects such as functions, classes, variables, constants, etc., defined in the module will be wrapped in a new variable and use its file name as a default name.

:::

Every module, either built-in or custom-made, is an object of a module class. Verify the type of different modules using the built-in `type()` function, as shown below.

```shell
>>> import math
>>> type(math)
<class 'module'>
>>> import calc
>>> type(calc)
<class 'module'>
```

## Renaming the Imported Module

Use the `as` keyword to rename the imported module as shown below.

```shell
>>> import math as cal
>>> cal.log(4)
1.3862943611198906
```

## `from .. import` statement

The above import statement will load all the resources of the module in the current working environment (also called namespace). It is possible to import specific objects from a module by using this syntax. For example, the following module `calc.py` has three functions in it.

```python title=calc.py
def sum(x,y):
    return x + y
def average(x, y):
    return (x + y)/2
def power(x, y):
    return x**y
```

Now, we can import one or more functions using the `from...import` statement. For example, the following code imports only two functions in the `test.py`.

```python title=test.py
from functions import sum, average

sum(10, 20) # 30
average(10, 20) # 15
```

You can also import all of its functions using the `from...import *` syntax.

```python title=test.py
from functions import *

sum(10, 20) # 30
average(10, 20) # 15
power(2, 4) # 16
```

## Module Search Path

When the import statement is encountered either in an interactive session or in a script:

- First, the Python interpreter tries to locate the module in the **current working directory**.
- If not found, directories in the `PYTHONPATH` environment variable are searched.
- If still not found, it searches the installation default directory.

As the Python interpreter starts, it put all the above locations in a list returned by the `sys.path` attribute.

```shell
>>> import sys
>>> sys.path
['/Users/kimi/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/213.6777.50/PyCharm.app/Contents/plugins/python/helpers/pydev',
 '/Users/kimi/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/213.6777.50/PyCharm.app/Contents/plugins/python/helpers/pycharm_display',
 '/Users/kimi/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/213.6777.50/PyCharm.app/Contents/plugins/python/helpers/third_party/thriftpy',
 '/Users/kimi/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/213.6777.50/PyCharm.app/Contents/plugins/python/helpers/pydev',
 '/Users/kimi/opt/anaconda3/lib/python38.zip',
 '/Users/kimi/opt/anaconda3/lib/python3.8',
 '/Users/kimi/opt/anaconda3/lib/python3.8/lib-dynload',
 '/Users/kimi/opt/anaconda3/lib/python3.8/site-packages',
 '/Users/kimi/opt/anaconda3/lib/python3.8/site-packages/aeosa',
 '/Users/kimi/opt/anaconda3/lib/python3.8/site-packages/locket-0.2.1-py3.8.egg',
 '/Users/kimi/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/213.6777.50/PyCharm.app/Contents/plugins/python/helpers/pycharm_matplotlib_backend',
 '/Users/kimi/opt/anaconda3/lib/python3.8/site-packages/IPython/extensions',
 '/Users/kimi/Documents/projects/my-projects/docsite']
```

If the required module is not present in any of the directories above, the message `ModuleNotFoundError` is thrown.

```shell
>>> import MyModule
Traceback (most recent call last):
  File "/Users/kimi/opt/anaconda3/lib/python3.8/site-packages/IPython/core/interactiveshell.py", line 3437, in run_code
    exec(code_obj, self.user_global_ns, self.user_ns)
  File "<ipython-input-4-7783eb9fc788>", line 1, in <module>
    import MyModule
  File "/Users/kimi/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/213.6777.50/PyCharm.app/Contents/plugins/python/helpers/pydev/_pydev_bundle/pydev_import_hook.py", line 21, in do_import
    module = self._system_import(name, *args, **kwargs)
ModuleNotFoundError: No module named 'MyModule'
```

## Variable Scope

In the module, we may define many functions and variables, but some functions and variables we want to use for others, and some functions and variables we want to use only inside the module.

By default, normal functions and variables are public and can be referenced by others directly, such as `abc`, `x123`, `PI`, etc.

Functions and variables such as `_xxx` and `__xxx` are private and shouldn't be directly referenced, such as `_abc`, `__abc`, etc.;

:::tip

The reason why we say that private functions and variables "**shouldn't**" be referenced directly, rather than "**can't**" be directly referenced, is Python doesn't have a way to completely restrict access to private functions or variables, but it's a convention that we shouldn't use private functions or variables started with `_` or `__`.

:::

Private functions and variables **shouldn't** be referenced by others, so what are they for? See the below example:

```py
def _private_1(name):
    return 'Hello, %s' % name

def _private_2(name):
    return 'Hi, %s' % name

def greeting(name):
    if len(name) > 3:
        return _private_1(name)
    else:
        return _private_2(name)
```

We expose the `greening()` function in the module and hide the internal logic with the private function, so that the call of the `greening()` function does not care about the details of the internal private function, which is also a very useful method of code encapsulation and abstraction.

## Reference

1. [Python Modules by tutorials teacher](https://www.tutorialsteacher.com/python/python-module)
2. [Python Tutorial: Module Usage by Liao, Xuefeng](https://www.liaoxuefeng.com/wiki/1016959663602400/1017455068170048)
