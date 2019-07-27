import View from "../src/view/index";
import { Flex, Text, Spacer, Button, Link } from "../src/components";

const Input = props => {
  const newInput = View("input", { ...props, type: "text" });
  return newInput();
};

const Checkbox = (onChange, id) => {
  const newCheckbox = View("input", { type: "checkbox", onChange, id });
  return newCheckbox();
};

const Tasks = (tasks, onChange) => {
  const taskViews = tasks.map((taskText, index) =>
    Flex("row", "center")(
      Checkbox(() => onChange(index), index)
        .margin({
          vertical: "1em",
          right: "2em"
        })
        .modify(element => element.css({ lineHeight: 2 })),
      Text(taskText, "label")
        .set({ htmlFor: index })
        .font({ size: "1.3rem", lineHeight: 1.5 })
        .frame({ width: "100%" })
    ).set({ key: index })
  );
  return Flex("column")(...taskViews).frame({
    width: "90%",
    maxWidth: "30rem"
  });
};

const Counter = () => {
  const { useState } = React;
  const [count, setCount] = useState(0);

  return Flex("column", "center")(
    Link(`Count ${count}`, "https://google.com")
      .color("orange")
      .set({ target: "_blank" })
      .decoration("none"),
    Spacer(),
    Button(`+ 1`, () => setCount(count + 1))
      .radius(10)
      .color("white")
      .font({ size: "1.2rem", weight: 900 })
      .border("1px solid orange")
      .background("linear-gradient(orange, orangered)")
      .padding({ vertical: 10, horizontal: 20 })
      .shadow("0px 0px 10px rgba(0,0,0,0.1)")
  ).padding(20);
};

const Title = text =>
  Text(text, "h1")
    .font({ size: "2rem" })
    .margin(0);

const App = () => {
  const [tasks, setTasks] = React.useState(["one", "two", "three"]);
  const [checked, setChecked] = React.useState(new Set());
  const handleChange = React.useCallback(
    checkedIndex => {
      const newChecked = new Set(checked);
      if (checked.has(checkedIndex)) {
        newChecked.delete(checkedIndex);
      } else {
        newChecked.add(checkedIndex);
      }
      setChecked(newChecked);
    },
    [checked]
  );

  return Flex("column", "center")(
    Flex("row", "baseline")(Title("testing"), Counter()),
    Input({ onChange: e => setTasks(tasks.concat(e.target.value)) }),
    Flex("row", "center")(
      Title("Tasks"),
      Text(`(${checked.size}/${tasks.length})`).margin({ left: "0.5em" })
    ),
    Tasks(tasks, handleChange)
  ).font({ family: "sans-serif" });
};

window.onload = () => {
  const element = View.render(App);
  const root = document.querySelector("#root");
  ReactDOM.render(element, root);
};
