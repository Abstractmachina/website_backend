import { CollectionConfig } from "payload/types";

const ExpenseTags: CollectionConfig = {
  slug: "expenseTags",
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
  admin: {
    useAsTitle: "name",
  },
}

export default ExpenseTags;