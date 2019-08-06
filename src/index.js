import { React, ReactDOM } from "https://unpkg.com/es-react";
import View from "./view/index.js";
import { Flex, Text, Spacer, Button, Link } from "./components.js";

import { injectGlobal } from "https://cdn.pika.dev/emotion/v10/";

const Input = props => {
  const newInput = View("input", { ...props, type: "text" });
  return newInput();
};

const Title = text =>
  Text(text, "h1")
    .font({ size: "2rem" })
    .margin(0);

const App = () => {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    fetch("https://www.reddit.com/r/reactjs.json")
      .then(res => res.json())
      .then(({ data }) => setItems(data.children))
      .catch(console.error);
  }, []);
  console.log(items);
  return View("div")(
    ...items.map(({ data }) =>
      View("a", { href: data.url })(
        Flex("row", "between")(
          Text(data.title)
            .color("cyan")
            .font({ size: "1.25rem" }),
          Flex("column", "end")(
            Title(data.score).color("lightyellow"),
            Title(data.num_comments).color("lightgreen")
          )
        ).align("center")
      )
        .color("white")
        .display("block")
        .margin({ vertical: 10 })
        .padding(20)
        .background("rgba(255,255,255,0.08)")
        .radius(20)
        .css({
          textDecoration: "none",
          transition: "transform 300ms ease",
          ":hover": {
            transform: "scale(1.01)"
          }
        })
    )
  )
    .frame({ minHeight: "100vh" })
    .font({ family: "sans-serif", lineHeight: 1.5 })
    .background("black")
    .padding(20);
};

window.onload = () => {
  const element = View.render(App);
  const root = document.querySelector("#root");
  injectGlobal({
    body: { margin: 0 }
  });
  ReactDOM.render(element, root);
};
