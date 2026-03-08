## 1️⃣ What is the difference between var, let, and const?

## **Answer:** Comparison of var, let, and const
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
