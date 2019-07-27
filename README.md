# ScriptUI
ScriptUI lets you write React components without JSX. It's easy to read. No build or transpilation required.

[Installation](#installation) | [Usage](#usage) | [API](#api) | [Motivation](#motivation)

```javascript
const Hello = View("div")(
  Text("Hello World")
    .bold()
    .color("red"),
  Button("Alert", () => alert("ScriptUI Rocks!")
);
```

## Installation
Browser:
```html
<!-- Include React and ReactDOM dependencies first -->
<script src="https://unpkg.com/scriptui@1.0.2/public/index.js"></script>
<!-- Include your scripts last -->
```

Node:
```
npm install --save scriptui react react-dom
```

## Usage
The following demonstrates how you render your `View` with `ReactDOM.render`. 

Browser (Try it in [CodePen](https://codepen.io/anater/pen/jgVZpR?editors=0011#0)):
```javascript
// Assuming React & ReactDOM scripts are global.
const { View } = ScriptUI;
const MyView = View("span")("My View");
ReactDOM.render(
  View.render(MyView),
  document.querySelector("#root")
);
```

Node:
```javascript
import View from "scriptui";
import ReactDOM from "react-dom";

const MyView = View("span")("My View");
ReactDOM.render(
  View.render(MyView),
  document.querySelector("#root")
);
```

## API
`View(type: string|element, props?: object) => (...children?) => view`

`element: { type, props{}, children[], …View.modifiers }`

This is the core of ScriptUI. `View` is a higher order function that accepts `type` and `props` and returns a function that accepts `children`. When the returned function is called, it returns an `element` object containing type, props, children, and modifiers. You can use modifiers to apply or manipulate props through method chaining:
```javascript
const Button = (label, onClick) => 
  View("button")(label)
    .set({ onClick })
    .background("blue")
    .padding("1em 0.5em")
    .radius("0.25em");
```

### Methods and Properties
- `View.renderer: React.createElement`
	- The renderer is used to determine how an `element` object should be interpreted. By default, `React.createElement` is used. You can use an alternative like [Preact](https://preactjs.com), [Hyperscript](https://github.com/hyperhype/hyperscript), or write your own!
-  `View.render(element: string|object|function) => View.renderer()`
	- The render method accepts `element` objects from `View` and returns the element returned from `View.renderer`. For falsy elements, `false` is returned. String elements are returned as is.
- `View.modifiers: object`
	- The modifiers property contains core modifier methods that are available to any element returned from a  `View`.
- `View.addModifiers(newModifiers: object) => void`
	- This method allows you to pass an object of modifier methods that can apply custom modifications. These must be instantiated before using the new modifiers.
	- `newModifiers` must contain functions as values and each function must return the modified object. These should be declared as [methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) for proper access to `this`.

### Modifiers
Modifiers apply changes to the `element` object and return the modified object. There are a few modifiers that are included for convenience.
- `set(newProps: object)`
	- merges  `newProps` into the `props` object
- `modify(modifier: (object) => modifiedObject)`
	- uses the provided `modifier` function to apply a modification. Use this for one time or private modifiers
- `style(newStyles: object)`
	- merges in the `newStyles` object into the `props.style` object
- `class(…classNames: string)`
	- applies strings from  `classNames` to the `className` prop
- `css(newCSS: object)`
	- applies `newCSS` to the element using `emotion`  to generate styles and enable CSS features like child selectors, pseudo-elements, and media queries

## Motivation
Today we can build web apps more quickly than ever. But somehow it’s never been harder to do it. To use JSX in your React app, you need node, npm, babel, and webpack. Beginners have to learn all of this just to get started. I think we can do better.

So I wonder: Is JSX the best we can do? Can it be easier?

JSX feels like HTML. So it’s easy to understand. And it has JavaScript super powers. In almost every way, it is better than templating languages. It’s much more legible than using `React.createElement` . It has a lot going for it.

That said, I find [SwiftUI](https://developer.apple.com/tutorials/swiftui) is easier to read than JSX. It’s been designed for Swift. It leverages the power of the language. That makes it more expressive and flexible. It offers insight into how to improve JavaScript UI code.

We don’t have all the same tricks in JavaScript, but we can get very close. So how can we get what’s good about SwiftUI _and_ JSX?

That’s where ScriptUI comes in. The goal is to build a library that is easy to understand and get started with. Reading and writing components should feel intuitive. You shouldn’t need a terminal to start creating. It should feel effortless and encourage experimentation.

If you’re a fellow SwiftUI fan or don’t love all the tooling needed to write JSX, please try it. If you really like it, please share your experience or contribute to the project. Thank you for giving it a chance.