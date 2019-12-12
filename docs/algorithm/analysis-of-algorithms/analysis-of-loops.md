---
title: Analysis of Loops
sidebar_label: Analysis of Loops
---

import Hint from '../../../src/components/Hint'

## Frequent Loops Complexity

### O(1)

Time complexity of a function (or set of statements) is considered as O(1) if it doesn’t contain loop, recursion and call to any other non-constant time function.

```text
// set of non-recursive and non-loop statements
```

For example `swap()` function has O(1) time complexity.

A loop or recursion that runs **_a constant number of times_** is also considered as O(1). For example the following loop is O(1):

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

For example **Binary Search**(refer iterative implementation) has O(logn) time complexity. Let us see mathematically how it is O(logn). The series that we get in first loop is 1, c, c<sup>2</sup>, c<sup>3</sup>, … c<sup>k</sup>. If we put _k_ equals to log<sub>c</sub>n, we get c<sup>log<sub>c</sub>n</sup> which is **n**.

### O(loglogn)

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

## FAQ

### Consecutive Loops

> **Q**: _How to combine time complexities of consecutive loops?_

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

> **Q**: _How to calculate time complexity when there are many if, else statements inside loops?_

As discussed before, worst case time complexity is the most useful among best, average and worst. Therefore we need to consider worst case. **We evaluate the situation when values in if-else conditions cause maximum number of statements to be executed**.

For example consider the linear search function where we consider the case when element is present at the end or not present at all.

<Hint type="tip">When the code is too complex to consider all if-else cases, we can get an upper bound by **ignoring** if else and other complex control statements.</Hint>

Example: let `A[1, ..., n]` be an array storing a bit (1 or 0) at each location, and `f(m)` is a function whose time complexity is `θ(m)`. Consider the following program fragment written in a C like language:

```c
counter = 0;
for (i = 1; i < = n; i++) {
    if (A[i] == 1)
        counter++;
    else {
        f(counter);
        counter = 0;
    }
}
```

The complexity of this program fragment is ? (GATE-CS-2004)

(A) Ω(n<sup>2</sup>)  
(B) Ω(nlogn) and O(n<sup>2</sup>)  
(C) Θ(n)  
(D) O(n)

Please note that inside the else condition, f() is called first, then counter is set to 0. Consider the following cases:

- **All 1s in A[]**: Time taken is Θ(n) as only counter++ is executed n times.
- **All 0s in A[]**: Time taken is Θ(n) as only f(0) is called n times
- **Half 1s, then half 0s**: Time taken is Θ(n) as only f(n/2) is called once.

So, option (C) is correct.

### Recursive Functions

> **Q**: _How to calculate time complexity of recursive functions?_

Time complexity of a recursive function can be written as a mathematical **recurrence relation**. To calculate time complexity, we must know how to solve recurrences. See the below quiz:

The time complexity of the following C function is (assume n > 0)

```c
int recursive (int n) {
    if (n == 1) return (1);
    else return (recursive (n-1) + recursive (n-1));
}
```

(A) O(n)  
(B) O(nlogn)  
(C) O(n<sup>2</sup>)  
(D) O(2<sup>n</sup>)

Recurrence relation for the code: `T(n) = 2T(n-1) + k`. We can solve the recurrence using substitution method:

> T(n) = 2T(n-1) + k  
> = 2(2T(n-2) + k) + k  
> = 2(2(2T(n-3) + k) + k) + k.....  
> = 2<sup>x</sup> + 2(1 + 2 +....+ 2<sup>x-1</sup>)k  
> When base condition is met, i.e. n=1, x=n-1  
> = 2<sup>n-1</sup>T(1) + k(2<sup>n</sup>)  
> = O(2<sup>n</sup>)

So, option (D) is correct.

## Quiz

All (114) questions: [Quiz on Analysis of Algorithms](https://www.geeksforgeeks.org/algorithms-gq/analysis-of-algorithms-gq/)

**Question 5**

What is time complexity of fun()?

```c
int fun(int n) {
  int count = 0;
  for (int i = n; i > 0; i /= 2)
    for (int j = 0; j < i; j++)
      count += 1;
  return count;
}
```

(A) Θ(n<sup>2</sup>)  
(B) Θ(nlogn)  
(C) Θ(n)  
(D) Θ(nlognlogn)

> (C), For a input integer n, the innermost statement of fun() is executed following times. n + n/2 + n/4 + ... 1 So time complexity T(n) can be written as T(n) = O(n + n/2 + n/4 + ... 1) = O(n) The value of count is also n + n/2 + n/4 + .. + 1

**Question 6**

What is time complexity of fun()?

```c
int fun(int n) {
  int count = 0;
  for (int i = 0; i < n; i++)
     for (int j = i; j > 0; j--)
        count = count + 1;
  return count;
}
```

(A) Θ(n)  
(B) Θ(n<sup>2</sup>)  
(C) Θ(nlogn)  
(D) Θ(nlognlogn)

> (B), The time complexity can be calculated by counting number of times the expression `count = count + 1;` is executed. The expression is executed 0 + 1 + 2 + 3 + 4 + .... + (n-1) times. Time complexity = Θ(0 + 1 + 2 + 3 + .. + n-1) = Θ(n\*(n-1)/2) = Θ(n<sup>2</sup>)

**Question 16**

What is the time complexity of the below function?

```c
void fun(int n, int arr[]) {
    int i = 0, j = 0;
    for(; i < n; ++i) {
        while(j < n && arr[i] < arr[j])
            j++;
    }
}
```

(A) Θ(n)  
(B) Θ(n<sup>2</sup>)  
(C) Θ(nlogn)  
(D) Θ(n(logn)<sup>2</sup>)

> (A), In the first look, the time complexity seems to be O(n<sup>2</sup>) due to two loops. But, please note that the variable `j` is not initialized for each value of variable `i`. So, the inner loop runs at most n times. Please observe the difference between the function given in question and the below function:

```c
void fun(int n, int arr[]) {
    int i = 0, j = 0;
    for(; i < n; ++i) {
        j = 0;
        while(j < n && arr[i] < arr[j])
            j++;
    }
}
```

**Question 30**

Consider the following function:

```c
int unknown(int n) {
    int i, j, k = 0;
    for (i = n/2; i <= n; i++)
        for (j = 2; j <= n; j = j * 2)
            k = k + n/2;
    return k;
}
```

What is the returned value of the above function? (GATE CS 2013)

(A) Θ(n<sup>2</sup>)  
(B) Θ(n<sup>2</sup>logn)  
(C) Θ(n<sup>3</sup>)  
(D) Θ(n<sup>3</sup>logn)

> (B), The outer loop runs n/2 or Θ(n) times. The inner loop runs (logn) times (Note that j is multiplied by 2 in every iteration). So the statement "k = k + n/2;" runs Θ(nlogn) times. The statement increases value of k by n/2. So the value of k becomes n/2\*Θ(nlogn) which is Θ((n<sup>2</sup>)logn).

Please note that the complexity of the program is Θ(nlogn).

## Reference

1. [Analysis of Algorithms | Set 4 (Analysis of Loops) - GeeksforGeeks](https://www.geeksforgeeks.org/analysis-of-algorithms-set-4-analysis-of-loops/)
