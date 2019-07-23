import View from "view.js";
import { css } from "emotion";

function badValue(value) {
  throw new TypeError(
    `Expected value to be a string, number, or object. Received: ${value}`
  );
}

View.addModifiers({
  css(newStyles) {
    return this.class(css(newStyles));
  },
  color(value) {
    return this.css({ color: value });
  },
  size(value) {
    return this.css({ fontSize: value });
  },
  display(value) {
    return this.css({ display: value });
  },
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
  },
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
  },
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
});

/*
  Elements
*/

export function Text(textContent, tagName) {
  const textView = View(tagName || "span", { className: "text" }).addModifiers({
    lineHeight(value) {
      return this.css({ lineHeight: value });
    }
  });
  return textView(textContent);
}

export function Button(textContent, onClick) {
  return Text(textContent, "button").set({ onClick });
}

export function Spacer(size = 1) {
  return View("span", { role: "presentation" })()
    .css({ flex: size })
    .class("spacer");
}

export function Stack(direction, align) {
  if (!direction) throw new Error("no direction provided to Stack");
  return (...children) =>
    View("div")(...children).class(
      "stack",
      direction === "h" && "h-stack",
      direction === "v" && "v-stack",
      align === "baseline" && "align-baseline",
      align === "start" && "align-start",
      align === "center" && "align-center",
      align === "end" && "align-end"
    );
}
