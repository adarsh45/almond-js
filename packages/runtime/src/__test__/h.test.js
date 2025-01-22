import { h } from "../h.js";

const expected = {
  tag: "div",
  props: { class: "parent" },
  children: [
    {
      tag: "span",
      props: {},
      children: [{ type: "text", value: "First Span" }],
      type: "element",
    },
    { type: "text", value: "Second freetext" },
  ],
  type: "element",
};

const result = h("div", { class: "parent" }, [
  h("span", {}, ["First Span"]),
  "Second freetext",
]);

console.log(JSON.stringify(result) === JSON.stringify(expected));
