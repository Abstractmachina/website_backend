import { CollectionConfig } from "payload/types";

const Expenses: CollectionConfig = {
  slug: "expenses",
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      type: "number",
      name: "amount",
    },
    {
      name: "category",
      type: "select",
      options: [
        {
          label: "Food",
          value: "food",
        },
        {
          label: "Shelter",
          value: "shelter",
        },
        {
          label: "Transport",
          value: "transport",
        },
        {
          label: "Health",
          value: "health",
        },
        {
          label: "Fitness",
          value: "Fitness",
        },
        {
          label: "Education",
          value: "education",
        },
        {
          label: "Business",
          value: "business",
        },
        {
          label: "Wife",
          value: "wife",
        },
        {
          label: "Non-Essential",
          value: "non-essential",
        },

      ],
    },
    {
      name: "comment",
      type: "textarea",
      admin: {
        position: "sidebar",
      }
    },
    {
      name: "date",
      type: "date",
      admin: {
        position: "sidebar",
      }
    },
  ],
}

export default Expenses;