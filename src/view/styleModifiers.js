function badValue(value) {
  throw new TypeError(
    `Expected value to be a string, number, or object. Received: ${value}`
  );
}

export default {
  color(value) {
    return this.css({ color: value });
  },

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
        backgroundSize: value.size,
      });
    } else {
      badValue(value);
    }
  },

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
  },

  display(value) {
    return this.css({ display: value });
  },

  zIndex(value) {
    return this.css({ zIndex: value });
  },

  position(value, edges) {
    return this.css({
      position: value,
      top: edges.top || edges.vertical,
      bottom: edges.bottom || edges.vertical,
      left: edges.left || edges.horizontal,
      right: edges.right || edges.horizontal,
    });
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
        borderRadius: value.radius,
      });
    } else {
      badValue(value);
    }
  },

  radius(value) {
    return this.border({ radius: value });
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
  },

  shadow(value) {
    return this.css({ boxShadow: value });
  }
};
