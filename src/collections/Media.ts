import { CollectionConfig } from "payload/types";

const Media : CollectionConfig = {
    slug: 'media',
    labels: {
        singular: "Media",
        plural: 'Media',
    },
    access: {
        read: () => true,
    },
    upload: true, 
    fields: [
        {
            name: 'alt',
            label: 'Alt',
            type: 'text',
            required: true,
        },
    ]
}

export default Media;