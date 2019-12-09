---
title: Complexity
sidebar_label: Complexity
---

import Img from '../../../src/components/Img'
import Hint from '../../../src/components/Hint'

## Notation of Complexity

The main idea of asymptotic analysis is to have a measure of efficiency of algorithms that doesn’t depend on machine specific constants, and doesn’t require algorithms to be implemented and time taken by programs to be compared. Asymptotic notations are mathematical tools to represent time complexity of algorithms for asymptotic analysis. The following 3 asymptotic notations are mostly used to represent time complexity of algorithms.

### Θ Notation

<Img w="200" float="right" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/hihU0o.jpg'/>

The theta notation bounds a functions from above and below, so it defines exact asymptotic behavior.

A simple way to get theta notation of an expression is to drop low order terms and ignore leading constants. For example, consider the following expression:

3n<sup>3</sup> + 6n<sup>2</sup> + 6000 = Θ(n<sup>3</sup>)

Dropping lower order terms is always fine because there will always be a n0 after which Θ(n<sup>3</sup>) has higher values than Θ(n<sup>2</sup>) irrespective of the constants involved.

For a given function `g(n)`, we denote `Θ(g(n))` is following set of functions.

```text
Θ(g(n)) = {f(n): there exist positive constants c1, c2 and n0 such 
                 that 0 <= c1*g(n) <= f(n) <= c2*g(n) for all n >= n0}
```

The above definition means, if `f(n)` is theta of `g(n)`, then the value `f(n)` is always between `c1*g(n)` and `c2*g(n)` for large values of `n` *(n >= n0)*. The definition of theta also requires that `f(n)` must be non-negative for values of n greater than n0.

### Big O Notation

<Img w="200" float="right" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/tWPlZM.jpg'/>

The Big O notation defines an upper bound of an algorithm, it bounds a function only from above. For example, consider the case of Insertion Sort. It takes linear time in best case and quadratic time in worst case. We can safely say that the time complexity of Insertion sort is O(n<sup>2</sup>). Note that O(n<sup>2</sup>) also covers linear time.

If we use Θ notation to represent time complexity of Insertion sort, we have to use two statements for best and worst cases:

1. The worst case time complexity of Insertion Sort is Θ(n<sup>2</sup>).
2. The best case time complexity of Insertion Sort is Θ(n).

The Big O notation is useful when we only have upper bound on time complexity of an algorithm. Many times we easily find an upper bound by simply looking at the algorithm.

```text
O(g(n)) = {f(n): there exist positive constants c and 
                  n0 such that 0 <= f(n) <= c*g(n) for 
                  all n >= n0}
```

<Hint type="tip">Big O notation is usually used to classify algorithms according to how their running time or space requirements grow because we are generally interested in worst case.</Hint>

The general step wise procedure for Big O runtime analysis is as follows:

1. Figure out what the input is and what n represents.
1. Express the **maximum** number of operations, the algorithm performs in terms of n.
1. Eliminate all excluding the highest order terms.
1. Remove all the constant factors.

On the chart below you may find most common orders of growth of algorithms specified in Big O notation.

<Img w="600" origin="http://bigocheatsheet.com/" legend="Big O Cheat Sheet" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/dlLMln.jpg'/>

Below is the list of some of the most used Big O notations and their performance comparisons against different sizes of the input data.

| Big O Notation | Computations for 10 elements | Computations for 100 elements | Computations for 1000 elements  |
| -------------- | ---------------------------- | ----------------------------- | ------------------------------- |
| **O(1)**       | 1                            | 1                             | 1                               |
| **O(logn)**   | 3                            | 6                             | 9                               |
| **O(n)**       | 10                           | 100                           | 1000                            |
| **O(nlogn)** | 30                           | 600                           | 9000                            |
| **O(n^2)**     | 100                          | 10000                         | 1000000                         |
| **O(2^n)**     | 1024                         | 1.26e+29                      | 1.07e+301                       |
| **O(n!)**      | 3628800                      | 9.3e+157                      | 4.02e+2567                      |

Some of the examples of all those types of algorithms (in worst-case scenarios) are mentioned below:

| Data Structure          | Access    | Search    |
| ----------------------- | ------- | ------- |
| **Logarithmic algorithm**               | O(logn)          | Binary Search         |
| **Linear algorithm**               | O(n)          | Linear Search         |
| **Superlinear algorithm**               | O(nlogn)          | Heap Sort, Merge Sort         |
| **Polynomial algorithm**         | O(n^c)          | Strassen’s Matrix Multiplication, Bubble Sort, Selection Sort, Insertion Sort, Bucket Sort         |
| **Exponential algorithm**          | O(c^n)        | Tower of Hanoi         |
| **Factorial algorithm**  | O(n!)          | Determinant Expansion by Minors, Brute force Search algorithm for Traveling Salesman Problem         |

### Ω Notation

<Img w="200" float="right" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/p5sawF.jpg'/>

Just as Big O notation provides an asymptotic upper bound on a function, Ω notation provides an asymptotic lower bound.

Ω Notation can be useful when we have lower bound on time complexity of an algorithm. As discussed in the previous post, **the best case performance of an algorithm is generally not useful**, the Omega notation is the least used notation among all three.

For a given function `g(n)`, we denote by `Ω(g(n))` the set of functions.

```text
Ω (g(n)) = {f(n): there exist positive constants c and
                  n0 such that 0 <= c*g(n) <= f(n) for
                  all n >= n0}
```

Let us consider the same Insertion sort example here. The time complexity of Insertion Sort can be written as `Ω(n)`, but it is not a very useful information about insertion sort, **as we are generally interested in worst case and sometimes in average case**.

## Loops Complexity

### O(1)

Time complexity of a function (or set of statements) is considered as O(1) if it doesn’t contain loop, recursion and call to any other non-constant time function.

```text
// set of non-recursive and non-loop statements
```

For example `swap()` function has O(1) time complexity.

A loop or recursion that runs ***a constant number of times*** is also considered as O(1). For example the following loop is O(1):

```js
// Here c is a constant
for (int i = 1; i <= c; i++) {  
  // some O(1) expressions
}
```

### O(n)

Time complexity of a loop is considered as O(n) if the loop variables is incremented / decremented by a constant amount. For example following functions have O(n) time complexity:

```js
// Here c is a positive integer constant
for (int i = 1; i <= n; i += c) {  
  // some O(1) expressions
}

for (int i = n; i > 0; i -= c) {
  // some O(1) expressions
}
```

### O(n<sup>2</sup>)

Time complexity of nested loops is equal to the number of times the innermost statement is executed. For example the following sample loops have O(n<sup>2</sup>) time complexity:

```js
for (int i = 1; i <=n; i += c) {
  for (int j = 1; j <=n; j += c) {
    // some O(1) expressions
  }
}

for (int i = n; i > 0; i -= c) {
  for (int j = i+1; j <=n; j += c) {
    // some O(1) expressions
  }
}
```

For example **Selection Sort** and **Insertion Sort** have O(n<sup>2</sup>) time complexity.

### O(logn)

Time complexity of a loop is considered as O(logn) if the loop variables is divided / multiplied by a constant amount.

```js
for (int i = 1; i <=n; i *= c) {
  // some O(1) expressions
}
for (int i = n; i > 0; i /= c) {
  // some O(1) expressions
}
```

For example **Binary Search**(refer iterative implementation) has O(logn) time complexity. Let us see mathematically how it is O(logn). The series that we get in first loop is 1, c, c<sup>2</sup>, c<sup>3</sup>, … c<sup>k</sup>. If we put *k* equals to log<sub>c</sub>n, we get c<sup>log<sub>c</sub>n</sup> which is **n**.

### O(nlogn)

Time complexity of a loop is considered as O(nlogn) if the loop variables is reduced / increased exponentially by a constant amount.

```js
// Here c is a constant greater than 1
for (int i = 2; i <=n; i = pow(i, c)) {
  // some O(1) expressions
}
//Here fun is sqrt or cuberoot or any other constant root
for (int i = n; i > 1; i = fun(i)) {
  // some O(1) expressions
}
```

### Consecutive Loops

How to combine time complexities of consecutive loops?

When there are consecutive loops, we calculate time complexity as sum of time complexities of individual loops.

```js
for (int i = 1; i <=m; i += c) {  
  // some O(1) expressions
}
for (int i = 1; i <=n; i += c) {
  // some O(1) expressions
}
```

Time complexity of above code is `O(m) + O(n)` which is `O(m+n)`, If `m == n`, the time complexity becomes `O(2n)` which is `O(n)`.

### if-else Condition in Loops

How to calculate time complexity when there are many if, else statements inside loops?

As discussed before, worst case time complexity is the most useful among best, average and worst. Therefore we need to consider worst case. **We evaluate the situation when values in if-else conditions cause maximum number of statements to be executed**.

For example consider the linear search function where we consider the case when element is present at the end or not present at all.

<Hint type="tip">When the code is too complex to consider all if-else cases, we can get an upper bound by **ignoring** if else and other complex control statements.</Hint>

### Recursion

How to calculate time complexity of recursive functions?

Time complexity of a recursive function can be written as a mathematical recurrence relation. To calculate time complexity, we must know how to solve recurrences. We will soon be discussing recurrence solving techniques as a separate post.

## Quiz

[Quiz on Analysis of Algorithms (114 questions)](https://www.geeksforgeeks.org/algorithms-gq/analysis-of-algorithms-gq/)

## Reference

1. [Analysis of Algorithms | Set 2 (Worst, Average and Best Cases) - GeeksforGeeks](https://www.geeksforgeeks.org/analysis-of-algorithms-set-2-asymptotic-analysis/)
2. [Analysis of Algorithms | Set 3 (Asymptotic Notations) - GeeksforGeeks](https://www.geeksforgeeks.org/analysis-of-algorithms-set-3asymptotic-notations/)
3. [Analysis of Algorithms | Set 4 (Analysis of Loops) - GeeksforGeeks](https://www.geeksforgeeks.org/analysis-of-algorithms-set-4-analysis-of-loops/)
4. [Analysis of Algorithms | Big-O analysis, by SoumyadeepDebnath](https://www.geeksforgeeks.org/analysis-algorithms-big-o-analysis/)
