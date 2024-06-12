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
    upload: {
        staticURL: "https://taos-pullzone.b-cdn.net/media",
        staticDir: "media",
        disableLocalStorage: true,
    }, 
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