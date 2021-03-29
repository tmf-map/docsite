---
title: Asymptotic Notations
---

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/algorithm-cover.jpeg' alt='algorithm-cover'/>

The main idea of asymptotic analysis is to have a measure of efficiency of algorithms that doesn’t depend on machine specific constants, and doesn’t require algorithms to be implemented and time taken by programs to be compared. Asymptotic notations are mathematical tools to represent time complexity of algorithms for asymptotic analysis. The following 3 asymptotic notations are mostly used to represent time complexity of algorithms.

## Θ Notation

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

The above definition means, if `f(n)` is theta of `g(n)`, then the value `f(n)` is always between `c1*g(n)` and `c2*g(n)` for large values of `n` _(n >= n0)_. The definition of theta also requires that `f(n)` must be non-negative for values of n greater than n0.

## Big O Notation

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

:::tip

Big O notation is usually used to classify algorithms according to how their running time or space requirements grow because we are generally interested in worst case.

:::

The general step wise procedure for Big O runtime analysis is as follows:

1. Figure out what the input is and what n represents.
1. Express the **maximum** number of operations, the algorithm performs in terms of n.
1. Eliminate all excluding the highest order terms.
1. Remove all the constant factors.

On the chart below you may find most common orders of growth of algorithms specified in Big O notation.

<Img w="600" origin="http://bigocheatsheet.com/" legend="Big O Cheat Sheet" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/dlLMln.jpg'/>

Below is the list of some of the most used Big O notations and their performance comparisons against different sizes of the input data.

| Big O Notation | Computations for 10 elements | Computations for 100 elements | Computations for 1000 elements |
| --- | --- | --- | --- |
| **O(1)** | 1 | 1 | 1 |
| **O(logn)** | 3 | 6 | 9 |
| **O(n)** | 10 | 100 | 1000 |
| **O(nlogn)** | 30 | 600 | 9000 |
| **O(n^2)** | 100 | 10000 | 1000000 |
| **O(2^n)** | 1024 | 1.26e+29 | 1.07e+301 |
| **O(n!)** | 3628800 | 9.3e+157 | 4.02e+2567 |

Some of the examples of all those types of algorithms (in worst-case scenarios) are mentioned below:

| Data Structure | Access | Search |
| --- | --- | --- |
| **Logarithmic algorithm** | O(logn) | Binary Search |
| **Linear algorithm** | O(n) | Linear Search |
| **Superlinear algorithm** | O(nlogn) | Heap Sort, Merge Sort |
| **Polynomial algorithm** | O(n^c) | Strassen’s Matrix Multiplication, Bubble Sort, Selection Sort, Insertion Sort, Bucket Sort |
| **Exponential algorithm** | O(c^n) | Tower of Hanoi |
| **Factorial algorithm** | O(n!) | Determinant Expansion by Minors, Brute force Search algorithm for Traveling Salesman Problem |

## Ω Notation

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

## Reference

1. [Analysis of Algorithms | Set 3 (Asymptotic Notations) - GeeksforGeeks](https://www.geeksforgeeks.org/analysis-of-algorithms-set-3asymptotic-notations/)
2. [Analysis of Algorithms | Big-O analysis, by SoumyadeepDebnath](https://www.geeksforgeeks.org/analysis-algorithms-big-o-analysis/)
3. [javascript-algorithms, by trekhleb](https://github.com/trekhleb/javascript-algorithms)
