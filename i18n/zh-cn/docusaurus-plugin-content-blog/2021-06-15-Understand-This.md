---
slug: understand-this-in-one-article
title: 理解 JavaScript 中的 This, Bind, Call 和 Apply
author: Haochen Qi
author_title: Full Stack Developer
author_url: https://github.com/HaochenQ
author_image_url: https://avatars1.githubusercontent.com/u/44130343?s=400&u=a5a4729addf5c5b972d1d6220546273ff6e00eb4&v=4
tags: [JavaScript, Interview Qustions]
---

![question](/img/JS-Bind.png)

Many of you may have been asked about **This** keyword in an interview. It is a really important concept in JavaScript yet slightly confusing to new developers. Today let us disscuss **this**, **apply**, **call** and **bind** in JavaScript.

<!--truncate-->

## **This** in JavaScript

Not like other programming languages where this always refers to the current instance of the class, **this** in JavaScript depends on how a function is called. The usage of **apply**, **call** and **bind** methods can determine the value of **this**. Let's use an example to help us understand **this**.

```javascript
var test = {
  func: function () {
    console.log(this.bar);
  },
  prop: 1,
};

var func = test.func;
var prop = 2;

test.func(); // 1
func(); // 2
```

In the example above, we can see that two ways of calling _func()_ generated different results. The reason is that _test.func()_ ran in the context of _test_ where _this_ refers, whereas the secoond _func_ ran in the global context.

## **Call**, **Apply** and **Bind**

We use call(), apply() and bind() methods to set the this keyword independent of how the function is called. This is especially useful for the callbacks.

The call() and apply() methods set the this inside the function and immediately executes that function. The only difference between call() and apply() is that the apply() method accepts an array of arguments instead of comma separated values.

> function.call(thisArg, arg1, agr2, ...)

> function.apply(thisArg, [argumentsArr])

The code below will help us understand how call() and apply() work:

```javascript
Function.prototype.call = (context, ...args) => {
  context =
    context === undefined || context === null ? window : Object(context);
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
```

```javascript
Function.prototype.apply = (context, args) => {
  context =
    context === undefined || context === null ? window : Object(context);
  context.fn = this;
  const result = args ? context.fn(...args) : context.fn();
  delete context.fn;
  return result;
};
```

Not like call() and apply(), the bind() creates a new function and sets the this keyword to the specified object.

> function.bind(thisArg, optionalArguments)

```javascript
Function.prototype.myBind = (context, ...args) => {
  if (typeof this !== "function") {
    throw new TypeError("error");
  }
  context =
    context === undefined || context === null ? window : Object(context);
  self = this;
  return (...bindArgs) => {
    return self.apply(context, [...args, ...bindArgs)])
};
```

## Arrow Functions

Arrow functions do not have their own **this** binding. Instead, they go up to the next level of execution.

It can be useful to use the arrow function in cases where you really want this to refer to the outer context. For example, if you had an event listener inside of a class, you would probably want this to refer to some value in the class.

---

Reference: [AWS S3 Doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this),
[Medium(JavaScript Fundmentals)](https://blog.bitsrc.io/understanding-call-bind-and-apply-methods-in-javascript-33dbf3217be)
