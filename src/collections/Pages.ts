import { CollectionConfig } from "payload/types";
import Hero from "../blocks/Hero";
import TwoColumn from "../blocks/TwoColumn";
import SimpleRichText from "../blocks/SimpleRichText";
import RecentBlogPosts from "../blocks/RecentBlogPosts";

const Pages : CollectionConfig = {
    slug: 'pages',
    labels: {
        singular: 'Page',
        plural: 'Pages',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            label: 'Name',
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
            name: 'layout',
            label: 'Layout',
            type: 'blocks',
            blocks: [
                Hero,
                TwoColumn,
                SimpleRichText,
                RecentBlogPosts,
            ],
        }
    ],
    
}

export default Pages;