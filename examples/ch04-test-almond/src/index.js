import almond from "almond";

const parent = document.getElementById("app");

const { mountDOM, h } = almond;

const vdom = h("div", { class: "first" }, [
  "Hello world",
  h("img", { src: "", alt: "ALTER TEXT" }),
]);

mountDOM(vdom, parent);
