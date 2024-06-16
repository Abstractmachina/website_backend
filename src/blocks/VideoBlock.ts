import payload from "payload";
import { Block, CollectionAfterReadHook, FieldHook } from "payload/types";



// const getFullVideo : FieldHook<> = (args) => {
//     const {
//         value, // Typed as `string` as shown above
//         data, // Typed as a Partial of your ExampleDocumentType
//         siblingData, // Typed as a Partial of SiblingDataType
//         originalDoc, // Typed as ExampleDocumentType
//         operation,
//         req,
//       } = args
    
// }

const VideoBlock: Block = {
    slug: "videoBlock",
    fields: [
        {
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
                // beforeChange: [
                //     async ({ value, operation }) => {
                //         console.log('beforeChange');
                //         console.log(value);
                //         if (typeof value === 'string') {

                //             const result = await payload.findByID({
                //                 collection: 'videos',
                //                 id: value,
                //             });
                //             console.log(result);
                //             return result;
                //         }

                //         return value;
                //     }
                // ],
                afterRead: [
                    async ({ value }) => {
                    console.log("video block internal video after read")
                        console.log(value);
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