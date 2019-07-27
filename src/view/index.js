import { css } from "emotion";

import styleModifiers from "./styleModifiers";

/**
 * Uses `type` and `props` to produce a function which accepts `children`.
 * When the returned function is called, it produces an element object.
 */
export default function View(type = "div", props) {
  /**
   * Creates a new `element` object with `type`, `props`, `children`. `createElement.modifiers` is the object prototype
   */
  const createElement = function(...children) {
    let element = Object.create(createElement.modifiers);
    Object.assign(element, { type, props, children });
    return element;
  };
  /**
   * Contains any custom modifiers for this element. Prototype is `View.modifiers` to enable access to all base modifiers
   */
  createElement.modifiers = Object.create(View.modifiers);
  /**
   * Merges `newModifiers` object into `createElement.modifiers`
   * */
  createElement.addModifiers = function(newModifiers = {}) {
    Object.assign(createElement.modifiers, newModifiers);
    return createElement;
  };

  return createElement;
}

/**
 * An alias for the rendering function. Default is `React.createElement`
 */
View.renderer = React.createElement;

/**
 * Uses `element` to produce a valid element with `View.renderer`
 */
View.render = function(element) {
  if (!element) {
    // falsy elements are treated as false
    return false;
  } else if (typeof element === "string") {
    // send back the string as is
    return element;
  } else if (typeof element === "function") {
    // Wrap function with function which produces the rendered element
    // This enables usage of React Hooks inside top level elements
    return View.renderer(() => View.render(element()));
  } else if (typeof element === "object") {
    const { type, props, children } = element;
    // if we have children, render them and return a rendered element with them
    if (children && children.length > 0) {
      const renderedChildren = children.map(View.render);
      return View.renderer(type, props, ...renderedChildren);
    }
    // otherwise, just render with type and props
    return View.renderer(type, props);
  } else {
    throw new Error(
      `Invalid element. Expected string, function or object. Received ${element}`
    );
  }
};

View.modifiers = {
  /**
   * Merges `newProps` into props
   */
  set(newProps) {
    this.props = Object.assign(this.props || {}, newProps);
    return this;
  },

  /**
   * Passes `element` object to `modifier` function and returns the result
   */
  modify(modifier) {
    return modifier(this);
  },

  /**
   * Merges `newStyles` into the style prop
   */
  style(newStyles) {
    this.props.style = Object.assign(this.props.style || {}, newStyles);
    return this;
  },

  /**
   * Combine values from `...classList` to replace the className prop
   */
  class(...classList) {
    if (this.props && this.props.className) {
      classList.push(this.props.className);
    }
    return this.set({ className: classnames(classList) });
  },

  css(newStyles) {
    return this.class(css(newStyles));
  },

  // spread styleModifiers into base modifiers
  ...styleModifiers,
};

/**
 * Merges `newModifiers` object into `View.modifiers`
 * */
View.addModifiers = function(newModifiers = {}) {
  Object.assign(View.modifiers, newModifiers);
  return View;
};

// HELPERS

function classnames(classList = []) {
  const filteredClassList = classList.filter(
    c => c !== false && typeof c === "string" && c.length > 0
  );
  if (filteredClassList.length > 0) {
    return filteredClassList.join(" ");
  }
}
