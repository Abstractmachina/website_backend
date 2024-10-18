import { Block } from "payload/types";

const Link: Block = {
  slug: "link",
  fields: [
    {
      name: "text",
      type: "text",
    },
    {
      name: "link",
      type: "text",
    },
  ],
};

export default Link;