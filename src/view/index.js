import { React } from "https://unpkg.com/es-react";

import { StyledUI, UI } from "./ui.js";

/**
 * Uses `type` and `props` to produce a function which accepts `children`.
 * When the returned function is called, it produces a UI class.
 * @template {StyledUI} U
 * @param {string} type
 * @param {object=} props
 * @param {new U} element
 */
export function View(type = "div", props, element = StyledUI) {
  /**
   * @param {...(UI|string|false)} children
   * @returns {U}
   */
  const Factory = function(...children) {
    return new element(type, props, children);
  };

  return Factory;
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
  } else if (typeof element === "string" || typeof element === "number") {
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

export default View;
export { StyledUI, UI };