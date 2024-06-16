import payload from "payload";
import { Block, CollectionAfterReadHook, FieldHook } from "payload/types";


const VideoBlock: Block = {
    slug: "videoBlock",
    fields: [
        {
            // external types take just an url (e.g. vimeo, youtube)
            // internal is for videos saved in the database and will return full documents
            name: 'sourceType', // required
            label: 'Source Type',
            type: 'radio', // required
            options: [
              // required
              {
                label: 'internal',
                value: 'internal',
              },
              {
                label: 'external',
                value: 'external',
              },
            ],
            defaultValue: 'internal', // The first value in options.
            admin: {
              layout: 'horizontal',
            },
        },
        {
            name: "externalUrl",
            label: 'External URL',
            type: 'text',
            admin: {
                condition: (data, siblingData, { user }) => {
                    if (siblingData.sourceType == 'external') return true;
                    else return false;
                },
            },
        },
        {
            name: 'internalVideo',
            label: 'Internal Video',
            type: 'upload',
            relationTo: 'videos',
            admin: {
                condition: (data, siblingData, { user }) => {
                    if (siblingData.sourceType === 'internal') return true;
                    else return false;
                },
            },
            hooks: {
                afterRead: [
                    async ({ value }) => {
                        // return full video document when read. 
                        if (value) {

                            const result = await payload.findByID({
                                collection: 'videos',
                                id: value,
                            });
                            return result;
                        }
                        return value;
                }]
            }
        },
        {
            name: 'caption',
            label: 'Caption',
            type: 'textarea',
        }
    ],
}

export default VideoBlock;