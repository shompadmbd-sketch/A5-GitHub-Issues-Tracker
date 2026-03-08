## 1️⃣ What is the difference between var, let, and const?

**Answer:** Comparison of var, let, and const
In modern JavaScript (ES6+), we have three ways to declare variables. Each has its own behavior regarding scope, re-declaration, and re-assignment.

### Comparison Table

| Feature | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope** | **Function Scope**: Accessible throughout the function. | **Block Scope**: Only accessible within `{ }` braces. | **Block Scope**: Only accessible within `{ }` braces. |
| **Re-declaration** | **Allowed**: We can declare the same variable name again. | **Not Allowed**: We cannot re-declare it in the same scope. | **Not Allowed**: We cannot re-declare it in the same scope. |
| **Re-assignment** | **Allowed**: We can change the value later. | **Allowed**: We can update the value. | **Not Allowed**: The value is constant and cannot be changed. |
| **Hoisting** | Hoisted with `undefined` value. | Hoisted but throws a `ReferenceError`. | Hoisted but throws a `ReferenceError`. |
| **Initialization** | Not required during declaration. | Not required during declaration. | **Required**: We must initialize it with a value. |

---


## 2️⃣ What is the spread operator (...)?

 **Answer:** The Spread Operator is a useful feature introduced in ES6 (modern JavaScript). It is represented by three dots: ....

In simple terms, it "spreads" or expands the elements of an Array or an Object so that we can use them individually.

Why do we use it?
**1.** Copying an Array
Before the spread operator, copying an array was complicated. Now, we can create a perfect copy in one line.

**2.** Merging (Combining) Arrays
We can easily join two or more arrays into a single new array.

**3.** Adding New Elements
We can add new items to an existing array without changing the original one.

**4.** Using with Objects
Just like arrays, we can copy or update objects very easily.

---