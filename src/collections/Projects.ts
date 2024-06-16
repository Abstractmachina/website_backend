import { CollectionConfig } from "payload/types";
import Hero from "../blocks/Hero";
import TwoColumn from "../blocks/TwoColumn";
import SimpleRichText from "../blocks/SimpleRichText";
import RecentBlogPosts from "../blocks/RecentBlogPosts";
import revalidate from "../util/revalidate";
import Figure from "../blocks/Figure";
import VideoBlock from "../blocks/VideoBlock";

const Projects : CollectionConfig = {
    slug: 'projects',
    labels: {
        singular: 'Project',
        plural: 'Projects',
    },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle:'title',
    },
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
        },
        {
            name: 'subtitle',
            label: 'Subtitle',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            label: 'Slug',
            type: 'text',
            required: true
        },
        {
            name: 'year',
            label: 'Year',
            type: 'number',
            required: true
        },
        {
            name: 'location',
            label: 'Location',
            type: 'text',
            required: true
        },
        {
            name: 'name',
            label: 'Tags',
            type: 'relationship',
            relationTo: 'projecttags',
            hasMany: true,
            required: true,
            index: true,
        },
        {
            name: 'layout',
            label: 'Layout',
            type: 'blocks',
            blocks: [
                Hero,
                TwoColumn,
                SimpleRichText,
                RecentBlogPosts,
                Figure,
                VideoBlock,
            ],
        }
    ],
    hooks: {
        afterChange: [
            ({ req: { payload}, doc }) => revalidate(['projects']),
        ],
    },
    
}

export default Projects;