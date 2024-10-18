import { CollectionConfig } from "payload/types";

const ProjectTags: CollectionConfig = {
  slug: "projectTags",
  access: {
      read: () => true,
      create: () => true,
  },
  labels: {
    singular: "Project Tag",
    plural: "Project Tags",
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
};

export default ProjectTags;
