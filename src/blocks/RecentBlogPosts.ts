import { Block } from "payload/types";

const RecentBlogPosts: Block = {
    slug: "recentBlogPosts",
    labels: {
        singular: "Recent BlogPosts",
        plural: "Recent BlogPosts",
    },
    fields: [
        {
            name: 'heading',
            label: 'Heading',
            type: 'text'
        }
    ],
}

export default RecentBlogPosts;