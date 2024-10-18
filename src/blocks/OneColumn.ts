import { Block } from "payload/types";

const OneColumn: Block = {
  slug: "oneColumn",

  fields: [
    {
      name: "heading",
      type: "text",
    },
    {
      name: "text",
      type: "textarea",
    },
  ],
};

export default OneColumn