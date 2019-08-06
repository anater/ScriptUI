/**
 * @typedef {string | number} CSSValue
 */

/**
 * @typedef EdgeValues
 * @prop {CSSValue} top
 * @prop {CSSValue} bottom
 * @prop {CSSValue} vertical
 * @prop {CSSValue} left
 * @prop {CSSValue} right
 * @prop {CSSValue} horizontal
 */

import { css } from "https://cdn.pika.dev/emotion/v10/";

export class UI {
  constructor(type = "span", props = {}, children = []) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
  /**
   * Merges `newProps` into props
   */
  set(newProps) {
    this.props = Object.assign(this.props || {}, newProps);
    return this;
  }

  /**
   * Passes `element` object to `modifier` function and returns the result
   * @arg {function(this):this} modifier
   */
  modify(modifier) {
    return modifier(this);
  }

  /**
   * Merges `newStyles` into the style prop
   */
  style(newStyles) {
    this.props.style = Object.assign(this.props.style || {}, newStyles);
    return this;
  }

  /**
   * Combine values from `...classList` to replace the className prop
   * @arg {string[]} classList
   */
  class(...classList) {
    if (this.props && this.props.className) {
      classList.push(this.props.className);
    }
    return this.set({ className: classnames(classList) });
  }

  /**
   * Applies `newStyles` with a unique CSS class
   */
  css(newStyles) {
    return this.class(css(newStyles));
  }
}

export class StyledUI extends UI {
  /** @arg {CSSValue} value */
  color(value) {
    return this.css({ color: value });
  }

  /** @arg {CSSValue} value */
  background(value) {
    if (typeof value === "string") {
      return this.css({ background: value });
    } else if (typeof value === "object") {
      return this.css({
        backgroundAttachment: value.attachment,
        backgroundClip: value.clip || value.box,
        backgroundOrigin: value.origin || value.box,
        backgroundColor: value.color,
        backgroundImage: value.image,
        backgroundPosition: value.position,
        backgroundRepeat: value.repeat,
        backgroundSize: value.size
      });
    } else {
      badValue(value);
    }
  }

  /** @arg {CSSValue} value */
  font(value) {
    if (typeof value === "string") {
      return this.css({ font: value });
    } else if (typeof value === "object") {
      return this.css({
        fontSize: value.size,
        fontFamily: value.family,
        fontWeight: value.weight,
        fontStretch: value.stretch,
        lineHeight: value.lineHeight
      });
    } else {
      badValue(value);
    }
  }

  /** @arg {CSSValue} value */
  display(value) {
    return this.css({ display: value });
  }

  /** @arg {CSSValue} value */
  zIndex(value) {
    return this.css({ zIndex: value });
  }

  /**
   * @arg {string} value Valid value for `position` css property
   * @arg {EdgeValues} edges Position offset values
   */
  position(value, edges) {
    return this.css({
      position: value,
      top: edges.top || edges.vertical,
      bottom: edges.bottom || edges.vertical,
      left: edges.left || edges.horizontal,
      right: edges.right || edges.horizontal
    });
  }

  /**
   * @arg {CSSValue} value Sets both width and height when passed a number or string.
   */
  frame(value) {
    if (typeof value === "string" || typeof value === "number") {
      return this.css({ width: value, height: value });
    } else if (typeof value === "object") {
      return this.css({
        width: value.width,
        height: value.height,
        minWidth: value.minWidth,
        minHeight: value.minHeight,
        maxWidth: value.maxWidth,
        maxHeight: value.maxHeight
      });
    } else {
      badValue(value);
    }
  }

  /** @arg {CSSValue | EdgeValues} value */
  border(value) {
    if (typeof value === "string") {
      return this.css({ border: value });
    } else if (typeof value === "object") {
      return this.css({
        border: value.all,
        borderTop: value.top || value.vertical,
        borderBottom: value.bottom || value.vertical,
        borderLeft: value.left || value.horizontal,
        borderRight: value.right || value.horizontal,
        borderRadius: value.radius
      });
    } else {
      badValue(value);
    }
  }

  /** @arg {CSSValue} value */
  radius(value) {
    return this.border({ radius: value });
  }

  /** @arg {CSSValue | EdgeValues} value */
  margin(value) {
    if (typeof value === "string" || typeof value === "number") {
      return this.css({ margin: value });
    } else if (typeof value === "object") {
      return this.css({
        marginTop: value.top || value.vertical,
        marginBottom: value.bottom || value.vertical,
        marginLeft: value.left || value.horizontal,
        marginRight: value.right || value.horizontal
      });
    } else {
      badValue(value);
    }
  }

  /** @arg {CSSValue | EdgeValues} value */
  padding(value) {
    if (typeof value === "string" || typeof value === "number") {
      return this.css({ padding: value });
    } else if (typeof value === "object") {
      return this.css({
        paddingTop: value.top || value.vertical,
        paddingBottom: value.bottom || value.vertical,
        paddingLeft: value.left || value.horizontal,
        paddingRight: value.right || value.horizontal
      });
    } else {
      badValue(value);
    }
  }

  /** @arg {CSSValue} value */
  shadow(value) {
    return this.css({ boxShadow: value });
  }
}

// HELPERS

function classnames(classList = []) {
  const filteredClassList = classList.filter(
    c => c !== false && typeof c === "string" && c.length > 0
  );
  if (filteredClassList.length > 0) {
    return filteredClassList.join(" ");
  }
}