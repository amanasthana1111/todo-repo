# 📝 Todo API with JWT Authentication  
A simple and clean **Node.js + Express** backend for handling user authentication and todo management.  
This project includes **JWT authentication**, **protected routes**, and a **custom todo system** stored inside each user object.

It also provides a **complete HTML tester UI** to test all routes easily — signup, signin, create todo, update todo, mark todo as done, and more.

---

## 🚀 Features

### 🔐 Authentication  
- User Signup  
- User Signin  
- JWT Token generation  
- Middleware-based route protection   

### 📌 Todo System  
Todos are stored as objects:
```js
todo: {
  1: { todo: "Buy Milk", isDone: false },
  2: { todo: "Study Node.js", isDone: true }
}
