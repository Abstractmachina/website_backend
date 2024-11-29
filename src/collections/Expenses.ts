import ExpensesDefaultView from "@/views/ExpensesDefaultView";
import TestView2 from "@/views/TestView2";
import { CollectionConfig } from "payload/types";
import dateFormat, { masks } from "dateformat";
import SaveAndCloseButton from "@/components/ui/SaveAndCloseButton";


const Expenses: CollectionConfig = {
  slug: "expenses",
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    components: {
      edit: {
        SaveButton: SaveAndCloseButton,
      }
    }

    //   views: {
    //     Edit: {
    //       // MyCustomTab: {
    //       //   Component: ExpensesDefaultView,
    //       //   path: "/test",
    //       //   Tab: TestView2,
    //       // },
    //       Default: {
    //         Component: ExpensesDefaultView,
    //       }
    //     }   
        
    //   }
    // }
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
      name: "tags",
      type: "relationship",
      relationTo: "expenseTags",
      index: true,
    },
    {
      name: "comment",
      type: "textarea",

    },
    {
      name: "date",
      type: "date",
      defaultValue: new Date().toISOString(),
    },
  ],
}

export default Expenses;