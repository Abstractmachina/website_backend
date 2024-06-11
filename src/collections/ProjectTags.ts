import { CollectionConfig } from "payload/types";

const ProjectTags: CollectionConfig = {
    slug: "projecttags",
    labels: {
        singular: 'Project Tag',
        plural: 'Project Tags',
    },
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            }
            ],
    admin: {
        useAsTitle: 'name'
        ,
    },
    
}

export default ProjectTags;