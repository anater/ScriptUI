import View from "./view";

/*
  Elements
*/

export function Text(textContent, tagName) {
  const textView = View(tagName || "span", { className: "text" }).addModifiers({
    // weight

    lighter() {
      return this.font({ weight: "lighter" });
    },

    bold() {
      return this.font({ weight: "bold" });
    },

    bolder() {
      return this.font({ weight: "bolder" });
    },

    // alignment
    align(value) {
      return this.css({ textAlign: value });
    },

    left() {
      return this.align("left");
    },

    center() {
      return this.align("center");
    },

    right() {
      return this.align("right");
    },

    // transform
    uppercase() {
      return this.css({ textTransform: "uppercase" });
    },

    lowercase() {
      return this.css({ textTransform: "lowercase" });
    },

    capitalize() {
      return this.css({ textTransform: "capitalize" });
    },

    // spacing
    letterSpacing(value) {
      return this.css({ letterSpacing: value });
    },

    wordSpacing(value) {
      return this.css({ wordSpacing: value });
    },

    // decoration
    decoration(value) {
      if (typeof value === "string") {
        return this.css({ textDecoration: value });
      } else if (typeof value === "object") {
        return this.css({
          textDecorationLine: value.line,
          textDecorationColor: value.color,
          textDecorationStyle: value.style
        });
      }
    },

    underline() {
      return this.decoration("underline");
    },

    linethrough() {
      return this.decoration("line-through");
    }
  });

  return textView(textContent);
}

export function Button(textContent, onClick) {
  return Text(textContent, "button").set({ onClick });
}

export function Link(textContent, href) {
  return Text(textContent, "a").set({ href });
}

export function Spacer(size = 1) {
  return View("span", { role: "presentation" })()
    .css({ flex: size })
    .frame({ minWidth: `${size}em`, minHeight: `${size}em` });
}

export function Flex(direction, align) {
  if (!direction) throw new Error("no direction provided to Stack");

  const shortcuts = {
    start: "flex-start",
    end: "flex-end",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly"
  };

  const flexView = View("div").addModifiers({
    flex(flexDirection, flexWrap) {
      return this.display("flex").css({ flexDirection, flexWrap });
    },
    align(itemsValue, contentValue) {
      return this.css({
        alignItems: shortcuts[itemsValue] || itemsValue,
        alignContent: shortcuts[contentValue] || contentValue
      });
    },
    justify(value) {
      return this.css({
        justifyContent: shortcuts[value] || value
      });
    }
  });

  return (...children) =>
    flexView(...children)
      .flex(direction)
      .align(align)
      .justify(align);
}
