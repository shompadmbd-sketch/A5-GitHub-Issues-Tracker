## 1️⃣ What is the difference between var, let, and const?

**Answer:** Comparison of var, let, and const
In modern JavaScript (ES6+), we have three ways to declare variables. Each has its own behavior regarding scope, re-declaration, and re-assignment.

### Comparison Table:

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

## Why do we use it?

**1.** Copying an Array:
Before the spread operator, copying an array was complicated. Now, we can create a perfect copy in one line.

**2.** Merging (Combining) Arrays:
We can easily join two or more arrays into a single new array.

**3.** Adding New Elements:
We can add new items to an existing array without changing the original one.

**4.** Using with Objects:
Just like arrays, we can copy or update objects very easily.

---

## 3️⃣ What is the difference between map(), filter(), and forEach()?

**Answer:** Comparison of var, let, and const
In modern JavaScript (ES6+), we have three ways to declare variables. Each has its own behavior regarding scope, re-declaration, and re-assignment.

#### Comparison Table:

| Feature | `forEach()` | `map()` | `filter()` |
| :--- | :--- | :--- | :--- |
| **Purpose** | We use it to loop through each element and perform an action. | We use it to transform each element and create a new array. | We use it to select specific elements that meet a condition. |
| **Return Value** | It returns **nothing** (`undefined`). | It returns a **New Array** with the same length. | It returns a **New Array** with only the matching elements. |
| **Original Array** | We do not change the original array. | We do not change the original array. | We do not change the original array. |
| **Usage Case** | Printing data or saving data to a database. | Doubling numbers, changing string cases, or extracting names. | Finding active users, filtering prices, or searching for specific items. |

---

## 4️⃣ What is an arrow function?

**Answer:** An **Arrow Function** is a modern and concise way to write functions in JavaScript using the `=>` syntax. It was introduced in ES6 to make our code cleaner and more readable.

#### Key Features:
* **Concise Syntax:** We can write functions with less code.
* **Implicit Return:** If the function has only one line, we don't need to use the `return` keyword or curly braces `{ }`.
* **Clean Code:** It is very helpful when we use array methods like `map()`, `filter()`, or `forEach()`.

#### For examples:


```javascript
const greet = () => "Hello, welcome to our assignment!";
console.log(greet());
```
---

## 5️⃣ What are template literals?

**Answer:** **Template Literals** are a modern way to handle strings in JavaScript, introduced in ES6. They are defined using **backticks** (`` ` ``) instead of regular quotes.

#### Key Features:
* **Variable Embedding:** We can insert variables directly into strings using `${}`.
* **Multi-line Support:** We can write strings across multiple lines easily.
* **No Concatenation Needed:** We don't have to use the `+` operator to join strings and variables.

#### For examples:

**Variable Interpolation:**

```javascript
const product = "Laptop";
const price = 50000;

// Using Template Literals
console.log(`The price of this ${product} is ${price} BDT.`);

```
---