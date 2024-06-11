import { CollectionConfig } from "payload/types";
import revalidate from "../util/revalidate";

const BlogPosts: CollectionConfig = {
    slug: "blogPosts",
    labels: {
        singular: 'Blog Post',
        plural: 'Blog Posts'
    },
    access: {
        read: () => true,
    },
    
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true
        },
        {
            name: 'slug',
            label: 'Slug',
            type: 'text',
            required: true
        },
        {
            name: 'body',
            label: 'Body',
            type: 'richText',
            required: true
        },
    ],
    hooks: {
        afterChange: [
            ({ req: { payload}, doc }) => revalidate(['blogPosts']),
        ],
    },
}

export default BlogPosts;