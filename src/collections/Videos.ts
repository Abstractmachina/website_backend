import { CollectionConfig } from "payload/types";

const Videos: CollectionConfig = {
    slug: "videos",
    upload: {
        staticURL: '',
        staticDir: '/videos',
        mimeTypes: ['video/*'],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'caption',
            type: 'textarea'
        },
        {
            name: 'providerData',
            type: 'json',
            admin: {
                readOnly: true
            }
        }
    ],
}

export default Videos;