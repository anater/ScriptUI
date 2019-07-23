import View from "./view";
import { Stack, Text, Spacer, Button } from "./components";

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
    Stack("h", "center")(
      Checkbox(() => onChange(index), index)
        .margin({
          vertical: "1em",
          right: "2em"
        })
        .modify(element => element.css({ lineHeight: 2 })),
      Text(taskText, "label")
        .set({ htmlFor: index })
        .size("1.3rem")
        .lineHeight(1.5)
        .display("block")
        .frame({ width: "100%" })
    ).set({ key: index })
  );
  return Stack("v")(...taskViews).frame({ width: "90%", maxWidth: "30rem" });
};

const Counter = () => {
  console.log("Counter");
  const { useState } = React;
  const [count, setCount] = useState(0);

  return Stack("v", "center")(
    Text(`Count ${count}`).color("orange"),
    Spacer(),
    Button(`+ 1`, () => setCount(count + 1)).css({
      fontSize: "1.2rem",
      color: "white",
      background: "linear-gradient(orange, orangered)",
      border: "none",
      fontWeight: 900
    })
  ).padding(20);
};

const Title = text =>
  Text(text, "h1")
    .size("2rem")
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

  return Stack("v", "center")(
    Stack("h", "center")(Title("testing"), Counter()),
    Input({ onChange: e => setTasks(tasks.concat(e.target.value)) }),
    Stack("h", "center")(
      Title("Tasks"),
      Text(`(${checked.size}/${tasks.length})`).margin({ left: "0.5em" })
    ),
    Tasks(tasks, handleChange)
  );
};

window.onload = () => {
  const element = View.render(App);
  const root = document.querySelector("#root");
  ReactDOM.render(element, root);
};
