import { React, ReactDOM } from "https://unpkg.com/es-react";
import View from "./view/index.js";
import { Flex, Text, Spacer, Button, Link } from "./components.js";

import { injectGlobal } from "https://cdn.pika.dev/emotion/v10/";

// defining local app components

const Input = props =>
  View("input", { ...props, type: "text" })()
    .padding(20)
    .background("rgba(255,255,255,0.1)")
    .color("white")
    .font({ family: "inherit", weight: "bold", size: 20 })
    .frame({ width: "100%" })
    .css({ boxSizing: "border-box" })
    .border("none");

const Image = src => View("img", { src })().frame({ width: "100%" });

const Video = (src, fallback) =>
  View("video", {
    autoPlay: true,
    loop: true,
    onClick: e => e.preventDefault()
  })(
    View("source", { src })(),
    fallback && View("source", { src: fallback })()
  ).frame({ width: "100%" });

const Container = (...children) =>
  View("main")(...children)
    .frame({ minHeight: "100vh", maxWidth: "90%" })
    .font({ family: "sans-serif", lineHeight: 1.5 })
    .background("black")
    .padding(20)
    .margin("0 auto");

function Media(title, permalink, src, type) {
  if (type !== "img" && type !== "video") {
    new Error("Invalid type:", type);
    return false;
  }

  let MediaPreview;
  if (type === "video") MediaPreview = Video(src.mp4, src.gif);
  else if (type === "img") MediaPreview = Image(src);

  return View("a", { href: `//reddit.com${permalink}` })(
    Flex("column")(
      MediaPreview,
      Text(title)
        .font({ size: "1rem" })
        .padding(20)
        .color("lightblue")
    )
  )
    .color("white")
    .display("block")
    .margin({ vertical: 20 })
    .background("rgba(255,255,255,0.08)")
    .css({ textDecoration: "none" });
}

// app starts here

const App = () => {
  // set up state
  const [subreddit, setSubreddit] = React.useState("gifs");
  const [inputValue, setInputValue] = React.useState("");
  // const [loading, setLoading] = React.useState(false);
  const items = useReddit(subreddit);
  return Container(
    Flex("row", "between")(
      Input({
        placeholder: "gifs",
        onKeyPress: e => setInputValue(e.currentTarget.value)
      }),
      Button("GO")
        .frame({
          width: "20%",
          maxWidth: 60
        })
        .set({ type: "submit" })
        .background("lightblue")
        .font({ size: "1em", weight: "bold" })
        .border("none")
    )
      .margin({ vertical: 20 })
      .modify(ui => {
        ui.type = "form";
        return ui.set({
          name: "test",
          onSubmit: e => {
            e.preventDefault();
            setSubreddit(inputValue);
          }
        });
      }),
    View("div")(...renderMediaList(items)).css({
      columns: "3 400px",
      columnGap: "2rem"
    })
  );
};

function renderMediaList(items) {
  return items.map(({ data }) => {
    // guard against missing preview data
    if (!data.preview) return false;
    const { title, link, source, type } = getMediaPropsFromData(data);
    return Media(title, link, source, type);
  });

  function getMediaPropsFromData(data) {
    const firstImage = data.preview.images[0];
    let source = null;
    let type = null;

    if (data.post_hint.includes("video") && firstImage.variants) {
      type = "video";
      source = {
        mp4: firstImage.variants.mp4.source.url,
        gif: firstImage.variants.gif.source.url
      };
    } else if (data.post_hint.includes("image")) {
      type = "img";
      source = firstImage.source.url;
    } else if (data.post_hint.includes("link")) {
      if (firstImage.reddit_video_preview) {
        type = "video";
        source = {
          mp4: firstImage.reddit_video_preview.fallback_url,
          gif: firstImage.reddit_video_preview.fallback_url
        };
      } else {
        type = "img";
        source = firstImage.source.url;
      }
    } else {
      console.warn("other type", data.post_hint, data.preview);
    }

    return { title: data.title, link: data.permalink, source, type };
  }
}

/** @returns {Array} */
function useReddit(subreddit) {
  const [items, setItems] = React.useState([]);
  // fetch subreddit data
  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const url = `https://www.reddit.com/r/${subreddit}/top.json?raw_json=1&t=week&limit=20`;

    // reset before fetch
    setItems([]);

    fetch(url, { signal })
      .then(res => res.json())
      .then(({ data }) => {
        console.log(`setting ${subreddit} items`);
        setItems(data.children);
      })
      .catch(console.error);
    // cleanup
    return () => {
      console.log(`aborting ${subreddit}`);
      controller.abort();
    };
  }, [subreddit]);

  return items;
}

window.onload = () => {
  const element = View.render(App);
  const root = document.querySelector("#root");
  injectGlobal({
    body: { margin: 0, backgroundColor: "black" }
  });
  ReactDOM.render(element, root);
};
