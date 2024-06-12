import { Block } from "payload/types";

const Figure : Block = {
    slug: "figure",
    labels: {
        singular: "Figure",
        plural: 'Figures',
    },
    fields: [
        {
            name: 'description',
            label: 'Description',
            type: 'textarea'
        },
        {
            name: 'image',
            label: 'Image',
            type: 'upload',
            relationTo: 'media'
        },
    ],
}

export default Figure;